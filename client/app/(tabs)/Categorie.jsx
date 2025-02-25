import styles from "../styles";
import axios from "axios";
import * as Yup from "yup";
import LogoutIcon from "../../assets/icons/logout.png";
import { useFormik } from "formik";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { authInstance } from "../../firebase";

function Info() {
  const [selectedType, setSelectedType] = useState("");
  const [typeList, setTypeList] = useState([]);

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
        console.log(err);
      }
    };
    getData();
  }, [selectedType]);

  const infoPost = async (type) => {
    try {
      const res = await axios.post("http://192.168.1.143:3000/typePost", {
        type: type,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const modifyPost = async (typeChange, ID) => {
    try {
      const res = await axios.post("http://192.168.1.143:3000/typeModify", {
        typeChange: typeChange,
        ID: ID,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deletePost = async (ID) => {
    try {
      const res = await axios.post("http://192.168.1.143:3000/typeDelete", {
        ID: ID,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      type: "",
      typeChange: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Nome della categoria richiesta"),
    }),
    onSubmit: (values) => {
      infoPost(values.type, selectedType);
    },
  });

  const handleLogout = async () => {
    authInstance.signOut();
    router.push("/");
  };

  return (
    <ScrollView style={styles.App}>
      <View style={styles.header}>
        <Text style={styles.title}>Inserimento Categorie</Text>
        <View style={styles.navigation}>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={LogoutIcon} style={styles.logout} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerTwo}>
        <Text style={styles.labelSelect}>Nuova Categoria: </Text>
        <TextInput
          style={styles.infoInput}
          onChangeText={handleChange("type")}
          value={values.type}
        />
        <TouchableOpacity style={styles.submitButton} onClick={handleSubmit}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Invia</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerTwo}>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}> Modifica categoria:</Text>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
            style={styles.picker}
          >
            {typeList.map((type) => (
              <Picker.Item
                key={type.value}
                label={type.label}
                value={type.value}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.labelSelect}>Inserisci il nuovo nome: </Text>
        <TextInput
          style={styles.infoInput}
          onChangeText={handleChange("typeChange")}
          value={values.typeChange}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onClick={() => deletePost(selectedType)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Elimina</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modifyButton}
            onClick={() => modifyPost(values.typeChange, selectedType)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Modifica</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Info;
