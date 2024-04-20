import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { useRoute } from "@react-navigation/native";

const StockDetails = () => {
  const route = useRoute();
  const { name, price, change } = route.params;
  console.log("Stock detail rendered " + name);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        marginStart: "5%",
      }}
    >
      <Image
        source={require("../public/logo.png")}
        style={{ width: 100, height: 100 }}
      />

      <View style={{ marginStart: 10, width: "90%" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
        <Text style={{ fontSize: 18 }}>
          Price: ${parseFloat(price).toFixed(2)}
        </Text>
        <Text style={{ fontSize: 18, color: change > 0 ? "green" : "red" }}>
          Change: {parseFloat(change).toFixed(2)}%
        </Text>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <View
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <Button color={"#A67C00"} title="Add to Order" />
        </View>
      </View>
    </View>
  );
};

export default StockDetails;
