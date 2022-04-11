import { customElement, html, when } from '@microsoft/fast-element';
import { Label } from './label';
import { labelStyles as styles } from './label.styles';

/**
 * The Fluent Label component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-label>`
 */
@customElement({
  name: 'fluent-label',
  template: html` <template>
    <slot></slot>
    ${when(x => x.required, html`<slot name="required">*</slot>`)}
  </template>`,
  styles,
})
export class FluentLabel extends Label {}
