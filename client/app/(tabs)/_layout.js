import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import RobotSheetIcon from "../../assets/icons/RobotSheetIcon.png";
import GuastiIcon from "../../assets/icons/GuastiIcon.png";
import CategorieIcon from "../../assets/icons/CategorieIcon.png";
import PostIcon from "../../assets/icons/PostIcon.png";

const TabIcon = ({ icon, name }) => {
  return (
    <View style={{alignItems: "center", justifyContent: "center", width: 80, marginTop:25 }}>
      <Image source={icon} resizeMode="contain" style={{ width: 26, height: 26 }} />
      <Text style={{ fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Text>
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
          height: 80, 
        },
      }}
    >
      <Tabs.Screen
        name="Scheda"
        options={{
          title: "Scheda",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={RobotSheetIcon} name="Scheda" />,
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
        name="Categorie"
        options={{
          title: "Categorie",
          headerShown: false,
          tabBarIcon: () => <TabIcon icon={CategorieIcon} name="Categorie" />,
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
