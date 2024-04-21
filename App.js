import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { MainScreen } from "./Components/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StockDetails from "./Components/StockDetails";
import OpenOrders from "./Components/OpenOrders";
import { Provider } from "react-redux";
import store from "./Redux/Store";
const Stack = createStackNavigator();

import counterAReducer, {
  increment as incrementA,
  addFive,
} from "./Redux/Store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#E8E9EB" }}
        >
          {/* <MainScreen /> */}
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Main Screen" component={MainScreen} />
              <Stack.Screen name="Details" component={StockDetails} />
              <Stack.Screen name="Open Orders" component={OpenOrders} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
