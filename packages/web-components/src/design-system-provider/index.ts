import { attr, css, nullableNumberConverter } from '@microsoft/fast-element';
import {
  DensityOffset,
  DesignSystem,
  DesignSystemDefaults,
  neutralForegroundRest,
} from '@microsoft/fast-components-styles-msft';
import { Direction } from '@microsoft/fast-web-utilities';
import {
  CSSCustomPropertyBehavior,
  designSystemProperty,
  DesignSystemProvider,
  designSystemProvider,
  DesignSystemProviderTemplate as template,
} from '@microsoft/fast-foundation';
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
    attribute: 'accent-base-color',
    cssCustomProperty: false,
    default: DesignSystemDefaults.accentBaseColor,
  })
  public accentBaseColor: string;

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
    default: '10px',
  })
  public typeRampMinus2FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-minus-2-line-height',
    default: '16px',
  })
  public typeRampMinus2LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-minus-1-font-size',
    default: '12px',
  })
  public typeRampMinus1FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-minus-1-line-height',
    default: '16px',
  })
  public typeRampMinus1LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-base-font-size',
    default: '14px',
  })
  public typeRampBaseFontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-base-line-height',
    default: '20px',
  })
  public typeRampBaseLineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-1-font-size',
    default: '16px',
  })
  public typeRampPlus1FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-1-line-height',
    default: '24px',
  })
  public typeRampPlus1LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-2-font-size',
    default: '20px',
  })
  public typeRampPlus2FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-2-line-height',
    default: '28px',
  })
  public typeRampPlus2LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-3-font-size',
    default: '28px',
  })
  public typeRampPlus3FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-3-line-height',
    default: '36px',
  })
  public typeRampPlus3LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-4-font-size',
    default: '34px',
  })
  public typeRampPlus4FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-4-line-height',
    default: '44px',
  })
  public typeRampPlus4LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-5-font-size',
    default: '46px',
  })
  public typeRampPlus5FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-5-line-height',
    default: '56px',
  })
  public typeRampPlus5LineHeight: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-6-font-size',
    default: '60px',
  })
  public typeRampPlus6FontSize: string;

  @designSystemProperty({
    attribute: 'type-ramp-plus-6-line-height',
    default: '72px',
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
}

export type FluentDesignSystem = Omit<
  DesignSystem,
  'contrast' | 'fontWeight' | 'neutralForegroundDarkIndex' | 'neutralForegroundLightIndex'
>;
