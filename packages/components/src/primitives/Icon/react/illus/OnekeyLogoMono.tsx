import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgOnekeyLogoMono = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 280 280" accessibilityRole="image" {...props}>
    {/* Squircle Base */}
    <Path
      fill="currentColor"
      d="M280 140C280 236.65 236.65 280 140 280S0 236.65 0 140 43.35 0 140 0s140 43.35 140 140"
    />
    {/* Inner Wallet Cutouts */}
    <Rect x="79" y="59" width="122" height="39" rx="9" fill="#000" fillOpacity={0.2} />
    <Rect x="48" y="81" width="184" height="138" rx="28" fill="#000" fillOpacity={0.6} />
    <Path d="M48 114h184" stroke="#000" strokeWidth="5" />
    <Path
      d="M172 120h51c6 0 10 4 10 10v35c0 6-4 10-10 10h-51c-6 0-10-4-10-10v-35c0-6 4-10 10-10z"
      fill="currentColor"
    />
    <Circle cx="207" cy="148" r="8" fill="#000" />
    {/* Interlocking CC */}
    <Path
      d="M118 126c-16 0-29 10-29 25 0 15 13 25 29 25 10 0 17-5 21-11"
      stroke="#fff"
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M141 126c-16 0-29 10-29 25 0 15 13 25 29 25 10 0 17-5 21-11"
      stroke="#fff"
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

export default SvgOnekeyLogoMono;
