import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { colors } from '../src/theme';
import { getDb } from '../src/storage/db';
import { ensureTonesReady } from '../src/audio/tones';

export default function RootLayout() {
  useEffect(() => {
    // Run migrations and warm up the tone players once at app start.
    getDb();
    void ensureTonesReady();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.ink,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: { color: colors.ink, fontWeight: '600' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="setup" options={{ title: 'Set up practice' }} />
      <Stack.Screen
        name="session"
        options={{ title: 'Practice', headerBackVisible: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="summary"
        options={{ title: 'Summary', headerBackVisible: false, gestureEnabled: false }}
      />
      <Stack.Screen name="history" options={{ title: 'History' }} />
      <Stack.Screen name="progress" options={{ title: 'Progress' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
