import styles from "../styles";
import axios from "axios";
import * as Yup from "yup";
import LogoutIcon from "../../assets/icons/logout.png";
import { useFormik } from "formik";
import {
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Redirect, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

function Info() {
  const [selectedRobot, setSelectedRobot] = useState("");
  const [robotsList, setRobotsList] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [typesList, setTypeList] = useState([]);

  const getUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return null;

      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    } catch (err) {
      console.log("Error decoding token:", err);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://192.168.1.143:3000/robots");
        if (res.status === 200) {
          const formattedRobots = res.data.map((robot) => ({
            label: robot.name,
            value: robot.ID,
          }));
          setRobotsList(formattedRobots);
          setSelectedRobot(formattedRobots[0].value);
        }
      } catch (err) {
        alert("Non è stato possibile recuperare la lista dei robot");
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
          const formattedTypes = res.data.map((type) => ({
            label: type.type,
            value: type.ID,
          }));
          setTypeList(formattedTypes);
          setSelectedType(formattedTypes[0].value);
        }
      } catch (err) {
        alert("Non è stato possibile recuperare la lista delle categorie");
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
          const formattedTypes = res.data.map((type) => ({
            label: type.type,
            value: type.ID,
          }));
          setTypeList(formattedTypes);
        }
      } catch (err) {
        alert("Errore nel recuperare la lista delle categorie");
        console.log(err);
      }
    };
    getData();
  }, [selectedType]);

  const infoPost = async (values, robotId, typeId) => {
    try {
      const userId = await getUserId();
      if (!userId) {
        alert("Errore: impossibile ottenere l'ID utente");
        return;
      }
      const res = await axios.post("http://192.168.1.143:3000/infopost", {
        values: values,
        robotId: robotId,
        typeId: typeId,
        userId: userId,
      });
    } catch (err) {
      alert("Errore nell'invio del guasto");
      console.log(err);
    }
  };

  const { handleChange, values, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        malfunction: "",
      },
      validationSchema: Yup.object({
        malfunction: Yup.string().required("Descrizione del guasto richiesta"),
      }),
      onSubmit: (values) => {
        infoPost(values, selectedRobot, selectedType);
        resetForm();
      },
    });

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    router.replace("/");
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
        <View style={styles.infoRobotSheetColumn}>
          <Text style={styles.labelSelect}>Seleziona il robot:</Text>
          <Picker
            selectedValue={selectedRobot}
            onValueChange={(itemValue) => setSelectedRobot(itemValue)}
            style={styles.picker}
          >
            {robotsList.map((robot) => (
              <Picker.Item
                key={robot.value}
                label={robot.label}
                value={robot.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.infoRobotSheetColumn}>
          <Text style={styles.labelSelect}>Seleziona la categoria:</Text>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
            style={styles.picker}
          >
            {typesList.map((type) => (
              <Picker.Item
                key={type.value}
                label={type.label}
                value={type.value}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.labelSelect}>Inserisci il Guasto: </Text>
        <TextInput
          style={styles.multilineTextInput}
          onChangeText={handleChange("malfunction")}
          value={values.malfunction}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Invia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Info;
