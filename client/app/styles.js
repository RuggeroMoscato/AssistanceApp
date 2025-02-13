import { StyleSheet } from "react-native";

const style = StyleSheet.create({
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
  navigation: {
    flexDirection: "row",
    gap: 10,
  },
  logout: {
    color: "#d32f2f",
    fontSize: 28,
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
  infoInput: {
    width: "100%",
    minHeight: 150,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlignVertical: "top",
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
  label: {
    width: "50%",
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontSize: 12,
  },
  // submitButton: {
  //   fontSize: 18,
  //   backgroundColor: "rgb(52, 209, 191)",
  //   borderRadius: 8,
  //   color: "white",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "46%",
  //   padding: 18,
  //   height: 20,
  //   borderWidth: 0,
  // },
  loginInput: {
    width: "40%",
    borderRadius: 6,
    backgroundColor: "rgb(241, 245, 248)",
    borderWidth: 1,
    borderColor: "transparent",
    height: 30,
    paddingHorizontal: 5,
  },
  loginButton: {
    fontSize: 18,
    color: "white",
    backgroundColor: "#34d1bf",
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    padding: 15,
    height: 30,
    borderRadius: 8,
  },
  image: {
    maxWidth: 300,
  },
  loginWidget: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    width: "90%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    position: "absolute",
  },
  loginPage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
    width: "100%",
  },
  loginForm: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  registerResidency: {
    width: "20%",
    flexDirection: "row",
    gap: 10,
    padding: 2,
  },
  infoRobotSheet: {
    width: "50%",
    fontSize: 12,
    height: "4.5%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 2,
    padding: 0,
    flexDirection: "row",
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
  logoutRobot: {
    color: "#d32f2f",
    fontSize: 28,
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
  labelRobot: {
    fontWeight: "600",
    color: "#2d3748",
    fontSize: 16,
    width: "40%",
  },
  noDataText: {
    paddingTop: "20px",
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
});

export default style;
