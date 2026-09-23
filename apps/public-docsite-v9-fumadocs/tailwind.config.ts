import { webDarkTheme, webLightTheme } from '@fluentui/react-theme';
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const theme = webLightTheme;

export default {
  theme: {
    extend: {
      colors: {
        surface: 'var(--surface)',
        foreground: 'var(--foreground)',
        stroke: 'var(--stroke)',
        muted: 'var(--muted)',
      },
      spacing: {
        xxs: theme.spacingHorizontalXXS,
        xs: theme.spacingHorizontalXS,
        sm: theme.spacingHorizontalS,
        md: theme.spacingHorizontalM,
        lg: theme.spacingHorizontalL,
        xl: theme.spacingHorizontalXL,
        '2xl': theme.spacingHorizontalXXL,
        '3xl': theme.spacingHorizontalXXXL,
        'section-double': `calc(${theme.spacingVerticalXXXL} * 2)`,
        'section-triple': `calc(${theme.spacingVerticalXXXL} * 3)`,
        preview: `calc(${theme.spacingVerticalXXXL} * 4)`,
        control: `calc(${theme.lineHeightBase300} + ${theme.spacingVerticalM})`,
        indicator: theme.spacingHorizontalL,
        track: theme.spacingHorizontalXXXL,
        icon: theme.fontSizeBase500,
        'select-end': `calc(${theme.spacingHorizontalL} + ${theme.spacingHorizontalS} + ${theme.spacingHorizontalM})`,
        'thumb-checked': `calc(100% - ${theme.spacingHorizontalM} - ${theme.spacingHorizontalXXS})`,
      },
      fontSize: {
        small: theme.fontSizeBase200,
        control: [theme.fontSizeBase300, theme.lineHeightBase300],
        body: [theme.fontSizeBase400, theme.lineHeightBase400],
        lead: [theme.fontSizeBase500, theme.lineHeightBase500],
        heading: [theme.fontSizeBase600, theme.lineHeightBase600],
        'title-mobile': [theme.fontSizeHero800, theme.lineHeightHero800],
        title: [theme.fontSizeHero900, theme.lineHeightHero900],
      },
      fontWeight: {
        semibold: theme.fontWeightSemibold,
        bold: theme.fontWeightBold,
      },
      borderRadius: {
        control: theme.borderRadiusMedium,
        panel: theme.borderRadiusLarge,
        round: theme.borderRadiusCircular,
      },
      borderWidth: { thin: theme.strokeWidthThin },
      outlineWidth: { focus: theme.strokeWidthThick },
      outlineOffset: { focus: theme.strokeWidthThick },
      textUnderlineOffset: { inset: theme.spacingHorizontalXXS },
      transitionDuration: { fast: theme.durationFast },
      transitionTimingFunction: { decelerate: theme.curveDecelerateMid, standard: theme.curveEasyEase },
      boxShadow: {
        popover: theme.shadow8,
        active: `inset 0 0 0 ${theme.strokeWidthThick} var(--muted)`,
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--surface': theme.colorNeutralBackground1,
          '--foreground': theme.colorNeutralForeground1,
          '--stroke': theme.colorNeutralStroke1,
          '--muted': theme.colorNeutralForeground3,
        },
        '.dark': {
          '--surface': webDarkTheme.colorNeutralBackground1,
          '--foreground': webDarkTheme.colorNeutralForeground1,
          '--stroke': webDarkTheme.colorNeutralStroke1,
          '--muted': webDarkTheme.colorNeutralForeground3,
        },
      });
    }),
  ],
} satisfies Config;
