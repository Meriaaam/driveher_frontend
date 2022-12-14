import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SigninScreen from "./screens/SigninScreen";
import { requireNativeComponent } from "react-native";
// import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signin" component={SigninScreen} />
        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
