import style from "./styles";
import axios from "axios";
import * as Yup from "yup";
import useNotistack from "../hooks/useNotistack";
import LogoutIcon from "@mui/icons-material/Logout";
import { useFormik } from "formik";
import { ScrollView, Text, View } from "react-native";
import { Button, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Redirect, router } from "expo-router";

function Info() {

  const { notify: notifySuccess } = useNotistack(
    "Info inserite con successo",
    "success"
  );
  const { notify: notifyError } = useNotistack(
    "Errore, info non inserite",
    "error"
  );
  const { notify: notifyErrorSame } = useNotistack(
    "Errore, i valori non possono essere uguali",
    "error"
  );

  const infoPost = async (values) => {
    if (values.mac !== values.servant) {
      try {
        const res = await axios.post("http://localhost:3000/infopost", values, {
          withCredentials: true,
        });
        if (res.status === 200) {
          notifySuccess();
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 400) {
          notifyError();
        }
      }
    } else {
      notifyErrorSame();
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      malfunction: "",
    },
    validationSchema: Yup.object({
      malfunction: Yup.string().required("Descrizione del guasto richiesta"),
    }),
    onSubmit: (values) => {
      infoPost(values);
    },
  });

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true }
    );
    router.push("Login")
  };

  // if (isLogged === false) return <Redirect href="/Login" />;

  return (
    <ScrollView style={style.App}>
      <View style={style.header}>
        <Button
          onClick={() => {
            router.push("/RobotSheet");
          }}
        >
          <ArrowBackIosIcon />
        </Button>
        <Text style={{ fontSize: "34px" }}>Inserimento Guasti</Text>
        <View style={style.navigation}>
          <Button onClick={handleLogout}>
            <LogoutIcon style={style.logout} />
          </Button>
        </View>
      </View>
      <View style={style.container}>
        <Text>Guasto: </Text>
        <TextField
          multiline
          id="malfunction"
          name="malfunction"
          type="text"
          style={style.infoInput}
          onChange={handleChange}
          value={values.malfunction}
        />
        <Button style={style.submitButton} onClick={handleSubmit}>
          SUBMIT
        </Button>
      </View>
    </ScrollView>
  );
}

export default Info;
