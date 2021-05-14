import { tooltipTemplate as template, Tooltip } from '@microsoft/fast-foundation';
import { tooltipStyles as styles } from './tooltip.styles';

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
