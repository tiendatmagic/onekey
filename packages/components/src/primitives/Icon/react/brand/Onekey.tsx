import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgOnekey = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" accessibilityRole="image" {...props}>
    {/* Squircle Base */}
    <Path
      fill="#10B981"
      d="M23 12c0 7.594-3.406 11-11 11S1 19.594 1 12 4.406 1 12 1s11 3.406 11 11"
    />
    {/* Top Security Card */}
    <Rect x="6.8" y="5.1" width="10.5" height="3.4" rx="0.8" fill="#FFFFFF" fillOpacity={0.92} />
    {/* Wallet Body */}
    <Rect x="4.1" y="6.9" width="15.8" height="11.8" rx="2.4" fill="#0F172A" />
    {/* Fold line */}
    <Path d="M4.1 9.8h15.8" stroke="#1E293B" strokeWidth="0.5" />
    {/* Clasp */}
    <Path
      d="M14.6 10.3h4.3c0.5 0 0.8 0.3 0.8 0.8v3c0 0.5-0.3 0.8-0.8 0.8h-4.3c-0.5 0-0.8-0.3-0.8-0.8v-3c0-0.5 0.3-0.8 0.8-0.8z"
      fill="#10B981"
    />
    <Circle cx="17.7" cy="12.7" r="0.7" fill="#FFFFFF" />
    {/* Interlocking CC */}
    <Path
      d="M10.1 10.8c-1.3 0-2.5 0.9-2.5 2.1 0 1.2 1.2 2.1 2.5 2.1 0.8 0 1.4-0.4 1.8-0.9"
      stroke="#FFFFFF"
      strokeWidth="1"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M12.1 10.8c-1.3 0-2.5 0.9-2.5 2.1 0 1.2 1.2 2.1 2.5 2.1 0.8 0 1.4-0.4 1.8-0.9"
      stroke="#34D399"
      strokeWidth="1"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

export default SvgOnekey;
