import { useEffect, useState } from "react";
import style from "./styles";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import { ScrollView, Text, View } from "react-native";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Redirect, router } from "expo-router";
import { Button } from "@mui/material";
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
          {},
          {
            withCredentials: true,
          }
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
  const handleSubmit = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/robotsheet",
        {
          params: { ID: selectedRobot },
        },
        {
          withCredentials: true,
        }
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
    await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true }
    );
    router.push("/Login");
  };
  const handleChange = (e) => {
    const selectedRobotId = e.value;
    setSelectedRobot(selectedRobotId);
  };

  // if (isLogged === false) return <Redirect href="/Login" />;

  return (
    <ScrollView style={style.AppRobot}>
      <View style={style.headerRobot}>
        <Button onClick={handleLogout}>
          <LogoutIcon style={style.logoutRobot} />
        </Button>
        <Text style={{ fontSize: "34px" }}>Scheda del Robot</Text>
        <View style={style.navigation}>
          <Button
            onClick={() => {
              router.push("/Post");
            }}
          >
            <ArrowForwardIosIcon />
          </Button>
        </View>
      </View>
      <View style={style.containerRobot}>
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
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>S/N Robot: </Text>
          <Text>{robotInfo ? robotInfo.serialNumber : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Mac Address Robot: </Text>
          <Text>{robotInfo ? robotInfo.mac : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Unità Operativa: </Text>
          <Text>{robotInfo ? robotInfo.idUo : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Username Hotspot: </Text>
          <Text>{robotInfo ? robotInfo.usernameHotspot : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Nome Rete WiFi: </Text>
          <p>{robotInfo ? robotInfo.nameWifi : null}</p>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Password WiFi: </Text>
          <Text>{robotInfo ? robotInfo.passwordWifi : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>ID Utente AnyDesk: </Text>
          <Text>{robotInfo ? robotInfo.idAnyDesk : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Password AnyDesk: </Text>
          <Text>{robotInfo ? robotInfo.passwordAnyDesk : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Versione Software: </Text>
          <Text>{robotInfo ? robotInfo.software : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Versione Firmware: </Text>
          <Text>{robotInfo ? robotInfo.firmware : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Capacità serbatoio: </Text>
          <Text>{robotInfo ? robotInfo.tank : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>Acqua al secondo: </Text>
          <Text>{robotInfo ? robotInfo.waterPerSecond : null}</Text>
        </View>
        <View style={style.infoRobotSheet}>
          <Text style={style.labelRobot}>MAC address servitore: </Text>
          <Text>{robotInfo ? robotInfo.servant : null}</Text>
        </View>
        <Button style={style.submitButton} onClick={handleSubmit}>
          Cerca
        </Button>
      </View>
    </ScrollView>
  );
}

export default RobotSheet;
