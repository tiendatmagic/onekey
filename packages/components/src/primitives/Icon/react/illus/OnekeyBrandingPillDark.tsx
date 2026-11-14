import Svg, { Circle, Path, Rect, Text } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgOnekeyBrandingPillDark = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 92 22" accessibilityRole="image" {...props}>
    {/* Dark Pill Background */}
    <Path
      fill="#0F172A"
      d="M0 11C0 4.925 4.925 0 11 0h70c6.075 0 11 4.925 11 11s-4.925 11-11 11H11C4.925 22 0 17.075 0 11"
    />
    {/* Squircle Mini Logo */}
    <Path
      fill="#10B981"
      d="M21.5 11c0 4.5-2 6.5-6.5 6.5S8.5 15.5 8.5 11s2-6.5 6.5-6.5 6.5 2 6.5 6.5"
    />
    {/* Mini Wallet */}
    <Rect x="10.8" y="8.8" width="8.4" height="6.4" rx="1.4" fill="#020617" />
    <Path d="M10.8 10.3h8.4" stroke="#1E293B" strokeWidth="0.4" />
    {/* Mini Clasp */}
    <Path d="M16.8 10.6h2.4v2.4h-2.4z" fill="#10B981" />
    {/* Mini CC */}
    <Path d="M14 11c-.7 0-1.2.4-1.2 1s.5 1 1.2 1" stroke="#fff" strokeWidth="0.6" fill="none" />
    <Path d="M15.2 11c-.7 0-1.2.4-1.2 1s.5 1 1.2 1" stroke="#34D399" strokeWidth="0.6" fill="none" />

    {/* Brand Text */}
    <Text
      x="27"
      y="15.5"
      fill="#FFFFFF"
      fontSize="11.5"
      fontWeight="700"
      letterSpacing="0.2"
    >
      CC Wallet
    </Text>
  </Svg>
);

export default SvgOnekeyBrandingPillDark;
