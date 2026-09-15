import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans/400Regular';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans/500Medium';
import { DMSans_600SemiBold } from '@expo-google-fonts/dm-sans/600SemiBold';
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans/700Bold';
import { Newsreader_500Medium } from '@expo-google-fonts/newsreader/500Medium';
import { Newsreader_600SemiBold } from '@expo-google-fonts/newsreader/600SemiBold';
import { colors, fonts } from '../src/theme';
import { getDb } from '../src/storage/db';
import { ensureTonesReady } from '../src/audio/tones';

void SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    Newsreader_500Medium,
    Newsreader_600SemiBold,
  });

  useEffect(() => {
    // Run migrations and warm up the tone players once at app start.
    getDb();
    void ensureTonesReady();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.ink,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: { color: colors.ink, fontFamily: fonts.sansSemibold },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="setup" options={{ title: 'Set up practice' }} />
      <Stack.Screen
        name="session"
        options={{ headerShown: false, gestureEnabled: false }}
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
