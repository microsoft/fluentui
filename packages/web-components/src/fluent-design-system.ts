import { Direction } from '@microsoft/fast-web-utilities';
import { accentPalette as defaultAccentPalette, neutralPalette as defaultNeutralPalette } from './default-palette';

export type DesignSystemResolver<T, Y = DesignSystem> = (d: Y) => T;

export type DensityOffset = -3 | -2 | -1 | 0 | 1 | 2 | 3;

/**
 * Defines the properties in the FAST Design System
 * @public
 */
export interface DesignSystem {
  /**
   * Type-ramp font-size and line-height values
   */
  typeRampMinus2FontSize: string;
  typeRampMinus2LineHeight: string;
  typeRampMinus1FontSize: string;
  typeRampMinus1LineHeight: string;
  typeRampBaseFontSize: string;
  typeRampBaseLineHeight: string;
  typeRampPlus1FontSize: string;
  typeRampPlus1LineHeight: string;
  typeRampPlus2FontSize: string;
  typeRampPlus2LineHeight: string;
  typeRampPlus3FontSize: string;
  typeRampPlus3LineHeight: string;
  typeRampPlus4FontSize: string;
  typeRampPlus4LineHeight: string;
  typeRampPlus5FontSize: string;
  typeRampPlus5LineHeight: string;
  typeRampPlus6FontSize: string;
  typeRampPlus6LineHeight: string;

  /**
   * The background color of the current context.
   * May be used to draw an actual background or not. Color recipes evaluated within this context will use this as their basis.
   */
  backgroundColor: string;

  /**
   * The neutral color, which the neutral palette is based on.
   * Keep this value in sync with neutralPalette.
   */
  neutralBaseColor: string;

  /**
   * The accent color, which the accent palette is based on.
   * Keep this value in sync with accentPalette.
   */
  accentBaseColor: string;

  /**
   * An array of colors in a ramp from light to dark, used to look up values for neutral color recipes.
   * Keep this value in sync with neutralBaseColor.
   * Generate by calling createColorPalette.
   */
  neutralPalette: string[];

  /**
   * An array of colors in a ramp from light to dark, used to lookup values for accent color recipes.
   * Keep this value in sync with accentBaseColor.
   * Generate by calling createColorPalette.
   */
  accentPalette: string[];

  /**
   * The density offset, used with designUnit to calculate height and spacing.
   */
  density: number;

  /**
   * The grid-unit that UI dimensions are derived from in pixels.
   */
  designUnit: number;

  /**
   * The primary document direction.
   */
  direction: Direction;

  /**
   * The number of designUnits used for component height at the base density.
   */
  baseHeightMultiplier: number;

  /**
   * The number of designUnits used for horizontal spacing at the base density.
   */
  baseHorizontalSpacingMultiplier: number;

  /**
   * The corner radius applied to controls.
   */
  cornerRadius: number;

  /**
   * The corner radius applied to elevated surfaces or controls.
   */
  elevatedCornerRadius?: number;

  /**
   * The width of the standard outline applied to outline components in pixels.
   */
  outlineWidth: number;

  /**
   * The width of the standard focus outline in pixels.
   */
  focusOutlineWidth: number;

  /**
   * The opacity of a disabled control.
   */
  disabledOpacity: number;

  /**
   * Color swatch deltas for the accent-fill recipe.
   */
  accentFillRestDelta: number;
  accentFillHoverDelta: number;
  accentFillActiveDelta: number;
  accentFillFocusDelta: number;
  accentFillSelectedDelta: number;

  /**
   * Color swatch deltas for the accent-foreground recipe.
   */
  accentForegroundRestDelta: number;
  accentForegroundHoverDelta: number;
  accentForegroundActiveDelta: number;
  accentForegroundFocusDelta: number;

  /*
   * Color swatch deltas for the neutral-fill recipe.
   */
  neutralFillRestDelta: number;
  neutralFillHoverDelta: number;
  neutralFillActiveDelta: number;
  neutralFillFocusDelta: number;
  neutralFillSelectedDelta: number;

