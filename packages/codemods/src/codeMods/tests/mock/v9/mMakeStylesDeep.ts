// @ts-ignore
import { makeStyles } from '@fluentui/react-make-styles';

export const useStylesA = makeStyles({
  // @ts-ignore
  neutral: theme => ({
    // @ts-ignore
    border: `5px solid ${theme.alias.color.neutral.neutralStroke1}`,
    // @ts-ignore
    color: theme.alias.color.neutral.neutralForeground1,
  }),
  // @ts-ignore
  colors: theme => ({
    // @ts-ignore
    border: `5px solid ${theme.alias.color.blue.border2}`,
    // @ts-ignore
    color: theme.alias.color.marigold.foreground2,
  }),
  // @ts-ignore
  shadow: theme => ({
    // @ts-ignore
    boxShadow: theme.alias.shadow.shadow8,
  }),
  // @ts-ignore
  border: theme => ({
    // @ts-ignore
    borderRadius: theme.global.borderRadius.circular,
  }),
  // @ts-ignore
  stroke: theme => ({
    // @ts-ignore
    borderBottomWidth: theme.global.strokeWidth.thin,
  }),
  // @ts-ignore
  type: theme => ({
    // @ts-ignore
    fontFamily: theme.global.type.fontFamilies.base,
    // @ts-ignore
    fontSize: theme.global.type.fontSizes.base[300],
    // @ts-ignore
    lineHeight: theme.global.type.lineHeights.base[300],
    // @ts-ignore
    fontWeight: theme.global.type.fontWeights.regular,
  }),
});
