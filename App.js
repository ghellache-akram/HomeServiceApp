import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./App/Screens/LoginScreen/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigation/TableNavigation";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "outfit-regular": require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <ClerkProvider
      publishableKey="pk_test_Y3JlYXRpdmUtYmFkZ2VyLTUzLmNsZXJrLmFjY291bnRzLmRldiQ"
      tokenCache={tokenCache}
    >
      <View style={styles.container}>
        {/* Sign in Componenet */}
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        {/* Sign out Componenet */}
        <SignedOut>
          <Login />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
});
