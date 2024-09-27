import { useAtom } from "jotai";
import Svg, { Circle, Path } from "react-native-svg";
import { bgColor } from "../../store/theme";
import { colorList } from "../../data/colorList";

const PlayIcon = ({ size }: { size?: { width: string; height: string } }) => {
	const [theme] = useAtom(bgColor);

	return (
		<>
			<Svg
				width={size ? size.width : "30"}
				height={size ? size.height : "30"}
				viewBox="0 0 35 35"
				fill="none"
			>
				<Circle
					cx="17.5"
					cy="17.5"
					r="16.5"
					stroke={colorList[theme]}
					strokeWidth="2"
				/>
				<Path
					d="M16.9975 12.4513C14.7764 11.169 12 12.7719 12 15.3366V20.6634C12 23.2281 14.7764 24.831 16.9975 23.5487L21.6106 20.8853C23.8317 19.6029 23.8317 16.3971 21.6106 15.1147L16.9975 12.4513Z"
					fill={colorList[theme]}
				/>
			</Svg>
		</>
	);
};

export default PlayIcon;
