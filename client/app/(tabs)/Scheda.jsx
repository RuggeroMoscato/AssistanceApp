import { useEffect, useState } from "react";
import styles from "../styles";
import axios from "axios";
import LogoutIcon from "../../assets/icons/logout.png";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

function Scheda() {
  const [robotsList, setRobotsList] = useState([]);
  const [robotInfo, setRobotInfo] = useState();
  const [selectedRobot, setSelectedRobot] = useState([]);

  const fetchRobotInfo = async (value) => {
    try {
      const res = await axios.get("http://192.168.1.143:3000/robotsheet", {
        params: { ID: value },
      });
      if (res.status === 200) {
        setRobotInfo(res.data[0]);
      } else {
      }
    } catch (err) {
      alert("Errore nel recuperare le informazioni del robot");
      console.log(err);
    }
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    router.replace("/");
  };

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
        fetchRobotInfo(formattedRobots[0].value);
      }
    } catch (err) {
      alert("Non è stato possibile recuperare la lista dei robot");
      console.log(err);
    }
  };

  // NFC Scan Function
  const scanNFC = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage) {
        const payload = tag.ndefMessage[0].payload;
        const nfcID = String.fromCharCode.apply(null, payload).slice(3); // Extract ID

        // Find matching robot
        const matchedRobot = robotsList.find((robot) => robot.value === nfcID);
        if (matchedRobot) {
          setSelectedRobot(matchedRobot.value);
          fetchRobotInfo(matchedRobot.value);
          Alert.alert(
            "Robot Selected",
            `Robot ${matchedRobot.label} has been selected.`
          );
        } else {
          Alert.alert("Error", "No matching robot found for this NFC tag.");
        }
      }
    } catch (err) {
      console.warn("NFC Scan Error:", err);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };
  useEffect(() => {
    // Initialize NFC manager
    NfcManager.start();
    fetchRobots();
  }, []);

  return (
    <ScrollView style={styles.AppRobot}>
      <View style={styles.headerRobot}>
        <Text style={styles.title}>Scheda del Robot</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Image source={LogoutIcon} style={styles.logout} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerRobot}>
        <View style={styles.infoRobotSheetColumn}>
          <Text style={styles.labelSelect}>Seleziona il robot:</Text>
          <Picker
            selectedValue={selectedRobot}
            onValueChange={(itemValue) => {
              setSelectedRobot(itemValue);
              fetchRobotInfo(itemValue);
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
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={scanNFC}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Scan NFC</Text>
        </TouchableOpacity>

        {robotInfo && (
          <>
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
              <Text>{robotInfo ? robotInfo.nameWifi : null}</Text>
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
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default Scheda;