  /**
   * Color swatch deltas for the neutral-fill-input recipe.
   */
  neutralFillInputRestDelta: number;
  neutralFillInputHoverDelta: number;
  neutralFillInputActiveDelta: number;
  neutralFillInputFocusDelta: number;
  neutralFillInputSelectedDelta: number;

  /**
   * Color swatch deltas for the neutral-fill-stealth recipe.
   */
  neutralFillStealthRestDelta: number;
  neutralFillStealthHoverDelta: number;
  neutralFillStealthActiveDelta: number;
  neutralFillStealthFocusDelta: number;
  neutralFillStealthSelectedDelta: number;

  /**
   * Configuration for the neutral-fill-toggle recipe.
   */
  neutralFillToggleHoverDelta: number;
  neutralFillToggleActiveDelta: number;
  neutralFillToggleFocusDelta: number;

  /**
   * The luminance value to base layer recipes on.
   * Sets the luminance value for the L1 layer recipe in a manner that can adjust to variable contrast.
   *
   * Currently defaults to -1 to turn the feature off and use backgroundColor for layer colors instead.
   */
  baseLayerLuminance: number; // 0...1

  /**
   * Color swatch deltas for the neutral-fill-card recipe.
   */
  neutralFillCardDelta: number;

  /**
   * Color swatch delta for neutral-foreground recipe.
   */
  neutralForegroundHoverDelta: number;
  neutralForegroundActiveDelta: number;
  neutralForegroundFocusDelta: number;

  /**
   * Color swatch delta for the neutral-divider recipe.
   */
  neutralDividerRestDelta: number;

  /**
   * Color swatch deltas for the neutral-outline recipe.
   */
  neutralOutlineRestDelta: number;
  neutralOutlineHoverDelta: number;
  neutralOutlineActiveDelta: number;
  neutralOutlineFocusDelta: number;

  /*
   * Color swatch deltas for the neutral-contrast-fill recipe.
   */
  neutralContrastFillRestDelta: number;
  neutralContrastFillHoverDelta: number;
  neutralContrastFillActiveDelta: number;
  neutralContrastFillFocusDelta: number;
}

/**
 * The default values for {@link DesignSystem}
 * @public
 */
export const DesignSystemDefaults: DesignSystem = {
  typeRampMinus2FontSize: '10px',
  typeRampMinus2LineHeight: '16px',
  typeRampMinus1FontSize: '12px',
  typeRampMinus1LineHeight: '16px',
  typeRampBaseFontSize: '14px',
  typeRampBaseLineHeight: '20px',
  typeRampPlus1FontSize: '16px',
  typeRampPlus1LineHeight: '24px',
  typeRampPlus2FontSize: '20px',
  typeRampPlus2LineHeight: '28px',
  typeRampPlus3FontSize: '28px',
  typeRampPlus3LineHeight: '36px',
  typeRampPlus4FontSize: '34px',
  typeRampPlus4LineHeight: '44px',
  typeRampPlus5FontSize: '46px',
  typeRampPlus5LineHeight: '56px',
  typeRampPlus6FontSize: '60px',
  typeRampPlus6LineHeight: '72px',

  accentBaseColor: '#0078D4',
  accentPalette: defaultAccentPalette,
  backgroundColor: '#FFFFFF',
  baseHeightMultiplier: 8,
  baseHorizontalSpacingMultiplier: 3,
  cornerRadius: 2,
  elevatedCornerRadius: 4,
  density: 0,
  designUnit: 4,
  direction: Direction.ltr,
  disabledOpacity: 0.3,
  focusOutlineWidth: 2,
  neutralBaseColor: '#808080',
  neutralPalette: defaultNeutralPalette,
  outlineWidth: 1,

  /**
   * Recipe Deltas
   */
  accentFillRestDelta: 0,
  accentFillHoverDelta: 4,
  accentFillActiveDelta: -5,
  accentFillFocusDelta: 0,
  accentFillSelectedDelta: 12,

  accentForegroundRestDelta: 0,
  accentForegroundHoverDelta: 6,
  accentForegroundActiveDelta: -4,
  accentForegroundFocusDelta: 0,

  neutralFillRestDelta: 7,
  neutralFillHoverDelta: 10,
  neutralFillActiveDelta: 5,
  neutralFillFocusDelta: 0,
  neutralFillSelectedDelta: 7,

  neutralFillInputRestDelta: 0,
  neutralFillInputHoverDelta: 0,
  neutralFillInputActiveDelta: 0,
  neutralFillInputFocusDelta: 0,
  neutralFillInputSelectedDelta: 0,

  neutralFillStealthRestDelta: 0,
  neutralFillStealthHoverDelta: 5,
  neutralFillStealthActiveDelta: 3,
  neutralFillStealthFocusDelta: 0,
  neutralFillStealthSelectedDelta: 7,

  neutralFillToggleHoverDelta: 8,
  neutralFillToggleActiveDelta: -5,
  neutralFillToggleFocusDelta: 0,

  baseLayerLuminance: -1,
  neutralFillCardDelta: 3,

  neutralForegroundHoverDelta: 0,
  neutralForegroundActiveDelta: 0,
  neutralForegroundFocusDelta: 0,

  neutralDividerRestDelta: 8,

  neutralOutlineRestDelta: 25,
  neutralOutlineHoverDelta: 40,
  neutralOutlineActiveDelta: 16,
  neutralOutlineFocusDelta: 25,

  neutralContrastFillRestDelta: 0,
  neutralContrastFillHoverDelta: -3,
  neutralContrastFillActiveDelta: 7,
  neutralContrastFillFocusDelta: 0,
};

