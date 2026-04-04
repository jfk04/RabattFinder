import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ButtonProps = {
  style: any;
  text: string;
  // textstyle: any;
  onPress: () => void;
};

const getRabatte = async (product) => {
  console.log(product);
  const res = await fetch(
    `http://192.168.178.23:3000/angebote?suche=${product}`,
  );
  const angebote = await res.json();
  console.log(angebote);
};

function formatRequest() {}

function Button({ style, text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

export default function Index() {
  const [text, setText] = useState("Suchen");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput value={text} onChangeText={setText}></TextInput>
      <Button
        style={styles.button}
        text="Go"
        onPress={() => getRabatte(text)}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 1,
    backgroundColor: "#0040ff",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    height: 63,
  },
});
