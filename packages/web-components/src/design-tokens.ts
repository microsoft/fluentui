import { DesignToken, DI } from '@microsoft/fast-foundation';
import { Direction } from '@microsoft/fast-web-utilities';
import { PaletteRGB } from './color-vNext/palette';
import { SwatchRGB } from './color-vNext/swatch';
import { accentFill as accentFillAlgorithm } from './color-vNext/recipes/accent-fill';
import { accentForeground as accentForegroundAlgorithm } from './color-vNext/recipes/accent-foreground';
import { foregroundOnAccent as foregroundOnAccentAlgorithm } from './color-vNext/recipes/foreground-on-accent';
import { neutralFillInverse as neutralFillInverseAlgorithm } from './color-vNext/recipes/neutral-fill-inverse';
import { neutralDivider as neutralDividerAlgorithm } from './color-vNext/recipes/neutral-divider';
import { neutralFill as neutralFillAlgorithm } from './color-vNext/recipes/neutral-fill';
import { neutralFillInput as NeutralFillInputAlgorithm } from './color-vNext/recipes/neutral-fill-input';
import { neutralFillLayer as neutralFillLayerAlgorithm } from './color-vNext/recipes/neutral-fill-layer';
import { neutralFillStealth as neutralFillStealthAlgorithm } from './color-vNext/recipes/neutral-fill-stealth';
import { neutralFillContrast as neutralFillContrastAlgorithm } from './color-vNext/recipes/neutral-fill-contrast';
import {
  focusStrokeInner as focusStrokeInnerAlgorithm,
  focusStrokeOuter as focusStrokeOuterAlgorithm,
} from './color-vNext/recipes/focus-stroke';
import { neutralForegroundHint as neutralForegroundHintAlgorithm } from './color-vNext/recipes/neutral-foreground-hint';
import { neutralForeground as neutralForegroundAlgorithm } from './color-vNext/recipes/neutral-foreground';
import { neutralLayerFloating as neutralLayerFloatingAlgorithm } from './color-vNext/recipes/neutral-layer-floating';
import { neutralLayerL1 as neutralLayerL1Algorithm } from './color-vNext/recipes/neutral-layer-L1';
import { neutralLayerL2 as neutralLayerL2Algorithm } from './color-vNext/recipes/neutral-layer-L2';
import { neutralLayerL3 as neutralLayerL3Algorithm } from './color-vNext/recipes/neutral-layer-L3';
import { neutralLayerL4 as neutralLayerL4Algorithm } from './color-vNext/recipes/neutral-layer-L4';
import { neutralStroke as neutralStrokeAlgorithm } from './color-vNext/recipes/neutral-stroke';
import { accentBase, middleGrey } from './color-vNext/utilities/color-constants';
import { StandardLuminance } from './color';

const { create } = DesignToken;

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
export const bodyFont = create<string>('body-font').withDefault('Segoe UI, sans-serif');
/** @public */
export const baseHeightMultiplier = create<number>('base-height-multiplier').withDefault(8);
/** @public */
export const baseHorizontalSpacingMultiplier = create<number>('base-horizontal-spacing-multiplier').withDefault(3);
/** @public */
export const baseLayerLuminance = create<number>('base-layer-luminance').withDefault(StandardLuminance.LightMode);
/** @public */
export const controlCornerRadius = create<number>('control-corner-radius').withDefault(4);
/** @public @deprecated Use controlCornerRadius */
export const cornerRadius = controlCornerRadius;
/** @public */
export const density = create<number>('density').withDefault(0);
/** @public */
export const designUnit = create<number>('design-unit').withDefault(4);
/** @public */
export const direction = create<Direction>('direction').withDefault(Direction.ltr);
/** @public */
export const disabledOpacity = create<number>('disabled-opacity').withDefault(0.3);
/** @public */
export const layerCornerRadius = create<number>('layer-corner-radius').withDefault(4);
/** @public @deprecated Use layerCornerRadius */
export const elevatedCornerRadius = layerCornerRadius;
/** @public */
export const focusStrokeWidth = create<number>('focus-stroke-width').withDefault(2);
/** @public @deprecated Use focusStrokeWidth */
export const focusOutlineWidth = focusStrokeWidth;

