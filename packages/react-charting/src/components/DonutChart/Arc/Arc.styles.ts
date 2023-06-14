import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  href: {
    cursor: 'pointer',
  },
  root: {
    cursor: 'default',
    stroke: tokens.colorNeutralStrokeOnBrand2,
    ...shorthands.outline('0', 'transparent'),
    '&.selectors': {
      '::-moz-focus-inner': {
        ...shorthands.border('0'),
      },
    },
  },
  focusRing: {
    stroke: tokens.colorNeutralStrokeAccessible,
    strokeWidth: tokens.strokeWidthThickest,
    fill: tokens.colorSubtleBackground, //in every theme it will remain transparent
  },
  arcLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    fill: tokens.colorNeutralForeground1,
  },
});
