import { DesignToken } from '@microsoft/fast-foundation';
import { Direction } from '@microsoft/fast-web-utilities';
import { Palette, PaletteRGB } from './color/palette';
import { Swatch } from './color/swatch';
import { accentFill as accentFillAlgorithm } from './color/recipes/accent-fill';
import { accentForeground as accentForegroundAlgorithm } from './color/recipes/accent-foreground';
import { foregroundOnAccent as foregroundOnAccentAlgorithm } from './color/recipes/foreground-on-accent';
import { neutralFillInverse as neutralFillInverseAlgorithm } from './color/recipes/neutral-fill-inverse';
import { neutralDivider as neutralDividerAlgorithm } from './color/recipes/neutral-divider';
import { neutralFill as neutralFillAlgorithm } from './color/recipes/neutral-fill';
import { neutralFillInput as neutralFillInputAlgorithm } from './color/recipes/neutral-fill-input';
import { neutralFillLayer as neutralFillLayerAlgorithm } from './color/recipes/neutral-fill-layer';
import { neutralFillStealth as neutralFillStealthAlgorithm } from './color/recipes/neutral-fill-stealth';
import { neutralFillContrast as neutralFillContrastAlgorithm } from './color/recipes/neutral-fill-contrast';
import {
  focusStrokeInner as focusStrokeInnerAlgorithm,
  focusStrokeOuter as focusStrokeOuterAlgorithm,
} from './color/recipes/focus-stroke';
import { neutralForeground as neutralForegroundAlgorithm } from './color/recipes/neutral-foreground';
import { neutralForegroundHint as neutralForegroundHintAlgorithm } from './color/recipes/neutral-foreground-hint';
import { neutralLayerCardContainer as neutralLayerCardContainerAlgorithm } from './color/recipes/neutral-layer-card-container';
import { neutralLayerFloating as neutralLayerFloatingAlgorithm } from './color/recipes/neutral-layer-floating';
import { neutralLayer1 as neutralLayer1Algorithm } from './color/recipes/neutral-layer-1';
import { neutralLayer2 as neutralLayer2Algorithm } from './color/recipes/neutral-layer-2';
import { neutralLayer3 as neutralLayer3Algorithm } from './color/recipes/neutral-layer-3';
import { neutralLayer4 as neutralLayer4Algorithm } from './color/recipes/neutral-layer-4';
import { neutralStroke as neutralStrokeAlgorithm } from './color/recipes/neutral-stroke';
import { neutralStrokeStrong as neutralStrokeStrongAlgorithm } from './color/recipes/neutral-stroke-strong';
import { accentBase, middleGrey } from './color/utilities/color-constants';
import { StandardLuminance } from './color/utilities/base-layer-luminance';
import { InteractiveSwatchSet } from './color/recipe';

/** @public */
export interface Recipe<T> {
  evaluate(element: HTMLElement, reference?: Swatch): T;
}

/** @public */
export type ColorRecipe = Recipe<Swatch>;

/** @public */
export type InteractiveColorRecipe = Recipe<InteractiveSwatchSet>;

const { create } = DesignToken;

// General tokens

/** @public */
export const direction = create<Direction>('direction').withDefault(Direction.ltr);
/** @public */
export const disabledOpacity = create<number>('disabled-opacity').withDefault(0.3);

// Density tokens

/** @public */
export const baseHeightMultiplier = create<number>('base-height-multiplier').withDefault(8);
/** @public */
export const baseHorizontalSpacingMultiplier = create<number>('base-horizontal-spacing-multiplier').withDefault(3);
/** @public */
export const density = create<number>('density').withDefault(0);
/** @public */
export const designUnit = create<number>('design-unit').withDefault(4);

// Appearance tokens

/** @public */
export const controlCornerRadius = create<number>('control-corner-radius').withDefault(4);
/** @public */
export const layerCornerRadius = create<number>('layer-corner-radius').withDefault(4);
/** @public */
export const strokeWidth = create<number>('stroke-width').withDefault(1);
/** @public */
export const focusStrokeWidth = create<number>('focus-stroke-width').withDefault(2);

// Typography values

