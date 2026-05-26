import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  FlatList,
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
//@ts-ignore
const getRabatte = async (product, navigation) => {
  console.log(product);
  const res = await fetch(
    'API-Anfrage',
  );
  const angebote = await res.json();
  if (angebote.length === 0) {
    Alert.alert("Keine Angebote gefunden");
    return;
  }
  navigation.navigate("angebote", { angebote: angebote });
  console.log(angebote);
};

function Button({ style, text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

//@ts-ignore
export default function Index() {
  const navigation = useNavigation();
  const placeholder = "Produkt";
  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState(placeholder);
  const [vorschlaege, setVorschlaege] = useState([]);

  // const handleEingabe = (text) => {
  //   setText(text);
  //   if (text.length > 0) {
  //     const gefiltert = VORSCHLAEGE.filter((v) =>
  //       v.toLowerCase().includes(text.toLowerCase()),
  //     );
  //     setVorschlaege(gefiltert);
  //   } else {
  //     setVorschlaege([]);
  //   }
  // };

  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Nach welchem Produkt möchtest du suchen?</Text>
      <TextInput placeholder={placeholder} onChangeText={setText}></TextInput>
      <FlatList
        style={{ width: "100%", maxHeight: 200, backgroundColor: "red" }}
        data={["Coca-Cola", "Red Bull", "Monster", "Fanta", "Sprite"]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setText(item);
            }}
          >
            <Text style={{ width: "100%", padding: 10 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Text></Text>
      <Button
        style={styles.button}
        text="Suchen"
        onPress={() => {
          if (text === "Produkt") {
            Alert.alert("Fehler", "Produktname darf nicht leer sein");
          } else {
            getRabatte(text, navigation);
          }
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 1,
    backgroundColor: "#0040ff",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    width: 200,
    height: 40,
  },
  text: {
    fontSize: 18,
  },
});
