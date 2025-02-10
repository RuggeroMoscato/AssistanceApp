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
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

function Info() {
  const [selectedRobot, setSelectedRobot] = useState("");
  const [robotsList, setRobotsList] = useState([]);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/robots",
          {},
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setRobotsList(
            res.data.map((robot) => ({
              Text: robot.name,
              value: robot.ID,
            }))
          );
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const infoPost = async (values) => {
    if (values.mac !== values.servant) {
      try {
        const res = await axios.post(
          "http://localhost:3000/infopost",
          { params: { values: values, ID: selectedRobot } },
          {
            withCredentials: true,
          }
        );
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
    router.push("Login");
  };

  // if (isLogged === false) return <Redirect href="/Login" />;

  return (
    <ScrollView style={style.App}>
      <View style={style.header}>
        <Button
          onClick={() => {
            router.push("/Guasti");
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
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Seleziona il robot:</Text>
          <Picker
            selectedValue={selectedRobot}
            onValueChange={(itemValue) => setSelectedRobot(itemValue)}
            style={style.picker}
          >
            {robotsList.map((robot) => (
              <Picker.Item
                key={robot.value}
                label={robot.Text}
                value={robot.value}
              />
            ))}
          </Picker>
        </View>
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
