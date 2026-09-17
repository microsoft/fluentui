import type { ComponentStyleSpec } from '@fluentui/style-spec';

/**
 * Style spec for the Button component. Transcribed from `@fluentui/react-button` `useButtonStyles.styles.ts`.
 *
 * Known gaps versus the hand-written styles (tracked in the RFC):
 * - swapping `@fluentui/react-icons` filled/regular icon variants on hover is not expressed (icon-library specific)
 * - tabster `createCustomFocusIndicatorStyle` is approximated as `:focus-visible`
 *
 * @public
 */
export const ButtonSpec: ComponentStyleSpec = {
  $schema: 'https://fluentui.dev/schemas/component-style-spec/v1.json',
  name: 'Button',
  version: 1,
  description: 'A button triggers an action or event when activated.',
  slots: ['root', 'icon'],
  variants: {
    appearance: { values: ['secondary', 'primary', 'outline', 'subtle', 'transparent'], default: 'secondary' },
    size: { values: ['small', 'medium', 'large'], default: 'medium' },
    shape: { values: ['rounded', 'circular', 'square'], default: 'rounded' },
    iconPosition: { values: ['before', 'after'], default: 'before' },
  },
  states: {
    disabled: { type: 'boolean', description: 'The button is disabled (including disabled-but-focusable).' },
    iconOnly: { type: 'boolean', description: 'The button renders an icon without text content.' },
    hasIcon: { type: 'boolean', description: 'The button renders an icon.' },
    hasChildren: { type: 'boolean', description: 'The button renders text content.' },
  },
  rules: [
    {
      slot: 'root',
      declarations: {
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'inline-flex',
        justifyContent: 'center',
        textDecorationLine: 'none',
        verticalAlign: 'middle',
        margin: 0,
        overflow: 'hidden',
        backgroundColor: { token: 'colorNeutralBackground1' },
        color: { token: 'colorNeutralForeground1' },
        border: { concat: [{ token: 'strokeWidthThin' }, ' solid ', { token: 'colorNeutralStroke1' }] },
        fontFamily: { token: 'fontFamilyBase' },
        outlineStyle: 'none',
        padding: { concat: ['5px ', { token: 'spacingHorizontalM' }] },
        minWidth: '96px',
        borderRadius: { token: 'borderRadiusMedium' },
        fontSize: { token: 'fontSizeBase300' },
        fontWeight: { token: 'fontWeightSemibold' },
        lineHeight: { token: 'lineHeightBase300' },
        transitionDuration: { token: 'durationFaster' },
        transitionProperty: 'background, border, color',
        transitionTimingFunction: { token: 'curveEasyEase' },
      },
    },
    {
      slot: 'root',
      when: { pseudo: ':hover' },
      declarations: {
        backgroundColor: { token: 'colorNeutralBackground1Hover' },
        borderColor: { token: 'colorNeutralStroke1Hover' },
        color: { token: 'colorNeutralForeground1Hover' },
        cursor: 'pointer',
      },
    },
    {
      slot: 'root',
      when: { pseudo: ':hover:active, :active:focus-visible' },
      declarations: {
        backgroundColor: { token: 'colorNeutralBackground1Pressed' },
        borderColor: { token: 'colorNeutralStroke1Pressed' },
        color: { token: 'colorNeutralForeground1Pressed' },
        outlineStyle: 'none',
      },
    },
    {
      slot: 'root',
      when: { media: 'screen and (prefers-reduced-motion: reduce)' },
      declarations: { transitionDuration: '0.01ms' },
    },
    {
      slot: 'root',
      when: { media: '(forced-colors: active)', pseudo: ':hover' },
      declarations: {
        backgroundColor: 'HighlightText',
        borderColor: 'Highlight',
        color: 'Highlight',
        forcedColorAdjust: 'none',
      },
    },
    {
      slot: 'root',
      when: { pseudo: ':focus-visible' },
      declarations: {
        borderColor: { token: 'colorStrokeFocus2' },
        borderRadius: { token: 'borderRadiusMedium' },
        borderWidth: '1px',
        outline: { concat: [{ token: 'strokeWidthThick' }, ' solid ', { token: 'colorTransparentStroke' }] },
        boxShadow: { concat: ['0 0 0 ', { token: 'strokeWidthThin' }, ' ', { token: 'colorStrokeFocus2' }, ' inset'] },
        zIndex: 1,
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline' } },
      declarations: { backgroundColor: { token: 'colorTransparentBackground' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline' }, pseudo: ':hover' },
      declarations: { backgroundColor: { token: 'colorTransparentBackgroundHover' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'primary' } },
      declarations: {
        backgroundColor: { token: 'colorBrandBackground' },
        borderColor: 'transparent',
        color: { token: 'colorNeutralForegroundOnBrand' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'primary' }, pseudo: ':hover' },
      declarations: {
        backgroundColor: { token: 'colorBrandBackgroundHover' },
        borderColor: 'transparent',
        color: { token: 'colorNeutralForegroundOnBrand' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'primary' }, pseudo: ':hover:active, :active:focus-visible' },
      declarations: {
        backgroundColor: { token: 'colorBrandBackgroundPressed' },
        borderColor: 'transparent',
        color: { token: 'colorNeutralForegroundOnBrand' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'primary' }, media: '(forced-colors: active)' },
      declarations: {
        backgroundColor: 'Highlight',
        borderColor: 'HighlightText',
        color: 'HighlightText',
        forcedColorAdjust: 'none',
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'subtle' } },
      declarations: {
        backgroundColor: { token: 'colorSubtleBackground' },
        borderColor: 'transparent',
        color: { token: 'colorNeutralForeground2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'subtle' }, pseudo: ':hover' },
      declarations: {
        backgroundColor: { token: 'colorSubtleBackgroundHover' },
        borderColor: 'transparent',
        color: { token: 'colorNeutralForeground2Hover' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'transparent' } },
      declarations: {
        backgroundColor: { token: 'colorTransparentBackground' },
        borderColor: 'transparent',
        color: { token: 'colorNeutralForeground2' },
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'transparent' }, pseudo: ':hover' },
      declarations: {
        backgroundColor: { token: 'colorTransparentBackgroundHover' },
        borderColor: 'transparent',
        color: { token: 'colorNeutralForeground2BrandHover' },
      },
    },
    {
      slot: 'root',
      when: { variants: { size: 'small' } },
      declarations: {
        minWidth: '64px',
        padding: { concat: ['3px ', { token: 'spacingHorizontalS' }] },
        borderRadius: { token: 'borderRadiusMedium' },
        fontSize: { token: 'fontSizeBase200' },
        fontWeight: { token: 'fontWeightRegular' },
        lineHeight: { token: 'lineHeightBase200' },
      },
    },
    {
      slot: 'root',
      when: { variants: { size: 'large' } },
      declarations: {
        minWidth: '96px',
        padding: { concat: ['8px ', { token: 'spacingHorizontalL' }] },
        borderRadius: { token: 'borderRadiusMedium' },
        fontSize: { token: 'fontSizeBase400' },
        fontWeight: { token: 'fontWeightSemibold' },
        lineHeight: { token: 'lineHeightBase400' },
      },
    },
    {
      slot: 'root',
      when: { variants: { size: 'small' }, states: { hasIcon: true } },
      declarations: { paddingBottom: '1px', paddingTop: '1px' },
    },
    {
      slot: 'root',
      when: { variants: { size: 'large' }, states: { hasIcon: true } },
      declarations: { paddingBottom: '7px', paddingTop: '7px' },
    },
    {
      slot: 'root',
      when: { variants: { shape: 'circular' } },
      declarations: { borderRadius: { token: 'borderRadiusCircular' } },
    },
    {
      slot: 'root',
      when: { variants: { shape: 'square' } },
      declarations: { borderRadius: { token: 'borderRadiusNone' } },
    },
    {
      slot: 'root',
      when: { states: { disabled: true } },
      declarations: {
        backgroundColor: { token: 'colorNeutralBackgroundDisabled' },
        borderColor: { token: 'colorNeutralStrokeDisabled' },
        color: { token: 'colorNeutralForegroundDisabled' },
        cursor: 'not-allowed',
      },
    },
    {
      slot: 'root',
      when: { states: { disabled: true }, pseudo: ':hover' },
      declarations: {
        backgroundColor: { token: 'colorNeutralBackgroundDisabled' },
        borderColor: { token: 'colorNeutralStrokeDisabled' },
        color: { token: 'colorNeutralForegroundDisabled' },
        cursor: 'not-allowed',
      },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline' }, states: { disabled: true } },
      declarations: { backgroundColor: { token: 'colorTransparentBackground' } },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'subtle' }, states: { disabled: true } },
      declarations: { backgroundColor: { token: 'colorTransparentBackground' }, borderColor: 'transparent' },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'transparent' }, states: { disabled: true } },
      declarations: { backgroundColor: { token: 'colorTransparentBackground' }, borderColor: 'transparent' },
    },
    {
      slot: 'root',
      when: { variants: { appearance: 'primary' }, states: { disabled: true } },
      declarations: { borderColor: 'transparent' },
    },
    {
      slot: 'root',
      when: { variants: { size: 'small' }, states: { iconOnly: true } },
      declarations: { padding: '1px', minWidth: '24px', maxWidth: '24px' },
    },
    {
      slot: 'root',
      when: { variants: { size: 'medium' }, states: { iconOnly: true } },
      declarations: { padding: '5px', minWidth: '32px', maxWidth: '32px' },
    },
    {
      slot: 'root',
      when: { variants: { size: 'large' }, states: { iconOnly: true } },
      declarations: { padding: '7px', minWidth: '40px', maxWidth: '40px' },
    },
    {
      slot: 'icon',
      declarations: {
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        fontSize: '20px',
        height: '20px',
        width: '20px',
        '--fui-Button__icon--spacing': { token: 'spacingHorizontalSNudge' },
      },
    },
    {
      slot: 'icon',
      when: { variants: { size: 'small' } },
      declarations: {
        fontSize: '20px',
        height: '20px',
        width: '20px',
        '--fui-Button__icon--spacing': { token: 'spacingHorizontalXS' },
      },
    },
    {
      slot: 'icon',
      when: { variants: { size: 'large' } },
      declarations: {
        fontSize: '24px',
        height: '24px',
        width: '24px',
        '--fui-Button__icon--spacing': { token: 'spacingHorizontalSNudge' },
      },
    },
    {
      slot: 'icon',
      when: { variants: { iconPosition: 'before' }, states: { hasChildren: true } },
      declarations: { marginRight: { var: '--fui-Button__icon--spacing' } },
    },
    {
      slot: 'icon',
      when: { variants: { iconPosition: 'after' }, states: { hasChildren: true } },
      declarations: { marginLeft: { var: '--fui-Button__icon--spacing' } },
    },
    {
      slot: 'icon',
      when: { variants: { appearance: 'subtle' }, rootPseudo: ':hover' },
      declarations: { color: { token: 'colorNeutralForeground2BrandHover' } },
    },
    {
      slot: 'icon',
      when: { states: { disabled: true } },
      declarations: { color: { token: 'colorNeutralForegroundDisabled' } },
    },
  ],
};