/** @public */
export const bodyFont = create<string>('body-font').withDefault('Segoe UI, sans-serif');
/** @public */
export const typeRampBaseFontSize = create<string>('type-ramp-base-font-size').withDefault('14px');
/** @public */
export const typeRampBaseLineHeight = create<string>('type-ramp-base-line-height').withDefault('20px');
/** @public */
export const typeRampMinus1FontSize = create<string>('type-ramp-minus-1-font-size').withDefault('12px');
/** @public */
export const typeRampMinus1LineHeight = create<string>('type-ramp-minus-1-line-height').withDefault('16px');
/** @public */
export const typeRampMinus2FontSize = create<string>('type-ramp-minus-2-font-size').withDefault('10px');
/** @public */
export const typeRampMinus2LineHeight = create<string>('type-ramp-minus-2-line-height').withDefault('14px');
/** @public */
export const typeRampPlus1FontSize = create<string>('type-ramp-plus-1-font-size').withDefault('16px');
/** @public */
export const typeRampPlus1LineHeight = create<string>('type-ramp-plus-1-line-height').withDefault('22px');
/** @public */
export const typeRampPlus2FontSize = create<string>('type-ramp-plus-2-font-size').withDefault('20px');
/** @public */
export const typeRampPlus2LineHeight = create<string>('type-ramp-plus-2-line-height').withDefault('28px');
/** @public */
export const typeRampPlus3FontSize = create<string>('type-ramp-plus-3-font-size').withDefault('24px');
/** @public */
export const typeRampPlus3LineHeight = create<string>('type-ramp-plus-3-line-height').withDefault('32px');
/** @public */
export const typeRampPlus4FontSize = create<string>('type-ramp-plus-4-font-size').withDefault('28px');
/** @public */
export const typeRampPlus4LineHeight = create<string>('type-ramp-plus-4-line-height').withDefault('36px');
/** @public */
export const typeRampPlus5FontSize = create<string>('type-ramp-plus-5-font-size').withDefault('32px');
/** @public */
export const typeRampPlus5LineHeight = create<string>('type-ramp-plus-5-line-height').withDefault('40px');
/** @public */
export const typeRampPlus6FontSize = create<string>('type-ramp-plus-6-font-size').withDefault('40px');
/** @public */
export const typeRampPlus6LineHeight = create<string>('type-ramp-plus-6-line-height').withDefault('52px');

// Color recipe values

/** @public */
export const baseLayerLuminance = create<number>('base-layer-luminance').withDefault(StandardLuminance.LightMode);

/** @public */
export const accentFillRestDelta = create<number>('accent-fill-rest-delta').withDefault(0);
/** @public */
export const accentFillHoverDelta = create<number>('accent-fill-hover-delta').withDefault(4);
/** @public */
export const accentFillActiveDelta = create<number>('accent-fill-active-delta').withDefault(-5);
/** @public */
export const accentFillFocusDelta = create<number>('accent-fill-focus-delta').withDefault(0);

/** @public */
export const accentForegroundRestDelta = create<number>('accent-foreground-rest-delta').withDefault(0);
/** @public */
export const accentForegroundHoverDelta = create<number>('accent-foreground-hover-delta').withDefault(6);
/** @public */
export const accentForegroundActiveDelta = create<number>('accent-foreground-active-delta').withDefault(-4);
/** @public */
export const accentForegroundFocusDelta = create<number>('accent-foreground-focus-delta').withDefault(0);

/** @public */
export const neutralFillRestDelta = create<number>('neutral-fill-rest-delta').withDefault(7);
/** @public */
export const neutralFillHoverDelta = create<number>('neutral-fill-hover-delta').withDefault(10);
/** @public */
export const neutralFillActiveDelta = create<number>('neutral-fill-active-delta').withDefault(5);
/** @public */
export const neutralFillFocusDelta = create<number>('neutral-fill-focus-delta').withDefault(0);

/** @public */
export const neutralFillInputRestDelta = create<number>('neutral-fill-input-rest-delta').withDefault(0);
/** @public */
export const neutralFillInputHoverDelta = create<number>('neutral-fill-input-hover-delta').withDefault(0);
/** @public */
export const neutralFillInputActiveDelta = create<number>('neutral-fill-input-active-delta').withDefault(0);
/** @public */
export const neutralFillInputFocusDelta = create<number>('neutral-fill-input-focus-delta').withDefault(0);

/** @public */
export const neutralFillInverseRestDelta = create<number>('neutral-fill-inverse-rest-delta').withDefault(0);
/** @public */
export const neutralFillInverseHoverDelta = create<number>('neutral-fill-inverse-hover-delta').withDefault(-3);
/** @public */
export const neutralFillInverseActiveDelta = create<number>('neutral-fill-inverse-active-delta').withDefault(7);
/** @public */
export const neutralFillInverseFocusDelta = create<number>('neutral-fill-inverse-focus-delta').withDefault(0);

/** @public */
export const neutralFillLayerRestDelta = create<number>('neutral-fill-layer-rest-delta').withDefault(3);

/** @public */
export const neutralFillStealthRestDelta = create<number>('neutral-fill-stealth-rest-delta').withDefault(0);
/** @public */
export const neutralFillStealthHoverDelta = create<number>('neutral-fill-stealth-hover-delta').withDefault(5);
/** @public */
export const neutralFillStealthActiveDelta = create<number>('neutral-fill-stealth-active-delta').withDefault(3);
/** @public */
export const neutralFillStealthFocusDelta = create<number>('neutral-fill-stealth-focus-delta').withDefault(0);

