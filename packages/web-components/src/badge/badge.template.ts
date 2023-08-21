import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation/patterns.js';
import { staticallyCompose } from '@microsoft/fast-foundation/utilities.js';
import type { Badge } from './badge.js';
import type { BadgeOptions } from './badge.options.js';

/**
 * The template for the Badge component.
 * @public
 */
export function badgeTemplate<T extends Badge>(options: BadgeOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    ${startSlotTemplate(options)}
    <slot>${staticallyCompose(options.defaultContent)}</slot>
    ${endSlotTemplate(options)}
  `;
}

export const template: ElementViewTemplate<Badge> = badgeTemplate();
