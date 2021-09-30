import { makeStyles } from '@fluentui/react-make-styles';

export const useStylesA = makeStyles({
  neutral: theme => ({
    // @ts-expect-error
    border: `5px solid ${theme.alias.color.neutral.neutralStroke1}`,
    // @ts-expect-error
    color: theme.alias.color.neutral.neutralForeground1,
  }),
  colors: theme => ({
    // @ts-expect-error
    border: `5px solid ${theme.alias.color.blue.border2}`,
    // @ts-expect-error
    color: theme.alias.color.marigold.foreground2,
  }),
  shadow: theme => ({
    // @ts-expect-error
    boxShadow: theme.alias.shadow.shadow8,
  }),
  border: theme => ({
    // @ts-expect-error
    borderRadius: theme.global.borderRadius.circular,
  }),
  stroke: theme => ({
    // @ts-expect-error
    borderBottomWidth: theme.global.strokeWidth.thin,
  }),
  type: theme => ({
    // @ts-expect-error
    fontFamily: theme.global.type.fontFamilies.base,
    // @ts-expect-error
    fontSize: theme.global.type.fontSizes.base[300],
    // @ts-expect-error
    lineHeight: theme.global.type.lineHeights.base[300],
    // @ts-expect-error
    fontWeight: theme.global.type.fontWeights.regular,
  }),
});