/**
 * Returns the argument if basic, otherwise calls the DesignSystemResolver function.
 *
 * @param arg A value or a DesignSystemResolver function
 * @param designSystem The design system config.
 */
export function evaluateDesignSystemResolver<T>(arg: T | DesignSystemResolver<T>, designSystem: DesignSystem): T {
  return typeof arg === 'function' ? (arg as DesignSystemResolver<T>)(designSystem) : arg;
}

/**
 * Safely retrieves the value from a key of the DesignSystem.
 */
export function getDesignSystemValue<T extends DesignSystem, K extends keyof T>(key: K): (designSystem?: T) => T[K] {
  return (designSystem?: T): T[K] => {
    return designSystem && designSystem[key] !== undefined ? designSystem[key] : (DesignSystemDefaults as T)[key];
  };
}

/**
 * Retrieve the backgroundColor when invoked with a DesignSystem
 */
export const backgroundColor: DesignSystemResolver<string> = getDesignSystemValue('backgroundColor');

/**
 * Retrieve the neutralBaseColor when invoked with a DesignSystem
 */
export const neutralBaseColor: DesignSystemResolver<string> = getDesignSystemValue('neutralBaseColor');

/**
 * Retrieve the accentBaseColor when invoked with a DesignSystem
 */
export const accentBaseColor: DesignSystemResolver<string> = getDesignSystemValue('accentBaseColor');

/**
 * Retrieve the cornerRadius when invoked with a DesignSystem
 */
export const cornerRadius: DesignSystemResolver<number> = getDesignSystemValue('cornerRadius');

/**
 * Retrieve the neutral palette from the design system
 */
export const neutralPalette: DesignSystemResolver<string[]> = getDesignSystemValue('neutralPalette');

/**
 * Retrieve the accent palette from the design system
 */
export const accentPalette: DesignSystemResolver<string[]> = getDesignSystemValue('accentPalette');

/**
 * Retrieve the designUnit from the design system
 */
export const designUnit: DesignSystemResolver<number> = getDesignSystemValue('designUnit');

/**
 * Retrieve the baseHeightMultiplier from the design system
 */
export const baseHeightMultiplier: DesignSystemResolver<number> = getDesignSystemValue('baseHeightMultiplier');

/**
 * Retrieve the baseHorizontalSpacingMultiplier from the design system
 */
export const baseHorizontalSpacingMultiplier: DesignSystemResolver<number> = getDesignSystemValue(
  'baseHorizontalSpacingMultiplier',
);

