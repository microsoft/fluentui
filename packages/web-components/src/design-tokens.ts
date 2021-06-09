import { DesignToken, DI } from '@microsoft/fast-foundation';
import { Direction } from '@microsoft/fast-web-utilities';
import { PaletteRGB } from './color-vNext/palette';
import { accentFill as accentFillAlgorithm } from './color-vNext/recipes/accent-fill';
import { accentForeground as accentForegroundAlgorithm } from './color-vNext/recipes/accent-foreground';
import { accentForegroundCut as accentForegroundCutAlgorithm } from './color-vNext/recipes/accent-foreground-cut';
import { neutralFillInverse as neutralFillInverseAlgorithm } from './color-vNext/recipes/neutral-fill-inverse';
import { neutralDivider as neutralDividerAlgorithm } from './color-vNext/recipes/neutral-divider';
import { SwatchRGB } from './color-vNext/swatch';
import { neutralFillCard as neutralFillCardAlgorithm } from './color-vNext/recipes/neutral-fill-card';
import { neutralFillInput as NeutralFillInputAlgorithm } from './color-vNext/recipes/neutral-fill-input';
import { neutralFillStealth as neutralFillStealthAlgorithm } from './color-vNext/recipes/neutral-fill-stealth';
import { neutralFillContrast as neutralFillContrastAlgorithm } from './color-vNext/recipes/neutral-fill-contrast';
import { neutralFill as neutralFillAlgorithm } from './color-vNext/recipes/neutral-fill';
import {
  focusStrokeInner as focusStrokeInnerAlgorithm,
  focusStrokeOuter as focusStrokeOuterAlgorithm,
} from './color-vNext/recipes/focus-stroke';
import { neutralStroke as neutralStrokeAlgorithm } from './color-vNext/recipes/neutral-stroke';
import { neutralForegroundHint as neutralForegroundHintAlgorithm } from './color-vNext/recipes/neutral-foreground-hint';
import { neutralForeground as neutralForegroundAlgorithm } from './color-vNext/recipes/neutral-foreground';
import { neutralLayerFloating as neutralLayerFloatingAlgorithm } from './color-vNext/recipes/neutral-layer-floating';
import { neutralLayerL1 as neutralLayerL1Algorithm } from './color-vNext/recipes/neutral-layer-L1';
import { neutralLayerL2 as neutralLayerL2Algorithm } from './color-vNext/recipes/neutral-layer-L2';
import { neutralLayerL3 as neutralLayerL3Algorithm } from './color-vNext/recipes/neutral-layer-L3';
import { neutralLayerL4 as neutralLayerL4Algorithm } from './color-vNext/recipes/neutral-layer-L4';
import { accentBase, middleGrey } from './color-vNext/utilities/color-constants';
import { StandardLuminance } from './color';

const { create } = DesignToken;

export const accentFillRestDelta = create<number>('accent-fill-rest-delta').withDefault(0);
export const accentFillHoverDelta = create<number>('accent-fill-hover-delta').withDefault(4);
export const accentFillActiveDelta = create<number>('accent-fill-active-delta').withDefault(-5);
export const accentFillFocusDelta = create<number>('accent-fill-focus-delta').withDefault(0);

export const accentForegroundRestDelta = create<number>('accent-foreground-rest-delta').withDefault(0);
export const accentForegroundHoverDelta = create<number>('accent-foreground-hover-delta').withDefault(6);
export const accentForegroundActiveDelta = create<number>('accent-foreground-active-delta').withDefault(-4);
export const accentForegroundFocusDelta = create<number>('accent-foreground-focus-delta').withDefault(0);

export const bodyFont = create<string>('body-font').withDefault('Segoe UI, sans-serif');
export const baseHeightMultiplier = create<number>('base-height-multiplier').withDefault(8);
export const baseHorizontalSpacingMultiplier = create<number>('base-horizontal-spacing-multiplier').withDefault(3);
export const baseLayerLuminance = create<number>('base-layer-luminance').withDefault(StandardLuminance.LightMode);
export const controlCornerRadius = create<number>('corner-radius').withDefault(4);
/** @deprecated */
export const cornerRadius = controlCornerRadius;
export const density = create<number>('density').withDefault(0);
export const designUnit = create<number>('design-unit').withDefault(4);
export const direction = create<Direction>('direction').withDefault(Direction.ltr);
export const disabledOpacity = create<number>('disabled-opacity').withDefault(0.3);
export const surfaceCornerRadius = create<number>('elevated-corner-radius').withDefault(4);
/** @deprecated */
export const elevatedCornerRadius = surfaceCornerRadius;
export const focusStrokeWidth = create<number>('focus-stroke-width').withDefault(2);
/** @deprecated */
export const focusOutlineWidth = focusStrokeWidth;

