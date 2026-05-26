import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Rabatt Finder" }}
      ></Stack.Screen>
      <Stack.Screen
        name="produkt_suche"
        options={{ title: "Produkte suchen" }}
      ></Stack.Screen>
    </Stack>
  );
}
