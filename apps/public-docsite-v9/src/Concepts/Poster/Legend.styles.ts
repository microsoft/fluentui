import { makeStyles, tokens } from '@fluentui/react-components';

export const useLegendStyles = makeStyles({
  root: {
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    rowGap: tokens.spacingVerticalMNudge,
    columnGap: tokens.spacingHorizontalSNudge,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
  },
  icon: {
    color: tokens.colorNeutralForeground4,
  },
  name: {},
});
