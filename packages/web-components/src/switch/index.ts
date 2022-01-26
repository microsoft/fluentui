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
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="12" height="12" rx="6"/>
    </svg>
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
