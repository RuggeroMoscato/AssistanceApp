import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RobotSheet from "./RobotSheet";
import Login from "./Login";
import Post from "./Post";
import Guasti from "./Guasti";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RobotSheet"
        component={RobotSheet}
        options={{ title: "Robot sheet" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen name="Post" component={Post} options={{ title: "Post" }} />
      <Stack.Screen
        name="Guasti"
        component={Guasti}
        options={{ title: "Guasti" }}
      />
    </Stack.Navigator>
  );
}
