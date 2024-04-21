import { View, Text, Image, TouchableOpacity, Button } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import StockComponent from "./StockComponent";
import SwipeButton from "rn-swipe-button";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";

import { deleteStock } from "../Redux/StockReducer";

const NoOrdersComponent = () => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../public/package.png")}
        style={{ width: 250, height: 250 }}
      ></Image>
      <Text style={{ fontSize: 20 }}>You Don't have any open orders!</Text>
    </View>
  );
};

const OpenOrders = () => {
  const stocks = useSelector((state) => state.stocks.addedStocks);
  const dispatch = useDispatch();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  async function schedulePushNotification(stockName) {
    console.log("called");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🔔Order Executed for ${stockName}`,
        body: `You have bought ${stockName}`,
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
  }

  const pushNotification = (stockName) => {
    schedulePushNotification(stockName);
  };

  console.log(stocks);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      {stocks.length == 0 ? (
        <NoOrdersComponent />
      ) : (
        stocks.map((item, idx) => (
          <View
            key={idx}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StockComponent key={idx} {...item} />
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                dispatch(deleteStock(item.id));
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../public/trash.png")}
              />
            </TouchableOpacity>
          </View>
        ))
      )}
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
        <View style={{ width: "80%", padding: 10 }}>
          <SwipeButton
            title="Swipe To Buy"
            railBackgroundColor="#A67C00"
            railFillBackgroundColor="white"
            thumbIconBackgroundColor="white"
            shouldResetAfterSuccess={true}
            onSwipeSuccess={() => {
              console.log("swiped");

              stocks.forEach((stock) => {
                console.log(stock.name);
                dispatch(deleteStock(stock.id));
                pushNotification(stock.name);
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OpenOrders;
