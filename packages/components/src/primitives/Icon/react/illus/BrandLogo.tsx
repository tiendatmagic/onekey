import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgBrandLogo = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 27 27" accessibilityRole="image" {...props}>
    {/* Squircle Base */}
    <Path
      fill="#10B981"
      d="M27 13.5C27 22.82 22.82 27 13.5 27S0 22.82 0 13.5 4.18 0 13.5 0 27 4.18 27 13.5"
    />
    {/* Top Security Card */}
    <Rect x="7.6" y="5.7" width="11.8" height="3.8" rx="1" fill="#FFFFFF" fillOpacity={0.92} />
    {/* Wallet Body */}
    <Rect x="4.6" y="7.8" width="17.7" height="13.3" rx="2.7" fill="#0F172A" />
    {/* Fold line */}
    <Path d="M4.6 11h17.7" stroke="#1E293B" strokeWidth="0.5" />
    {/* Clasp */}
    <Path
      d="M16.5 11.6h4.9c0.5 0 0.9 0.4 0.9 0.9v3.4c0 0.5-0.4 0.9-0.9 0.9h-4.9c-0.5 0-0.9-0.4-0.9-0.9v-3.4c0-0.5 0.4-0.9 0.9-0.9z"
      fill="#10B981"
    />
    <Circle cx="20" cy="14.3" r="0.8" fill="#FFFFFF" />
    {/* Interlocking CC */}
    <Path
      d="M11.4 12.1c-1.5 0-2.8 1-2.8 2.4 0 1.4 1.3 2.4 2.8 2.4 0.9 0 1.6-0.5 2-1"
      stroke="#FFFFFF"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M13.6 12.1c-1.5 0-2.8 1-2.8 2.4 0 1.4 1.3 2.4 2.8 2.4 0.9 0 1.6-0.5 2-1"
      stroke="#34D399"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

export default SvgBrandLogo;