/** @public */
export const neutralFillInverseRestDelta = create<number>('neutral-fill-inverse-rest-delta').withDefault(0);
/** @public */
export const neutralFillInverseHoverDelta = create<number>('neutral-fill-inverse-hover-delta').withDefault(-3);
/** @public */
export const neutralFillInverseActiveDelta = create<number>('neutral-fill-inverse-active-delta').withDefault(7);
/** @public */
export const neutralFillInverseFocusDelta = create<number>('neutral-fill-inverse-focus-delta').withDefault(0);
/** @public @deprecated Use neutralFillInverseRestDelta */
export const neutralContrastFillRestDelta = neutralFillInverseRestDelta;
/** @public @deprecated Use neutralFillInverseHoverDelta */
export const neutralContrastFillHoverDelta = neutralFillInverseHoverDelta;
/** @public @deprecated Use neutralFillInverseActiveDelta */
export const neutralContrastFillActiveDelta = neutralFillInverseActiveDelta;
/** @public @deprecated Use neutralFillInverseFocusDelta */
export const neutralContrastFillFocusDelta = neutralFillInverseFocusDelta;

/** @public */
export const neutralStrokeDividerRestDelta = create<number>('neutral-stroke-divider-rest-delta').withDefault(8);
/** @public @deprecated Use neutralStrokeDividerRestDelta */
export const neutralDividerRestDelta = neutralStrokeDividerRestDelta;

/** @public */
export const neutralFillActiveDelta = create<number>('neutral-fill-active-delta').withDefault(5);
/** @public */
export const neutralFillLayerRestDelta = create<number>('neutral-fill-layer-rest-delta').withDefault(3);
/** @public @deprecated Use neutralFillLayerRestDelta */
export const neutralFillCardDelta = neutralFillLayerRestDelta;
/** @public */
export const neutralFillFocusDelta = create<number>('neutral-fill-focus-delta').withDefault(0);
/** @public */
export const neutralFillHoverDelta = create<number>('neutral-fill-hover-delta').withDefault(10);

/** @public */
export const neutralFillInputActiveDelta = create<number>('neutral-fill-input-active-delta').withDefault(0);
/** @public */
export const neutralFillInputFocusDelta = create<number>('neutral-fill-input-focus-delta').withDefault(0);
/** @public */
export const neutralFillInputHoverDelta = create<number>('neutral-fill-input-hover-delta').withDefault(0);
/** @public */
export const neutralFillInputRestDelta = create<number>('neutral-fill-input-rest-delta').withDefault(0);

/** @public */
export const neutralFillRestDelta = create<number>('neutral-fill-rest-delta').withDefault(7);

/** @public */
export const neutralFillStealthActiveDelta = create<number>('neutral-fill-stealth-active-delta').withDefault(3);
/** @public */
export const neutralFillStealthFocusDelta = create<number>('neutral-fill-stealth-focus-delta').withDefault(0);
/** @public */
export const neutralFillStealthHoverDelta = create<number>('neutral-fill-stealth-hover-delta').withDefault(5);
/** @public */
export const neutralFillStealthRestDelta = create<number>('neutral-fill-stealth-rest-delta').withDefault(0);

/** @public */
export const neutralFillStrongRestDelta = create<number>('neutral-fill-strong-rest-delta').withDefault(0);
/** @public */
export const neutralFillStrongActiveDelta = create<number>('neutral-fill-strong-active-delta').withDefault(-5);
/** @public */
export const neutralFillStrongFocusDelta = create<number>('neutral-fill-strong-focus-delta').withDefault(0);
/** @public */
export const neutralFillStrongHoverDelta = create<number>('neutral-fill-strong-hover-delta').withDefault(8);
/** @public @deprecated Use neutralFillStrongRestDelta */
export const neutralFillToggleRestDelta = neutralFillStrongRestDelta;
/** @public @deprecated Use neutralFillStrongHoverDelta */
export const neutralFillToggleHoverDelta = neutralFillStrongHoverDelta;
/** @public @deprecated Use neutralFillStrongActiveDelta */
export const neutralFillToggleActiveDelta = neutralFillStrongActiveDelta;
/** @public @deprecated Use neutralFillStrongFocusDelta */
export const neutralFillToggleFocusDelta = neutralFillStrongFocusDelta;

/** @public */
export const neutralStrokeActiveDelta = create<number>('neutral-stroke-active-delta').withDefault(16);
/** @public */
export const neutralStrokeFocusDelta = create<number>('neutral-stroke-focus-delta').withDefault(25);
/** @public */
export const neutralStrokeHoverDelta = create<number>('neutral-stroke-hover-delta').withDefault(40);
/** @public */
export const neutralStrokeRestDelta = create<number>('neutral-stroke-rest-delta').withDefault(25);

