import Svg, { Text } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgOnekeyTextOnly = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 95 28" accessibilityRole="image" {...props}>
    <Text
      x="0"
      y="20"
      fill="currentColor"
      fontSize="18"
      fontWeight="bold"
      letterSpacing="0.5"
    >
      CC Wallet
    </Text>
  </Svg>
);

export default SvgOnekeyTextOnly;
