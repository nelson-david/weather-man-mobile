import {
	Image,
	Linking,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PlayIcon from "../../assets/icons/PlayIcon";
import { colorList } from "../../data/colorList";
import { msToMinutes } from "../../utils/helperFunctions";

const SingleTrackCard = ({
	track,
	theme,
	font,
	lastElement,
}: {
	track: any;
	theme: number;
	font: string;
	lastElement: boolean;
}) => {
	const openSpotify = () => {
		const spotifyUrl = `spotify:track:${track.track.id}`;
		const webUrl = track.track.external_urls.spotify;

		Linking.canOpenURL(spotifyUrl)
			.then((supported) => {
				if (supported) {
					return Linking.openURL(spotifyUrl);
				} else {
					return Linking.openURL(webUrl);
				}
			})
			.catch((err) => console.error("An error occurred", err));
	};

	return (
		<Pressable
			style={{ ...styles.musicCard, marginBottom: lastElement ? 40 : 0 }}
			key={track.track.id}
			onPress={openSpotify}
		>
			<View
				style={{
					borderRadius: 25,
					width: widthPercentageToDP(17),
					height: widthPercentageToDP(17),
					position: "relative",
				}}
			>
				<Image
					source={{
						uri: track.track.album.images[2].url,
					}}
					style={{
						width: "100%",
						height: "100%",
						borderRadius: 25,
						objectFit: "contain",
					}}
				/>
			</View>
			<View style={styles.contentContainer}>
				<Text
					style={{
						...styles.musicTitle,
						color: colorList[theme],
						fontFamily: font,
					}}
				>
					{track.track.name.slice(0, 30)}...
				</Text>
				<Text
					style={{
						...styles.musicDetailsText,
						color: colorList[theme],
						fontFamily: font,
					}}
				>
					by{" "}
					{track.track.artists.map((artist: any, index: number) => {
						return (
							<Text key={index}>
								{artist.name} {` `}
							</Text>
						);
					})}{" "}
					. {msToMinutes(track.track.duration_ms)}
				</Text>
			</View>
			<View
				style={{
					justifyContent: "center",
					marginLeft: "auto",
					marginRight: 8,
				}}
			>
				<Pressable style={{ marginTop: 20 }} onPress={openSpotify}>
					<PlayIcon />
				</Pressable>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	musicCard: {
		backgroundColor: "#000000",
		borderRadius: 20,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		padding: 25,
		paddingLeft: 0,
		paddingRight: 0,
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

export default SingleTrackCard;
