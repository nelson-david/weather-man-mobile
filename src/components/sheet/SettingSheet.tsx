import { View, StyleSheet, Text, Pressable } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colorList } from "../../data/colorList";
import { useAtom } from "jotai";
import { bgColor, fontFamily } from "../../store/theme";

const SettingSheet = ({
	sheetRef,
	theme,
}: {
	sheetRef: any;
	theme: number;
}) => {
	const [_, setTheme] = useAtom(bgColor);
	const [font, setFont] = useAtom(fontFamily);

	const changeColorScheme = (index: number) => {
		setTheme(index);
	};

	const changeFont = (fontString: string) => {
		setFont(fontString);
	};

	return (
		<RBSheet
			ref={sheetRef}
			customStyles={{
				wrapper: {
					backgroundColor: "rgba(0,0,0,0.7)",
				},
				draggableIcon: {
					backgroundColor: "rgba(0,0,0,1)",
					width: 65,
				},
				container: {
					borderTopLeftRadius: 40,
					borderTopEndRadius: 40,
					padding: 5,
					backgroundColor: colorList[theme],
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
			height={hp(47)}
		>
			<View style={styles.sheetContent}>
				<View style={styles.singleSettingContainer}>
					<Text
						style={{
							...styles.singleSettingHeaderText,
							fontFamily:
								font === "vonique" ? "voniqueBold" : font,
						}}
					>
						Color Scheme
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							gap: 20,
							paddingTop: 15,
							paddingBottom: 15,
						}}
					>
						{colorList.map((singleColor: string, index: number) => {
							const activeColor =
								colorList[theme] === singleColor;
							return (
								<Pressable
									key={index}
									onPress={() => changeColorScheme(index)}
									style={
										activeColor
											? {
													...styles.singleColorButton,
													backgroundColor:
														singleColor,
													borderColor: "#000000",
											  }
											: {
													...styles.singleColorButton,
													backgroundColor:
														singleColor,
													borderColor: singleColor,
											  }
									}
								></Pressable>
							);
						})}
					</View>
				</View>
				<View style={styles.singleSettingContainer}>
					<Text
						style={{
							...styles.singleSettingHeaderText,
							fontFamily:
								font === "vonique" ? "voniqueBold" : font,
						}}
					>
						Font Family
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							gap: 20,
							paddingTop: 15,
							paddingBottom: 15,
						}}
					>
						<Pressable
							onPress={() => changeFont("vonique")}
							style={
								font === "vonique"
									? {
											...styles.singleFontButton,
											borderColor: "#000000",
											backgroundColor: colorList[theme],
									  }
									: {
											...styles.singleFontButton,
											borderColor: "rgba(0,0,0,0.05)",
											backgroundColor: colorList[theme],
									  }
							}
						>
							<Text
								style={{
									...styles.singleFontButtonText,
									fontFamily: "vonique",
									color: "#000000",
								}}
							>
								Vonique
							</Text>
						</Pressable>
						<Pressable
							onPress={() => changeFont("nothing")}
							style={
								font === "nothing"
									? {
											...styles.singleFontButton,
											borderColor: "#000000",
											backgroundColor: colorList[theme],
									  }
									: {
											...styles.singleFontButton,
											borderColor: "rgba(0,0,0,0.05)",
											backgroundColor: colorList[theme],
									  }
							}
						>
							<Text
								style={{
									...styles.singleFontButtonText,
									fontFamily: "nothing",
									color: "#000000",
								}}
							>
								Nothing
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</RBSheet>
	);
};

const styles = StyleSheet.create({
	sheetContent: {
		padding: 15,
		paddingTop: 20,
		paddingBottom: 20,
	},
	singleSettingContainer: {
		paddingTop: 15,
		paddingBottom: 15,
	},
	singleSettingHeaderText: {
		fontSize: widthPercentageToDP(3.9),
		letterSpacing: 1.2,
	},
	singleColorButton: {
		width: 50,
		height: 50,
		borderRadius: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 3,
	},
	singleFontButton: {
		borderWidth: 5,
		height: 110,
		paddingTop: 1,
		width: 110,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
	},
	singleFontButtonText: {
		fontSize: widthPercentageToDP(4),
		letterSpacing: 1.2,
	},
});

export default SettingSheet;
