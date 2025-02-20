import { useEffect, useState } from "react";
import { ScrollView, Text, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import styles from "../styles";
import { router } from "expo-router";
import LogoutIcon from "../../assets/icons/logout.png";
import DatePicker from "react-native-date-picker";

function RobotMalfunctions() {
  const [robotsList, setRobotsList] = useState([]);
  const [malfunctions, setMalfunctions] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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

  const handleSubmit = async (idRobot) => {
    try {
      const res = await axios.get("http://localhost:3000/malfunctions", {
        params: { ID: idRobot },
      });
      if (res.status === 200) {
        setMalfunctions(res.data);
      }
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    router.push("/");
  };

  useEffect(() => {
    console.log(malfunctions);
    console.log(selectedRobot);
  }, [selectedRobot]);

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
          <Button title="Open" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <View style={styles.malfunctionList}>
          {malfunctions ? (
            malfunctions.map((malfunction, index) => (
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
