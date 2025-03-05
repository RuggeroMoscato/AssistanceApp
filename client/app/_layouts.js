import { SplashScreen, Stack } from "expo-router";


const RootLayout = () => {
  return (
    <Stack.Navigator>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} initial />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Stack.Navigator>
  );
};

export default RootLayout;