/** @public */
export const neutralFillStrongRestDelta = create<number>('neutral-fill-strong-rest-delta').withDefault(0);
/** @public */
export const neutralFillStrongHoverDelta = create<number>('neutral-fill-strong-hover-delta').withDefault(8);
/** @public */
export const neutralFillStrongActiveDelta = create<number>('neutral-fill-strong-active-delta').withDefault(-5);
/** @public */
export const neutralFillStrongFocusDelta = create<number>('neutral-fill-strong-focus-delta').withDefault(0);

/** @public */
export const neutralStrokeRestDelta = create<number>('neutral-stroke-rest-delta').withDefault(25);
/** @public */
export const neutralStrokeHoverDelta = create<number>('neutral-stroke-hover-delta').withDefault(40);
/** @public */
export const neutralStrokeActiveDelta = create<number>('neutral-stroke-active-delta').withDefault(16);
/** @public */
export const neutralStrokeFocusDelta = create<number>('neutral-stroke-focus-delta').withDefault(25);

/** @public */
export const neutralStrokeDividerRestDelta = create<number>('neutral-stroke-divider-rest-delta').withDefault(8);

/** @public */
export const neutralStrokeStrongHoverDelta = create<number>('neutral-stroke-strong-hover-delta').withDefault(40);
/** @public */
export const neutralStrokeStrongActiveDelta = create<number>('neutral-stroke-strong-active-delta').withDefault(16);
/** @public */
export const neutralStrokeStrongFocusDelta = create<number>('neutral-stroke-strong-focus-delta').withDefault(25);

// Color recipes

/** @public */
export const neutralPalette = create<Palette>({ name: 'neutral-palette', cssCustomPropertyName: null }).withDefault(
  PaletteRGB.create(middleGrey),
);
/** @public */
export const accentPalette = create<Palette>({ name: 'accent-palette', cssCustomPropertyName: null }).withDefault(
  PaletteRGB.create(accentBase),
);

// Neutral Layer Card Container
/** @public */
export const neutralLayerCardContainerRecipe = create<ColorRecipe>({
  name: 'neutral-layer-card-container-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    neutralLayerCardContainerAlgorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
    ),
});

/** @public */
export const neutralLayerCardContainer = create<Swatch>(
  'neutral-layer-card-container',
).withDefault((element: HTMLElement) => neutralLayerCardContainerRecipe.getValueFor(element).evaluate(element));

// Neutral Layer Floating
/** @public */
export const neutralLayerFloatingRecipe = create<ColorRecipe>({
  name: 'neutral-layer-floating-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    neutralLayerFloatingAlgorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
    ),
});

/** @public */
export const neutralLayerFloating = create<Swatch>('neutral-layer-floating').withDefault((element: HTMLElement) =>
  neutralLayerFloatingRecipe.getValueFor(element).evaluate(element),
);

// Neutral Layer 1
/** @public */
export const neutralLayer1Recipe = create<ColorRecipe>({
  name: 'neutral-layer-1-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    neutralLayer1Algorithm(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element)),
});

/** @public */
export const neutralLayer1 = create<Swatch>('neutral-layer-1').withDefault((element: HTMLElement) =>
  neutralLayer1Recipe.getValueFor(element).evaluate(element),
);

// Neutral Layer 2
/** @public */
export const neutralLayer2Recipe = create<ColorRecipe>({
  name: 'neutral-layer-2-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    neutralLayer2Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
});

/** @public */
export const neutralLayer2 = create<Swatch>('neutral-layer-2').withDefault((element: HTMLElement) =>
  neutralLayer2Recipe.getValueFor(element).evaluate(element),
);

// Neutral Layer 3
/** @public */
export const neutralLayer3Recipe = create<ColorRecipe>({
  name: 'neutral-layer-3-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    neutralLayer3Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
});

/** @public */
export const neutralLayer3 = create<Swatch>('neutral-layer-3').withDefault((element: HTMLElement) =>
  neutralLayer3Recipe.getValueFor(element).evaluate(element),
);

// Neutral Layer 4
/** @public */
export const neutralLayer4Recipe = create<ColorRecipe>({
  name: 'neutral-layer-4-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    neutralLayer4Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
});

/** @public */
export const neutralLayer4 = create<Swatch>('neutral-layer-4').withDefault((element: HTMLElement) =>
  neutralLayer4Recipe.getValueFor(element).evaluate(element),
);

/** @public */
export const fillColor = create<Swatch>('fill-color').withDefault(element => neutralLayer1.getValueFor(element));

enum ContrastTarget {
  normal = 4.5,
  large = 7,
}

