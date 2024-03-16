import { parseColorHexRGB } from '@microsoft/fast-colors';
import { attr, css, html, nullableNumberConverter, Observable, ValueConverter } from '@microsoft/fast-element';
import {
  DesignToken,
  DesignTokenValue,
  display,
  forcedColorsStylesheetBehavior,
  FoundationElement,
} from '@microsoft/fast-foundation';
import { Direction, SystemColors } from '@microsoft/fast-web-utilities';
import { Swatch, SwatchRGB } from '../color/swatch';
import {
  accentBaseColor,
  accentFillActiveDelta,
  accentFillFocusDelta,
  accentFillHoverDelta,
  accentFillRestDelta,
  accentForegroundActiveDelta,
  accentForegroundFocusDelta,
  accentForegroundHoverDelta,
  accentForegroundRestDelta,
  baseHeightMultiplier,
  baseHorizontalSpacingMultiplier,
  baseLayerLuminance,
  controlCornerRadius,
  density,
  designUnit,
  direction,
  disabledOpacity,
  fillColor,
  focusStrokeWidth,
  layerCornerRadius,
  neutralBaseColor,
  neutralFillActiveDelta,
  neutralFillFocusDelta,
  neutralFillHoverDelta,
  neutralFillInputActiveDelta,
  neutralFillInputFocusDelta,
  neutralFillInputHoverDelta,
  neutralFillInputRestDelta,
  neutralFillLayerRestDelta,
  neutralFillRestDelta,
  neutralFillStealthActiveDelta,
  neutralFillStealthFocusDelta,
  neutralFillStealthHoverDelta,
  neutralFillStealthRestDelta,
  neutralFillStrongActiveDelta,
  neutralFillStrongFocusDelta,
  neutralFillStrongHoverDelta,
  neutralForegroundRest,
  neutralStrokeActiveDelta,
  neutralStrokeDividerRestDelta,
  neutralStrokeFocusDelta,
  neutralStrokeHoverDelta,
  neutralStrokeRestDelta,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  typeRampMinus1FontSize,
  typeRampMinus1LineHeight,
  typeRampMinus2FontSize,
  typeRampMinus2LineHeight,
  typeRampPlus1FontSize,
  typeRampPlus1LineHeight,
  typeRampPlus2FontSize,
  typeRampPlus2LineHeight,
  typeRampPlus3FontSize,
  typeRampPlus3LineHeight,
  typeRampPlus4FontSize,
  typeRampPlus4LineHeight,
  typeRampPlus5FontSize,
  typeRampPlus5LineHeight,
  typeRampPlus6FontSize,
  typeRampPlus6LineHeight,
} from '../design-tokens';

/**
 * A {@link ValueConverter} that converts to and from `Swatch` values.
 * @remarks
 * This converter allows for colors represented as string hex values, returning `null` if the
 * input was `null` or `undefined`.
 * @internal
 */
const swatchConverter: ValueConverter = {
  toView(value: any): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    return (value as Swatch)?.toColorString();
  },

  fromView(value: any): any {
    if (value === null || value === undefined) {
      return null;
    }
    const color = parseColorHexRGB(value);
    return color ? SwatchRGB.create(color!.r, color!.g, color!.b) : null;
  },
};