export const neutralFillInverseRestDelta = create<number>('neutral-fill-inverse-rest-delta').withDefault(0);
export const neutralFillInverseHoverDelta = create<number>('neutral-fill-inverse-hover-delta').withDefault(-3);
export const neutralFillInverseActiveDelta = create<number>('neutral-fill-inverse-active-delta').withDefault(7);
export const neutralFillInverseFocusDelta = create<number>('neutral-fill-inverse-focus-delta').withDefault(0);
/** @deprecated */
export const neutralContrastFillRestDelta = neutralFillInverseRestDelta;
/** @deprecated */
export const neutralContrastFillHoverDelta = neutralFillInverseHoverDelta;
/** @deprecated */
export const neutralContrastFillActiveDelta = neutralFillInverseActiveDelta;
/** @deprecated */
export const neutralContrastFillFocusDelta = neutralFillInverseFocusDelta;

export const neutralStrokeDividerRestDelta = create<number>('neutral-stroke-divider-rest-delta').withDefault(8);
/** @deprecated */
export const neutralDividerRestDelta = neutralStrokeDividerRestDelta;

export const neutralFillActiveDelta = create<number>('neutral-fill-active-delta').withDefault(5);
export const neutralFillCardRestDelta = create<number>('neutral-fill-card-rest-delta').withDefault(3);
/** @deprecated */
export const neutralFillCardDelta = neutralFillCardRestDelta;
export const neutralFillFocusDelta = create<number>('neutral-fill-focus-delta').withDefault(0);
export const neutralFillHoverDelta = create<number>('neutral-fill-hover-delta').withDefault(10);

export const neutralFillInputActiveDelta = create<number>('neutral-fill-input-active-delta').withDefault(0);
export const neutralFillInputFocusDelta = create<number>('neutral-fill-input-focus-delta').withDefault(0);
export const neutralFillInputHoverDelta = create<number>('neutral-fill-input-hover-delta').withDefault(0);
export const neutralFillInputRestDelta = create<number>('neutral-fill-input-rest-delta').withDefault(0);

export const neutralFillRestDelta = create<number>('neutral-fill-rest-delta').withDefault(7);

export const neutralFillStealthActiveDelta = create<number>('neutral-fill-stealth-active-delta').withDefault(3);
export const neutralFillStealthFocusDelta = create<number>('neutral-fill-stealth-focus-delta').withDefault(0);
export const neutralFillStealthHoverDelta = create<number>('neutral-fill-stealth-hover-delta').withDefault(5);
export const neutralFillStealthRestDelta = create<number>('neutral-fill-stealth-rest-delta').withDefault(0);

export const neutralFillStrongRestDelta = create<number>('neutral-fill-strong-rest-delta').withDefault(0);
export const neutralFillStrongActiveDelta = create<number>('neutral-fill-strong-active-delta').withDefault(-5);
export const neutralFillStrongFocusDelta = create<number>('neutral-fill-strong-focus-delta').withDefault(0);
export const neutralFillStrongHoverDelta = create<number>('neutral-fill-strong-hover-delta').withDefault(8);
/** @deprecated */
export const neutralFillToggleRestDelta = neutralFillStrongRestDelta;
/** @deprecated */
export const neutralFillToggleHoverDelta = neutralFillStrongHoverDelta;
/** @deprecated */
export const neutralFillToggleActiveDelta = neutralFillStrongActiveDelta;
/** @deprecated */
export const neutralFillToggleFocusDelta = neutralFillStrongFocusDelta;

export const neutralStrokeActiveDelta = create<number>('neutral-stroke-active-delta').withDefault(16);
export const neutralStrokeFocusDelta = create<number>('neutral-stroke-focus-delta').withDefault(25);
export const neutralStrokeHoverDelta = create<number>('neutral-stroke-hover-delta').withDefault(40);
export const neutralStrokeRestDelta = create<number>('neutral-stroke-rest-delta').withDefault(25);

