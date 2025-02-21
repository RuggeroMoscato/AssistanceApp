import { useEffect, useState } from "react";
import styles from "../styles";
import axios from "axios";
import LogoutIcon from "../../assets/icons/logout.png";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

function RobotSheet() {
  const [robotsList, setRobotsList] = useState([]);
  const [robotInfo, setRobotInfo] = useState();
  const [selectedRobot, setSelectedRobot] = useState([]);
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
  const handleSubmit = async (value) => {
    try {
      const res = await axios.get(
        "http://localhost:3000/robotsheet",
        {
          params: { ID: value },
        },
      );
      if (res.status === 200) {
        setRobotInfo(res.data[0]);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = async () => {
    router.push("/");
  };



  return (
    <ScrollView style={styles.AppRobot}>
      <View style={styles.headerRobot}>
        <Text style={styles.title}>Scheda del Robot</Text>
        <TouchableOpacity onPress={handleLogout}>
            <Image source={LogoutIcon} style={styles.logout} />
          </TouchableOpacity>
      </View>
      <View style={styles.containerRobot}>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Seleziona il robot:</Text>
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
                label={robot.Text}
                value={robot.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>S/N Robot:</Text>
          <Text>{robotInfo ? robotInfo.serialNumber : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Mac Address Robot:</Text>
          <Text>{robotInfo ? robotInfo.mac : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Unità Operativa:</Text>
          <Text>{robotInfo ? robotInfo.idUo : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Username Hotspot:</Text>
          <Text>{robotInfo ? robotInfo.usernameHotspot : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Nome Rete WiFi:</Text>
          <p>{robotInfo ? robotInfo.nameWifi : null}</p>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Password WiFi:</Text>
          <Text>{robotInfo ? robotInfo.passwordWifi : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>ID Utente AnyDesk:</Text>
          <Text>{robotInfo ? robotInfo.idAnyDesk : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Password AnyDesk:</Text>
          <Text>{robotInfo ? robotInfo.passwordAnyDesk : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Versione Software:</Text>
          <Text>{robotInfo ? robotInfo.software : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Versione Firmware:</Text>
          <Text>{robotInfo ? robotInfo.firmware : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Capacità serbatoio:</Text>
          <Text>{robotInfo ? robotInfo.tank : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>Acqua al secondo:</Text>
          <Text>{robotInfo ? robotInfo.waterPerSecond : null}</Text>
        </View>
        <View style={styles.infoRobotSheet}>
          <Text style={styles.labelRobot}>MAC address servitore:</Text>
          <Text>{robotInfo ? robotInfo.servant : null}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default RobotSheet;