const backgroundStyles = css`
  :host {
    background-color: ${fillColor};
    color: ${neutralForegroundRest};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(
    css`
      :host {
        background-color: ${SystemColors.Canvas};
        box-shadow: 0 0 0 1px ${SystemColors.CanvasText};
        color: ${SystemColors.CanvasText};
      }
    `,
  ),
);

function designToken<T extends {}>(token: DesignToken<T>) {
  return (source: DesignSystemProvider, key: string) => {
    source[key + 'Changed'] = function (this: DesignSystemProvider, prev: T | undefined, next: T | undefined) {
      if (next !== undefined && next !== null) {
        token.setValueFor(this, next as DesignTokenValue<T>);
      } else {
        token.deleteValueFor(this);
      }
    };
  };
}

/**
 * The Fluent DesignSystemProvider Element.
 * @public
 */
export class DesignSystemProvider extends FoundationElement {
  constructor() {
    super();

    // If fillColor or baseLayerLuminance change, we need to
    // re-evaluate whether we should have paint styles applied
    const subscriber = {
      handleChange: this.noPaintChanged.bind(this),
    };
    Observable.getNotifier(this).subscribe(subscriber, 'fillColor');
    Observable.getNotifier(this).subscribe(subscriber, 'baseLayerLuminance');
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.noPaintChanged();
  }

  /**
   * Used to instruct the FluentDesignSystemProvider
   * that it should not set the CSS
   * background-color and color properties
   *
   * @remarks
   * HTML boolean attribute: no-paint
   */
  @attr({ attribute: 'no-paint', mode: 'boolean' })
  public noPaint = false;
  private noPaintChanged() {
    if (!this.noPaint && (this.fillColor !== void 0 || this.baseLayerLuminance)) {
      this.$fastController.addStyles(backgroundStyles);
    } else {
      this.$fastController.removeStyles(backgroundStyles);
    }
  }

  /**
   * Define design system property attributes
   * @remarks
   * HTML attribute: fill-color
   *
   * CSS custom property: --fill-color
   */
  @attr({
    attribute: 'fill-color',
    converter: swatchConverter,
    mode: 'fromView',
  })
  @designToken(fillColor)
  public fillColor: Swatch;

  /**
   * A convenience to recreate the accentPalette
   * @remarks
   * HTML attribute: accent-base-color
   */
  @attr({
    attribute: 'accent-base-color',
    converter: swatchConverter,
    mode: 'fromView',
  })
  @designToken(accentBaseColor)
  public accentBaseColor: Swatch;

  /**
   * A convenience to recreate the neutralPalette
   * @remarks
   * HTML attribute: neutral-base-color
   */
  @attr({
    attribute: 'neutral-base-color',
    converter: swatchConverter,
    mode: 'fromView',
  })
  @designToken(neutralBaseColor)
  public neutralBaseColor: Swatch;

  /**
   *
   * The density offset, used with designUnit to calculate height and spacing.
   *
   * @remarks
   * HTML attribute: density
   *
   * CSS custom property: --density
   */
  @attr({
    converter: nullableNumberConverter,
  })
  @designToken(density)
  public density: number;

  /**
   * The grid-unit that UI dimensions are derived from in pixels.
   *
   * @remarks
   * HTML attribute: design-unit
   *
   * CSS custom property: --design-unit
   */
  @attr({
    attribute: 'design-unit',
    converter: nullableNumberConverter,
  })
  @designToken(designUnit)
  public designUnit: number;

  /**
   * The primary document direction.
   *
   * @remarks
   * HTML attribute: direction
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'direction',
  })
  @designToken(direction)
  public direction: Direction;

  /**
   * The number of designUnits used for component height at the base density.
   *
   * @remarks
   * HTML attribute: base-height-multiplier
   *
   * CSS custom property: --base-height-multiplier
   */
  @attr({
    attribute: 'base-height-multiplier',
    converter: nullableNumberConverter,
  })
  @designToken(baseHeightMultiplier)
  public baseHeightMultiplier: number;

  /**
   * The number of designUnits used for horizontal spacing at the base density.
   *
   * @remarks
   * HTML attribute: base-horizontal-spacing-multiplier
   *
   * CSS custom property: --base-horizontal-spacing-multiplier
   */
  @attr({
    attribute: 'base-horizontal-spacing-multiplier',
    converter: nullableNumberConverter,
  })
  @designToken(baseHorizontalSpacingMultiplier)
  public baseHorizontalSpacingMultiplier: number;

  /**
   * The corner radius applied to controls.
   *
   * @remarks
   * HTML attribute: control-corner-radius
   *
   * CSS custom property: --control-corner-radius
   */
  @attr({
    attribute: 'control-corner-radius',
    converter: nullableNumberConverter,
  })
  @designToken(controlCornerRadius)
  public controlCornerRadius: number;

  /**
   * The corner radius applied to layers.
   *
   * @remarks
   * HTML attribute: layer-corner-radius
   *
   * CSS custom property: --layer-corner-radius
   */
  @attr({
    attribute: 'layer-corner-radius',
    converter: nullableNumberConverter,
  })
  @designToken(layerCornerRadius)
  public layerCornerRadius: number;

  /**
   * The width of the standard stroke applied to stroke components in pixels.
   *
   * @remarks
   * HTML attribute: stroke-width
   *
   * CSS custom property: --stroke-width
   */
  @attr({
    attribute: 'stroke-width',
    converter: nullableNumberConverter,
  })
  @designToken(strokeWidth)
  public strokeWidth: number;

  /**
   * The width of the standard focus stroke in pixels.
   *
   * @remarks
   * HTML attribute: focus-stroke-width
   *
   * CSS custom property: --focus-stroke-width
   */
  @attr({
    attribute: 'focus-stroke-width',
    converter: nullableNumberConverter,
  })
  @designToken(focusStrokeWidth)
  public focusStrokeWidth: number;

  /**
   * The opacity of a disabled control.
   *
   * @remarks
   * HTML attribute: disabled-opacity
   *
   * CSS custom property: --disabled-opacity
   */
  @attr({
    attribute: 'disabled-opacity',
    converter: nullableNumberConverter,
  })
  @designToken(disabledOpacity)
  public disabledOpacity: number;

  /**
   * The font-size two steps below the base font-size
   *
   * @remarks
   * HTML attribute: type-ramp-minus-2-font-size
   *
   * CSS custom property: --type-ramp-minus-2-font-size
   */
  @attr({
    attribute: 'type-ramp-minus-2-font-size',
  })
  @designToken(typeRampMinus2FontSize)
  public typeRampMinus2FontSize: string;

  /**
   * The line-height two steps below the base line-height
   *
   * @remarks
   * HTML attribute: type-ramp-minus-2-line-height
   *
   * CSS custom property: --type-ramp-minus-2-line-height
   */
  @attr({
    attribute: 'type-ramp-minus-2-line-height',
  })
  @designToken(typeRampMinus2LineHeight)
  public typeRampMinus2LineHeight: string;

  /**
   * The font-size one step below the base font-size
   *
   * @remarks
   * HTML attribute: type-ramp-minus-1-font-size
   *
   * CSS custom property: --type-ramp-minus-1-font-size
   */
  @attr({
    attribute: 'type-ramp-minus-1-font-size',
  })
  @designToken(typeRampMinus1FontSize)
  public typeRampMinus1FontSize: string;

  /**
   * The line-height one step below the base line-height
   *
   * @remarks
   * HTML attribute: type-ramp-minus-1-line-height
   *
   * CSS custom property: --type-ramp-minus-1-line-height
   */
  @attr({
    attribute: 'type-ramp-minus-1-line-height',
  })
  @designToken(typeRampMinus1LineHeight)
  public typeRampMinus1LineHeight: string;

  /**
   * The base font-size of the relative type-ramp scale
   *
   * @remarks
   * HTML attribute: type-ramp-base-font-size
   *
   * CSS custom property: --type-ramp-base-font-size
   */
  @attr({
    attribute: 'type-ramp-base-font-size',
  })
  @designToken(typeRampBaseFontSize)
  public typeRampBaseFontSize: string;

  /**
   * The base line-height of the relative type-ramp scale
   *
   * @remarks
   * HTML attribute: type-ramp-base-line-height
   *
   * CSS custom property: --type-ramp-base-line-height
   */
  @attr({
    attribute: 'type-ramp-base-line-height',
  })
  @designToken(typeRampBaseLineHeight)
  public typeRampBaseLineHeight: string;

  /**
   * The font-size one step above the base font-size
   *
   * @remarks
   * HTML attribute: type-ramp-plus-1-font-size
   *
   * CSS custom property: --type-ramp-plus-1-font-size
   */
  @attr({
    attribute: 'type-ramp-plus-1-font-size',
  })
  @designToken(typeRampPlus1FontSize)
  public typeRampPlus1FontSize: string;

  /**
   * The line-height one step above the base line-height
   *
   * @remarks
   * HTML attribute: type-ramp-plus-1-line-height
   *
   * CSS custom property: --type-ramp-plus-1-line-height
   */
  @attr({
    attribute: 'type-ramp-plus-1-line-height',
  })
  @designToken(typeRampPlus1LineHeight)
  public typeRampPlus1LineHeight: string;

  /**
   * The font-size two steps above the base font-size
   *
   * @remarks
   * HTML attribute: type-ramp-plus-2-font-size
   *
   * CSS custom property: --type-ramp-plus-2-font-size
   */
  @attr({
    attribute: 'type-ramp-plus-2-font-size',
  })
  @designToken(typeRampPlus2FontSize)
  public typeRampPlus2FontSize: string;

  /**
   * The line-height two steps above the base line-height
   *
   * @remarks
   * HTML attribute: type-ramp-plus-2-line-height
   *
   * CSS custom property: --type-ramp-plus-2-line-height
   */
  @attr({
    attribute: 'type-ramp-plus-2-line-height',
  })
  @designToken(typeRampPlus2LineHeight)
  public typeRampPlus2LineHeight: string;

  /**
   * The font-size three steps above the base font-size
   *
   * @remarks
   * HTML attribute: type-ramp-plus-3-font-size
   *
   * CSS custom property: --type-ramp-plus-3-font-size
   */
  @attr({
    attribute: 'type-ramp-plus-3-font-size',
  })
  @designToken(typeRampPlus3FontSize)
  public typeRampPlus3FontSize: string;

  /**
   * The line-height three steps above the base line-height
   *
   * @remarks
   * HTML attribute: type-ramp-plus-3-line-height
   *
   * CSS custom property: --type-ramp-plus-3-line-height
   */
  @attr({
    attribute: 'type-ramp-plus-3-line-height',
  })
  @designToken(typeRampPlus3LineHeight)
  public typeRampPlus3LineHeight: string;

  /**
   * The font-size four steps above the base font-size
   *
   * @remarks
   * HTML attribute: type-ramp-plus-4-font-size
   *
   * CSS custom property: --type-ramp-plus-4-font-size
   */
  @attr({
    attribute: 'type-ramp-plus-4-font-size',
  })
  @designToken(typeRampPlus4FontSize)
  public typeRampPlus4FontSize: string;

  /**
   * The line-height four steps above the base line-height
   *
   * @remarks
   * HTML attribute: type-ramp-plus-4-line-height
   *
   * CSS custom property: --type-ramp-plus-4-line-height
   */
  @attr({
    attribute: 'type-ramp-plus-4-line-height',
  })
  @designToken(typeRampPlus4LineHeight)
  public typeRampPlus4LineHeight: string;

  /**
   * The font-size five steps above the base font-size
   *
   * @remarks
   * HTML attribute: type-ramp-plus-5-font-size
   *
   * CSS custom property: --type-ramp-plus-5-font-size
   */
  @attr({
    attribute: 'type-ramp-plus-5-font-size',
  })
  @designToken(typeRampPlus5FontSize)
  public typeRampPlus5FontSize: string;

  /**
   * The line-height five steps above the base line-height
   *
   * @remarks
   * HTML attribute: type-ramp-plus-5-line-height
   *
   * CSS custom property: --type-ramp-plus-5-line-height
   */
  @attr({
    attribute: 'type-ramp-plus-5-line-height',
  })
  @designToken(typeRampPlus5LineHeight)
  public typeRampPlus5LineHeight: string;

  /**
   * The font-size six steps above the base font-size
   *
   * @remarks
   * HTML attribute: type-ramp-plus-6-font-size
   *
   * CSS custom property: --type-ramp-plus-6-font-size
   */
  @attr({
    attribute: 'type-ramp-plus-6-font-size',
  })
  @designToken(typeRampPlus6FontSize)
  public typeRampPlus6FontSize: string;

  /**
   * The line-height six steps above the base line-height
   *
   * @remarks
   * HTML attribute: type-ramp-plus-6-line-height
   *
   * CSS custom property: --type-ramp-plus-6-line-height
   */
  @attr({
    attribute: 'type-ramp-plus-6-line-height',
  })
  @designToken(typeRampPlus6LineHeight)
  public typeRampPlus6LineHeight: string;

  /**
   * The distance from the resolved accent fill color for the rest state of the accent-fill recipe.
   *
   * @remarks
   * HTML attribute: accent-fill-rest-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'accent-fill-rest-delta',
    converter: nullableNumberConverter,
  })
  @designToken(accentFillRestDelta)
  public accentFillRestDelta: number;

  /**
   * The distance from the resolved accent fill color for the hover state of the accent-fill recipe.
   *
   * @remarks
   * HTML attribute: accent-fill-hover-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'accent-fill-hover-delta',
    converter: nullableNumberConverter,
  })
  @designToken(accentFillHoverDelta)
  public accentFillHoverDelta: number;

  /**
   * The distance from the resolved accent fill color for the active state of the accent-fill recipe.
   *
   * @remarks
   * HTML attribute: accent-fill-active-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'accent-fill-active-delta',
    converter: nullableNumberConverter,
  })
  @designToken(accentFillActiveDelta)
  public accentFillActiveDelta: number;

  /**
   * The distance from the resolved accent fill color for the focus state of the accent-fill recipe.
   *
   * @remarks
   * HTML attribute: accent-fill-focus-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'accent-fill-focus-delta',
    converter: nullableNumberConverter,
  })
  @designToken(accentFillFocusDelta)
  public accentFillFocusDelta: number;

  /**
   * The distance from the resolved accent foreground color for the rest state of the accent-foreground recipe.
   *
   * @remarks
   * HTML attribute: accent-foreground-rest-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'accent-foreground-rest-delta',
    converter: nullableNumberConverter,
  })
  @designToken(accentForegroundRestDelta)
  public accentForegroundRestDelta: number;

  /**
   * The distance from the resolved accent foreground color for the hover state of the accent-foreground recipe.
   *
   * @remarks
   * HTML attribute: accent-foreground-hover-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'accent-foreground-hover-delta',
    converter: nullableNumberConverter,
  })
  @designToken(accentForegroundHoverDelta)
  public accentForegroundHoverDelta: number;

  /**
   * The distance from the resolved accent foreground color for the active state of the accent-foreground recipe.
   *
   * @remarks
   * HTML attribute: accent-foreground-active-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'accent-foreground-active-delta',
    converter: nullableNumberConverter,
  })
  @designToken(accentForegroundActiveDelta)
  public accentForegroundActiveDelta: number;

  /**
   * The distance from the resolved accent foreground color for the focus state of the accent-foreground recipe.
   *
   * @remarks
   * HTML attribute: accent-foreground-focus-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'accent-foreground-focus-delta',
    converter: nullableNumberConverter,
  })
  @designToken(accentForegroundFocusDelta)
  public accentForegroundFocusDelta: number;

  /**
   * The distance from the resolved neutral fill color for the rest state of the neutral-fill recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-rest-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-rest-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillRestDelta)
  public neutralFillRestDelta: number;

  /**
   * The distance from the resolved neutral fill color for the hover state of the neutral-fill recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-hover-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-hover-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillHoverDelta)
  public neutralFillHoverDelta: number;

  /**
   * The distance from the resolved neutral fill color for the active state of the neutral-fill recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-active-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-active-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillActiveDelta)
  public neutralFillActiveDelta: number;

  /**
   * The distance from the resolved neutral fill color for the focus state of the neutral-fill recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-focus-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-focus-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillFocusDelta)
  public neutralFillFocusDelta: number;

  /**
   * The distance from the resolved neutral fill input color for the rest state of the neutral-fill-input recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-input-rest-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-input-rest-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillInputRestDelta)
  public neutralFillInputRestDelta: number;

  /**
   * The distance from the resolved neutral fill input color for the hover state of the neutral-fill-input recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-input-hover-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-input-hover-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillInputHoverDelta)
  public neutralFillInputHoverDelta: number;

  /**
   * The distance from the resolved neutral fill input color for the active state of the neutral-fill-input recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-input-active-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-input-active-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillInputActiveDelta)
  public neutralFillInputActiveDelta: number;

  /**
   * The distance from the resolved neutral fill input color for the focus state of the neutral-fill-input recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-input-focus-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-input-focus-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillInputFocusDelta)
  public neutralFillInputFocusDelta: number;

  /**
   * The distance from the resolved neutral fill input color for the rest state of the neutral-fill-layer recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-layer-rest-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-layer-rest-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillLayerRestDelta)
  public neutralFillLayerRestDelta: number;

  /**
   * The distance from the resolved neutral fill stealth color for the rest state of the neutral-fill-stealth recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-stealth-rest-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-stealth-rest-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillStealthRestDelta)
  public neutralFillStealthRestDelta: number;

  /**
   * The distance from the resolved neutral fill stealth color for the hover state of the neutral-fill-stealth recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-stealth-hover-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-stealth-hover-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillStealthHoverDelta)
  public neutralFillStealthHoverDelta: number;

  /**
   * The distance from the resolved neutral fill stealth color for the active state of the neutral-fill-stealth recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-stealth-active-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-stealth-active-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillStealthActiveDelta)
  public neutralFillStealthActiveDelta: number;

  /**
   * The distance from the resolved neutral fill stealth color for the focus state of the neutral-fill-stealth recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-stealth-focus-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-stealth-focus-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillStealthFocusDelta)
  public neutralFillStealthFocusDelta: number;

  /**
   * The distance from the resolved neutral fill strong color for the hover state of the neutral-fill-strong recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-strong-hover-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-strong-hover-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillStrongHoverDelta)
  public neutralFillStrongHoverDelta: number;

  /**
   * The distance from the resolved neutral fill strong color for the active state of the neutral-fill-strong recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-strong-active-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-strong-active-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillStrongActiveDelta)
  public neutralFillStrongActiveDelta: number;

  /**
   * The distance from the resolved neutral fill strong color for the focus state of the neutral-fill-strong recipe.
   *
   * @remarks
   * HTML attribute: neutral-fill-strong-focus-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-fill-strong-focus-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralFillStrongFocusDelta)
  public neutralFillStrongFocusDelta: number;

  /**
   * The {@link https://www.w3.org/WAI/GL/wiki/Relative_luminance#:~:text=WCAG%20definition%20of%20relative%20luminance,and%201%20for%20lightest%20white|relative luminance} of the base layer of the application.
   *
   * @remarks
   * When set to a number between 0 and 1
   *
   * HTML attribute: base-layer-luminance
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'base-layer-luminance',
    converter: nullableNumberConverter,
  })
  @designToken(baseLayerLuminance)
  public baseLayerLuminance: number; // 0...1

  /**
   * The distance from the resolved divider color for the rest state of the neutral-stroke-divider recipe.
   *
   * @remarks
   * HTML attribute: neutral-stroke-divider-rest-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-stroke-divider-rest-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralStrokeDividerRestDelta)
  public neutralStrokeDividerRestDelta: number;

  /**
   * The distance from the resolved neutral stroke color for the rest state of the neutral-stroke recipe.
   *
   * @remarks
   * HTML attribute: neutral-stroke-rest-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-stroke-rest-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralStrokeRestDelta)
  public neutralStrokeRestDelta: number;

  /**
   * The distance from the resolved neutral stroke color for the hover state of the neutral-stroke recipe.
   *
   * @remarks
   * HTML attribute: neutral-stroke-hover-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-stroke-hover-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralStrokeHoverDelta)
  public neutralStrokeHoverDelta: number;

  /**
   * The distance from the resolved neutral stroke color for the active state of the neutral-stroke recipe.
   *
   * @remarks
   * HTML attribute: neutral-stroke-active-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-stroke-active-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralStrokeActiveDelta)
  public neutralStrokeActiveDelta: number;

  /**
   * The distance from the resolved neutral stroke color for the focus state of the neutral-stroke recipe.
   *
   * @remarks
   * HTML attribute: neutral-stroke-focus-delta
   *
   * CSS custom property: N/A
   */
  @attr({
    attribute: 'neutral-stroke-focus-delta',
    converter: nullableNumberConverter,
  })
  @designToken(neutralStrokeFocusDelta)
  public neutralStrokeFocusDelta: number;
}

/**
 * The Fluent Design System Provider Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-design-system-provider\>
 */
export const fluentDesignSystemProvider = DesignSystemProvider.compose({
  baseName: 'design-system-provider',
  template: html` <slot></slot> `,
  styles: css`
    ${display('block')}
  `,
});
