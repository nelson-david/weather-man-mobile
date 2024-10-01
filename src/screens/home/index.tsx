import { useAtom } from "jotai";
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { bgColor, fontFamily } from "../../store/theme";
import { colorList } from "../../data/colorList";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import WeatherDataCard from "../../components/card/WeatherDataCard";
import MusicCard from "../../components/card/MusicCard";
import { formatDate } from "../../utils/formatDate";
import CogIcon from "../../assets/icons/CogIcon";
import { useEffect, useRef, useState } from "react";
import SettingSheet from "../../components/sheet/SettingSheet";
import PlaylistSheet from "../../components/sheet/PlaylistSheet";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import { getWeatherIcon } from "../../utils/helperFunctions";

const HomeScreen = ({ route }: { route: any }) => {
	const [theme] = useAtom(bgColor);
	const settingSheetRef = useRef<any>();
	const playlistSheetRef = useRef<any>();
	const [font] = useAtom(fontFamily);
	const [playlist, setPlaylist] = useState<{
		id: string;
		title: string;
		coverImage: string;
		tracksNumber: number;
	}>({ id: "", title: "", coverImage: "", tracksNumber: 0 });
	const [trackList, setTrackList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingTrackList, setLoadingTrackList] = useState(true);

	const currentDate: any = new Date().toString();

	async function getAccessToken() {
		const url = "https://accounts.spotify.com/api/token";
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: "grant_type=client_credentials",
		});

		const data = await response.json();
		return data.access_token;
	}

	async function getPlaylistTracks(playlistID: string, token: string) {
		const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();
		return data.items;
	}

	async function searchSpotify(query: string, token: string) {
		const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
			query
		)}&type=playlist`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();
		const playlistData = {
			id: data.playlists.items[0].id,
			title: data.playlists.items[0].name,
			coverImage: data.playlists.items[0].images[0].url,
			tracksNumber: data.playlists.items[0].tracks.total,
		};
		return playlistData;
	}

	useEffect(() => {
		getAccessToken().then((res1: any) => {
			const token = res1;
			searchSpotify(
				`${route.params.weather_data.current.condition.text} weather vibe`,
				token
			).then((res2: any) => {
				setPlaylist(res2);
				setLoading(false);
				getPlaylistTracks(res2.id, token).then((res3: any) => {
					if (res3) {
						setTrackList(res3);
						setLoadingTrackList(false);
					}
				});
			});
		});
	}, []);

	return (
		<>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: colorList[theme],
				}}
			>
				<Text style={{ fontSize: wp(40), marginTop: -220 }}>
					{getWeatherIcon(route.params.weather_data.current.temp_c)}
				</Text>
				{/* <Image
					source={require("../../assets/images/cloud.png")}
					style={{ width: wp(70), height: wp(70), marginTop: -160 }}
				/> */}
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
						width: "100%",
						height: "100%",
						backgroundColor: `${colorList[theme]}99`,
					}}
				>
					<ImageBackground
						source={require("../../assets/images/texture.png")}
						style={{
							height: "100%",
							width: "100%",
						}}
					>
						<ImageBackground
							source={require("../../assets/images/noise.png")}
							style={{
								height: "100%",
								width: "100%",
							}}
						>
							<SafeAreaView
								style={{
									borderWidth: 3,
									height: "100%",
									paddingTop: 5,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "flex-end",
										paddingLeft: 15,
										paddingRight: 15,
										marginBottom: 5,
									}}
								>
									<Pressable
										style={{
											width: 40,
											height: 40,
											borderRadius: 50,
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
										}}
										onPress={() =>
											settingSheetRef.current.open()
										}
									>
										<CogIcon />
									</Pressable>
								</View>
								<View style={styles.locationContainer}>
									<Text
										style={{
											...styles.locationTitle,
											fontFamily:
												font === "vonique"
													? "voniqueBold"
													: font,
										}}
									>
										{route.params
											? route.params.weather_data.location
													.name
											: "Your Location"}
									</Text>
								</View>
								<View style={styles.dateContainer}>
									<Pressable style={styles.datePointer}>
										<Text
											style={{
												...styles.datePointerText,
												color: colorList[theme],
												fontFamily:
													font === "vonique"
														? "voniqueBold"
														: font,
											}}
										>
											{formatDate(
												route.params
													? route.params.weather_data
															.location.localtime
													: currentDate
											)}
										</Text>
									</Pressable>
								</View>
								<View style={styles.weatherTypeContainer}>
									<Pressable
										style={styles.weatherTypePointer}
									>
										<Text
											style={{
												...styles.weatherTypePointerText,
												fontFamily:
													font === "vonique"
														? "voniqueBold"
														: font,
											}}
										>
											{
												route.params?.weather_data
													.current.condition.text
											}
										</Text>
									</Pressable>
								</View>
								<View style={styles.temperatureContainer}>
									<Text
										style={{
											...styles.temperatureText,
											fontSize:
												font === "vonique"
													? wp(35)
													: wp(28),
											letterSpacing:
												font === "vonique" ? -6 : -5,
											fontFamily:
												font === "vonique"
													? "voniqueBold"
													: font,
										}}
									>
										{route.params
											? route.params.weather_data.current
													.temp_c
											: "22"}
										°
									</Text>
									<Text
										style={{
											color: "#000000",
											fontFamily:
												font === "vonique"
													? "voniqueBold"
													: font,
											fontSize: wp(13),
											marginTop: 13,
										}}
									>
										c
									</Text>
								</View>
								<View
									style={{
										position: "absolute",
										bottom: 0,
										width: "100%",
										padding: 0,
										paddingBottom: 0,
									}}
								>
									<View
										style={{
											paddingLeft: 12,
											paddingRight: 12,
										}}
									>
										<WeatherDataCard
											theme={theme}
											font={font}
											wind={
												route.params?.weather_data
													.current.wind_kph
											}
											humidity={
												route.params?.weather_data
													.current.humidity
											}
											visibility={
												route.params?.weather_data
													.current.vis_km
											}
											outfitInfo={`The weather is a bit ${route.params?.weather_data.current.condition.text}, you should wear a ${route.params?.recommended_clothes.Description}`}
										/>
									</View>

									<View>
										<MusicCard
											theme={theme}
											font={font}
											sheetRef={playlistSheetRef}
											playlist={playlist}
											loading={loading}
										/>
									</View>
								</View>
							</SafeAreaView>
						</ImageBackground>
					</ImageBackground>
				</View>
			</View>
			<SettingSheet sheetRef={settingSheetRef} theme={theme} />
			<PlaylistSheet
				sheetRef={playlistSheetRef}
				theme={theme}
				loadingTrackList={loadingTrackList}
				trackList={trackList}
				playlist={playlist}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	locationContainer: {
		borderWidth: 0,
		paddingTop: 10,
	},
	locationTitle: {
		textAlign: "center",
		letterSpacing: 1.5,
		fontSize: wp(4.9),
	},
	dateContainer: {
		flexDirection: "row",
		justifyContent: "center",
		padding: 15,
		paddingTop: 25,
		paddingBottom: 25,
	},
	datePointer: {
		padding: 9.5,
		paddingBottom: 9,
		paddingLeft: 16,
		paddingRight: 16,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 35,
		backgroundColor: "#000000",
	},
	datePointerText: {
		letterSpacing: 1,
		fontSize: wp(2.3),
	},
	weatherTypeContainer: {
		flexDirection: "row",
		justifyContent: "center",
		padding: 15,
		paddingTop: 0,
		paddingBottom: 0,
	},
	weatherTypePointer: {
		borderWidth: 0,
	},
	weatherTypePointerText: {
		fontSize: wp(4.3),
		letterSpacing: 1.5,
	},
	temperatureContainer: {
		flexDirection: "row",
		justifyContent: "center",
		padding: 15,
		paddingTop: 30,
		paddingBottom: 30,
	},
	temperatureText: {
		color: "#000000",
	},
});

export default HomeScreen;
