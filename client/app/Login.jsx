import logo from "../assets/logo_copernico.png";
import useNotistack from "../hooks/useNotistack";
import axios from "axios";
import { useFormik } from "formik";
import { Button, Image, TextInput, View } from "react-native";
import style from "./styles";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native";
// import { Redirect, router } from "expo-router";
import { useState } from "react";
import { authInstance } from "../firebase";

const Login = () => {
  const { setIsLogged, isLogged } = useState();
  // const { notify: notifySuccess } = useNotistack(
  //   "Login eseguito con successo",
  //   "success"
  // );
  // const { notify: notifyError } = useNotistack(
  //   "Errore, Dati inseriti non corretti",
  //   "error"
  // );

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email non valida").required("Email Richiesta"),
      password: Yup.string()
        .min(4, "Deve contenere almeno 4 Caratteri")
        .max(30, "Deve contenere massimo 30 caratteri")
        .required("Password Richiesta"),
    }),
    onSubmit: (values) => {
      handleLogin(authInstance, values.email, values.password);
    },
  });

  const handleLogin = async () => {
    try {
      const userCredential = await authInstance.signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        // notify('Login riuscito!', 'success');
        setIsLogged(true);
      }
    } catch (error) {
      let errorMessage = "Errore durante il login";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Email non valida";
          break;
        case "auth/user-disabled":
          errorMessage = "Utente disabilitato";
          break;
        case "auth/user-not-found":
          errorMessage = "Utente non trovato";
          break;
        case "auth/wrong-password":
          errorMessage = "Password errata";
          break;
      }
      // notify(errorMessage, 'error');
    }
  };
  // if (isLogged === true) return <Redirect href="/RobotSheet" />;

  return (
    <View style={style.loginPage}>
      <View style={style.loginWidget}>
        <Image source={logo} resizeMode="contain" style={style.image} />
        <TextInput
          title="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          style={style.loginInput}
          onChange={handleChange}
          value={values.email}
        />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <TextInput
          title="Password"
          id="password"
          name="password"
          type="password"
          style={style.loginInput}
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <TouchableOpacity style={style.loginButton} onPress={handleSubmit}>
          Login
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