/** @public */
export const strokeWidth = create<number>('stroke-width').withDefault(1);
/** @public @deprecated Use strokeWidth */
export const outlineWidth = strokeWidth;

/** @public */
export const typeRampBaseFontSize = create<string>('type-ramp-base-font-size').withDefault('14px');
/** @public */
export const typeRampBaseLineHeight = create<string>('type-ramp-base-line-height').withDefault('20px');
/** @public */
export const typeRampMinus1FontSize = create<string>('type-ramp-minus1-font-size').withDefault('12px');
/** @public */
export const typeRampMinus1LineHeight = create<string>('type-ramp-minus1-line-height').withDefault('16px');
/** @public */
export const typeRampMinus2FontSize = create<string>('type-ramp-minus2-font-size').withDefault('10px');
/** @public */
export const typeRampMinus2LineHeight = create<string>('type-ramp-minus2-line-height').withDefault('14px');
/** @public */
export const typeRampPlus1FontSize = create<string>('type-ramp-plus1-font-size').withDefault('16px');
/** @public */
export const typeRampPlus1LineHeight = create<string>('type-ramp-plus1-line-height').withDefault('22px');
/** @public */
export const typeRampPlus2FontSize = create<string>('type-ramp-plus2-font-size').withDefault('20px');
/** @public */
export const typeRampPlus2LineHeight = create<string>('type-ramp-plus2-line-height').withDefault('28px');
/** @public */
export const typeRampPlus3FontSize = create<string>('type-ramp-plus3-font-size').withDefault('24px');
/** @public */
export const typeRampPlus3LineHeight = create<string>('type-ramp-plus3-line-height').withDefault('32px');
/** @public */
export const typeRampPlus4FontSize = create<string>('type-ramp-plus4-font-size').withDefault('28px');
/** @public */
export const typeRampPlus4LineHeight = create<string>('type-ramp-plus4-line-height').withDefault('36px');
/** @public */
export const typeRampPlus5FontSize = create<string>('type-ramp-plus5-font-size').withDefault('32px');
/** @public */
export const typeRampPlus5LineHeight = create<string>('type-ramp-plus5-line-height').withDefault('40px');
/** @public */
export const typeRampPlus6FontSize = create<string>('type-ramp-plus6-font-size').withDefault('40px');
/** @public */
export const typeRampPlus6LineHeight = create<string>('type-ramp-plus6-line-height').withDefault('52px');

/** @public */
export const neutralPalette = create<PaletteRGB>({ name: "neutral-palette", cssCustomPropertyName: null }).withDefault(PaletteRGB.create(middleGrey));
/** @public */
export const accentPalette = create<PaletteRGB>({ name: 'accent-palette', cssCustomPropertyName: null }).withDefault(PaletteRGB.create(accentBase));

/** @public */
export const fillColor = create<SwatchRGB>('fill-color').withDefault(element => {
  const palette = neutralPalette.getValueFor(element);
  return palette.get(0);
});

enum ContrastTarget {
  normal = 4.5,
  large = 7,
}

// Foreground On Accent
const foregroundOnAccentByContrast = (contrast: number) => (element: HTMLElement) =>
  foregroundOnAccentAlgorithm(accentPalette.getValueFor(element).source, contrast);
/** @public */
export const ForegroundOnAccent = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'foreground-on-accent',
  builder => builder.instance((element: HTMLElement) => foregroundOnAccentByContrast(ContrastTarget.normal)(element)),
);
/** @public */
export const ForegroundOnAccentLarge = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'foreground-on-accent-large',
  builder => builder.instance((element: HTMLElement) => foregroundOnAccentByContrast(ContrastTarget.large)(element)),
);

/** @public */
export const foregroundOnAccent = create<SwatchRGB>('foreground-on-accent').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(ForegroundOnAccent)(element);
});
/** @public @deprecated Use foregroundOnAccent */
export const accentForegroundCut = foregroundOnAccent;
/** @public */
export const foregroundOnAccentLarge = create<SwatchRGB>('foreground-on-accent-large').withDefault(
  (element: HTMLElement) => {
    return DI.findResponsibleContainer(element).get(ForegroundOnAccentLarge)(element);
  },
);
/** @public @deprecated Use foregroundOnAccentLarge */
export const accentForegroundCutLarge = foregroundOnAccentLarge;

