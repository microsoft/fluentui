import { customElement } from '@microsoft/fast-element';
import { presenceBadgeTemplate as template } from './presence-badge.template';
import { PresenceBadge } from './presence-badge';
import { presenceBadgeStyles as styles } from './presence-badge.styles';

/**
 * THe Presence Badge component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-presence-badge>`
 */
@customElement({
  name: 'fluent-presence-badge',
  template,
  styles,
})
export class FluentPresenceBadge extends PresenceBadge {}
