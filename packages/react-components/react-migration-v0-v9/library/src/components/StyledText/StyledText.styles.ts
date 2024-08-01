import { makeStyles, tokens } from '@fluentui/react-components';

export const useSizeStyles = makeStyles({
  base100: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
  },
  base200: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  base300: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  base400: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  base500: {
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
  base600: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
  },
  hero700: {
    fontSize: tokens.fontSizeHero700,
    lineHeight: tokens.lineHeightHero700,
  },
});

export const useWeightStyles = makeStyles({
  light: {
    fontWeight: 200,
  },
  semilight: {
    fontWeight: 300,
  },
  regular: {
    fontWeight: 400,
  },
  medium: {
    fontWeight: 500,
  },
  semibold: {
    fontWeight: 600,
  },
  bold: {
    fontWeight: 700,
  },
});

export const useStyles = makeStyles({
  mention: {
    color: tokens.colorBrandForegroundLink,
  },
  mentionMe: {
    color: tokens.colorPalettePumpkinBorderActive,
    fontWeight: 700,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },
  error: {
    color: tokens.colorPaletteRedForeground3,
  },
  important: {
    color: tokens.colorPaletteDarkOrangeForeground3,
    fontWeight: 700,
  },
  success: {
    color: tokens.colorPaletteGreenForeground3,
  },
  temporary: {
    fontStyle: 'italic',
  },
  timestamp: {
    color: tokens.colorNeutralForeground3,
  },
  nowrap: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  truncate: {
    textOverflow: 'ellipsis',
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignEnd: {
    textAlign: 'end',
  },
  alignJustify: {
    textAlign: 'justify',
  },
});
