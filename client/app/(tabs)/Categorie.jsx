import styles from "../styles";
import axios from "axios";
import * as Yup from "yup";
import LogoutIcon from "../../assets/icons/logout.png";
import { useFormik } from "formik";
import { ScrollView, Text, View, Button, TextInput } from "react-native";
import { Redirect, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

function Info() {
  const [selectedType, setSelectedType] = useState("");
  const [typesList, setTypeList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/types");
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
  }, [selectedType]);

  const infoPost = async (type) => {
    try {
      const res = await axios.post("http://localhost:3000/typePost", {
        type: type,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const modifyPost = async (typeChange, ID) => {
    try {
      const res = await axios.post("http://localhost:3000/typeModify", {
        typeChange: typeChange,
        ID: ID,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deletePost = async (ID) => {
    try {
      const res = await axios.post("http://localhost:3000/typeDelete", {
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
    router.push("/");
  };

  return (
    <ScrollView style={styles.App}>
      <View style={styles.header}>
        <Text style={styles.title}>Inserimento Categorie</Text>
        <View style={styles.navigation}>
          <Button onClick={handleLogout}>
            <LogoutIcon style={styles.logout} />
          </Button>
        </View>
      </View>
      <View style={styles.containerTwo}>
        <Text>Nuova Categoria: </Text>
        <TextInput
          id="type"
          name="type"
          title="type"
          type="text"
          style={styles.infoInput}
          onChange={handleChange}
          value={values.type}
        />
        <Button style={styles.submitButton} onClick={handleSubmit}>
          SUBMIT
        </Button>
      </View>
      <View style={styles.containerTwo}>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}> Modifica categoria:</Text>
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
        <Text>Inserisci il nuovo nome: </Text>
        <TextInput
          id="typeChange"
          name="typeChange"
          title="typeChange"
          type="text"
          style={styles.infoInput}
          onChange={handleChange}
          value={values.typeChange}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.deleteButton}
            onClick={() => deletePost(selectedType)}
          >
            Elimina
          </Button>
          <Button
            style={styles.modifyButton}
            onClick={() => modifyPost(values.typeChange, selectedType)}
          >
            Modifica
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default Info;
