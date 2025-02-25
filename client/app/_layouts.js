import { SplashScreen, Stack } from "expo-router";
import User, { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { authInstance } from "../firebase";

const RootLayout = () => {
  const [user, setUser] = (useState < User) | (null > null);

  useEffect(() => {
    onAuthStateChanged(authInstance, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack>
        {user ? (
          <Stack.Screen name="index" options={{ headerShown: false }} initial />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
      </Stack>
    </Stack.Navigator>
  );
};

export default RootLayout;
