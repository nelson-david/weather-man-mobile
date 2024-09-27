import * as React from "react";
import {
	Animated,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import PlayIcon from "../../assets/icons/PlayIcon";
import { colorList } from "../../data/colorList";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Skeleton } from "moti/skeleton";
import { PanGestureHandler } from "react-native-gesture-handler";

const MusicCard = ({
	theme,
	font,
	sheetRef,
	loading,
	playlist,
}: {
	theme: number;
	font: string;
	sheetRef: any;
	loading: boolean;
	playlist: {
		id: string;
		title: string;
		coverImage: string;
		tracksNumber: number;
	};
}) => {
	// Function to handle when the gesture ends
	const onHandlerStateChange = (event: any) => {
		if (event.nativeEvent.translationY < 0) {
			sheetRef.current.open();
		}
	};

	return (
		<PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
			<Pressable
				style={styles.musicCard}
				onPress={() => sheetRef.current.open()}
			>
				<View
					style={{
						borderRadius: 25,
						width: widthPercentageToDP(17),
						height: widthPercentageToDP(17),
						position: "relative",
					}}
				>
					{loading ? (
						<Skeleton
							show
							height={"97%"}
							width={"100%"}
							colorMode="dark"
							radius={20}
						/>
					) : (
						<Image
							source={{ uri: playlist.coverImage }}
							style={{
								width: "100%",
								height: "100%",
								borderRadius: 23,
							}}
						/>
					)}
				</View>
				<View style={styles.contentContainer}>
					{loading ? (
						<>
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
						</>
					) : (
						<>
							<Text
								style={{
									...styles.musicTitle,
									color: colorList[theme],
									fontFamily: font,
								}}
							>
								{playlist.title}
							</Text>
							<Text
								style={{
									...styles.musicDetailsText,
									color: colorList[theme],
									fontFamily: font,
								}}
							>
								{playlist.tracksNumber} songs . 4hr 54mins
							</Text>
						</>
					)}
				</View>
				<View
					style={{
						justifyContent: "center",
						marginLeft: "auto",
						marginRight: 8,
					}}
				>
					<Pressable style={{ marginTop: 20 }}>
						{loading ? (
							<Skeleton
								colorMode="dark"
								radius={"round"}
								width={32}
								height={32}
							/>
						) : (
							<PlayIcon />
						)}
					</Pressable>
				</View>
			</Pressable>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	musicCard: {
		backgroundColor: "#000000",
		borderRadius: 35,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		padding: 20,
		paddingBottom: 35,
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

export default MusicCard;