export const strokeWidth = create<number>('stroke-width').withDefault(1);
/** @deprecated */
export const outlineWidth = strokeWidth;

export const typeRampBaseFontSize = create<string>('type-ramp-base-font-size').withDefault('14px');
export const typeRampBaseLineHeight = create<string>('type-ramp-base-line-height').withDefault('20px');
export const typeRampMinus1FontSize = create<string>('type-ramp-minus1-font-size').withDefault('12px');
export const typeRampMinus1LineHeight = create<string>('type-ramp-minus1-line-height').withDefault('16px');
export const typeRampMinus2FontSize = create<string>('type-ramp-minus2-font-size').withDefault('10px');
export const typeRampMinus2LineHeight = create<string>('type-ramp-minus2-line-height').withDefault('14px');
export const typeRampPlus1FontSize = create<string>('type-ramp-plus1-font-size').withDefault('16px');
export const typeRampPlus1LineHeight = create<string>('type-ramp-plus1-line-height').withDefault('22px');
export const typeRampPlus2FontSize = create<string>('type-ramp-plus2-font-size').withDefault('20px');
export const typeRampPlus2LineHeight = create<string>('type-ramp-plus2-line-height').withDefault('28px');
export const typeRampPlus3FontSize = create<string>('type-ramp-plus3-font-size').withDefault('24px');
export const typeRampPlus3LineHeight = create<string>('type-ramp-plus3-line-height').withDefault('32px');
export const typeRampPlus4FontSize = create<string>('type-ramp-plus4-font-size').withDefault('28px');
export const typeRampPlus4LineHeight = create<string>('type-ramp-plus4-line-height').withDefault('36px');
export const typeRampPlus5FontSize = create<string>('type-ramp-plus5-font-size').withDefault('32px');
export const typeRampPlus5LineHeight = create<string>('type-ramp-plus5-line-height').withDefault('40px');
export const typeRampPlus6FontSize = create<string>('type-ramp-plus6-font-size').withDefault('40px');
export const typeRampPlus6LineHeight = create<string>('type-ramp-plus6-line-height').withDefault('52px');

export const neutralPalette = create<PaletteRGB>('neutral-palette').withDefault(PaletteRGB.create(middleGrey));
export const accentPalette = create<PaletteRGB>('accent-palette').withDefault(PaletteRGB.create(accentBase));

export const fillColor = create<SwatchRGB>('fill-color').withDefault(element => {
  const palette = neutralPalette.getValueFor(element);
  return palette.get(0);
});

enum ContrastTarget {
  normal = 4.5,
  large = 7,
}

// Accent Foreground Cut
const accentForegroundCutByContrast = (contrast: number) => (element: HTMLElement) =>
  accentForegroundCutAlgorithm(accentPalette.getValueFor(element).source, contrast);
export const AccentForegroundCut = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'accent-foreground-cut',
  builder => builder.instance((element: HTMLElement) => accentForegroundCutByContrast(ContrastTarget.normal)(element)),
);
export const AccentForegroundCutLarge = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'accent-foreground-cut-large',
  builder => builder.instance((element: HTMLElement) => accentForegroundCutByContrast(ContrastTarget.large)(element)),
);

export const accentForegroundCut = create<SwatchRGB>('accent-foreground-cut').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentForegroundCut)(element);
});
export const accentForegroundCutLarge = create<SwatchRGB>('accent-foreground-cut-large').withDefault(
  (element: HTMLElement) => {
    return DI.findResponsibleContainer(element).get(AccentForegroundCutLarge)(element);
  },
);

// Accent Fill
const accentFillByContrast = (contrast: number) => (element: HTMLElement, fill?: SwatchRGB) => {
  return accentFillAlgorithm(
    accentPalette.getValueFor(element),
    neutralPalette.getValueFor(element),
    fill || fillColor.getValueFor(element),
    accentForegroundCut.getValueFor(element),
    contrast,
    accentFillHoverDelta.getValueFor(element),
    accentFillActiveDelta.getValueFor(element),
    accentFillFocusDelta.getValueFor(element),
    neutralFillRestDelta.getValueFor(element),
    neutralFillHoverDelta.getValueFor(element),
    neutralFillActiveDelta.getValueFor(element),
  );
};
export const AccentFill = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof accentFillAlgorithm>
>('accent-fill', builder => builder.instance(accentFillByContrast(ContrastTarget.normal)));

