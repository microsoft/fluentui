import { DesignToken, DI } from '@microsoft/fast-foundation';
import { Direction } from '@microsoft/fast-web-utilities';
import { PaletteRGB } from './color-vNext/palette';
import { accentFill as accentFillAlgorithm } from './color-vNext/recipes/accent-fill';
import { accentForeground as accentForegroundAlgorithm } from './color-vNext/recipes/accent-foreground';
import { accentForegroundCut as accentForegroundCutAlgorithm } from './color-vNext/recipes/accent-foreground-cut';
import { neutralContrastFill as neutralContrastFillAlgorithm } from './color-vNext/recipes/neutral-contrast-fill';
import { neutralDivider as neutralDividerAlgorithm } from './color-vNext/recipes/neutral-divider';
import { SwatchRGB } from './color-vNext/swatch';
import { neutralFillCard as neutralFillCardAlgorithm } from './color-vNext/recipes/neutral-fill-card';
import { neutralFillInput as NeutralFillInputAlgorithm } from './color-vNext/recipes/neutral-fill-input';
import { neutralFillStealth as neutralFillStealthAlgorithm } from './color-vNext/recipes/neutral-fill-stealth';
import { neutralFillToggle as neutralFillToggleAlgorithm } from './color-vNext/recipes/neutral-fill-toggle';
import { neutralFill as neutralFillAlgorithm } from './color-vNext/recipes/neutral-fill';
import { neutralFocus as neutralFocusAlgorithm } from './color-vNext/recipes/neutral-focus';
import { neutralFocusInnerAccent as neutralFocusInnerAccentAlgorithm } from './color-vNext/recipes/neutral-focus-inner-accent';
import { neutralOutline as NeutralOutlineAlgorithm } from './color-vNext/recipes/neutral-outline';
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
export const accentFillSelectedDelta = create<number>('accent-fill-selected-delta').withDefault(12);

export const accentForegroundRestDelta = create<number>('accent-foreground-rest-delta').withDefault(0);
export const accentForegroundHoverDelta = create<number>('accent-foreground-hover-delta').withDefault(6);
export const accentForegroundActiveDelta = create<number>('accent-foreground-active-delta').withDefault(-4);
export const accentForegroundFocusDelta = create<number>('accent-foreground-focus-delta').withDefault(0);

export const bodyFont = create<string>('body-font').withDefault('Segoe UI, sans-serif');
export const baseHeightMultiplier = create<number>('base-height-multiplier').withDefault(8);
export const baseHorizontalSpacingMultiplier = create<number>('base-horizontal-spacing-multiplier').withDefault(3);
export const baseLayerLuminance = create<number>('base-layer-luminance').withDefault(StandardLuminance.LightMode);
export const cornerRadius = create<number>('corner-radius').withDefault(4);
export const density = create<number>('density').withDefault(0);
export const designUnit = create<number>('design-unit').withDefault(4);
export const direction = create<Direction>('direction').withDefault(Direction.ltr);
export const disabledOpacity = create<number>('disabled-opacity').withDefault(0.3);
export const elevatedCornerRadius = create<number>('elevated-corner-radius').withDefault(4);
export const focusOutlineWidth = create<number>('focus-outline-width').withDefault(2);

export const neutralContrastFillRestDelta = create<number>('neutral-contrast-fill-rest-delta').withDefault(0);
export const neutralContrastFillHoverDelta = create<number>('neutral-contrast-fill-hover-delta').withDefault(-3);
export const neutralContrastFillActiveDelta = create<number>('neutral-contrast-fill-active-delta').withDefault(7);
export const neutralContrastFillFocusDelta = create<number>('neutral-contrast-fill-focus-delta').withDefault(0);

export const neutralDividerRestDelta = create<number>('neutral-divider-rest-delta').withDefault(8);