// Accent Fill
const accentFillByContrast = (contrast: number) => (element: HTMLElement, fill?: SwatchRGB) => {
  return accentFillAlgorithm(
    accentPalette.getValueFor(element),
    neutralPalette.getValueFor(element),
    fill || fillColor.getValueFor(element),
    foregroundOnAccent.getValueFor(element),
    contrast,
    accentFillHoverDelta.getValueFor(element),
    accentFillActiveDelta.getValueFor(element),
    accentFillFocusDelta.getValueFor(element),
    neutralFillRestDelta.getValueFor(element),
    neutralFillHoverDelta.getValueFor(element),
    neutralFillActiveDelta.getValueFor(element),
  );
};
/** @public */
export const AccentFill = DI.createInterface<
  (element: HTMLElement, fill?: SwatchRGB) => ReturnType<typeof accentFillAlgorithm>
>('accent-fill', builder => builder.instance(accentFillByContrast(ContrastTarget.normal)));

/** @public */
export const accentFillRest = create<SwatchRGB>('accent-fill-rest').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentFill)(element).rest;
});
/** @public */
export const accentFillHover = create<SwatchRGB>('accent-fill-hover').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentFill)(element).hover;
});
/** @public */
export const accentFillActive = create<SwatchRGB>('accent-fill-active').withDefault((element: HTMLElement) => {
  return DI.findResponsibleContainer(element).get(AccentFill)(element).active;
});
/** @public */
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
/** @public */
export const AccentForeground = DI.createInterface<
  (element: HTMLElement) => ReturnType<typeof accentForegroundAlgorithm>
>('accent-foreground', builder => builder.instance(accentForegroundByContrast(ContrastTarget.normal)));

/** @public */
export const accentForegroundRest = create<SwatchRGB>('accent-foreground-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(AccentForeground)(element).rest,
);
/** @public */
export const accentForegroundHover = create<SwatchRGB>('accent-foreground-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(AccentForeground)(element).hover,
);
/** @public */
export const accentForegroundActive = create<SwatchRGB>('accent-foreground-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(AccentForeground)(element).active,
);
/** @public */
export const accentForegroundFocus = create<SwatchRGB>('accent-foreground-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(AccentForeground)(element).focus,
);

// Neutral Divider
/** @public */
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
/** @public */
export const neutralStrokeDivider = create<SwatchRGB>('neutral-stroke-divider').withDefault(element =>
  DI.findResponsibleContainer(element).get(NeutralStrokeDivider)(element),
);
/** @public @deprecated Use neutralStrokeDivider */
export const neutralDivider = neutralStrokeDivider;

// Neutral Fill Layer
/** @public */
export const NeutralFillLayer = DI.createInterface<(element: HTMLElement, fill?: SwatchRGB) => SwatchRGB>(
  'neutral-fill-layer',
  builder =>
    builder.instance((element: HTMLElement, fill?: SwatchRGB) =>
      neutralFillLayerAlgorithm(
        neutralPalette.getValueFor(element),
        fill || fillColor.getValueFor(element),
        neutralFillLayerRestDelta.getValueFor(element),
      ),
    ),
);
/** @public */
export const neutralFillLayer = create<SwatchRGB>('neutral-fill-layer').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralFillLayer)(element),
);
/** @public @deprecated Use neutralFillLayer */
export const neutralFillCard = neutralFillLayer;

// Neutral Fill Inverse
/** @public */
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

/** @public */
export const neutralFillInverseRest = create<SwatchRGB>('neutral-fill-inverse-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInverse)(element).rest,
);
/** @public */
export const neutralFillInverseHover = create<SwatchRGB>('neutral-fill-inverse-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInverse)(element).hover,
);
/** @public */
export const neutralFillInverseActive = create<SwatchRGB>('neutral-fill-inverse-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInverse)(element).active,
);
/** @public */
export const neutralFillInverseFocus = create<SwatchRGB>('neutral-fill-inverse-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInverse)(element).focus,
);
/** @public @deprecated Use neutralFillInverseRest */
export const neutralContrastFillRest = neutralFillInverseRest;
/** @public @deprecated Use neutralFillInverseHover */
export const neutralContrastFillHover = neutralFillInverseHover;
/** @public @deprecated Use neutralFillInverseActive */
export const neutralContrastFillActive = neutralFillInverseActive;
/** @public @deprecated Use neutralFillInverseFocus */
export const neutralContrastFillFocus = neutralFillInverseFocus;

