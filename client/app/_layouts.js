import { SplashScreen, Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack.Navigator>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} initial />
      </Stack>
    </Stack.Navigator>
  );
};

export default RootLayout;
