import logo from "../assets/logo_copernico.png";
import { useFormik } from "formik";
import { Button, Image, Text, TextInput, View } from "react-native";
import styles from "./styles";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { authInstance } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password 
      );

      if (userCredential.user) {
        setIsLogged(true);
        router.replace("/Scheda");
      }
    } catch (error) {
      let errorMessage = "Errore durante il login";
      console.log(error)
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
    <View style={styles.loginPage}>
      <View style={styles.loginWidget}>
        <Image source={logo} resizeMode="contain" style={styles.image} />
        <TextInput
          placeholder="Email"
          style={styles.loginInput}
          onChangeText={handleChange('email')} 
          value={values.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        
        <TextInput
          placeholder="Password"
          style={styles.loginInput}
          onChangeText={handleChange('password')}
          value={values.password}
          secureTextEntry={true} 
          autoCapitalize="none"
        />
        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={{color:"white", fontWeight:"bold"}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;