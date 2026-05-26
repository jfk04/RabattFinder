import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

type ButtonProps = {
  style: any;
  text: string;
  // textstyle: any;
  onPress: () => void;
};

function Button({ style, text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

export default function Index() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log("Route: ", route);
  const angebote = route?.params?.angebote || [];
  console.log(angebote);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {angebote.map((angebot, index) => (
        <Text key={index}>
          {angebot.name} - {angebot.price} ({angebot.shop})
        </Text>
      ))}
    </View>
  );
}
