import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import { useState } from "react";
import { Text } from "react-native";
import HomeScreen from "./screens/home";
import OnboardingScreen from "./screens/onboarding";

const Stack = createStackNavigator();
const TransitionScreenOptions = {
	headerShown: false,
	gestureEnabled: false,
	...TransitionPresets.SlideFromRightIOS,
};

const AppNavigation = () => {
	const [loading, _] = useState(false);

	return (
		<>
			{loading ? (
				<Text style={{ fontSize: 30 }}>Loadi...ng...</Text>
			) : (
				<>
					<NavigationContainer>
						<MainNavigator />
					</NavigationContainer>
				</>
			)}
		</>
	);
};

const MainNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Onboarding"
			screenOptions={TransitionScreenOptions}
		>
			<Stack.Screen name="Onboarding" component={OnboardingNavigator} />
			<Stack.Screen name="Home" component={HomeNavigator} />
		</Stack.Navigator>
	);
};

const OnboardingNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="OnboardingScreen"
			screenOptions={TransitionScreenOptions}
		>
			<Stack.Screen
				name="OnboardingScreen"
				component={OnboardingScreen}
			/>
		</Stack.Navigator>
	);
};

const HomeNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="HomeScreen"
			screenOptions={TransitionScreenOptions}
		>
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
		</Stack.Navigator>
	);
};

export default AppNavigation;
