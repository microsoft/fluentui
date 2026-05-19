import { type ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/start-end.js';
import type { CounterBadge } from './counter-badge.js';
import type { CounterBadgeOptions } from './counter-badge.options.js';

/**
 * Generates a template for the CounterBadge component.
 *
 * @public
 */
export function counterBadgeTemplate<T extends CounterBadge>(
  options: CounterBadgeOptions = {},
): ElementViewTemplate<T> {
  return html<T>`
    ${startSlotTemplate(options)}
    <span>${x => x.displayValue}</span>
    ${endSlotTemplate(options)}
  `;
}

/**
 * The template for the fluent-counter-badge component.
 *
 * @public
 */
export const template: ElementViewTemplate<CounterBadge> = counterBadgeTemplate();
