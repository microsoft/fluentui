// @ts-nocheck
import { tokens } from '@fluentui/react-theme';

const makeStyles = () => null;

export const useStylesA = makeStyles({
  neutral: {
    border: `5px solid ${tokens.alias.color.neutral.neutralStroke1}`,
    color: tokens.alias.color.neutral.neutralForeground1,
  },
  colors: {
    border: `5px solid ${tokens.alias.color.blue.border2}`,
    color: tokens.alias.color.marigold.foreground2,
  },
  shadow: {
    boxShadow: tokens.alias.shadow.shadow8,
  },
  border: {
    borderRadius: tokens.global.borderRadius.circular,
  },
  stroke: {
    borderBottomWidth: tokens.global.strokeWidth.thin,
  },
  type: {
    fontFamily: tokens.global.type.fontFamilies.base,
    fontSize: tokens.global.type.fontSizes.base[300],
    lineHeight: tokens.global.type.lineHeights.base[300],
    fontWeight: tokens.global.type.fontWeights.regular,
  },
});