// Accent Fill
const accentFillByContrast = (contrast: number) => (element: HTMLElement, reference?: Swatch) =>
  accentFillAlgorithm(
    accentPalette.getValueFor(element),
    neutralPalette.getValueFor(element),
    reference || fillColor.getValueFor(element),
    accentFillHoverDelta.getValueFor(element),
    accentFillActiveDelta.getValueFor(element),
    accentFillFocusDelta.getValueFor(element),
    neutralFillRestDelta.getValueFor(element),
    neutralFillHoverDelta.getValueFor(element),
    neutralFillActiveDelta.getValueFor(element),
  );
/** @public */
export const accentFillRecipe = create<InteractiveColorRecipe>({
  name: 'accent-fill-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): InteractiveSwatchSet =>
    accentFillByContrast(ContrastTarget.normal)(element, reference),
});

/** @public */
export const accentFillRest = create<Swatch>('accent-fill-rest').withDefault((element: HTMLElement) => {
  return accentFillRecipe.getValueFor(element).evaluate(element).rest;
});
/** @public */
export const accentFillHover = create<Swatch>('accent-fill-hover').withDefault((element: HTMLElement) => {
  return accentFillRecipe.getValueFor(element).evaluate(element).hover;
});
/** @public */
export const accentFillActive = create<Swatch>('accent-fill-active').withDefault((element: HTMLElement) => {
  return accentFillRecipe.getValueFor(element).evaluate(element).active;
});
/** @public */
export const accentFillFocus = create<Swatch>('accent-fill-focus').withDefault((element: HTMLElement) => {
  return accentFillRecipe.getValueFor(element).evaluate(element).focus;
});

// Foreground On Accent
const foregroundOnAccentByContrast = (contrast: number) => (element: HTMLElement, reference?: Swatch) =>
  foregroundOnAccentAlgorithm(reference || accentFillRest.getValueFor(element), contrast);
/** @public */
export const foregroundOnAccentRecipe = create<ColorRecipe>({
  name: 'foreground-on-accent-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): Swatch =>
    foregroundOnAccentByContrast(ContrastTarget.normal)(element, reference),
});
/** @public */
export const foregroundOnAccentRest = create<Swatch>('foreground-on-accent-rest').withDefault((element: HTMLElement) =>
  foregroundOnAccentRecipe.getValueFor(element).evaluate(element, accentFillRest.getValueFor(element)),
);
/** @public */
export const foregroundOnAccentHover = create<Swatch>(
  'foreground-on-accent-hover',
).withDefault((element: HTMLElement) =>
  foregroundOnAccentRecipe.getValueFor(element).evaluate(element, accentFillHover.getValueFor(element)),
);
/** @public */
export const foregroundOnAccentActive = create<Swatch>(
  'foreground-on-accent-active',
).withDefault((element: HTMLElement) =>
  foregroundOnAccentRecipe.getValueFor(element).evaluate(element, accentFillActive.getValueFor(element)),
);
/** @public */
export const foregroundOnAccentFocus = create<Swatch>(
  'foreground-on-accent-focus',
).withDefault((element: HTMLElement) =>
  foregroundOnAccentRecipe.getValueFor(element).evaluate(element, accentFillFocus.getValueFor(element)),
);

/** @public @deprecated Not used */
export const foregroundOnAccentLargeRecipe = create<ColorRecipe>({
  name: 'foreground-on-accent-large-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): Swatch =>
    foregroundOnAccentByContrast(ContrastTarget.large)(element, reference),
});
/** @public @deprecated Not used */
export const foregroundOnAccentRestLarge = create<Swatch>(
  'foreground-on-accent-rest-large',
).withDefault((element: HTMLElement) => foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element));
/** @public @deprecated Not used */
export const foregroundOnAccentHoverLarge = create<Swatch>(
  'foreground-on-accent-hover-large',
).withDefault((element: HTMLElement) =>
  foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillHover.getValueFor(element)),
);
/** @public @deprecated Not used */
export const foregroundOnAccentActiveLarge = create<Swatch>(
  'foreground-on-accent-active-large',
).withDefault((element: HTMLElement) =>
  foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillActive.getValueFor(element)),
);
/** @public @deprecated Not used */
export const foregroundOnAccentFocusLarge = create<Swatch>(
  'foreground-on-accent-focus-large',
).withDefault((element: HTMLElement) =>
  foregroundOnAccentLargeRecipe.getValueFor(element).evaluate(element, accentFillFocus.getValueFor(element)),
);

