import Svg, { Circle, Path, Rect, Text } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgLogoBlack = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 130 28" accessibilityRole="image" {...props}>
    {/* Squircle Base */}
    <Path
      fill="#000000"
      d="M27.91 13.955c0 9.634-4.321 13.955-13.955 13.955S0 23.589 0 13.955 4.321 0 13.955 0 27.91 4.321 27.91 13.955"
    />
    {/* Card top */}
    <Rect x="7.9" y="5.9" width="12.2" height="3.9" rx="1" fill="#FFFFFF" fillOpacity={0.92} />
    {/* Wallet Body */}
    <Rect x="4.8" y="8.1" width="18.4" height="13.8" rx="2.8" fill="#1E293B" />
    {/* Wallet fold line */}
    <Path d="M4.8 11.4h18.4" stroke="#334155" strokeWidth="0.5" />
    {/* Wallet Clasp */}
    <Path
      d="M17.1 12h5.1c0.6 0 1 0.4 1 1v3.5c0 0.6-0.4 1-1 1h-5.1c-0.6 0-1-0.4-1-1V13c0-0.6 0.4-1 1-1z"
      fill="#000000"
    />
    <Circle cx="20.7" cy="14.8" r="0.8" fill="#FFFFFF" />
    {/* Interlocking CC */}
    <Path
      d="M11.8 12.6c-1.6 0-2.9 1-2.9 2.5 0 1.5 1.3 2.5 2.9 2.5 1 0 1.7-0.5 2.1-1.1"
      stroke="#FFFFFF"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M14.1 12.6c-1.6 0-2.9 1-2.9 2.5 0 1.5 1.3 2.5 2.9 2.5 1 0 1.7-0.5 2.1-1.1"
      stroke="#34D399"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
    />
    <Text
      x="36"
      y="20"
      fill="#000000"
      fontSize="17"
      fontWeight="bold"
      letterSpacing="0.5"
    >
      CC Wallet
    </Text>
  </Svg>
);

export default SvgLogoBlack;
