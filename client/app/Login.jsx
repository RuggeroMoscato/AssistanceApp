import logo from "../assets/logo_copernico.png";
import useNotistack from "../hooks/useNotistack";
import { useFormik } from "formik";
import { Button, Image, Text, TextInput, View } from "react-native";
import style from "./styles";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { authInstance } from "../firebase";

const Login = () => {
  const [isLogged, setIsLogged] = useState(false);

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
      handleLogin(values.email, values.password); 
    },
  });

  const handleLogin = async (email, password) => { 
    try {
      const userCredential = await authInstance.signInWithEmailAndPassword(
        email,
        password 
      );

      if (userCredential.user) {
        setIsLogged(true);
        router.replace("/RobotSheet");
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
      alert(errorMessage);
    }
  };

  if (isLogged) return <Redirect href="/RobotSheet" />;

  return (
    <View style={style.loginPage}>
      <View style={style.loginWidget}>
        <Image source={logo} resizeMode="contain" style={style.image} />
        <TextInput
          placeholder="Email"
          style={style.loginInput}
          onChangeText={handleChange('email')} 
          value={values.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {touched.email && errors.email && <Text style={style.errorText}>{errors.email}</Text>}
        
        <TextInput
          placeholder="Password"
          style={style.loginInput}
          onChangeText={handleChange('password')}
          value={values.password}
          secureTextEntry={true} 
          autoCapitalize="none"
        />
        {touched.password && errors.password && <Text style={style.errorText}>{errors.password}</Text>}

        <TouchableOpacity style={style.loginButton} onPress={handleSubmit}>
          <Text style={style.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;