export const accentFillRest = create<SwatchRGB>('accent-fill-rest').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentFill)(element).rest;
});
export const accentFillHover = create<SwatchRGB>('accent-fill-hover').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentFill)(element).hover;
});
export const accentFillActive = create<SwatchRGB>('accent-fill-active').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentFill)(element).active;
});
export const accentFillFocus = create<SwatchRGB>('accent-fill-focus').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentFill)(element).focus;
});

const accentForegroundByContrast = (contrast: number) => (element: HTMLElement) => {
  return accentForegroundAlgorithm(
    accentPalette.getValueFor(element),
    fillColor.getValueFor(element),
    contrast,
    accentForegroundRestDelta.getValueFor(element),
    accentForegroundHoverDelta.getValueFor(element),
    accentForegroundActiveDelta.getValueFor(element),
    accentForegroundFocusDelta.getValueFor(element),
  );
};

/**
 * Accent Foreground
 */
export const AccentForeground = DI.createInterface<
  (element: HTMLElement) => ReturnType<typeof accentForegroundAlgorithm>
>('accent-foreground', builder => builder.instance(accentForegroundByContrast(ContrastTarget.normal)));

export const accentForegroundRest = create<SwatchRGB>('accent-foreground-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(AccentForeground)(element).rest,
);
export const accentForegroundHover = create<SwatchRGB>('accent-foreground-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(AccentForeground)(element).hover,
);
export const accentForegroundActive = create<SwatchRGB>('accent-foreground-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(AccentForeground)(element).active,
);
export const accentForegroundFocus = create<SwatchRGB>('accent-foreground-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(AccentForeground)(element).focus,
);

// Neutral Divider
export const NeutralStrokeDivider = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'neutral-stroke-divider',
  builder =>
    builder.instance((element: HTMLElement) =>
      neutralDividerAlgorithm(
        neutralPalette.getValueFor(element),
        fillColor.getValueFor(element),
        neutralStrokeDividerRestDelta.getValueFor(element),
      ),
    ),
);
export const neutralStrokeDivider = create<SwatchRGB>('neutral-stroke-divider').withDefault(element =>
  DI.findResponsibleContainer(element).get(NeutralStrokeDivider)(element),
);
/** @deprecated */
export const neutralDivider = neutralStrokeDivider;

// Neutral Fill Card
export const NeutralFillCard = DI.createInterface<(element: HTMLElement, fill?: SwatchRGB) => SwatchRGB>(
  'neutral-fill-card',
  builder =>
    builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
      neutralFillCardAlgorithm(
        neutralPalette.getValueFor(element),
        fill || fillColor.getValueFor(element),
        neutralFillCardRestDelta.getValueFor(element),
      ),
    ),
);
export const neutralFillCard = create<SwatchRGB>('neutral-fill-card').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralFillCard)(element),
);

// Neutral Fill Inverse
export const NeutralFillInverse = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof neutralFillInverseAlgorithm>
>('neutral-fill-inverse', builder =>
  builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
    neutralFillInverseAlgorithm(
      neutralPalette.getValueFor(element),
      fill || fillColor.getValueFor(element),
      neutralFillInverseRestDelta.getValueFor(element),
      neutralFillInverseHoverDelta.getValueFor(element),
      neutralFillInverseActiveDelta.getValueFor(element),
      neutralFillInverseFocusDelta.getValueFor(element),
    ),
  ),
);

export const neutralFillInverseRest = create<SwatchRGB>('neutral-fill-inverse-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInverse)(element).rest,
);
export const neutralFillInverseHover = create<SwatchRGB>('neutral-fill-inverse-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInverse)(element).hover,
);
export const neutralFillInverseActive = create<SwatchRGB>('neutral-fill-inverse-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInverse)(element).active,
);
export const neutralFillInverseFocus = create<SwatchRGB>('neutral-fill-inverse-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInverse)(element).focus,
);
/** @deprecated */
export const neutralContrastFillRest = neutralFillInverseRest;
/** @deprecated */
export const neutralContrastFillHover = neutralFillInverseHover;
/** @deprecated */
export const neutralContrastFillActive = neutralFillInverseActive;
/** @deprecated */
export const neutralContrastFillFocus = neutralFillInverseFocus;

