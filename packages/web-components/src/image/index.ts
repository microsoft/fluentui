import { customElement, html } from '@microsoft/fast-element';
import { Image } from './image';
import { imageStyles as styles } from './image.styles';

/**
 * The Fluent Image component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-image>`
 */
@customElement({
  name: 'fluent-image',
  template: html`<slot></slot>`,
  styles,
})
export class FluentImage extends Image {}
