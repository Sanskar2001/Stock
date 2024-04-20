import { React, useState, useRef, useEffect } from "react";
import StockComponent from "./StockComponent";
import ShimmerUi from "./ShimmerUi";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  TextInput,
} from "react-native";

const stockData = {
  name: "AMD",
  price: "118.37",
  change: "3.0",
};

const stockDatas = [
  {
    name: "AMD",
    price: "118.37",
    change: "3.0",
  },
  {
    name: "AMD",
    price: "118.37",
    change: "3.0",
  },
  {
    name: "AMD",
    price: "118.37",
    change: "3.0",
  },
  {
    name: "Reliance",
    price: "118.37",
    change: "3.0",
  },
  {
    name: "Akon",
    price: "118.37",
    change: "3.0",
  },
];

export const MainScreen = () => {
  const { height: screenHeight } = Dimensions.get("window");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const [filteredStockData, setFileteredStockData] = useState([]);

  const fetchStocks = async () => {
    const url =
      "https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=GAINERS&country=us&language=en";
    const options = {
      method: "GET",

      headers: {
        "X-RapidAPI-Key": "203bffc415msh675dc3c23803e71p1ab941jsnaf4bfaa9a512",
        "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data.trends);
      const arr = result.data.trends.slice(0, 5);
      setFileteredStockData(arr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleTextChange = (text) => {
    console.log(text);

    if (text != "") {
      const newArr = filteredStockData.filter((value) =>
        value.name.toLowerCase().includes(text.toLowerCase())
      );
      setFileteredStockData(newArr);
    } else {
      setFileteredStockData(stockDatas);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (!isFullScreen && gesture.dy < -100) {
        // Threshold for considering swipe as full screen
        setIsFullScreen(true);
        console.log("swiped up");
        Animated.spring(pan, {
          toValue: { x: 0, y: -gesture.dy },
          useNativeDriver: false,
        }).start();
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (!isFullScreen && gesture.dy < -100) {
        // Threshold for considering swipe as closing full screen
        console.log("swiped up");
        Animated.spring(pan, {
          toValue: { x: 0, y: -screenHeight },
          useNativeDriver: false,
        }).start();
      } else if (isFullScreen && gesture.dy > 100) {
        // Threshold for considering swipe as closing full screen
        setIsFullScreen(false);
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });
  return (
    <Animated.View
      style={{
        bottom: 0,
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: isFullScreen ? screenHeight : "auto",
      }}
      {...panResponder.panHandlers}
    >
      {isFullScreen ? (
        <TextInput
          placeholder=" 🔍 Search for stocks"
          style={{
            fontSize: 15,
            backgroundColor: "#E8E9EB",
            width: "80%",
            height: 40,
            position: "absolute",
            top: 10,
          }}
          onChangeText={handleTextChange}
        />
      ) : null}

      {isFullScreen ? null : (
        <View
          style={{
            backgroundColor: "grey",
            borderRadius: 10,
            width: "20%",
            height: 8,
            marginTop: 10,
            marginBottom: "20%",
          }}
        />
      )}

      {filteredStockData.length > 0
        ? filteredStockData.map((item, idx) => (
            <StockComponent key={idx} {...item} />
          ))
        : Array(5)
            .fill(0)
            .map((_, idx) => <ShimmerUi key={idx} />)}
    </Animated.View>
  );
};
