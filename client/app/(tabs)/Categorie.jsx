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
import AsyncStorage from "@react-native-async-storage/async-storage";

function Info() {
  const [selectedType, setSelectedType] = useState("");
  const [typesList, setTypesList] = useState([]);
  const [modify, setModify] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://192.168.1.143:3000/types");
        if (res.status === 200) {
          const formattedTypes = res.data.map((type) => ({
            label: type.type,
            value: type.ID,
          }));
          setTypesList(formattedTypes);
          setSelectedType(formattedTypes[0].value);
        }
      } catch (err) {
        alert("Non è stato possibile recuperare la lista delle categorie");
        console.log(err);
      }
    };
    getData();
  }, []);

  const infoPost = async (type) => {
    try {
      const res = await axios.post("http://192.168.1.143:3000/typePost", {
        type: type,
      });
      const resType = await axios.get("http://192.168.1.143:3000/types");
      if (resType.status === 200) {
        const formattedTypes = resType.data.map((type) => ({
          label: type.type,
          value: type.ID,
        }));
        setTypesList(formattedTypes);
      }
    } catch (err) {
      alert(
        "Errore nell'invio della categoria o nel recupero della nuova lista"
      );
      console.log(err);
    }
  };
  const modifyPost = async (typeChange, ID, resetForm) => {
    try {
      const res = await axios.post("http://192.168.1.143:3000/typeModify", {
        typeChange: typeChange,
        ID: ID,
      });
      const resType = await axios.get("http://192.168.1.143:3000/types");
      if (resType.status === 200) {
        const formattedTypes = resType.data.map((type) => ({
          label: type.type,
          value: type.ID,
        }));
        setTypesList(formattedTypes);
      }
      resetForm();
    } catch (err) {
      alert(
        "Errore nella modifica della categoria o nel recupero della nuova lista"
      );
      console.log(err);
    }
  };

  const deletePost = async (ID) => {
    try {
      const res = await axios.post("http://192.168.1.143:3000/typeDelete", {
        ID: ID,
      });
      const resType = await axios.get("http://192.168.1.143:3000/types");
      if (resType.status === 200) {
        const formattedTypes = resType.data.map((type) => ({
          label: type.type,
          value: type.ID,
        }));
        setTypesList(formattedTypes);
      }
    } catch (err) {
      alert(
        "Errore nella rimozione della categoria o nel recupero dell nuova lista"
      );
      console.log(err);
    }
  };

  const { handleChange, values, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        type: "",
        typeChange: "",
      },
      validationSchema: Yup.object({
        type: Yup.string().required("Nome della categoria richiesta"),
      }),
      onSubmit: () => {
        infoPost(values.type);
        resetForm();
      },
    });

  useEffect(() => {
    if (values.typeChange === "") {
      setModify(true);
    } else {
      setModify(false);
    }
  }, [values.typeChange]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Invia</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerTwo}>
        <View style={styles.infoRobotSheetColumn}>
          <Text style={styles.labelSelect}> Seleziona categoria:</Text>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => {
              setSelectedType(itemValue);
            }}
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
        <Text style={styles.labelSelect}>Inserisci il nuovo nome: </Text>
        <TextInput
          style={styles.infoInput}
          onChangeText={handleChange("typeChange")}
          value={values.typeChange}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deletePost(selectedType)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Elimina</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modifyButton,
              modify ? { backgroundColor: "grey" } : {},
            ]}
            disabled={modify}
            onPress={() =>
              modifyPost(values.typeChange, selectedType, resetForm)
            }
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Modifica</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Info;
