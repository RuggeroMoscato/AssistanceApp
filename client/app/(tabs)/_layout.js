import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import RobotSheetIcon from "../../assets/icons/RobotSheetIcon.png";
import GuastiIcon from "../../assets/icons/GuastiIcon.png";
import PostIcon from "../../assets/icons/PostIcon.png";

const TabIcon = ({ icon, name }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
      <Text>{name}</Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#FFFFFF",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="RobotSheet"
        options={{
          title: "RobotSheet",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={RobotSheetIcon} name="RobotSheet" />,
        }}
      />

      <Tabs.Screen
        name="Guasti"
        options={{
          title: "Guasti",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={GuastiIcon} name="Guasti" />,
        }}
      />
      <Tabs.Screen
        name="Post"
        options={{
          title: "Post",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={PostIcon} name="Post" />,
        }}
      />
    </Tabs>
  );
}
