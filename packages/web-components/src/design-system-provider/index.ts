import { attr, css, nullableNumberConverter } from '@microsoft/fast-element';
import { Direction } from '@microsoft/fast-web-utilities';
import {
  CSSCustomPropertyBehavior,
  designSystemProperty,
  DesignSystemProvider,
  designSystemProvider,
  DesignSystemProviderTemplate as template,
} from '@microsoft/fast-foundation';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { createColorPalette, neutralForegroundRest } from '../color';
import { DensityOffset, DesignSystem, DesignSystemDefaults } from '../fluent-design-system';
import { DesignSystemProviderStyles as styles } from './design-system-provider.styles';

const color = new CSSCustomPropertyBehavior(
  'neutral-foreground-rest',
  neutralForegroundRest,
  (el: FluentDesignSystemProvider) => el,
);

const backgroundStyles = css`
  :host {
    background-color: var(--background-color);
    color: ${color.var};
  }
`.withBehaviors(color);

/**
 * The Fluent DesignSystemProvider Element. Implements {@link @microsoft/fast-foundation#DesignSystemProvider},
 * {@link @microsoft/fast-foundation#DesignSystemProviderTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-design-system-provider\>
 */
@designSystemProvider({
  name: 'fluent-design-system-provider',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentDesignSystemProvider extends DesignSystemProvider
  implements
    Omit<DesignSystem, 'contrast' | 'fontWeight' | 'neutralForegroundDarkIndex' | 'neutralForegroundLightIndex'> {
  /**
   * Used to instruct the FASTDesignSystemProvider
   * that it should not set the CSS
   * background-color and color properties
   *
   * @remarks
   * HTML boolean boolean attribute: no-paint
   */
  @attr({ attribute: 'no-paint', mode: 'boolean' })
  public noPaint = false;
  private noPaintChanged() {
    if (!this.noPaint && this.backgroundColor !== void 0) {
      this.$fastController.addStyles(backgroundStyles);
    } else {
      this.$fastController.removeStyles(backgroundStyles);
    }
  }

  /**
   * Define design system property attributes
   */
  @designSystemProperty({
    attribute: 'background-color',
    default: DesignSystemDefaults.backgroundColor,
  })
  public backgroundColor: string;
  protected backgroundColorChanged(): void {
    // If background changes or is removed, we need to
    // re-evaluate whether we should have paint styles applied
    this.noPaintChanged();
  }

  @designSystemProperty({
    attribute: 'neutral-base-color',
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralBaseColor,
  })
  public neutralBaseColor: string;
  protected neutralBaseColorChanged(oldValue: string, newValue: string): void {
    const color = parseColorHexRGB(newValue);
    if (color) {
      this.neutralPalette = createColorPalette(color);
    }
  }

  @designSystemProperty({
    attribute: 'accent-base-color',
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentBaseColor,
  })
  public accentBaseColor: string;
  protected accentBaseColorChanged(oldValue: string, newValue: string): void {
    const color = parseColorHexRGB(newValue);
    if (color) {
      this.accentPalette = createColorPalette(color);
    }
  }

  @designSystemProperty({
    attribute: false,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralPalette,
  })
  public neutralPalette: string[];

  @designSystemProperty({
    attribute: false,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentPalette,
  })
  public accentPalette: string[];

  @designSystemProperty({
    default: DesignSystemDefaults.density,
    converter: nullableNumberConverter,
  })
  public density: DensityOffset;

  @designSystemProperty({
    attribute: 'design-unit',
    converter: nullableNumberConverter,
    default: DesignSystemDefaults.designUnit,
  })
  public designUnit: number;

  @designSystemProperty({
    attribute: 'direction',
    cssCustomProperty: false,
    default: DesignSystemDefaults.direction,
  })
  public direction: Direction;

  @designSystemProperty({
    attribute: 'base-height-multiplier',
    default: DesignSystemDefaults.baseHeightMultiplier,
    converter: nullableNumberConverter,
  })
  public baseHeightMultiplier: number;

  @designSystemProperty({
    attribute: 'base-horizontal-spacing-multiplier',
    converter: nullableNumberConverter,
    default: DesignSystemDefaults.baseHorizontalSpacingMultiplier,
  })
  public baseHorizontalSpacingMultiplier: number;

  @designSystemProperty({
    attribute: 'corner-radius',
    converter: nullableNumberConverter,
    default: DesignSystemDefaults.cornerRadius,
  })
  public cornerRadius: number;

  @designSystemProperty({
    attribute: 'elevated-corner-radius',
    converter: nullableNumberConverter,
    default: DesignSystemDefaults.elevatedCornerRadius,
  })
  public elevatedCornerRadius: number;

  @designSystemProperty({
    attribute: 'outline-width',
    converter: nullableNumberConverter,
    default: DesignSystemDefaults.outlineWidth,
  })
  public outlineWidth: number;

  @designSystemProperty({
    attribute: 'focus-outline-width',
    converter: nullableNumberConverter,
    default: DesignSystemDefaults.focusOutlineWidth,
  })
  public focusOutlineWidth: number;

  @designSystemProperty({
    attribute: 'disabled-opacity',
    converter: nullableNumberConverter,
    default: DesignSystemDefaults.disabledOpacity,
  })
  public disabledOpacity: number;

  @designSystemProperty({
    attribute: 'type-ramp-minus-2-font-size',
    default: DesignSystemDefaults.typeRampMinus2FontSize,
  })
  public typeRampMinus2FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-minus-2-line-height',
    default: DesignSystemDefaults.typeRampMinus2LineHeight,
  })
  public typeRampMinus2LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-minus-1-font-size',
    default: DesignSystemDefaults.typeRampMinus1FontSize,
  })
  public typeRampMinus1FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-minus-1-line-height',
    default: DesignSystemDefaults.typeRampMinus1LineHeight,
  })
  public typeRampMinus1LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-base-font-size',
    default: DesignSystemDefaults.typeRampBaseFontSize,
  })
  public typeRampBaseFontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-base-line-height',
    default: DesignSystemDefaults.typeRampBaseLineHeight,
  })
  public typeRampBaseLineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-1-font-size',
    default: DesignSystemDefaults.typeRampPlus1FontSize,
  })
  public typeRampPlus1FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-1-line-height',
    default: DesignSystemDefaults.typeRampPlus1LineHeight,
  })
  public typeRampPlus1LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-2-font-size',
    default: DesignSystemDefaults.typeRampPlus2FontSize,
  })
  public typeRampPlus2FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-2-line-height',
    default: DesignSystemDefaults.typeRampPlus2LineHeight,
  })
  public typeRampPlus2LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-3-font-size',
    default: DesignSystemDefaults.typeRampPlus3FontSize,
  })
  public typeRampPlus3FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-3-line-height',
    default: DesignSystemDefaults.typeRampPlus3LineHeight,
  })
  public typeRampPlus3LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-4-font-size',
    default: DesignSystemDefaults.typeRampPlus4FontSize,
  })
  public typeRampPlus4FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-4-line-height',
    default: DesignSystemDefaults.typeRampPlus4LineHeight,
  })
  public typeRampPlus4LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-5-font-size',
    default: DesignSystemDefaults.typeRampPlus5FontSize,
  })
  public typeRampPlus5FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-5-line-height',
    default: DesignSystemDefaults.typeRampPlus5LineHeight,
  })
  public typeRampPlus5LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-6-font-size',
    default: DesignSystemDefaults.typeRampPlus6FontSize,
  })
  public typeRampPlus6FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-6-line-height',
    default: DesignSystemDefaults.typeRampPlus6LineHeight,
  })
  public typeRampPlus6LineHeight: string;

  @designSystemProperty({
    attribute: 'accent-fill-rest-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentFillRestDelta,
  })
  public accentFillRestDelta: number;

  @designSystemProperty({
    attribute: 'accent-fill-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentFillHoverDelta,
  })
  public accentFillHoverDelta: number;

  @designSystemProperty({
    attribute: 'accent-fill-active-delta',
    cssCustomProperty: false,
    converter: nullableNumberConverter,
    default: DesignSystemDefaults.accentFillActiveDelta,
  })
  public accentFillActiveDelta: number;

  @designSystemProperty({
    attribute: 'accent-fill-focus-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentFillFocusDelta,
  })
  public accentFillFocusDelta: number;

  @designSystemProperty({
    attribute: 'accent-fill-selected-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentFillSelectedDelta,
  })
  public accentFillSelectedDelta: number;

  @designSystemProperty({
    attribute: 'accent-foreground-rest-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentForegroundRestDelta,
  })
  public accentForegroundRestDelta: number;

  @designSystemProperty({
    attribute: 'accent-foreground-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentForegroundHoverDelta,
  })
  public accentForegroundHoverDelta: number;

  @designSystemProperty({
    attribute: 'accent-foreground-active-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentForegroundActiveDelta,
  })
  public accentForegroundActiveDelta: number;

  @designSystemProperty({
    attribute: 'accent-foreground-focus-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentForegroundFocusDelta,
  })
  public accentForegroundFocusDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-rest-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillRestDelta,
  })
  public neutralFillRestDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillHoverDelta,
  })
  public neutralFillHoverDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-active-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillActiveDelta,
  })
  public neutralFillActiveDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-focus-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillFocusDelta,
  })
  public neutralFillFocusDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-selected-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillSelectedDelta,
  })
  public neutralFillSelectedDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-input-rest-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillInputRestDelta,
  })
  public neutralFillInputRestDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-input-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillInputHoverDelta,
  })
  public neutralFillInputHoverDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-input-active-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillInputActiveDelta,
  })
  public neutralFillInputActiveDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-input-focus-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillInputFocusDelta,
  })
  public neutralFillInputFocusDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-input-selected-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillInputSelectedDelta,
  })
  public neutralFillInputSelectedDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-stealth-rest-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillStealthRestDelta,
  })
  public neutralFillStealthRestDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-stealth-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillStealthHoverDelta,
  })
  public neutralFillStealthHoverDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-stealth-active-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillStealthActiveDelta,
  })
  public neutralFillStealthActiveDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-stealth-focus-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillStealthFocusDelta,
  })
  public neutralFillStealthFocusDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-stealth-selected-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillStealthSelectedDelta,
  })
  public neutralFillStealthSelectedDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-toggle-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillToggleHoverDelta,
  })
  public neutralFillToggleHoverDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-toggle-hover-active',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillToggleActiveDelta,
  })
  public neutralFillToggleActiveDelta: number;

  @designSystemProperty({
    attribute: 'neutral-fill-toggle-hover-focus',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillToggleFocusDelta,
  })
  public neutralFillToggleFocusDelta: number;

  @designSystemProperty({
    attribute: 'base-layer-luminance',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.baseLayerLuminance,
  })
  public baseLayerLuminance: number; // 0...1

  @designSystemProperty({
    attribute: 'neutral-fill-card-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralFillCardDelta,
  })
  public neutralFillCardDelta: number;

  @designSystemProperty({
    attribute: 'neutral-foreground-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralForegroundHoverDelta,
  })
  public neutralForegroundHoverDelta: number;

  @designSystemProperty({
    attribute: 'neutral-foreground-active-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralForegroundActiveDelta,
  })
  public neutralForegroundActiveDelta: number;

  @designSystemProperty({
    attribute: 'neutral-foreground-focus-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralForegroundFocusDelta,
  })
  public neutralForegroundFocusDelta: number;

  @designSystemProperty({
    attribute: 'neutral-divider-rest-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralDividerRestDelta,
  })
  public neutralDividerRestDelta: number;

  @designSystemProperty({
    attribute: 'neutral-outline-rest-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralOutlineRestDelta,
  })
  public neutralOutlineRestDelta: number;

  @designSystemProperty({
    attribute: 'neutral-outline-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralOutlineHoverDelta,
  })
  public neutralOutlineHoverDelta: number;

  @designSystemProperty({
    attribute: 'neutral-outline-active-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralOutlineActiveDelta,
  })
  public neutralOutlineActiveDelta: number;

  @designSystemProperty({
    attribute: 'neutral-outline-focus-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralOutlineFocusDelta,
  })
  public neutralOutlineFocusDelta: number;

  /**
   * The distance from the resolved neutral contrast fill color for the rest state of the neutral-contrast-fill recipe. See {@link @microsoft/fast-components#neutralContrastFillRestBehavior} for usage in CSS.
   *
   * @remarks
   * HTML attribute: neutral-contrast-fill-rest-delta
   *
   * CSS custom property: N/A
   */
  @designSystemProperty({
    attribute: 'neutral-contrast-fill-rest-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralContrastFillRestDelta,
  })
  public neutralContrastFillRestDelta: number;

  /**
   * The distance from the resolved neutral contrast fill color for the rest state of the neutral-contrast-fillrecipe. See {@link @microsoft/fast-components#neutralContrastFillHoverBehavior} for usage in CSS.
   *
   * @remarks
   * HTML attribute: neutral-contrast-fill-hover-delta
   *
   * CSS custom property: N/A
   */
  @designSystemProperty({
    attribute: 'neutral-contrast-fill-hover-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralContrastFillHoverDelta,
  })
  public neutralContrastFillHoverDelta: number;

  /**
   * The distance from the resolved neutral contrast fill color for the rest state of the neutral-contrast-fill recipe. See {@link @microsoft/fast-components#neutralContrastFillActiveBehavior} for usage in CSS.
   *
   * @remarks
   * HTML attribute: neutral-contrast-fill-active-delta
   *
   * CSS custom property: N/A
   */
  @designSystemProperty({
    attribute: 'neutral-contrast-fill-active-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralContrastFillActiveDelta,
  })
  public neutralContrastFillActiveDelta: number;

  /**
   * The distance from the resolved neutral contrast fill color for the rest state of the neutral-contrast-fill recipe. See {@link @microsoft/fast-components#neutralContrastFillFocusBehavior} for usage in CSS.
   *
   * @remarks
   * HTML attribute: neutral-contrast-fill-focus-delta
   *
   * CSS custom property: N/A
   */
  @designSystemProperty({
    attribute: 'neutral-contrast-fill-focus-delta',
    converter: nullableNumberConverter,
    cssCustomProperty: false,
    default: DesignSystemDefaults.neutralContrastFillFocusDelta,
  })
  public neutralContrastFillFocusDelta: number;
}

/**
 * The Fluent Design System
 * @public
 */
export type FluentDesignSystem = Omit<
  DesignSystem,
  'contrast' | 'fontWeight' | 'neutralForegroundDarkIndex' | 'neutralForegroundLightIndex'
>;
