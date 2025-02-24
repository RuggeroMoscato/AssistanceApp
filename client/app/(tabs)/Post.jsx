import styles from "../styles";
import axios from "axios";
import * as Yup from "yup";
import LogoutIcon from "../../assets/icons/logout.png";
import { useFormik } from "formik";
import { ScrollView, Text, View, Button, TextInput, TouchableOpacity, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

function Info() {
  const [selectedRobot, setSelectedRobot] = useState("");
  const [robotsList, setRobotsList] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [typesList, setTypeList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://192.168.1.143:3000/robots");
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
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://192.168.1.143:3000/types");
        if (res.status === 200) {
          setTypeList(
            res.data.map((type) => ({
              Text: type.type,
              value: type.ID,
            }))
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const infoPost = async (values, robotId, typeId) => {
    try {
      const res = await axios.post("http://192.168.1.143:3000/infopost", {
        values: values,
        robotId: robotId,
        typeId: typeId,
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
      infoPost(values, selectedRobot, selectedType);
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
        <TouchableOpacity onPress={handleLogout}>
            <Image source={LogoutIcon} style={styles.logout} />
          </TouchableOpacity>
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
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Seleziona la categoria:</Text>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
            style={styles.picker}
          >
            {typesList.map((type) => (
              <Picker.Item
                key={type.value}
                label={type.Text}
                value={type.value}
              />
            ))}
          </Picker>
        </View>
        <Text>Inserisci il Guasto: </Text>
        <TextInput
          multiline
          id="malfunction"
          name="malfunction"
          title="malfunction"
          type="text"
          style={styles.infoInput}
          onChange={handleChange}
          value={values.malfunction}
        />
        <TouchableOpacity style={styles.submitButton} onClick={handleSubmit}>
        <Text style={{color:"white", fontWeight:"bold"}}>Invia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Info;
