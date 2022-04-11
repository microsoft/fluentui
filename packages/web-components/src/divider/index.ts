import { customElement } from '@microsoft/fast-element';
import { Divider } from './divider';
import { dividerTemplate as template } from './divider.template';
import { dividerStyles as styles } from './divider.styles';

/**
 * THe Divider component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-divider>`
 */
@customElement({
  name: 'fluent-divider',
  template,
  styles,
})
export class FluentDivider extends Divider {}
