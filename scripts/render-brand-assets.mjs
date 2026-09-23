// Renders the Viram "two breaths" mark into the PNG assets used by app.json.
// The mark is drawn from its construction (docs/branding-design.html #identity),
// so the PNGs stay exact at every size without an SVG rasterizer.
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const hex = (value) => [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
const COLORS = {
  pine: hex('#12372F'),
  sky: hex('#A8CFD0'),
  mist: hex('#EEF4EF'),
  coral: hex('#E46F51'),
  paper: hex('#FBFCF8'),
  white: hex('#FFFFFF'),
};

// Construction on a 100 × 100 grid.
const MARK = { cx: 50, cy: 52, radius: 28, stroke: 9, gapDegrees: 28, pointRadius: 4.6 };
const toRadians = (degrees) => (degrees * Math.PI) / 180;
const endpoint = (degrees) => [
  MARK.cx + MARK.radius * Math.sin(toRadians(degrees)),
  MARK.cy - MARK.radius * Math.cos(toRadians(degrees)),
];
const POINT = endpoint(0).map((v, i) => (i === 0 ? MARK.cx : v));

function arcDistance(x, y, fromDegrees, toDegrees) {
  const dx = x - MARK.cx;
  const dy = y - MARK.cy;
  let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  if (angle >= fromDegrees && angle <= toDegrees) return Math.abs(Math.hypot(dx, dy) - MARK.radius);
  return Math.min(
    ...[fromDegrees, toDegrees].map((d) => {
      const [ex, ey] = endpoint(d);
      return Math.hypot(x - ex, y - ey);
    }),
  );
}

const g = MARK.gapDegrees;
const markLayers = (tones) => [
  { color: tones.left, distance: (x, y) => arcDistance(x, y, 180 + g, 360 - g) - MARK.stroke / 2 },
  { color: tones.right, distance: (x, y) => arcDistance(x, y, g, 180 - g) - MARK.stroke / 2 },
  { color: tones.point, distance: (x, y) => Math.hypot(x - POINT[0], y - POINT[1]) - MARK.pointRadius },
];

function roundedSquare(inset, cornerRatio) {
  const half = 50 - inset;
  const r = half * 2 * cornerRatio;
  return (x, y) => {
    const qx = Math.abs(x - 50) - half + r;
    const qy = Math.abs(y - 50) - half + r;
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
  };
}

// Scales layers about a design-space origin and centers that origin on the canvas.
const place = (layers, scale, cx = 50, cy = 50) =>
  layers.map(({ color, distance }) => ({
    color,
    distance: (x, y) => distance((x - 50) / scale + cx, (y - 50) / scale + cy) * scale,
  }));

// Draws layers (signed distance in grid units, negative inside) with antialiasing.
function render({ size, background, layers }) {
  const unitsPerPixel = 100 / size;
  const pixels = new Float64Array(size * size * 4);
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const gx = ((px + 0.5) / size) * 100;
      const gy = ((py + 0.5) / size) * 100;
      let [r, gch, b, a] = background ? [...background, 1] : [0, 0, 0, 0];
      for (const layer of layers) {
        const coverage = Math.min(1, Math.max(0, 0.5 - layer.distance(gx, gy) / unitsPerPixel));
        if (coverage === 0) continue;
        const outA = coverage + a * (1 - coverage);
        const blend = (src, dst) => (src * coverage + dst * a * (1 - coverage)) / outA;
        [r, gch, b] = [blend(layer.color[0], r), blend(layer.color[1], gch), blend(layer.color[2], b)];
        a = outA;
      }
      pixels.set([r, gch, b, a], (py * size + px) * 4);
    }
  }
  return pixels;
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buffer) => {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
};

function writePng(path, size, pixels, { alpha }) {
  const channels = alpha ? 4 : 3;
  const raw = Buffer.alloc(size * (size * channels + 1));
  for (let y = 0; y < size; y++) {
    const row = y * (size * channels + 1);
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      for (let c = 0; c < channels; c++) {
        const value = c === 3 ? pixels[i + 3] * 255 : pixels[i + c];
        raw[row + 1 + x * channels + c] = Math.round(Math.min(255, Math.max(0, value)));
      }
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header.set([8, alpha ? 6 : 2, 0, 0, 0], 8);
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  writeFileSync(path, png);
  console.log(`wrote ${path} (${size}×${size}, ${alpha ? 'RGBA' : 'RGB'})`);
}

const fullColor = markLayers({ left: COLORS.sky, right: COLORS.mist, point: COLORS.coral });
const singleColor = markLayers({ left: COLORS.white, right: COLORS.white, point: COLORS.white });
// Android adaptive layers center the mark's circle and keep it inside the 66/108 safe zone.
const SAFE_ZONE_SCALE = 0.85;
// The splash shows the icon tile at 56% of the canvas on paper.
const SPLASH_TILE_SCALE = 0.56;

const outputs = [
  { path: 'assets/icon.png', size: 1024, background: COLORS.pine, layers: fullColor },
  { path: 'assets/favicon.png', size: 64, background: COLORS.pine, layers: fullColor },
  {
    path: 'assets/android-icon-foreground.png',
    size: 1024,
    layers: place(fullColor, SAFE_ZONE_SCALE, MARK.cx, MARK.cy),
    alpha: true,
  },
  {
    path: 'assets/android-icon-monochrome.png',
    size: 432,
    layers: place(singleColor, SAFE_ZONE_SCALE, MARK.cx, MARK.cy),
    alpha: true,
  },
  {
    path: 'assets/splash.png',
    size: 1024,
    background: COLORS.paper,
    layers: place([{ color: COLORS.pine, distance: roundedSquare(0, 0.224) }, ...fullColor], SPLASH_TILE_SCALE),
  },
];

for (const { path, size, background, layers, alpha = false } of outputs) {
  writePng(path, size, render({ size, background, layers }), { alpha });
}
