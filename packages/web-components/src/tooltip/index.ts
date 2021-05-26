import { customElement } from '@microsoft/fast-element';
import { createTooltipTemplate, Tooltip } from '@microsoft/fast-foundation';
import { TooltipStyles as styles } from './tooltip.styles';

/**
 * The Fluent Tooltip Custom Element. Implements {@link @microsoft/fast-foundation#Tooltip},
 * {@link @microsoft/fast-foundation#Tooltip}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tooltip\>
 */
@customElement({
  name: 'fluent-tooltip',
  template: createTooltipTemplate('fluent'),
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentTooltip extends Tooltip {}

/**
 * Styles for Tooltip
 * @public
 */
export const TooltipStyles = styles;