// Accent Foreground
const accentForegroundByContrast = (contrast: number) => (element: HTMLElement, reference?: Swatch) =>
  accentForegroundAlgorithm(
    accentPalette.getValueFor(element),
    reference || fillColor.getValueFor(element),
    contrast,
    accentForegroundRestDelta.getValueFor(element),
    accentForegroundHoverDelta.getValueFor(element),
    accentForegroundActiveDelta.getValueFor(element),
    accentForegroundFocusDelta.getValueFor(element),
  );

/** @public */
export const accentForegroundRecipe = create<InteractiveColorRecipe>({
  name: 'accent-foreground-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): InteractiveSwatchSet =>
    accentForegroundByContrast(ContrastTarget.normal)(element, reference),
});

/** @public */
export const accentForegroundRest = create<Swatch>('accent-foreground-rest').withDefault(
  (element: HTMLElement) => accentForegroundRecipe.getValueFor(element).evaluate(element).rest,
);
/** @public */
export const accentForegroundHover = create<Swatch>('accent-foreground-hover').withDefault(
  (element: HTMLElement) => accentForegroundRecipe.getValueFor(element).evaluate(element).hover,
);
/** @public */
export const accentForegroundActive = create<Swatch>('accent-foreground-active').withDefault(
  (element: HTMLElement) => accentForegroundRecipe.getValueFor(element).evaluate(element).active,
);
/** @public */
export const accentForegroundFocus = create<Swatch>('accent-foreground-focus').withDefault(
  (element: HTMLElement) => accentForegroundRecipe.getValueFor(element).evaluate(element).focus,
);

// Neutral Fill
/** @public */
export const neutralFillRecipe = create<InteractiveColorRecipe>({
  name: 'neutral-fill-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): InteractiveSwatchSet =>
    neutralFillAlgorithm(
      neutralPalette.getValueFor(element),
      reference || fillColor.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
      neutralFillFocusDelta.getValueFor(element),
    ),
});
/** @public */
export const neutralFillRest = create<Swatch>('neutral-fill-rest').withDefault(
  (element: HTMLElement) => neutralFillRecipe.getValueFor(element).evaluate(element).rest,
);
/** @public */
export const neutralFillHover = create<Swatch>('neutral-fill-hover').withDefault(
  (element: HTMLElement) => neutralFillRecipe.getValueFor(element).evaluate(element).hover,
);
/** @public */
export const neutralFillActive = create<Swatch>('neutral-fill-active').withDefault(
  (element: HTMLElement) => neutralFillRecipe.getValueFor(element).evaluate(element).active,
);
/** @public */
export const neutralFillFocus = create<Swatch>('neutral-fill-focus').withDefault(
  (element: HTMLElement) => neutralFillRecipe.getValueFor(element).evaluate(element).focus,
);

// Neutral Fill Input
/** @public */
export const neutralFillInputRecipe = create<InteractiveColorRecipe>({
  name: 'neutral-fill-input-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): InteractiveSwatchSet =>
    neutralFillInputAlgorithm(
      neutralPalette.getValueFor(element),
      reference || fillColor.getValueFor(element),
      neutralFillInputRestDelta.getValueFor(element),
      neutralFillInputHoverDelta.getValueFor(element),
      neutralFillInputActiveDelta.getValueFor(element),
      neutralFillInputFocusDelta.getValueFor(element),
    ),
});

/** @public */
export const neutralFillInputRest = create<Swatch>('neutral-fill-input-rest').withDefault(
  (element: HTMLElement) => neutralFillInputRecipe.getValueFor(element).evaluate(element).rest,
);
/** @public */
export const neutralFillInputHover = create<Swatch>('neutral-fill-input-hover').withDefault(
  (element: HTMLElement) => neutralFillInputRecipe.getValueFor(element).evaluate(element).hover,
);
/** @public */
export const neutralFillInputFocus = create<Swatch>('neutral-fill-input-focus').withDefault(
  (element: HTMLElement) => neutralFillInputRecipe.getValueFor(element).evaluate(element).focus,
);
/** @public */
export const neutralFillInputActive = create<Swatch>('neutral-fill-input-active').withDefault(
  (element: HTMLElement) => neutralFillInputRecipe.getValueFor(element).evaluate(element).active,
);

// Neutral Fill Inverse
/** @public @deprecated Not used */
export const neutralFillInverseRecipe = create<InteractiveColorRecipe>({
  name: 'neutral-fill-inverse-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): InteractiveSwatchSet =>
    neutralFillInverseAlgorithm(
      neutralPalette.getValueFor(element),
      reference || fillColor.getValueFor(element),
      neutralFillInverseRestDelta.getValueFor(element),
      neutralFillInverseHoverDelta.getValueFor(element),
      neutralFillInverseActiveDelta.getValueFor(element),
      neutralFillInverseFocusDelta.getValueFor(element),
    ),
});

