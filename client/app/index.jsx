import logo from "../assets/logo_copernico.png";
import { useFormik } from "formik";
import { Image, Text, TextInput, View, ActivityIndicator } from "react-native";
import styles from "./styles";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing tokens when the app starts
  useEffect(() => {
    const checkUserSession = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (token) {
        try {
          // Try authenticating with the access token
          const res = await axios.post(
            `http://192.168.1.143:3000/auth`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.status === 200) {
            setIsLogged(true);
            router.replace("/RobotSheet"); // Navigate to main screen
          }
        } catch (error) {
          // If access token is expired, try refreshing it
          if (refreshToken) {
            try {
              const refreshRes = await axios.post(
                `http://192.168.1.143:3000/refreshToken`,
                {},
                {
                  headers: { Authorization: `Bearer ${refreshToken}` },
                }
              );

              if (refreshRes.data.accessToken) {
                await AsyncStorage.setItem(
                  "accessToken",
                  refreshRes.data.accessToken
                );
                setIsLogged(true);
                router.replace("/RobotSheet");
              }
            } catch (refreshErr) {
              console.log("Refresh token expired, logging out...");
              await AsyncStorage.removeItem("accessToken");
              await AsyncStorage.removeItem("refreshToken");
            }
          }
        }
      }

      setLoading(false);
    };

    checkUserSession();
  }, []);

  //  Login Function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`http://192.168.1.143:3000/login`, { email, password });

      if (res.status === 200) {
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
        setIsLogged(true);
        router.replace("/Scheda"); // Navigate after login
      }
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Email non valida").required("Email richiesta"),
      password: Yup.string()
        .min(4, "Minimo 4 caratteri")
        .required("Password richiesta"),
    }),
    onSubmit: (values) => login(values.email, values.password),
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.loginPage}>
      <View style={styles.loginWidget}>
        <Image source={logo} resizeMode="contain" style={styles.image} />
        <TextInput
          placeholder="Email"
          style={styles.loginInput}
          onChangeText={handleChange("email")}
          value={values.email}
        />
        <TextInput
          placeholder="Password"
          style={styles.loginInput}
          onChangeText={handleChange("password")}
          value={values.password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
