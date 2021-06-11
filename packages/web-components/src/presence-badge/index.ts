import { customElement } from '@microsoft/fast-element';
import { styles } from './presence-badge.styles';
import { template } from './presence-badge.template';
import { PresenceBadge } from './presence-badge';

/**
 * The Fluent Presence Badge Custom Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-presence-badge\>
 *
 */
@customElement({
  name: 'fluent-presence-badge',
  styles,
  template,
})
export class FluentPresenceBadge extends PresenceBadge {}

/**
 * Styles for FluentPresenceBadgeStyles
 * @public
 */
export const FluentPresenceBadgeStyles = styles;

/**
 * Template for FluentPresenceBadge
 * @public
 */
export const FluentPresenceBadgeTemplate = template;