export const neutralFillActiveDelta = create<number>('neutral-fill-active-delta').withDefault(5);
export const neutralFillCardDelta = create<number>('neutral-fill-card-delta').withDefault(3);
export const neutralFillFocusDelta = create<number>('neutral-fill-focus-delta').withDefault(0);
export const neutralFillHoverDelta = create<number>('neutral-fill-hover-delta').withDefault(10);
export const neutralFillInputActiveDelta = create<number>('neutral-fill-input-active-delta').withDefault(0);
export const neutralFillInputFocusDelta = create<number>('neutral-fill-input-focus-delta').withDefault(0);
export const neutralFillInputHoverDelta = create<number>('neutral-fill-input-hover-delta').withDefault(0);
export const neutralFillInputRestDelta = create<number>('neutral-fill-input-rest-delta').withDefault(0);
export const neutralFillInputSelectedDelta = create<number>('neutral-fill-input-selected-delta').withDefault(0);
export const neutralFillRestDelta = create<number>('neutral-fill-rest-delta').withDefault(7);
export const neutralFillSelectedDelta = create<number>('neutral-fill-selected-delta').withDefault(7);
export const neutralFillStealthActiveDelta = create<number>('neutral-fill-stealth-active-delta').withDefault(3);
export const neutralFillStealthFocusDelta = create<number>('neutral-fill-stealth-focus-delta').withDefault(0);
export const neutralFillStealthHoverDelta = create<number>('neutral-fill-stealth-hover-delta').withDefault(5);
export const neutralFillStealthRestDelta = create<number>('neutral-fill-stealth-rest-delta').withDefault(0);
export const neutralFillStealthSelectedDelta = create<number>('neutral-fill-stealth-selected-delta').withDefault(7);
export const neutralFillToggleRestDelta = create<number>('neutral-fill-toggle-rest-delta').withDefault(0);
export const neutralFillToggleActiveDelta = create<number>('neutral-fill-toggle-active-delta').withDefault(-5);
export const neutralFillToggleFocusDelta = create<number>('neutral-fill-toggle-focus-delta').withDefault(0);
export const neutralFillToggleHoverDelta = create<number>('neutral-fill-toggle-hover-delta').withDefault(8);
export const neutralForegroundActiveDelta = create<number>('neutral-foreground-active-delta').withDefault(0);
export const neutralForegroundFocusDelta = create<number>('neutral-foreground-focus-delta').withDefault(0);
export const neutralForegroundHoverDelta = create<number>('neutral-foreground-hover-delta').withDefault(0);
export const neutralOutlineActiveDelta = create<number>('neutral-outline-active-delta').withDefault(16);
export const neutralOutlineFocusDelta = create<number>('neutral-outline-focus-delta').withDefault(25);
export const neutralOutlineHoverDelta = create<number>('neutral-outline-hover-delta').withDefault(40);
export const neutralOutlineRestDelta = create<number>('neutral-outline-rest-delta').withDefault(25);
export const outlineWidth = create<number>('outline-width').withDefault(1);
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
    accentFillSelectedDelta.getValueFor(element),
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
export const accentFillSelected = create<SwatchRGB>('accent-fill-selected').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentFill)(element).selected;
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
export const NeutralDivider = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-divider', builder =>
  builder.instance((element: HTMLElement) =>
    neutralDividerAlgorithm(
      neutralPalette.getValueFor(element),
      fillColor.getValueFor(element),
      neutralDividerRestDelta.getValueFor(element),
    ),
  ),
);
export const neutralDivider = create<SwatchRGB>('neutral-divider').withDefault(element =>
  DI.findResponsibleContainer(element).get(NeutralDivider)(element),
);

// Neutral Fill Card
export const NeutralFillCard = DI.createInterface<(element: HTMLElement, fill?: SwatchRGB) => SwatchRGB>(
  'neutral-fill-card',
  builder =>
    builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
      neutralFillCardAlgorithm(
        neutralPalette.getValueFor(element),
        fill || fillColor.getValueFor(element),
        neutralFillCardDelta.getValueFor(element),
      ),
    ),
);
export const neutralFillCard = create<SwatchRGB>('neutral-fill-card').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralFillCard)(element),
);

// Neutral Contrast Fill
export const NeutralContrastFill = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof neutralContrastFillAlgorithm>
>('neutral-contrast-fill', builder =>
  builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
    neutralContrastFillAlgorithm(
      neutralPalette.getValueFor(element),
      fill || fillColor.getValueFor(element),
      neutralContrastFillRestDelta.getValueFor(element),
      neutralContrastFillHoverDelta.getValueFor(element),
      neutralContrastFillActiveDelta.getValueFor(element),
      neutralContrastFillFocusDelta.getValueFor(element),
    ),
  ),
);

export const neutralContrastFillRest = create<SwatchRGB>('neutral-contrast-fill-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralContrastFill)(element).rest,
);

export const neutralContrastFillHover = create<SwatchRGB>('neutral-contrast-fill-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralContrastFill)(element).hover,
);

export const neutralContrastFillActive = create<SwatchRGB>('neutral-contrast-fill-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralContrastFill)(element).active,
);

