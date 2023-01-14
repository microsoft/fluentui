import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { badgeTemplate } from '../badge/badge.template.js';
import { CounterBadge } from './counter-badge.js';

export const template: ElementViewTemplate<CounterBadge> = badgeTemplate<CounterBadge>({
  defaultContent: html.partial<CounterBadge>(`${x => x.setCount()}`),
});
