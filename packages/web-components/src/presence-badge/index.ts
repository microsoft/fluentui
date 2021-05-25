import { attr, customElement } from '@microsoft/fast-element';
import { styles } from './presence-badge.styles';
import { template } from './presence-badge.template';
import { PresenceBadge } from './presence-badge';

/**
 * The Fluent Presence Badge Custom Element. Implements {@link @microsoft/fast-foundation#NumberField},
 * {@link @microsoft/fast-foundation#NumberFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-number-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-presence-badge',
  styles,
  template,
})
export class FluentPresenceBadge extends PresenceBadge {}

/**
 * Styles for PresenceBadge
 * @public
 */
export const FluentPresenceBadgeStyles = styles;

/**
 * Template for PresenceBadge
 * @public
 */
export const FluentPresenceBadgeTemplate = template;