// Neutral Fill Input
export const NeutralFillInput = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof NeutralFillInputAlgorithm>
>('neutral-fill-input', builder =>
  builder.instance((element: HTMLElement, fill?: SwatchRGB) => {
    return NeutralFillInputAlgorithm(
      neutralPalette.getValueFor(element),
      fill || fillColor.getValueFor(element),
      neutralFillInputRestDelta.getValueFor(element),
      neutralFillInputHoverDelta.getValueFor(element),
      neutralFillInputActiveDelta.getValueFor(element),
      neutralFillInputFocusDelta.getValueFor(element),
    );
  }),
);

export const neutralFillInputRest = create<SwatchRGB>('neutral-fill-input-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).rest,
);
export const neutralFillInputHover = create<SwatchRGB>('neutral-fill-input-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).hover,
);
export const neutralFillInputFocus = create<SwatchRGB>('neutral-fill-input-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).focus,
);
export const neutralFillInputActive = create<SwatchRGB>('neutral-fill-input-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).active,
);

// Neutral Fill Stealth
export const NeutralFillStealth = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof neutralFillStealthAlgorithm>
>('neutral-fill-stealth', builder =>
  builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
    neutralFillStealthAlgorithm(
      neutralPalette.getValueFor(element),
      fill || fillColor.getValueFor(element),
      neutralFillStealthRestDelta.getValueFor(element),
      neutralFillStealthHoverDelta.getValueFor(element),
      neutralFillStealthActiveDelta.getValueFor(element),
      neutralFillStealthFocusDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
      neutralFillFocusDelta.getValueFor(element),
    ),
  ),
);

export const neutralFillStealthRest = create<SwatchRGB>('neutral-fill-stealth-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).rest,
);
export const neutralFillStealthHover = create<SwatchRGB>('neutral-fill-stealth-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).hover,
);
export const neutralFillStealthActive = create<SwatchRGB>('neutral-fill-stealth-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).active,
);
export const neutralFillStealthFocus = create<SwatchRGB>('neutral-fill-stealth-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).focus,
);

// Neutral Fill Strong
// TODO: none of these are actually used, do we need them?
export const NeutralFillStrong = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof neutralFillContrastAlgorithm>
>('neutral-fill-strong', builder =>
  builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
    neutralFillContrastAlgorithm(
      neutralPalette.getValueFor(element),
      fill || fillColor.getValueFor(element),
      neutralFillStrongRestDelta.getValueFor(element),
      neutralFillStrongHoverDelta.getValueFor(element),
      neutralFillStrongActiveDelta.getValueFor(element),
      neutralFillStrongFocusDelta.getValueFor(element),
    ),
  ),
);

export const neutralFillStrongRest = create<SwatchRGB>('neutral-fill-strong-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStrong)(element).rest,
);
export const neutralFillStrongHover = create<SwatchRGB>('neutral-fill-strong-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStrong)(element).hover,
);
export const neutralFillStrongActive = create<SwatchRGB>('neutral-fill-strong-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStrong)(element).active,
);
export const neutralFillStrongFocus = create<SwatchRGB>('neutral-fill-strong-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStrong)(element).focus,
);
/** @deprecated */
export const neutralFillToggleRest = neutralFillStrongRest;
/** @deprecated */
export const neutralFillToggleHover = neutralFillStrongHover;
/** @deprecated */
export const neutralFillToggleActive = neutralFillStrongActive;
/** @deprecated */
export const neutralFillToggleFocus = neutralFillStrongFocus;

// Neutral Fill
export const NeutralFill = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof neutralFillAlgorithm>
>('neutral-fill', builder =>
  builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
    neutralFillAlgorithm(
      neutralPalette.getValueFor(element),
      fill || fillColor.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
      neutralFillFocusDelta.getValueFor(element),
    ),
  ),
);
export const neutralFillRest = create<SwatchRGB>('neutral-fill-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).rest,
);
export const neutralFillHover = create<SwatchRGB>('neutral-fill-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).hover,
);
export const neutralFillActive = create<SwatchRGB>('neutral-fill-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).active,
);
export const neutralFillFocus = create<SwatchRGB>('neutral-fill-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).focus,
);

// Focus Stroke Outer
export const FocusStrokeOuter = DI.createInterface<(element: HTMLElement) => SwatchRGB>('focus-stroke-outer', builder =>
  builder.instance((element: HTMLElement) =>
    focusStrokeOuterAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
  ),
);

