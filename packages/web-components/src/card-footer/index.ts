import { customElement } from '@microsoft/fast-element';
import { CardFooter } from './card-footer';
import { cardFooterTemplate as template } from './card-footer.template';
import { cardFooterStyles as styles } from './card-footer.styles';

/**
 * THe Card Footer component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-card-footer>`
 */
@customElement({
  name: 'fluent-card-footer',
  template,
  styles,
})
export class FluentCardFooter extends CardFooter {}
