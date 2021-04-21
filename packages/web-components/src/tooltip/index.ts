import { tooltipTemplate as template, Tooltip } from '@microsoft/fast-foundation';
import { tooltipStyles as styles } from './tooltip.styles';

/**
 * The FAST Tooltip Custom Element. Implements {@link @microsoft/fast-foundation#Tooltip},
 * {@link @microsoft/fast-foundation#tooltipTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tooltip\>
 */
export const fluentTooltip = Tooltip.compose({
  baseName: 'tooltip',
  template,
  styles,
});