/**
 * Retrieve the outlineWidth from the design system
 */
export const outlineWidth: DesignSystemResolver<number> = getDesignSystemValue('outlineWidth');

/**
 * Retrieve the focusOutlineWidth from the design system
 */
export const focusOutlineWidth: DesignSystemResolver<number> = getDesignSystemValue('focusOutlineWidth');
/**
 * Retrieve the disabledOpacity from the design system
 */
export const disabledOpacity: DesignSystemResolver<number> = getDesignSystemValue('disabledOpacity');

/**
 * Retrieve the disabledOpacity from the design system
 */
export const direction: DesignSystemResolver<Direction> = getDesignSystemValue('direction');

export const accentFillRestDelta: DesignSystemResolver<number> = getDesignSystemValue('accentFillRestDelta');
export const accentFillHoverDelta: DesignSystemResolver<number> = getDesignSystemValue('accentFillHoverDelta');
export const accentFillActiveDelta: DesignSystemResolver<number> = getDesignSystemValue('accentFillActiveDelta');
export const accentFillFocusDelta: DesignSystemResolver<number> = getDesignSystemValue('accentFillFocusDelta');
export const accentFillSelectedDelta: DesignSystemResolver<number> = getDesignSystemValue('accentFillSelectedDelta');

export const accentForegroundRestDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'accentForegroundRestDelta',
);
export const accentForegroundHoverDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'accentForegroundHoverDelta',
);
export const accentForegroundActiveDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'accentForegroundActiveDelta',
);
export const accentForegroundFocusDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'accentForegroundFocusDelta',
);

export const neutralFillRestDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralFillRestDelta');
export const neutralFillHoverDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralFillHoverDelta');
export const neutralFillActiveDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralFillActiveDelta');
export const neutralFillFocusDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralFillFocusDelta');
export const neutralFillSelectedDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralFillSelectedDelta');

export const neutralFillInputRestDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillInputRestDelta',
);
export const neutralFillInputHoverDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillInputHoverDelta',
);
export const neutralFillInputActiveDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillInputActiveDelta',
);
export const neutralFillInputFocusDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillInputFocusDelta',
);
export const neutralFillInputSelectedDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillInputSelectedDelta',
);

export const neutralFillStealthRestDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillStealthRestDelta',
);
export const neutralFillStealthHoverDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillStealthHoverDelta',
);
export const neutralFillStealthActiveDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillStealthActiveDelta',
);
export const neutralFillStealthFocusDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillStealthFocusDelta',
);
export const neutralFillStealthSelectedDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillStealthSelectedDelta',
);

export const neutralFillToggleHoverDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillToggleHoverDelta',
);
export const neutralFillToggleActiveDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillToggleActiveDelta',
);
export const neutralFillToggleFocusDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralFillToggleFocusDelta',
);

export const baseLayerLuminance: DesignSystemResolver<number> = getDesignSystemValue('baseLayerLuminance');
export const neutralFillCardDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralFillCardDelta');

export const neutralForegroundHoverDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralForegroundHoverDelta',
);
export const neutralForegroundActiveDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralForegroundActiveDelta',
);
export const neutralForegroundFocusDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralForegroundFocusDelta',
);

export const neutralDividerRestDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralDividerRestDelta');

export const neutralOutlineRestDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralOutlineRestDelta');
export const neutralOutlineHoverDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralOutlineHoverDelta');
export const neutralOutlineActiveDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralOutlineActiveDelta',
);

export const neutralOutlineFocusDelta: DesignSystemResolver<number> = getDesignSystemValue('neutralOutlineFocusDelta');

export const neutralContrastFillRestDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralContrastFillRestDelta',
);
export const neutralContrastFillHoverDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralContrastFillHoverDelta',
);
export const neutralContrastFillActiveDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralContrastFillActiveDelta',
);
export const neutralContrastFillFocusDelta: DesignSystemResolver<number> = getDesignSystemValue(
  'neutralContrastFillFocusDelta',
);