// Neutral Fill Input
/** @public */
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

/** @public */
export const neutralFillInputRest = create<SwatchRGB>('neutral-fill-input-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).rest,
);
/** @public */
export const neutralFillInputHover = create<SwatchRGB>('neutral-fill-input-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).hover,
);
/** @public */
export const neutralFillInputFocus = create<SwatchRGB>('neutral-fill-input-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).focus,
);
/** @public */
export const neutralFillInputActive = create<SwatchRGB>('neutral-fill-input-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillInput)(element).active,
);

// Neutral Fill Stealth
/** @public */
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

/** @public */
export const neutralFillStealthRest = create<SwatchRGB>('neutral-fill-stealth-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).rest,
);
/** @public */
export const neutralFillStealthHover = create<SwatchRGB>('neutral-fill-stealth-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).hover,
);
/** @public */
export const neutralFillStealthActive = create<SwatchRGB>('neutral-fill-stealth-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).active,
);
/** @public */
export const neutralFillStealthFocus = create<SwatchRGB>('neutral-fill-stealth-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStealth)(element).focus,
);

// Neutral Fill Strong
// TODO: none of these are actually used, do we need them?
/** @public */
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

/** @public */
export const neutralFillStrongRest = create<SwatchRGB>('neutral-fill-strong-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStrong)(element).rest,
);
/** @public */
export const neutralFillStrongHover = create<SwatchRGB>('neutral-fill-strong-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStrong)(element).hover,
);
/** @public */
export const neutralFillStrongActive = create<SwatchRGB>('neutral-fill-strong-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStrong)(element).active,
);
/** @public */
export const neutralFillStrongFocus = create<SwatchRGB>('neutral-fill-strong-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFillStrong)(element).focus,
);
/** @public @deprecated Use neutralFillStrongRest */
export const neutralFillToggleRest = neutralFillStrongRest;
/** @public @deprecated Use neutralFillStrongHover */
export const neutralFillToggleHover = neutralFillStrongHover;
/** @public @deprecated Use neutralFillStrongActive */
export const neutralFillToggleActive = neutralFillStrongActive;
/** @public @deprecated Use neutralFillStrongFocus */
export const neutralFillToggleFocus = neutralFillStrongFocus;

// Neutral Fill
/** @public */
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
/** @public */
export const neutralFillRest = create<SwatchRGB>('neutral-fill-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).rest,
);
/** @public */
export const neutralFillHover = create<SwatchRGB>('neutral-fill-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).hover,
);
/** @public */
export const neutralFillActive = create<SwatchRGB>('neutral-fill-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).active,
);
/** @public */
export const neutralFillFocus = create<SwatchRGB>('neutral-fill-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralFill)(element).focus,
);

// Focus Stroke Outer
/** @public */
export const FocusStrokeOuter = DI.createInterface<(element: HTMLElement) => SwatchRGB>('focus-stroke-outer', builder =>
  builder.instance((element: HTMLElement) =>
    focusStrokeOuterAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
  ),
);

/** @public */
export const focusStrokeOuter = create<SwatchRGB>('focus-stroke-outer').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(FocusStrokeOuter)(element),
);
/** @public @deprecated Use focusStrokeOuter */
export const neutralFocus = focusStrokeOuter;

// Focus Stroke Inner
/** @public */
export const FocusStrokeInner = DI.createInterface<(element: HTMLElement) => SwatchRGB>('focus-stroke-inner', builder =>
  builder.instance((element: HTMLElement) =>
    focusStrokeInnerAlgorithm(
      accentPalette.getValueFor(element),
      fillColor.getValueFor(element),
      focusStrokeOuter.getValueFor(element),
    ),
  ),
);

/** @public */
export const focusStrokeInner = create<SwatchRGB>('focus-stroke-inner').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(FocusStrokeInner)(element),
);
/** @public @deprecated Use focusStrokeInner */
export const neutralFocusInnerAccent = focusStrokeInner;

// Neutral Foreground Hint
/** @public */
export const NeutralForegroundHint = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'neutral-foreground-hint',
  builder =>
    builder.instance((element: HTMLElement) =>
      neutralForegroundHintAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
    ),
);