/** @public @deprecated Not used */
export const neutralFillInverseRest = create<Swatch>('neutral-fill-inverse-rest').withDefault(
  (element: HTMLElement) => neutralFillInverseRecipe.getValueFor(element).evaluate(element).rest,
);
/** @public @deprecated Not used */
export const neutralFillInverseHover = create<Swatch>('neutral-fill-inverse-hover').withDefault(
  (element: HTMLElement) => neutralFillInverseRecipe.getValueFor(element).evaluate(element).hover,
);
/** @public @deprecated Not used */
export const neutralFillInverseActive = create<Swatch>('neutral-fill-inverse-active').withDefault(
  (element: HTMLElement) => neutralFillInverseRecipe.getValueFor(element).evaluate(element).active,
);
/** @public @deprecated Not used */
export const neutralFillInverseFocus = create<Swatch>('neutral-fill-inverse-focus').withDefault(
  (element: HTMLElement) => neutralFillInverseRecipe.getValueFor(element).evaluate(element).focus,
);

// Neutral Fill Layer
/** @public */
export const neutralFillLayerRecipe = create<ColorRecipe>({
  name: 'neutral-fill-layer-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): Swatch =>
    neutralFillLayerAlgorithm(
      neutralPalette.getValueFor(element),
      reference || fillColor.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
    ),
});
/** @public */
export const neutralFillLayerRest = create<Swatch>('neutral-fill-layer-rest').withDefault((element: HTMLElement) =>
  neutralFillLayerRecipe.getValueFor(element).evaluate(element),
);

// Neutral Fill Stealth
/** @public */
export const neutralFillStealthRecipe = create<InteractiveColorRecipe>({
  name: 'neutral-fill-stealth-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): InteractiveSwatchSet =>
    neutralFillStealthAlgorithm(
      neutralPalette.getValueFor(element),
      reference || fillColor.getValueFor(element),
      neutralFillStealthRestDelta.getValueFor(element),
      neutralFillStealthHoverDelta.getValueFor(element),
      neutralFillStealthActiveDelta.getValueFor(element),
      neutralFillStealthFocusDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
      neutralFillFocusDelta.getValueFor(element),
    ),
});

/** @public */
export const neutralFillStealthRest = create<Swatch>('neutral-fill-stealth-rest').withDefault(
  (element: HTMLElement) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).rest,
);
/** @public */
export const neutralFillStealthHover = create<Swatch>('neutral-fill-stealth-hover').withDefault(
  (element: HTMLElement) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).hover,
);
/** @public */
export const neutralFillStealthActive = create<Swatch>('neutral-fill-stealth-active').withDefault(
  (element: HTMLElement) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).active,
);
/** @public */
export const neutralFillStealthFocus = create<Swatch>('neutral-fill-stealth-focus').withDefault(
  (element: HTMLElement) => neutralFillStealthRecipe.getValueFor(element).evaluate(element).focus,
);

// Neutral Fill Strong
// TODO: none of these are actually used, do we need them?
/** @public */
export const neutralFillStrongRecipe = create<InteractiveColorRecipe>({
  name: 'neutral-fill-strong-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): InteractiveSwatchSet =>
    neutralFillContrastAlgorithm(
      neutralPalette.getValueFor(element),
      reference || fillColor.getValueFor(element),
      neutralFillStrongRestDelta.getValueFor(element),
      neutralFillStrongHoverDelta.getValueFor(element),
      neutralFillStrongActiveDelta.getValueFor(element),
      neutralFillStrongFocusDelta.getValueFor(element),
    ),
});

/** @public */
export const neutralFillStrongRest = create<Swatch>('neutral-fill-strong-rest').withDefault(
  (element: HTMLElement) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).rest,
);
/** @public */
export const neutralFillStrongHover = create<Swatch>('neutral-fill-strong-hover').withDefault(
  (element: HTMLElement) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).hover,
);
/** @public */
export const neutralFillStrongActive = create<Swatch>('neutral-fill-strong-active').withDefault(
  (element: HTMLElement) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).active,
);
/** @public */
export const neutralFillStrongFocus = create<Swatch>('neutral-fill-strong-focus').withDefault(
  (element: HTMLElement) => neutralFillStrongRecipe.getValueFor(element).evaluate(element).focus,
);

// Neutral Stroke
/** @public */
export const neutralStrokeRecipe = create<InteractiveColorRecipe>({
  name: 'neutral-stroke-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): InteractiveSwatchSet => {
    return neutralStrokeAlgorithm(
      neutralPalette.getValueFor(element),
      fillColor.getValueFor(element),
      neutralStrokeRestDelta.getValueFor(element),
      neutralStrokeHoverDelta.getValueFor(element),
      neutralStrokeActiveDelta.getValueFor(element),
      neutralStrokeFocusDelta.getValueFor(element),
    );
  },
});

