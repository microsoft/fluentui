import type { ComponentStyleSpec } from '@fluentui/style-spec';

/**
 * Style spec for the Badge component. Transcribed from `@fluentui/react-badge` `useBadgeStyles.styles.ts`.
 *
 * @public
 */
export const BadgeSpec: ComponentStyleSpec = {
  $schema: 'https://fluentui.dev/schemas/component-style-spec/v1.json',
  name: 'Badge',
  version: 1,
  description: 'A badge is a visual decoration for UI elements.',
  slots: ['root', 'icon'],
  variants: {
    appearance: { values: ['filled', 'ghost', 'outline', 'tint'], default: 'filled' },
    color: {
      values: ['brand', 'danger', 'important', 'informative', 'severe', 'subtle', 'success', 'warning'],
      default: 'brand',
    },
    size: { values: ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'], default: 'medium' },
    shape: { values: ['circular', 'rounded', 'square'], default: 'circular' },
    iconPosition: { values: ['before', 'after'], default: 'before' },
  },
  states: {
    hasText: { type: 'boolean', description: 'The badge renders text content next to the icon.' },
  },
  rules: [
    {
      slot: 'root',
      declarations: {
        display: 'inline-flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: { token: 'fontFamilyBase' },
        fontSize: { token: 'fontSizeBase200' },
        fontWeight: { token: 'fontWeightSemibold' },
        lineHeight: { token: 'lineHeightBase200' },
        height: '20px',
        minWidth: '20px',
        padding: {
          concat: ['0 calc(', { token: 'spacingHorizontalXS' }, ' + ', { token: 'spacingHorizontalXXS' }, ')'],
        },
        borderRadius: { token: 'borderRadiusCircular' },
        borderColor: { token: 'colorTransparentStroke' },
      },
    },
    {
      slot: 'root',
      when: { pseudo: '::after' },
      description: 'The border is drawn in a pseudo-element so it does not affect layout.',
      declarations: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderStyle: 'solid',
        borderColor: 'inherit',
        borderWidth: { token: 'strokeWidthThin' },
        borderRadius: 'inherit',
      },
    },
    {
      slot: 'root',
      when: { variants: { size: 'tiny' } },
      declarations: {
        width: '6px',
        height: '6px',
        fontSize: '4px',
        lineHeight: '4px',
        minWidth: 'unset',
        padding: 'unset',
        fontFamily: { token: 'fontFamilyBase' },
        fontWeight: { token: 'fontWeightSemibold' },
      },
    },
    {
      slot: 'root',
      when: { variants: { size: 'extra-small' } },
      declarations: {
        width: '10px',
        height: '10px',
        fontSize: '6px',
        lineHeight: '6px',
        minWidth: 'unset',
        padding: 'unset',
        fontFamily: { token: 'fontFamilyBase' },
        fontWeight: { token: 'fontWeightSemibold' },
      },
    },
    {
      slot: 'root',
      when: { variants: { size: 'small' } },
      declarations: {
        minWidth: '16px',
        height: '16px',
        padding: {
          concat: ['0 calc(', { token: 'spacingHorizontalXXS' }, ' + ', { token: 'spacingHorizontalXXS' }, ')'],
        },
        fontFamily: { token: 'fontFamilyBase' },
        fontSize: { token: 'fontSizeBase100' },
        fontWeight: { token: 'fontWeightSemibold' },
        lineHeight: { token: 'lineHeightBase100' },
      },
    },
    {
      slot: 'root',
      when: { variants: { size: 'large' } },
      declarations: {
        minWidth: '24px',
        height: '24px',
        padding: {
          concat: ['0 calc(', { token: 'spacingHorizontalXS' }, ' + ', { token: 'spacingHorizontalXXS' }, ')'],
        },
      },
    },
    {
      slot: 'root',
      when: { variants: { size: 'extra-large' } },
      declarations: {
        minWidth: '32px',
        height: '32px',
        padding: {
          concat: ['0 calc(', { token: 'spacingHorizontalSNudge' }, ' + ', { token: 'spacingHorizontalXXS' }, ')'],
        },
      },
    },
    {
      slot: 'root',
      when: { variants: { shape: 'square' } },
      declarations: { borderRadius: { token: 'borderRadiusNone' } },
    },
    {
      slot: 'root',
      when: { variants: { shape: 'rounded' } },
      declarations: { borderRadius: { token: 'borderRadiusMedium' } },
    },
    {
      slot: 'root',
      when: { variants: { shape: 'rounded', size: 'tiny' } },
      declarations: { borderRadius: { token: 'borderRadiusSmall' } },
    },
    {
      slot: 'root',
      when: { variants: { shape: 'rounded', size: 'extra-small' } },
      declarations: { borderRadius: { token: 'borderRadiusSmall' } },
    },
    {
      slot: 'root',
      when: { variants: { shape: 'rounded', size: 'small' } },
      declarations: { borderRadius: { token: 'borderRadiusSmall' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost' }, pseudo: '::after' },
      description: 'Ghost badges have no border.',
      declarations: { display: 'none' },
    },
    { slot: 'root', when: { variants: { appearance: 'outline' } }, declarations: { borderColor: 'currentColor' } },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'brand' } },
      declarations: {
        backgroundColor: { token: 'colorBrandBackground' },
        color: { token: 'colorNeutralForegroundOnBrand' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'danger' } },
      declarations: {
        backgroundColor: { token: 'colorPaletteRedBackground3' },
        color: { token: 'colorNeutralForegroundOnBrand' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'important' } },
      declarations: {
        backgroundColor: { token: 'colorNeutralForeground1' },
        color: { token: 'colorNeutralBackground1' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'informative' } },
      declarations: {
        backgroundColor: { token: 'colorNeutralBackground5' },
        color: { token: 'colorNeutralForeground3' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'severe' } },
      declarations: {
        backgroundColor: { token: 'colorPaletteDarkOrangeBackground3' },
        color: { token: 'colorNeutralForegroundOnBrand' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'subtle' } },
      declarations: {
        backgroundColor: { token: 'colorNeutralBackground1' },
        color: { token: 'colorNeutralForeground1' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'success' } },
      declarations: {
        backgroundColor: { token: 'colorPaletteGreenBackground3' },
        color: { token: 'colorNeutralForegroundOnBrand' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'filled', color: 'warning' } },
      declarations: {
        backgroundColor: { token: 'colorPaletteYellowBackground3' },
        color: { token: 'colorNeutralForeground1Static' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost', color: 'brand' } },
      declarations: { color: { token: 'colorBrandForeground1' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost', color: 'danger' } },
      declarations: { color: { token: 'colorPaletteRedForeground3' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost', color: 'important' } },
      declarations: { color: { token: 'colorNeutralForeground1' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost', color: 'informative' } },
      declarations: { color: { token: 'colorNeutralForeground3' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost', color: 'severe' } },
      declarations: { color: { token: 'colorPaletteDarkOrangeForeground3' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost', color: 'subtle' } },
      declarations: { color: { token: 'colorNeutralForegroundStaticInverted' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost', color: 'success' } },
      declarations: { color: { token: 'colorPaletteGreenForeground3' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'ghost', color: 'warning' } },
      declarations: { color: { token: 'colorPaletteYellowForeground2' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline', color: 'brand' } },
      declarations: {
        color: { token: 'colorBrandForeground1' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline', color: 'danger' } },
      declarations: {
        color: { token: 'colorPaletteRedForeground3' },
        borderColor: { token: 'colorPaletteRedBorder2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline', color: 'important' } },
      declarations: {
        color: { token: 'colorNeutralForeground3' },
        borderColor: { token: 'colorNeutralStrokeAccessible' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline', color: 'informative' } },
      declarations: {
        color: { token: 'colorNeutralForeground3' },
        borderColor: { token: 'colorNeutralStroke2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline', color: 'severe' } },
      declarations: {
        color: { token: 'colorPaletteDarkOrangeForeground3' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline', color: 'subtle' } },
      declarations: {
        color: { token: 'colorNeutralForegroundStaticInverted' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline', color: 'success' } },
      declarations: {
        color: { token: 'colorPaletteGreenForeground3' },
        borderColor: { token: 'colorPaletteGreenBorder2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline', color: 'warning' } },
      declarations: {
        color: { token: 'colorPaletteYellowForeground2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'tint', color: 'brand' } },
      declarations: {
        backgroundColor: { token: 'colorBrandBackground2' },
        color: { token: 'colorBrandForeground2' },
        borderColor: { token: 'colorBrandStroke2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'tint', color: 'danger' } },
      declarations: {
        backgroundColor: { token: 'colorPaletteRedBackground1' },
        color: { token: 'colorPaletteRedForeground1' },
        borderColor: { token: 'colorPaletteRedBorder1' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'tint', color: 'important' } },
      declarations: {
        backgroundColor: { token: 'colorNeutralForeground3' },
        color: { token: 'colorNeutralBackground1' },
        borderColor: { token: 'colorTransparentStroke' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'tint', color: 'informative' } },
      declarations: {
        backgroundColor: { token: 'colorNeutralBackground4' },
        color: { token: 'colorNeutralForeground3' },
        borderColor: { token: 'colorNeutralStroke2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'tint', color: 'severe' } },
      declarations: {
        backgroundColor: { token: 'colorPaletteDarkOrangeBackground1' },
        color: { token: 'colorPaletteDarkOrangeForeground1' },
        borderColor: { token: 'colorPaletteDarkOrangeBorder1' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'tint', color: 'subtle' } },
      declarations: {
        backgroundColor: { token: 'colorNeutralBackground1' },
        color: { token: 'colorNeutralForeground3' },
        borderColor: { token: 'colorNeutralStroke2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'tint', color: 'success' } },
      declarations: {
        backgroundColor: { token: 'colorPaletteGreenBackground1' },
        color: { token: 'colorPaletteGreenForeground1' },
        borderColor: { token: 'colorPaletteGreenBorder1' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'tint', color: 'warning' } },
      declarations: {
        backgroundColor: { token: 'colorPaletteYellowBackground1' },
        color: { token: 'colorPaletteYellowForeground1' },
        borderColor: { token: 'colorPaletteYellowBorder1' },
      },
    },
    {
      slot: 'icon',
      declarations: {
        display: 'flex',
        lineHeight: '1',
        margin: { concat: ['0 calc(-1 * ', { token: 'spacingHorizontalXXS' }, ')'] },
        fontSize: '12px',
      },
    },
    { slot: 'icon', when: { variants: { size: 'tiny' } }, declarations: { fontSize: '6px' } },
    { slot: 'icon', when: { variants: { size: 'extra-small' } }, declarations: { fontSize: '10px' } },
    { slot: 'icon', when: { variants: { size: 'small' } }, declarations: { fontSize: '12px' } },
    { slot: 'icon', when: { variants: { size: 'large' } }, declarations: { fontSize: '16px' } },
    { slot: 'icon', when: { variants: { size: 'extra-large' } }, declarations: { fontSize: '20px' } },
    {
      slot: 'icon',
      when: { variants: { iconPosition: 'before' }, states: { hasText: true } },
      declarations: {
        marginRight: {
          concat: ['calc(', { token: 'spacingHorizontalXXS' }, ' + ', { token: 'spacingHorizontalXXS' }, ')'],
        },
      },
    },
    {
      slot: 'icon',
      when: { variants: { iconPosition: 'after' }, states: { hasText: true } },
      declarations: {
        marginLeft: {
          concat: ['calc(', { token: 'spacingHorizontalXXS' }, ' + ', { token: 'spacingHorizontalXXS' }, ')'],
        },
      },
    },
    {
      slot: 'icon',
      when: { variants: { iconPosition: 'before', size: 'extra-large' }, states: { hasText: true } },
      declarations: {
        marginRight: {
          concat: ['calc(', { token: 'spacingHorizontalXS' }, ' + ', { token: 'spacingHorizontalXXS' }, ')'],
        },
      },
    },
    {
      slot: 'icon',
      when: { variants: { iconPosition: 'after', size: 'extra-large' }, states: { hasText: true } },
      declarations: {
        marginLeft: {
          concat: ['calc(', { token: 'spacingHorizontalXS' }, ' + ', { token: 'spacingHorizontalXXS' }, ')'],
        },
      },
    },
  ],
};
