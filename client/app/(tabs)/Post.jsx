import styles from "../styles";
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
        const res = await axios.get("http://localhost:3000/robots");
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

  const infoPost = async (values, robotId) => {
      try {
        const res = await axios.post("http://localhost:3000/infopost", {
          params: { values: values, robotId: robotId },
        });
      } catch (err) {
        console.log(err);
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
      infoPost(values, selectedRobot);
    },
  });

  const handleLogout = async () => {
    router.push("/");
  };


  return (
    <ScrollView style={styles.App}>
      <View style={styles.header}>
        <Text style={styles.title}>Inserimento Guasti</Text>
        <View style={styles.navigation}>
          <Button onClick={handleLogout}>
            <LogoutIcon style={styles.logout} />
          </Button>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Seleziona il robot:</Text>
          <Picker
            selectedValue={selectedRobot}
            onValueChange={(itemValue) => setSelectedRobot(itemValue)}
            style={styles.picker}
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
          title="malfunction"
          type="text"
          style={styles.infoInput}
          onChange={handleChange}
          value={values.malfunction}
        />
        <Button style={styles.submitButton} onClick={handleSubmit}>
          SUBMIT
        </Button>
      </View>
    </ScrollView>
  );
}

export default Info;
