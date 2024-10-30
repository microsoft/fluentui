import { type ElementViewTemplate, html } from '@microsoft/fast-element';
import { badgeTemplate } from '../badge/badge.template.js';
import type { Badge } from '../badge/badge.js';
import type { CounterBadge } from './counter-badge.js';
import type { CounterBadgeOptions } from './counter-badge.options.js';

function composeTemplate<T extends CounterBadge & Badge>(options: CounterBadgeOptions = {}): ElementViewTemplate<T> {
  return badgeTemplate<T>({
    defaultContent: html<T>`${x => x.setCount()}`,
  });
}

/**
 * The template for the Counter Badge component.
 * @public
 */
export const template: ElementViewTemplate<CounterBadge> = composeTemplate<CounterBadge & Badge>();