/** @public */
export const neutralForegroundHint = create<SwatchRGB>('neutral-foreground-hint').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralForegroundHint)(element),
);

// Neutral Foreground
/** @public */
export const NeutralForeground = DI.createInterface<
  (element: HTMLElement) => ReturnType<typeof neutralForegroundAlgorithm>
>('neutral-foreground', builder =>
  builder.instance((element: HTMLElement) =>
    neutralForegroundAlgorithm(neutralPalette.getValueFor(element), fillColor.getValueFor(element)),
  ),
);

/** @public */
export const neutralForeground = create<SwatchRGB>('neutral-foreground').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralForeground)(element),
);
/** @public @deprecated Use neutralForeground */
export const neutralForegroundRest = neutralForeground;

// Neutral Stroke
/** @public */
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

/** @public */
export const neutralStrokeRest = create<SwatchRGB>('neutral-stroke-rest').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralStroke)(element).rest,
);
/** @public */
export const neutralStrokeHover = create<SwatchRGB>('neutral-stroke-hover').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralStroke)(element).hover,
);
/** @public */
export const neutralStrokeActive = create<SwatchRGB>('neutral-stroke-active').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralStroke)(element).active,
);
/** @public */
export const neutralStrokeFocus = create<SwatchRGB>('neutral-stroke-focus').withDefault(
  (element: HTMLElement) => DI.findResponsibleContainer(element).get(NeutralStroke)(element).focus,
);
/** @public @deprecated Use neutralStrokeRest */
export const neutralOutlineRest = neutralStrokeRest;
/** @public @deprecated Use neutralStrokeHover */
export const neutralOutlineHover = neutralStrokeHover;
/** @public @deprecated Use neutralStrokeActive */
export const neutralOutlineActive = neutralStrokeActive;
/** @public @deprecated Use neutralStrokeFocus */
export const neutralOutlineFocus = neutralStrokeFocus;

// Neutral Layer Floating
/** @public */
export const NeutralLayerFloating = DI.createInterface<(element: HTMLElement) => SwatchRGB>(
  'neutral-layer-floating',
  builder =>
    builder.instance((element: HTMLElement) =>
      neutralLayerFloatingAlgorithm(
        neutralPalette.getValueFor(element),
        baseLayerLuminance.getValueFor(element),
        neutralFillLayerRestDelta.getValueFor(element),
      ),
    ),
);

/** @public */
export const neutralLayerFloating = create<SwatchRGB>('neutral-layer-floating').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerFloating)(element),
);

// Neutral Layer L1
/** @public */
export const NeutralLayerL1 = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-layer-L1', builder =>
  builder.instance((element: HTMLElement) =>
    neutralLayerL1Algorithm(neutralPalette.getValueFor(element), baseLayerLuminance.getValueFor(element)),
  ),
);

/** @public */
export const neutralLayerL1 = create<SwatchRGB>('neutral-layer-L1').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL1)(element),
);

// Neutral Layer L2
/** @public */
export const NeutralLayerL2 = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-layer-L2', builder =>
  builder.instance((element: HTMLElement) =>
    neutralLayerL2Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
  ),
);

/** @public */
export const neutralLayerL2 = create<SwatchRGB>('neutral-layer-L2').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL2)(element),
);

// Neutral Layer L3
/** @public */
export const NeutralLayerL3 = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-layer-L3', builder =>
  builder.instance((element: HTMLElement) =>
    neutralLayerL3Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
  ),
);

/** @public */
export const neutralLayerL3 = create<SwatchRGB>('neutral-layer-L3').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL3)(element),
);

// Neutral Layer L4
/** @public */
export const NeutralLayerL4 = DI.createInterface<(element: HTMLElement) => SwatchRGB>('neutral-layer-L4', builder =>
  builder.instance((element: HTMLElement) =>
    neutralLayerL4Algorithm(
      neutralPalette.getValueFor(element),
      baseLayerLuminance.getValueFor(element),
      neutralFillLayerRestDelta.getValueFor(element),
      neutralFillRestDelta.getValueFor(element),
      neutralFillHoverDelta.getValueFor(element),
      neutralFillActiveDelta.getValueFor(element),
    ),
  ),
);

/** @public */
export const neutralLayerL4 = create<SwatchRGB>('neutral-layer-L4').withDefault((element: HTMLElement) =>
  DI.findResponsibleContainer(element).get(NeutralLayerL4)(element),
);
