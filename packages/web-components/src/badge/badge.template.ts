import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import { staticallyCompose } from '../utils/template-helpers.js';
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