export const focusStrokeOuter = create<SwatchRGB>('focus-stroke-outer').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(FocusStrokeOuter)(element),
);
/** @deprecated */
export const neutralFocus = focusStrokeOuter;

// Focus Stroke Inner
export const FocusStrokeInner = DI.createInterface<(element: HTMLElement) => SwatchRGB>('focus-stroke-inner', builder =>
  builder.instance((element: HTMLElement) =>
    focusStrokeInnerAlgorithm(
      accentPalette.getValueFor(element),
      fillColor.getValueFor(element),
      focusStrokeOuter.getValueFor(element),
    ),
  ),
);

export const focusStrokeInner = create<SwatchRGB>('focus-stroke-inner').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(FocusStrokeInner)(element),
);
/** @deprecated */
export const neutralFocusInnerAccent = focusStrokeInner;

// Neutral Foreground Hint
export const NeutralForegroundHint = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'neutral-foreground-hint',
  builder =>
    builder.instance((element: HTMLElement) =>
      neutralForegroundHintAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
    ),
);

export const neutralForegroundHint = create<SwatchRGB>('neutral-foreground-hint').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralForegroundHint)(element),
);

// Neutral Foreground
export const NeutralForeground = DI.createInterface<
  (element: HTMLElement) => ReturnType<typeof neutralForegroundAlgorithm>
>('neutral-foreground', builder =>
  builder.instance((element: HTMLElement) =>
    neutralForegroundAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
  ),
);

export const neutralForeground = create<SwatchRGB>('neutral-foreground').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralForeground)(element),
);
/** @deprecated */
export const neutralForegroundRest = neutralForeground;

// Neutral Stroke
export const NeutralStroke = DI.createInterface<(element: HTMLElement) => ReturnType<typeof neutralStrokeAlgorithm>>(
  'neutral-stroke',
  builder =>
    builder.instance((element: HTMLElement) =>
      neutralStrokeAlgorithm(
        neutralPalette.getValueFor(element),
        fillColor.getValueFor(element),
        neutralStrokeRestDelta.getValueFor(element),
        neutralStrokeHoverDelta.getValueFor(element),
        neutralStrokeActiveDelta.getValueFor(element),
        neutralStrokeFocusDelta.getValueFor(element),
      ),
    ),
);

export const neutralStrokeRest = create<SwatchRGB>('neutral-stroke-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralStroke)(element).rest,
);
export const neutralStrokeHover = create<SwatchRGB>('neutral-stroke-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralStroke)(element).hover,
);
export const neutralStrokeActive = create<SwatchRGB>('neutral-stroke-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralStroke)(element).active,
);
export const neutralStrokeFocus = create<SwatchRGB>('neutral-stroke-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralStroke)(element).focus,
);

// Neutral Layer Floating
export const NeutralLayerFloating = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'neutral-layer-floating',
  builder =>
    builder.instance((element: HTMLElement) =>
      neutralLayerFloatingAlgorithm(
        neutralPalette.getValueFor(element),
        baseLayerLuminance.getValueFor(element),
        neutralFillCardRestDelta.getValueFor(element),
      ),
    ),
);

export const neutralLayerFloating = create<SwatchRGB>('neutral-layer-floating').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerFloating)(element),
);

// Neutral Layer L1
export const NeutralLayerL1 = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-layer-L1', builder =>
  builder.instance((element: HTMLElement) =>
    neutralLayerL1Algorithm(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element)),
  ),
);

export const neutralLayerL1 = create<SwatchRGB>('neutral-layer-L1').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL1)(element),
);

// Neutral Layer L2
export const NeutralLayerL2 = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-layer-L2', builder =>
  builder.instance((element: HTMLElement) =>
    neutralLayerL2Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillCardRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
  ),
);

export const neutralLayerL2 = create<SwatchRGB>('neutral-layer-L2').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL2)(element),
);

// Neutral Layer L3
export const NeutralLayerL3 = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-layer-L3', builder =>
  builder.instance((element: HTMLElement) =>
    neutralLayerL3Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillCardRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
  ),
);

export const neutralLayerL3 = create<SwatchRGB>('neutral-layer-L3').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL3)(element),
);

// Neutral Layer L4
export const NeutralLayerL4 = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-layer-L4', builder =>
  builder.instance((element: HTMLElement) =>
    neutralLayerL4Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillCardRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
  ),
);

export const neutralLayerL4 = create<SwatchRGB>('neutral-layer-L4').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL4)(element),
);
