import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../../patterns/index.js';
import { staticallyCompose } from '../../utils/template-helpers.js';
import type { KumoBadge } from './badge.js';
import type { KumoBadgeOptions } from './badge.options.js';

/**
 * The template for the Badge component.
 * @public
 */
export function badgeTemplate<T extends KumoBadge>(options: KumoBadgeOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    ${startSlotTemplate(options)}
    <slot>${staticallyCompose(options.defaultContent)}</slot>
    ${endSlotTemplate(options)}
  `;
}

export const template: ElementViewTemplate<KumoBadge> = badgeTemplate();