export const neutralContrastFillFocus = create<SwatchRGB>('neutral-contrast-fill-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralContrastFill)(element).focus,
);

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
      neutralFillInputSelectedDelta.getValueFor(element),
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
export const neutralFillInputSelected = create<SwatchRGB>('neutral-fill-input-selected').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).selected,
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
      neutralFillStealthSelectedDelta.getValueFor(element),
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
export const neutralFillStealthSelected = create<SwatchRGB>('neutral-fill-stealth-selected').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).selected,
);

// Neutral Fill Toggle
// TODO: none of these are actually used, do we need them?
export const NeutralFillToggle = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof neutralFillToggleAlgorithm>
>('neutral-fill-toggle', builder =>
  builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
    neutralFillToggleAlgorithm(
      neutralPalette.getValueFor(element),
      fill || fillColor.getValueFor(element),
      neutralFillToggleRestDelta.getValueFor(element),
      neutralFillToggleHoverDelta.getValueFor(element),
      neutralFillToggleActiveDelta.getValueFor(element),
      neutralFillToggleFocusDelta.getValueFor(element),
    ),
  ),
);

export const neutralFillToggleRest = create<SwatchRGB>('neutral-fill-toggle-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillToggle)(element).rest,
);

export const neutralFillToggleHover = create<SwatchRGB>('neutral-fill-toggle-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillToggle)(element).hover,
);

export const neutralFillToggleActive = create<SwatchRGB>('neutral-fill-toggle-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillToggle)(element).active,
);

export const neutralFillToggleFocus = create<SwatchRGB>('neutral-fill-toggle-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillToggle)(element).focus,
);
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
      neutralFillSelectedDelta.getValueFor(element),
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
export const neutralFillSelected = create<SwatchRGB>('neutral-fill-selected').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).selected,
);

// Neutral Focus
export const NeutralFocus = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-focus', builder =>
  builder.instance((element: HTMLElement) =>
    neutralFocusAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
  ),
);
export const neutralFocus = create<SwatchRGB>('neutral-focus').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralFocus)(element),
);

// Neutral Focus Inner Accent
export const NeutralFocusInnerAccent = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'neutral-focus-inner-accent',
  builder =>
    builder.instance((element: HTMLElement) =>
      neutralFocusInnerAccentAlgorithm(
        accentPalette.getValueFor(element),
        fillColor.getValueFor(element),
        neutralFocus.getValueFor(element),
      ),
    ),
);

export const neutralFocusInnerAccent = create<SwatchRGB>(
  'neutral-focus-inner-accent',
).withDefault((element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFocusInnerAccent)(element));

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

export const neutralForegroundRest = create<SwatchRGB>('neutral-foreground-rest').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralForeground)(element),
);

// Neutral Outline
export const NeutralOutline = DI.createInterface<(element: HTMLElement) => ReturnType<typeof NeutralOutlineAlgorithm>>(
  'neutral-outline',
  builder =>
    builder.instance((element: HTMLElement) =>
      NeutralOutlineAlgorithm(
        neutralPalette.getValueFor(element),
        fillColor.getValueFor(element),
        neutralOutlineRestDelta.getValueFor(element),
        neutralOutlineHoverDelta.getValueFor(element),
        neutralOutlineActiveDelta.getValueFor(element),
        neutralOutlineFocusDelta.getValueFor(element),
      ),
    ),
);

export const neutralOutlineRest = create<SwatchRGB>('neutral-outline-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralOutline)(element).rest,
);
export const neutralOutlineHover = create<SwatchRGB>('neutral-outline-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralOutline)(element).hover,
);
export const neutralOutlineActive = create<SwatchRGB>('neutral-outline-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralOutline)(element).active,
);
export const neutralOutlineFocus = create<SwatchRGB>('neutral-outline-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralOutline)(element).focus,
);

// Neutral Layer Floating
export const NeutralLayerFloating = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'neutral-layer-floating',
  builder =>
    builder.instance((element: HTMLElement) =>
      neutralLayerFloatingAlgorithm(
        neutralPalette.getValueFor(element),
        baseLayerLuminance.getValueFor(element),
        neutralFillCardDelta.getValueFor(element),
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
      neutralFillCardDelta.getValueFor(element),
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
      neutralFillCardDelta.getValueFor(element),
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
      neutralFillCardDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
  ),
);

export const neutralLayerL4 = create<SwatchRGB>('neutral-layer-L4').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL4)(element),
);
