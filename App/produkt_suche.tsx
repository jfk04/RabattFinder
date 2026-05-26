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

const VORSCHLAEGE = ["Coca-Cola", "Red Bull", "Monster", "Fanta", "Sprite"];

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
    `http://145.223.117.130:3000/angebote?suche=${product}`,
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
  const [text, setText] = useState([]);
  const [vorschlaege, setVorschlaege] = useState([]);

  const handleEingabe = async (text) => {
    if (text.length > 1) {
      //const res = await fetch();
      const gefiltert = VORSCHLAEGE.filter((v) =>
        v.toLowerCase().includes(text.toLowerCase()),
      );
      setVorschlaege(gefiltert);
    } else {
      setVorschlaege([]);
    }
    setText(text);
  };

  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Nach welchem Produkt möchtest du suchen?</Text>
      <View>
        <TextInput
          style={{
            backgroundColor: "blue",
          }}
          placeholder={placeholder}
          onChangeText={handleEingabe}
        >
          {text}
        </TextInput>
        {text.length > 0 && (
          <FlatList
            keyboardShouldPersistTaps="handled"
            style={{ width: "100%", backgroundColor: "grey", flexGrow: 0 }}
            data={vorschlaege}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setText(item);
                  setVorschlaege([]);
                }}
              >
                <Text style={{ width: "100%", padding: 10 }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
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
