import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { badgeTemplate } from '../badge/badge.template.js';
import { CounterBadge } from './counter-badge.js';
import { CounterBadgeOptions } from './counter-badge.options.js';

function composeTemplate<T extends CounterBadge>(options: CounterBadgeOptions = {}): ElementViewTemplate<T> {
  return badgeTemplate({
    defaultContent: html<T>`${x => x.setCount()}`,
  });
}

/**
 * The template for the Counter Badge component.
 * @public
 */
export const template: ElementViewTemplate<CounterBadge> = composeTemplate<CounterBadge>();
