// @ts-nocheck
import { makeStyles } from '@fluentui/react-make-styles';

export const useStylesA = makeStyles({
  neutral: theme => ({
    border: `5px solid ${theme.alias.color.neutral.neutralStroke1}`,
    color: theme.alias.color.neutral.neutralForeground1,
  }),
  colors: theme => ({
    border: `5px solid ${theme.alias.color.blue.border2}`,
    color: theme.alias.color.marigold.foreground2,
  }),
  shadow: theme => ({
    boxShadow: theme.alias.shadow.shadow8,
  }),
  border: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),
  stroke: theme => ({
    borderBottomWidth: theme.global.strokeWidth.thin,
  }),
  type: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
});