/** @public */
export const neutralStrokeRest = create<Swatch>('neutral-stroke-rest').withDefault(
  (element: HTMLElement) => neutralStrokeRecipe.getValueFor(element).evaluate(element).rest,
);
/** @public */
export const neutralStrokeHover = create<Swatch>('neutral-stroke-hover').withDefault(
  (element: HTMLElement) => neutralStrokeRecipe.getValueFor(element).evaluate(element).hover,
);
/** @public */
export const neutralStrokeActive = create<Swatch>('neutral-stroke-active').withDefault(
  (element: HTMLElement) => neutralStrokeRecipe.getValueFor(element).evaluate(element).active,
);
/** @public */
export const neutralStrokeFocus = create<Swatch>('neutral-stroke-focus').withDefault(
  (element: HTMLElement) => neutralStrokeRecipe.getValueFor(element).evaluate(element).focus,
);

// Neutral Stroke Divider
/** @public */
export const neutralStrokeDividerRecipe = create<ColorRecipe>({
  name: 'neutral-stroke-divider-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement, reference?: Swatch): Swatch =>
    neutralDividerAlgorithm(
      neutralPalette.getValueFor(element),
      reference || fillColor.getValueFor(element),
      neutralStrokeDividerRestDelta.getValueFor(element),
    ),
});
/** @public */
export const neutralStrokeDividerRest = create<Swatch>('neutral-stroke-divider-rest').withDefault(element =>
  neutralStrokeDividerRecipe.getValueFor(element).evaluate(element),
);

// Neutral Stroke Strong
/** @public */
export const neutralStrokeStrongRecipe = create<InteractiveColorRecipe>({
  name: 'neutral-stroke-strong-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): InteractiveSwatchSet => {
    return neutralStrokeStrongAlgorithm(
      neutralPalette.getValueFor(element),
      fillColor.getValueFor(element),
      3,
      neutralStrokeStrongHoverDelta.getValueFor(element),
      neutralStrokeStrongActiveDelta.getValueFor(element),
      neutralStrokeStrongFocusDelta.getValueFor(element),
    );
  },
});

/** @public */
export const neutralStrokeStrongRest = create<Swatch>('neutral-stroke-strong-rest').withDefault(
  (element: HTMLElement) => neutralStrokeStrongRecipe.getValueFor(element).evaluate(element).rest,
);
/** @public */
export const neutralStrokeStrongHover = create<Swatch>('neutral-stroke-strong-hover').withDefault(
  (element: HTMLElement) => neutralStrokeStrongRecipe.getValueFor(element).evaluate(element).hover,
);
/** @public */
export const neutralStrokeStrongActive = create<Swatch>('neutral-stroke-strong-active').withDefault(
  (element: HTMLElement) => neutralStrokeStrongRecipe.getValueFor(element).evaluate(element).active,
);
/** @public */
export const neutralStrokeStrongFocus = create<Swatch>('neutral-stroke-strong-focus').withDefault(
  (element: HTMLElement) => neutralStrokeStrongRecipe.getValueFor(element).evaluate(element).focus,
);

// Focus Stroke Outer
/** @public */
export const focusStrokeOuterRecipe = create<ColorRecipe>({
  name: 'focus-stroke-outer-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    focusStrokeOuterAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
});

/** @public */
export const focusStrokeOuter = create<Swatch>('focus-stroke-outer').withDefault((element: HTMLElement) =>
  focusStrokeOuterRecipe.getValueFor(element).evaluate(element),
);

// Focus Stroke Inner
/** @public */
export const focusStrokeInnerRecipe = create<ColorRecipe>({
  name: 'focus-stroke-inner-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    focusStrokeInnerAlgorithm(
      accentPalette.getValueFor(element),
      fillColor.getValueFor(element),
      focusStrokeOuter.getValueFor(element),
    ),
});

/** @public */
export const focusStrokeInner = create<Swatch>('focus-stroke-inner').withDefault((element: HTMLElement) =>
  focusStrokeInnerRecipe.getValueFor(element).evaluate(element),
);

// Neutral Foreground
/** @public */
export const neutralForegroundRecipe = create<ColorRecipe>({
  name: 'neutral-foreground-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    neutralForegroundAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
});

/** @public */
export const neutralForegroundRest = create<Swatch>('neutral-foreground-rest').withDefault((element: HTMLElement) =>
  neutralForegroundRecipe.getValueFor(element).evaluate(element),
);

// Neutral Foreground Hint
/** @public */
export const neutralForegroundHintRecipe = create<ColorRecipe>({
  name: 'neutral-foreground-hint-recipe',
  cssCustomPropertyName: null,
}).withDefault({
  evaluate: (element: HTMLElement): Swatch =>
    neutralForegroundHintAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
});

