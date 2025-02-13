import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "@mui/material";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import style from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { router } from "expo-router";

function RobotMalfunctions() {
  const [robotsList, setRobotsList] = useState([]);
  const [malfunctions, setMalfunctions] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState("");

  // Fetch list of robots
  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const res = await axios.get("http://localhost:3000/robots", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setRobotsList(
            res.data.map((robot) => ({
              label: robot.name,
              value: robot.ID,
            }))
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRobots();
  }, []);

  // Fetch malfunctions when a robot is selected
  const handleSubmit = async () => {
    try {
      const res = await axios.get("http://localhost:3000/malfunctions", {
        params: { ID: selectedRobot },
        withCredentials: true,
      });
      if (res.status === 200) {
        setMalfunctions(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true }
    );
    router.push("/Login");
  };

  return (
    <ScrollView style={style.AppRobot}>
      <View style={style.headerRobot}>
        <Button
          onClick={() => {
            router.push("/RobotSheet");
          }}
        >
          <ArrowBackIosIcon />
        </Button>
        <Text style={{ fontSize: 34 }}>Lista Guasti</Text>
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
            onValueChange={(itemValue) => {
              setSelectedRobot(itemValue);
              handleSubmit(itemValue);
            }}
            style={style.picker}
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
        

        <View style={style.malfunctionList}>
          {malfunctions.length > 0 ? (
            malfunctions.map((malfunction, index) => (
              <View key={index} style={style.malfunctionItem}>
                <Text style={style.malfunctionText}>
                  {malfunction.issue} -{" "}
                  <Text style={style.dateText}>{malfunction.date}</Text>
                </Text>
              </View>
            ))
          ) : (
            <Text style={style.noDataText}>Nessun guasto trovato</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default RobotMalfunctions;
