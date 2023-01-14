import { ElementViewTemplate } from '@microsoft/fast-element';
import { html } from '../../../../node_modules/@microsoft/fast-element/dist/dts/index';
import { BadgeOptions } from '../badge/badge.options.js';
import { badgeTemplate } from '../badge/badge.template';
import { CounterBadge } from './counter-badge';

/**
 * CounterBadge options
 * @public
 */
export type CounterBadgeOptions = BadgeOptions;

export const template: ElementViewTemplate<CounterBadge> = badgeTemplate<CounterBadge>({
  defaultContent: html.partial(`${x => x.setCount()}`),
});
