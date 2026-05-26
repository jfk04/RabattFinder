import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//@ts-ignore
export default function Index() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Text>RabattFinder</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "red" }]}
        //@ts-ignore
        onPress={() => navigation.navigate("produkt_suche")}
      >
        <Text style={styles.buttonText}>Produkte Suchen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "blue" }]}>
        <Text style={styles.buttonText}>Meine Liste</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  buttonText: {
    fontSize: 18,
  },
});
