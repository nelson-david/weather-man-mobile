import { useAtom } from "jotai";
import Svg, { Path } from "react-native-svg";
import { bgColor } from "../../store/theme";
import { colorList } from "../../data/colorList";

const HumidityIcon = ({
	size,
}: {
	size?: { width: string; height: string };
}) => {
	const [theme] = useAtom(bgColor);

	return (
		<>
			<Svg
				width={size ? size.width : "40"}
				height={size ? size.height : "40"}
				viewBox="0 0 40 40"
				fill="none"
			>
				<Path
					d="M20.0002 35.8333C26.8356 35.8333 32.5002 30.7287 32.5002 24.2857C32.5002 20.2592 30.4456 16.1875 28.1222 12.8484C25.7832 9.4869 23.0861 6.74702 21.6299 5.36297C20.7107 4.4894 19.2897 4.4894 18.3706 5.36298C16.9144 6.74702 14.2172 9.4869 11.8782 12.8484C9.55494 16.1875 7.50024 20.2592 7.50024 24.2857C7.50024 30.7287 13.1649 35.8333 20.0002 35.8333Z"
					stroke={colorList[theme]}
					strokeWidth="1.66667"
				/>
				<Path
					d="M20.0002 30C19.1247 30 18.2578 29.8275 17.449 29.4925C16.6401 29.1575 15.9052 28.6665 15.2861 28.0473C14.6671 27.4283 14.176 26.6933 13.841 25.8845C13.5059 25.0757 13.3335 24.2088 13.3335 23.3333"
					stroke={colorList[theme]}
					strokeWidth="1.66667"
					strokeLinecap="round"
				/>
			</Svg>
		</>
	);
};

export default HumidityIcon;
