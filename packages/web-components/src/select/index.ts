import { customElement } from '@microsoft/fast-element';
import { Select, SelectTemplate as template } from '@microsoft/fast-foundation';
import { SelectStyles as styles } from './select.styles';

/**
 * The Fluent Select Element. Implements {@link @microsoft/fast-foundation#Select},
 * {@link @microsoft/fast-foundation#SelectTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-select\>
 */
@customElement({
  name: 'fluent-select',
  template,
  styles,
})
export class FluentSelect extends Select {}

/**
 * Styles for Select
 * @public
 */
export const SelectStyles = styles;
