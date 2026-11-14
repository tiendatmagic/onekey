import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgLogoCircular = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 32 32" accessibilityRole="image" {...props}>
    {/* Circular Base */}
    <Circle cx="16" cy="16" r="16" fill="currentColor" />
    {/* Inner Card Top */}
    <Rect x="9" y="6.8" width="14" height="4.5" rx="1.1" fill="#000" fillOpacity={0.2} />
    {/* Wallet Body */}
    <Rect x="5.5" y="9.3" width="21" height="15.8" rx="3.2" fill="#000" fillOpacity={0.55} />
    {/* Fold line */}
    <Path d="M5.5 13h21" stroke="#000" strokeWidth="0.6" />
    {/* Clasp */}
    <Path
      d="M19.6 13.7h5.8c0.7 0 1.2 0.5 1.2 1.2v4c0 0.7-0.5 1.2-1.2 1.2h-5.8c-0.7 0-1.2-0.5-1.2-1.2v-4c0-0.7 0.5-1.2 1.2-1.2z"
      fill="currentColor"
    />
    <Circle cx="23.7" cy="16.9" r="0.9" fill="#000" />
    {/* Interlocking CC */}
    <Path
      d="M13.5 14.4c-1.8 0-3.3 1.1-3.3 2.9 0 1.7 1.5 2.9 3.3 2.9 1.1 0 1.9-0.6 2.4-1.3"
      stroke="#fff"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M16.1 14.4c-1.8 0-3.3 1.1-3.3 2.9 0 1.7 1.5 2.9 3.3 2.9 1.1 0 1.9-0.6 2.4-1.3"
      stroke="#fff"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

export default SvgLogoCircular;
