import style from "../styles";
import axios from "axios";
import * as Yup from "yup";
import LogoutIcon from "@mui/icons-material/Logout";
import { useFormik } from "formik";
import { ScrollView, Text, View } from "react-native";
import { Button, TextField } from "@mui/material";
import { Redirect, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

function Info() {
  const [selectedRobot, setSelectedRobot] = useState("");
  const [robotsList, setRobotsList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/robots",
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

    router.push("/");
  };

  // if (isLogged === false) return <Redirect href="/Login" />;

  return (
    <ScrollView style={style.App}>
      <View style={style.header}>
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
