import { useFonts } from "expo-font";
import { Platform, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import AppNavigation from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface TextWithDefaultProps extends Text {
	defaultProps?: { allowFontScaling?: boolean };
}

(Text as unknown as TextWithDefaultProps).defaultProps =
	(Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
	false;

const App = () => {
	const [loaded] = useFonts({
		vonique: require("./src/assets/fonts/vonique/Vonique.ttf"),
		voniqueBold: require("./src/assets/fonts/vonique/Vonique-Bold.ttf"),
		nothing: require("./src/assets/fonts/nothing/nothing.otf"),
	});

	if (Platform.OS === "android") {
		NavigationBar.setBackgroundColorAsync("#000000");
	}

	if (!loaded) {
		return <Text style={{ fontSize: 30 }}>Loading...</Text>;
	}

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView
				style={{
					flex: 1,
				}}
			>
				<StatusBar style="dark" />
				<AppNavigation />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
};

export default App;
