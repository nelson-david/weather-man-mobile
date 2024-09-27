import { useAtom } from "jotai";
import {
	ActivityIndicator,
	Image,
	ImageBackground,
	Pressable,
	View,
} from "react-native";
import { bgColor } from "../../store/theme";
import { colorList } from "../../data/colorList";
import { logoList } from "../../data/logoList";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { serverAxios } from "../../utils/axios";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../types";

const OnboardingScreen = () => {
	const [theme] = useAtom(bgColor);
	const [loading, setLoading] = useState(false);
	const { navigate } = useNavigation<Nav>();

	useEffect(() => {
		setTimeout(() => {
			setLoading(true);

			(async () => {
				let { status } =
					await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					alert("Location permission not granted");
					return;
				}

				let location = await Location.getCurrentPositionAsync({});
				const {
					coords: { longitude, latitude },
				} = location;

				let response: any;
				try {
					response = await serverAxios({
						method: "POST",
						url: "/weather",
						data: { longitude, latitude },
					});
				} catch (error) {
					console.log("ERROR: ", error);
				} finally {
					setLoading(false);
					navigate("Home", {
						screen: "HomeScreen",
						params: response.data,
					});
				}
			})();
		}, 1000);
	}, []);

	return (
		<View style={{ backgroundColor: colorList[theme], flex: 1 }}>
			<View
				style={{
					borderWidth: 2,
					height: "100%",
					backgroundColor: "rgba(0,0,0,0.8)",
				}}
			>
				<ImageBackground
					source={require("../../assets/images/texture.png")}
					style={{
						height: "100%",
					}}
				>
					<ImageBackground
						source={require("../../assets/images/noise.png")}
						style={{
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Image
							source={logoList[theme]}
							alt="logo"
							style={{
								width: 260,
								height: 64.08,
							}}
						/>
						<Pressable style={{ marginTop: 10 }}>
							<ActivityIndicator
								size={"small"}
								color={colorList[theme]}
								style={{ opacity: loading ? 1 : 0 }}
							/>
						</Pressable>
					</ImageBackground>
				</ImageBackground>
			</View>
		</View>
	);
};

export default OnboardingScreen;
