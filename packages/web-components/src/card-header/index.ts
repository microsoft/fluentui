import { customElement } from '@microsoft/fast-element';
import { CardHeader } from './card-header';
import { cardHeaderTemplate as template } from './card-header.template';
import { cardHeaderStyles as styles } from './card-header.styles';

/**
 * The Card Header component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-card-header>`
 */
@customElement({
  name: 'fluent-card-header',
  template,
  styles,
})
export class FluentCardHeader extends CardHeader {}
