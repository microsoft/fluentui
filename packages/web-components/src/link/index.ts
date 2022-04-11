import { customElement } from '@microsoft/fast-element';
import { Link } from './link';
import { linkTemplate as template } from './link.template';
import { linkStyles as styles } from './link.styles';

/**
 * A function that returns a Button registration for configuring the component with a DesignSystem.
 * Implements
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-link>`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-link',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentLink extends Link {}
