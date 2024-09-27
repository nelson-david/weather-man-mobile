import {
	View,
	StyleSheet,
	Pressable,
	ScrollView,
	Text,
	Linking,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colorList } from "../../data/colorList";
import { useAtom } from "jotai";
import { fontFamily } from "../../store/theme";
import { Skeleton } from "moti/skeleton";
import SingleTrackCard from "../card/SingleTrackCard";

const dummyList = [1, 2, 3, 4, 5];

const PlaylistSheet = ({
	sheetRef,
	theme,
	loadingTrackList,
	trackList,
	playlist,
}: {
	sheetRef: any;
	theme: number;
	loadingTrackList: boolean;
	trackList: any[];
	playlist: {
		id: string;
		title: string;
		coverImage: string;
		tracksNumber: number;
	};
}) => {
	const [font] = useAtom(fontFamily);

	const openPlaylist = () => {
		const spotifyPlaylistUrl = `spotify://playlist/${playlist.id}`;
		const webUrl = `https://open.spotify.com/playlist/${playlist.id}`;

		Linking.canOpenURL(spotifyPlaylistUrl)
			.then((supported) => {
				if (supported) {
					return Linking.openURL(spotifyPlaylistUrl);
				} else {
					return Linking.openURL(webUrl);
				}
			})
			.catch((err) => console.error("An error occurred", err));
	};

	return (
		<RBSheet
			ref={sheetRef}
			customStyles={{
				wrapper: {
					backgroundColor: "rgba(0,0,0,0.5)",
					padding: 3,
					paddingBottom: 0,
				},
				draggableIcon: {
					backgroundColor: colorList[theme],
					width: 65,
				},
				container: {
					borderTopLeftRadius: 35,
					borderTopEndRadius: 35,
					padding: 5,
					backgroundColor: "#000000",
				},
			}}
			customModalProps={{
				animationType: "fade",
				statusBarTranslucent: true,
			}}
			customAvoidingViewProps={{
				enabled: false,
			}}
			draggable
			height={hp(75)}
		>
			<View
				style={{
					padding: 20,
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Pressable
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							color: colorList[theme],
							fontFamily: font,
							fontSize: wp(3.8),
						}}
					>
						{playlist.title.slice(0, 22)}
					</Text>
				</Pressable>
				<Pressable
					style={{
						height: 30,
						paddingTop: 2,
						paddingLeft: 15,
						paddingRight: 15,
						backgroundColor: colorList[theme],
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 30,
					}}
					onPress={openPlaylist}
				>
					<Text
						style={{
							color: "#000000",
							fontFamily: font,
							fontSize: wp(2.2),
							letterSpacing: 1,
						}}
					>
						Open in Spotify
					</Text>
				</Pressable>
			</View>
			<ScrollView style={styles.sheetContent}>
				{loadingTrackList || trackList === undefined ? (
					<>
						{dummyList.map((_, index: number) => {
							return (
								<Pressable
									style={styles.musicCard}
									onPress={() => sheetRef.current.open()}
									key={index}
								>
									<View
										style={{
											borderRadius: 20,
											width: widthPercentageToDP(17),
											height: widthPercentageToDP(17),
											position: "relative",
										}}
									>
										<Skeleton
											show
											height={"100%"}
											width={"104%"}
											colorMode="dark"
											radius={22}
										/>
									</View>
									<View style={styles.contentContainer}>
										<View style={{ marginTop: 6 }}>
											<Skeleton
												colorMode="dark"
												width={widthPercentageToDP(50)}
												height={17}
												radius={5}
											/>
										</View>
										<View style={{ marginTop: 25 }}>
											<Skeleton
												colorMode="dark"
												width={widthPercentageToDP(25)}
												height={17}
												radius={5}
											/>
										</View>
									</View>
									<View
										style={{
											justifyContent: "center",
											marginLeft: "auto",
											marginRight: 8,
										}}
									>
										<Pressable style={{ marginTop: 20 }}>
											<Skeleton
												colorMode="dark"
												radius={"round"}
												width={34.3}
												height={34}
											/>
										</Pressable>
									</View>
								</Pressable>
							);
						})}
					</>
				) : (
					<>
						{trackList.map((track: any, index) => {
							const lastElement = index === trackList.length - 1;
							return (
								<SingleTrackCard
									key={track.track.id}
									track={track}
									theme={theme}
									font={font}
									lastElement={lastElement}
								/>
							);
						})}
					</>
				)}
			</ScrollView>
		</RBSheet>
	);
};

const styles = StyleSheet.create({
	sheetContent: {
		padding: 15,
		paddingTop: 5,
		paddingBottom: 20,
	},
	musicCard: {
		backgroundColor: "#000000",
		borderRadius: 20,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		padding: 25,
		paddingLeft: 5,
		paddingRight: 5,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	contentContainer: {
		paddingLeft: 14,
	},
	musicTitle: {
		fontSize: widthPercentageToDP(3),
		marginTop: 6,
	},
	musicDetailsText: {
		fontSize: widthPercentageToDP(2.2),
		marginTop: 25,
	},
});

export default PlaylistSheet;
