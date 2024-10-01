import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import WindIcon from "../../assets/icons/WindIcon";
import { colorList } from "../../data/colorList";
import { widthPercentageToDP } from "react-native-responsive-screen";
import HumidityIcon from "../../assets/icons/HumidityIcon";
import SpeedometerIcon from "../../assets/icons/SpeedometerIcon";

const WeatherDataCard = ({
	theme,
	font,
	wind,
	humidity,
	visibility,
	outfitInfo,
}: {
	theme: number;
	font: string;
	wind: number;
	humidity: number;
	visibility: number;
	outfitInfo: string;
}) => {
	return (
		<>
			<View
				style={{
					...styles.outfitInfo,
					backgroundColor: `${colorList[theme]}88`,
				}}
			>
				<Text
					style={{
						...styles.outfitInfoText,
						fontFamily: font === "vonique" ? "voniqueBold" : font,
						fontSize:
							font === "nothing"
								? widthPercentageToDP(3.2)
								: widthPercentageToDP(2.4),
						letterSpacing: font === "nothing" ? 0.4 : 1.6,
					}}
				>
					{outfitInfo}
				</Text>
			</View>
			<ImageBackground
				source={require("../../assets/images/card-texture.png")}
				style={styles.weatherDataCard}
			>
				<View style={styles.singleWeatherData}>
					<Pressable
						style={{
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<WindIcon />
					</Pressable>
					<Text
						style={{
							...styles.singleWeatherDataText,
							color: colorList[theme],
							paddingTop: 25,
							fontFamily:
								font === "vonique" ? "voniqueBold" : font,
							fontSize: widthPercentageToDP(4.9),
							letterSpacing: 0.2,
						}}
					>
						{wind}km/h
					</Text>
					<Text
						style={{
							...styles.singleWeatherDataText,
							color: colorList[theme],
							fontFamily:
								font === "vonique" ? "voniqueBold" : font,
							paddingTop: 8,
							letterSpacing: 1,
							fontSize: widthPercentageToDP(2.7),
						}}
					>
						Wind
					</Text>
				</View>

				<View style={styles.singleWeatherData}>
					<Pressable
						style={{
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<HumidityIcon />
					</Pressable>
					<Text
						style={{
							...styles.singleWeatherDataText,
							color: colorList[theme],
							paddingTop: 25,
							fontFamily:
								font === "vonique" ? "voniqueBold" : font,
							fontSize: widthPercentageToDP(4.9),
							letterSpacing: 0.2,
						}}
					>
						{humidity}%
					</Text>
					<Text
						style={{
							...styles.singleWeatherDataText,
							color: colorList[theme],
							fontFamily:
								font === "vonique" ? "voniqueBold" : font,
							paddingTop: 8,
							letterSpacing: 1,
							fontSize: widthPercentageToDP(2.7),
						}}
					>
						Humidity
					</Text>
				</View>

				<View style={styles.singleWeatherData}>
					<Pressable
						style={{
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<SpeedometerIcon />
					</Pressable>
					<Text
						style={{
							...styles.singleWeatherDataText,
							color: colorList[theme],
							paddingTop: 25,
							fontFamily:
								font === "vonique" ? "voniqueBold" : font,
							fontSize: widthPercentageToDP(4.9),
							letterSpacing: 0.2,
						}}
					>
						{visibility}km
					</Text>
					<Text
						style={{
							...styles.singleWeatherDataText,
							color: colorList[theme],
							fontFamily:
								font === "vonique" ? "voniqueBold" : font,
							paddingTop: 8,
							letterSpacing: 1,
							fontSize: widthPercentageToDP(2.7),
						}}
					>
						Visibility
					</Text>
				</View>
			</ImageBackground>
		</>
	);
};

const styles = StyleSheet.create({
	outfitInfo: {
		padding: 10,
		borderRadius: 30,
		marginBottom: 20,
	},
	outfitInfoText: {
		textAlign: "center",
		paddingLeft: 22,
		paddingRight: 22,
		lineHeight: 21,
	},
	weatherDataCard: {
		backgroundColor: "#000000",
		borderRadius: 35,
		padding: 15,
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	singleWeatherData: {
		padding: 25,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 20,
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	singleWeatherDataText: {
		textAlign: "center",
	},
});

export default WeatherDataCard;