/** @public */
export const neutralForegroundHint = create<Swatch>('neutral-foreground-hint').withDefault((element: HTMLElement) =>
  neutralForegroundHintRecipe.getValueFor(element).evaluate(element),
);

// Deprecated tokens

/** @public @deprecated Use controlCornerRadius */
export const cornerRadius = controlCornerRadius;
/** @public @deprecated Use layerCornerRadius */
export const elevatedCornerRadius = layerCornerRadius;
/** @public @deprecated Use strokeWidth */
export const outlineWidth = strokeWidth;
/** @public @deprecated Use focusStrokeWidth */
export const focusOutlineWidth = focusStrokeWidth;

/** @public @deprecated Use neutralFillLayerRestDelta */
export const neutralFillCardDelta = neutralFillLayerRestDelta;

/** @public @deprecated Use neutralFillStrongRestDelta */
export const neutralFillToggleRestDelta = neutralFillStrongRestDelta;
/** @public @deprecated Use neutralFillStrongHoverDelta */
export const neutralFillToggleHoverDelta = neutralFillStrongHoverDelta;
/** @public @deprecated Use neutralFillStrongActiveDelta */
export const neutralFillToggleActiveDelta = neutralFillStrongActiveDelta;
/** @public @deprecated Use neutralFillStrongFocusDelta */
export const neutralFillToggleFocusDelta = neutralFillStrongFocusDelta;

/** @public @deprecated Use neutralFillInverseRestDelta */
export const neutralContrastFillRestDelta = neutralFillInverseRestDelta;
/** @public @deprecated Use neutralFillInverseHoverDelta */
export const neutralContrastFillHoverDelta = neutralFillInverseHoverDelta;
/** @public @deprecated Use neutralFillInverseActiveDelta */
export const neutralContrastFillActiveDelta = neutralFillInverseActiveDelta;
/** @public @deprecated Use neutralFillInverseFocusDelta */
export const neutralContrastFillFocusDelta = neutralFillInverseFocusDelta;

/** @public @deprecated Use neutralStrokeDividerRestDelta */
export const neutralDividerRestDelta = neutralStrokeDividerRestDelta;

/** @public @deprecated Use neutralLayer1 */
export const neutralLayerL1 = neutralLayer1;
/** @public @deprecated Use neutralLayer2 */
export const neutralLayerL2 = neutralLayer2;
/** @public @deprecated Use neutralLayer3 */
export const neutralLayerL3 = neutralLayer3;
/** @public @deprecated Use neutralLayer4 */
export const neutralLayerL4 = neutralLayer4;

/** @public @deprecated Use foregroundOnAccentRest */
export const accentForegroundCut = foregroundOnAccentRest;
/** @public @deprecated Use foregroundOnAccentRestLarge */
export const accentForegroundCutLarge = foregroundOnAccentRestLarge;

/** @public @deprecated Use neutralStrokeDividerRest */
export const neutralDivider = neutralStrokeDividerRest;

/** @public @deprecated Use neutralFillLayerRest */
export const neutralFillCard = neutralFillLayerRest;

/** @public @deprecated Use neutralFillInverseRest */
export const neutralContrastFillRest = neutralFillInverseRest;
/** @public @deprecated Use neutralFillInverseHover */
export const neutralContrastFillHover = neutralFillInverseHover;
/** @public @deprecated Use neutralFillInverseActive */
export const neutralContrastFillActive = neutralFillInverseActive;
/** @public @deprecated Use neutralFillInverseFocus */
export const neutralContrastFillFocus = neutralFillInverseFocus;

/** @public @deprecated Use neutralFillStrongRest */
export const neutralFillToggleRest = neutralFillStrongRest;
/** @public @deprecated Use neutralFillStrongHover */
export const neutralFillToggleHover = neutralFillStrongHover;
/** @public @deprecated Use neutralFillStrongActive */
export const neutralFillToggleActive = neutralFillStrongActive;
/** @public @deprecated Use neutralFillStrongFocus */
export const neutralFillToggleFocus = neutralFillStrongFocus;

/** @public @deprecated Use focusStrokeOuter */
export const neutralFocus = focusStrokeOuter;
/** @public @deprecated Use focusStrokeInner */
export const neutralFocusInnerAccent = focusStrokeInner;

/** @public @deprecated Use neutralStrokeRest */
export const neutralOutlineRest = neutralStrokeRest;
/** @public @deprecated Use neutralStrokeHover */
export const neutralOutlineHover = neutralStrokeHover;
/** @public @deprecated Use neutralStrokeActive */
export const neutralOutlineActive = neutralStrokeActive;
/** @public @deprecated Use neutralStrokeFocus */
export const neutralOutlineFocus = neutralStrokeFocus;
