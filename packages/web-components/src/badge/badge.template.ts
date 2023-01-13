import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, StartEndOptions, startSlotTemplate } from '@microsoft/fast-foundation';
import type { Badge } from './badge.js';

/**
 * @internal - marking as internal
 * Update with
 */
export type BadgeOptions = StartEndOptions<Badge>;

/**
 * The template for the Badge component.
 * TODO: Replace w/ updated FAST Badge when aligned
 * @public
 */
function badgeTemplate<T extends Badge>(options: BadgeOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    ${startSlotTemplate(options)}
    <slot></slot>
    ${endSlotTemplate(options)}
  `;
}

export const template: ElementViewTemplate<Badge> = badgeTemplate();
