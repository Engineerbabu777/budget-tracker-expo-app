import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Outfit-Black": require("../assets/fonts/Outfit-Black.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });
  return (
    <Stack screenOptions={{
      headerShown: false,

    }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-new-category"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New Category",
        
        }}
      />
    </Stack>
  );
}
