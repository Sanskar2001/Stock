import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StockComponent = ({ name, price, change }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginStart: "15%",
        borderBottomWidth: 0.5,
      }}
      onPress={() => {
        navigation.navigate("Details", {
          name: name,
          price: price,
          change: change,
        });
      }}
    >
      <Image
        source={require("../public/logo.png")}
        style={{ width: 50, height: 50 }}
      />
      <View style={{ marginStart: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {name.slice(0, 20)}
        </Text>
        <Text style={{ fontSize: 18 }}>
          Price: ${parseFloat(price).toFixed(2)}
        </Text>
        <Text style={{ fontSize: 18, color: change > 0 ? "green" : "red" }}>
          Change: {parseFloat(change).toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StockComponent;
