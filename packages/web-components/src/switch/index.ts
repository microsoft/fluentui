import { Switch, SwitchOptions, switchTemplate as template } from '@microsoft/fast-foundation';
import { switchStyles as styles } from './switch.styles';

/**
 * The Fluent Switch Custom Element. Implements {@link @microsoft/fast-foundation#Switch},
 * {@link @microsoft/fast-foundation#SwitchTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-switch\>
 */
export const fluentSwitch = Switch.compose<SwitchOptions>({
  baseName: 'switch',
  template,
  styles,
  switch: `
    <span class="checked-indicator" part="checked-indicator"></span>
  `,
});

/**
 * Styles for Switch
 * @public
 */
export const switchStyles = styles;

/**
 * Switch Base class
 * @public
 */
export { Switch };
