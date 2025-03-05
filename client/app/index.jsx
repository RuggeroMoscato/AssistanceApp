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
  const [loading, setLoading] = useState(true);

  // Check for existing tokens when the app starts
  useEffect(() => {
    const checkUserSession = async () => {
      const token = await AsyncStorage.getItem("accessToken");
  
      if (token) {
        try {
          // Tenta l'autenticazione con l'access token
          const res = await axios.post(
            `http://192.168.1.143:3000/auth`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          if (res.status === 200) {
            router.replace("/Scheda"); // Naviga alla schermata principale
          }
        } catch (error) {
          console.log("Token scaduto, richiedi il login...");
          await AsyncStorage.removeItem("accessToken");
          router.replace("/"); // Rimanda alla schermata di login
        }
      }
  
      setLoading(false);
    };
  
    checkUserSession();
  }, []);

  //  Login Function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`http://192.168.1.143:3000/login`, {
        email,
        password,
      });
  
      if (res.status === 200) {
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        router.replace("/Scheda"); // Naviga alla schermata principale
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
