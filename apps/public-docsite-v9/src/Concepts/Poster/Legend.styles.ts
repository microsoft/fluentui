import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useLegendStyles = makeStyles({
  root: {
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    rowGap: tokens.spacingVerticalMNudge,
    columnGap: tokens.spacingHorizontalSNudge,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.margin(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
  },
  icon: {
    color: tokens.colorNeutralForeground4,
  },
  name: {},
});
