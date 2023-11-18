import { makeStyles, shorthands, tokens, typographyStyles } from '@fluentui/react-components';

export const useAreaCardStyles = makeStyles({
  root: {
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorNeutralBackground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.overflow('visible'),
    ...shorthands.padding('40px'),
    boxSizing: 'border-box',
    boxShadow: tokens.shadow16,
    ...shorthands.margin('50px'),
  },
  title: {
    ...typographyStyles.subtitle1,
    color: tokens.colorBrandForeground2,
  },
  items: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
  column: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
});
