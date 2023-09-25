import type { FontFamilyTokens, FontSizeTokens, FontWeightTokens, LineHeightTokens } from '../types';

export const fontSizes: FontSizeTokens = {
  fontSizeBase100: '10px',
  fontSizeBase200: '12px',
  fontSizeBase300: '14px',
  fontSizeBase400: '16px',
  fontSizeBase500: '20px',
  fontSizeBase600: '24px',

  fontSizeHero700: '28px',
  fontSizeHero800: '32px',
  fontSizeHero900: '40px',
  fontSizeHero1000: '68px',
};

export const lineHeights: LineHeightTokens = {
  lineHeightBase100: '14px',
  lineHeightBase200: '16px',
  lineHeightBase300: '20px',
  lineHeightBase400: '22px',
  lineHeightBase500: '28px',
  lineHeightBase600: '32px',

  lineHeightHero700: '36px',
  lineHeightHero800: '40px',
  lineHeightHero900: '52px',
  lineHeightHero1000: '92px',
};

export const fontWeights: FontWeightTokens = {
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,
};

export const fontFamilies: FontFamilyTokens = {
  fontFamilyBase:
    // eslint-disable-next-line @fluentui/max-len
    "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
  fontFamilyMonospace: "Consolas, 'Courier New', Courier, monospace",
  fontFamilyNumeric:
    // eslint-disable-next-line @fluentui/max-len
    "Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
};
