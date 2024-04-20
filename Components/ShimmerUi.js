import { View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ShimmerUi = () => {
  return (
    <View style={{ width: "80%", height: 20, margin: 30 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <ShimmerPlaceholder width={75} height={75} />
        <View style={{ marginStart: "10%" }}>
          <ShimmerPlaceholder />
          <View style={{ height: 10 }} />
          <ShimmerPlaceholder />
          <View style={{ height: 10 }} />
          <ShimmerPlaceholder />
          <View style={{ height: 10 }} />
        </View>
      </View>
    </View>
  );
};
export default ShimmerUi;
