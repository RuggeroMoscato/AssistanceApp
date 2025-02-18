import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "@mui/material";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import styles from "../styles";
import { router } from "expo-router";
import LogoutIcon from "@mui/icons-material/Logout";

function RobotMalfunctions() {
  const [robotsList, setRobotsList] = useState([]);
  const [malfunctions, setMalfunctions] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState("");

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const res = await axios.get("http://localhost:3000/robots");
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

  const handleSubmit = async () => {
    try {
      const res = await axios.get("http://localhost:3000/malfunctions", {
        params: { ID: selectedRobot },
      });
      if (res.status === 200) {
        setMalfunctions(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    router.push("/");
  };

  return (
    <ScrollView style={styles.AppRobot}>
      <View style={styles.headerRobot}>
        <Text style={{ fontSize: 34 }}>Lista Guasti</Text>
        <View style={styles.navigation}>
          <Button onClick={handleLogout}>
            <LogoutIcon style={styles.logout} />
          </Button>
        </View>
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
                label={robot.label}
                value={robot.value}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.malfunctionList}>
          {malfunctions.length > 0 ? (
            malfunctions.map((malfunction, index) => (
              <View key={index} style={styles.malfunctionItem}>
                <Text style={styles.malfunctionText}>
                  {malfunction.issue} -{" "}
                  <Text style={styles.dateText}>{malfunction.date}</Text>
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
