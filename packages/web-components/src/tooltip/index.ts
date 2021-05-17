import { DI, DesignToken, Tooltip as FoundationTooltip, tooltipTemplate as template } from '@microsoft/fast-foundation';
import { tooltipStyles as styles } from './tooltip.styles';
import { white } from '../color-vNext/utilities/color-constants';
import { fillColor, NeutralContrastFill } from '../design-tokens';

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

    const recipe = DI.getOrCreateDOMContainer(this.parentElement!).get(NeutralContrastFill);
    const parentFill = fillColor.getValueFor(this.parentElement!);

    fillColor.setValueFor(this, (target: HTMLElement) => recipe(target, parentFill).rest);
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
  template,
  styles,
});
