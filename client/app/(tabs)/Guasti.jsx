import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import styles from "../styles";
import { router } from "expo-router";
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from "react-native-ui-datepicker";
import LogoutIcon from "../../assets/icons/logout.png";
import { authInstance } from "../../firebase";

function RobotMalfunctions() {
  const [robotsList, setRobotsList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [malfunctions, setMalfunctions] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const defaultStyles = getDefaultStyles();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  
  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const res = await axios.get("http://192.168.1.143:3000/robots");
        if (res.status === 200) {
          const formattedRobots = res.data.map((robot) => ({
            label: robot.name,
            value: robot.ID,
          }));
          setRobotsList(formattedRobots);
          setSelectedRobot(formattedRobots[0].value);
          handleSubmit(formattedRobots[0].value);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRobots();
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
          const allOption = { label: "Tutti", value: "Tutti" };
          const updatedTypesList = [allOption, ...formattedTypes];

          setTypesList(updatedTypesList);
          setSelectedType("Tutti");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (idRobot) => {
    try {
      const res = await axios.get("http://192.168.1.143:3000/malfunctions", {
        params: { ID: idRobot },
      });
      if (res.status === 200) {
        setMalfunctions(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    authInstance.signOut();
    router.push("/");
  };

  return (
    <ScrollView style={styles.AppRobot}>
      <View style={styles.headerRobot}>
        <Text style={{ fontSize: 34 }}>Lista Guasti</Text>
        <View style={styles.navigation}>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={LogoutIcon} style={styles.logout} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerRobot}>
        <View style={styles.infoRobotSheetColumn}>
          <Text style={styles.labelSelect}>Seleziona il robot:</Text>
          <Picker
            selectedValue={selectedRobot}
            onValueChange={(itemValue) => {
              setSelectedRobot(itemValue);
              handleSubmit(itemValue);
            }}
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

          <Text style={styles.labelSelect}>Seleziona la categoria:</Text>
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
          <DateTimePicker
            mode="range"
            startDate={startDate}
            endDate={endDate}
            onChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            styles={defaultStyles}
          />
        </View>

        <View style={styles.malfunctionList}>
          {malfunctions.length > 0 ? (
            malfunctions
              .filter((malfunction) => {
                const malfunctionDate = new Date(malfunction.data);

                if (startDate && endDate) {
                  return (
                    malfunctionDate >= new Date(startDate) &&
                    malfunctionDate <= new Date(endDate)
                  );
                }
                if (startDate && !endDate) {
                  return (malfunctionDate == new Date(startDate));
                }

                return true;
              })
              .filter((malfunction) =>
                selectedType !== "Tutti"
                  ? malfunction.idType === Number(selectedType)
                  : true
              )
              .map((malfunction, index) => (
                <View key={index} style={styles.malfunctionItem}>
                  <Text style={styles.malfunctionText}>
                    {malfunction.guasto} -{" "}
                    <Text style={styles.dateText}>
                      {new Date(malfunction.data).toLocaleDateString("it-IT")}
                    </Text>{" "}
                    - <Text style={styles.dateText}>{malfunction.type}</Text>
                  </Text>
                </View>
              ))
          ) : (
            <Text style={styles.noDataText}>Nessun guasto trovato</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default RobotMalfunctions;
