import { customElement, html } from '@microsoft/fast-element';
import { Text } from './text';
import { textStyles as styles } from './text.styles';

/**
 * The Fluent Text component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-text>`
 */
@customElement({
  name: 'fluent-text',
  template: html`<slot></slot>`,
  styles,
})
export class FluentText extends Text {}
