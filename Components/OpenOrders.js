import { View, Text, Image, TouchableOpacity, Button } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import StockComponent from "./StockComponent";

const OpenOrders = () => {
  const stocks = useSelector((state) => state.stocks.addedStocks);

  console.log(stocks);
  return (
    <View style={{ height: "100%" }}>
      {stocks.map((item, idx) => (
        <StockComponent key={idx} {...item} />
      ))}
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
          bottom: 30,
        }}
      >
        <TouchableOpacity
          style={{ width: "40%", padding: 10, backgroundColor: "#A67C00" }}
        >
          <Text style={{ fontSize: 15, textAlign: "center" }}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OpenOrders;
