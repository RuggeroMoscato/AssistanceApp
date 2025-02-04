import logo from "../assets/logo_copernico.png";
import useNotistack from "../hooks/useNotistack";
import axios from "axios";
import { useFormik } from "formik";
import { Button, Image, TextInput, View } from "react-native";
import style from "./styles";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalContext";

const Login = () => {
  const { setIsLogged, isLogged } = useGlobalContext();
  const { notify: notifySuccess } = useNotistack(
    "Login eseguito con successo",
    "success"
  );
  const { notify: notifyError } = useNotistack(
    "Errore, Dati inseriti non corretti",
    "error"
  );

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        notifySuccess();
        setIsLogged(true);
      }
    } catch (error) {
      notifyError();
    }
  };

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
      login(values.email, values.password);
    },
  });

  if (isLogged === true) return <Redirect href="/RobotSheet" />;

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
