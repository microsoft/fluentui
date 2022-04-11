import { customElement } from '@microsoft/fast-element';
import { Accordion } from './accordion';
import { accordionTemplate as template } from './accordion.template';
import { accordionStyles as styles } from './accordion.styles';

/**
 * THe Accordion component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-accordion>`
 */
@customElement({
  name: 'fluent-accordion',
  template,
  styles,
})
export class FluentAccordion extends Accordion {}
