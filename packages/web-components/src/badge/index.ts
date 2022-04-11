import { customElement } from '@microsoft/fast-element';
import { Badge } from './badge';
import { badgeTemplate as template } from './badge.template';
import { badgeStyles as styles } from './badge.styles';

/**
 * THe Badge component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-badge>`
 */
@customElement({
  name: 'fluent-badge',
  template,
  styles,
})
export class FluentBadge extends Badge {}
