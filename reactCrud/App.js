import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ShoppingItem from "./components/ShoppingItem";
import UpdateData from "./components/UpdateData";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShoppingItem">
        <Stack.Screen name="ShoppingItem" component={ShoppingItem} />
        <Stack.Screen name="UpdateData" component={UpdateData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}