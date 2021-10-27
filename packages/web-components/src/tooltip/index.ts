import { Tooltip as FoundationTooltip, tooltipTemplate as template } from '@microsoft/fast-foundation';
import { fillColor, neutralLayerFloating } from '../design-tokens';
import { tooltipStyles as styles } from './tooltip.styles';

/**
 * The Fluent tooltip class
 * @internal
 */
export class Tooltip extends FoundationTooltip {
  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    fillColor.setValueFor(this, neutralLayerFloating);
  }
}

/**
 * The Fluent Tooltip Custom Element. Implements {@link @microsoft/fast-foundation#Tooltip},
 * {@link @microsoft/fast-foundation#tooltipTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tooltip\>
 */
export const fluentTooltip = Tooltip.compose({
  baseName: 'tooltip',
  baseClass: FoundationTooltip,
  template,
  styles,
});
