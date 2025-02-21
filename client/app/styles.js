import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 34 },
  navigation: {
    flexDirection: "row",
    gap: 10,
  },
  logout: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  containerTwo: {
    padding: 20,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoInput: {
    width: "100%",
    minHeight: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "rgb(52, 209, 191)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: "flex-end",
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "	rgb(238, 75, 43)",
    paddingHorizontal: 25,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modifyButton: {
    backgroundColor: "rgb(34, 139, 34)",
    paddingHorizontal: 25,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
    marginBottom: 15,
  },
  label: {
    width: "50%",
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontSize: 12,
  },
  loginPage: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
  },
  loginWidget: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 14,
    width: "90%",
    maxWidth: 400,
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: 280,
    height: 120,
    marginBottom: 15,
  },
  loginInput: {
    width: "100%",
    height: 45,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    marginBottom: 10,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#34d1bf",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerResidency: {
    width: "20%",
    flexDirection: "row",
    gap: 10,
    padding: 2,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 10,
    width: "40%",
    height: "80%",
  },

  AppRobot: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  headerRobot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationRobot: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  logout: {
    width: 20,
    height: 20,
  },
  containerRobot: {
    flex: 1,
    padding: 25,
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRobotSheet: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoRobotSheetColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  labelRobot: {
    fontWeight: "600",
    color: "#2d3748",
    fontSize: 16,
    width: "40%",
  },

  picker: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  malfunctionList: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },

  malfunctionItem: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#ff4c4c", // Red indicator for malfunction
  },

  malfunctionText: {
    fontSize: 16,
    color: "#2d3748",
    fontWeight: "500",
  },

  dateText: {
    fontSize: 14,
    color: "#718096",
    fontStyle: "italic",
  },

  noDataText: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginTop: 10,
  },
});

export default styles;
