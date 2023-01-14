import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation';
import type { Badge } from './badge.js';

/**
 * The template for the Badge component.
 * TODO: Replace w/ updated FAST Badge when aligned
 * @public
 */
export function badgeTemplate<T extends Badge>(options: BadgeOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    ${startSlotTemplate(options)}
    <slot></slot>
    ${endSlotTemplate(options)}
  `;
}

export const template: ElementViewTemplate<Badge> = badgeTemplate();
