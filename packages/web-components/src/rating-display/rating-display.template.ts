import { type ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { RatingDisplay } from './rating-display.js';

export const defaultIconPath = `<path d="M5.28347 1.54605C5.57692 0.951448 6.42479 0.951449 6.71825 1.54605L7.82997 3.79866L10.3159 4.15988C10.9721 4.25523 11.2341 5.0616 10.7592 5.52443L8.96043 7.27785L9.38507 9.7537C9.49716 10.4072 8.81122 10.9056 8.22431 10.597L6.00086 9.4281L3.7774 10.597C3.19049 10.9056 2.50455 10.4072 2.61664 9.7537L3.04128 7.27784L1.24246 5.52443C0.767651 5.0616 1.02966 4.25523 1.68584 4.15988L4.17174 3.79865L5.28347 1.54605Z" />`;

export const defaultIconFilled = `
<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">${defaultIconPath}</svg>
`;

export const defaultIconOutlined = `
<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"
    fill="none" stroke="black" stroke-width="2"
>${defaultIconPath}</svg>
`;

/**
 * Generates a template for the Rating Display component.
 *
 * @public
 */
export function ratingDisplayTemplate<T extends RatingDisplay>(): ElementViewTemplate<T> {
  return html<T>`
    <div ${ref('display')} class="display" aria-hidden="true"></div>
    <slot name="icon" ${ref('iconSlot')} @slotchange="${x => x.handleSlotChange()}"></slot>
    <slot name="value"><span class="value-label" aria-hidden="true">${x => x.value}</span></slot>
    <slot name="count"><span class="count-label" aria-hidden="true">${x => x.formattedCount}</span></slot>
  `;
}

/**
 * The template for the Rating Display component.
 *
 * @public
 */
export const template: ElementViewTemplate<RatingDisplay> = ratingDisplayTemplate();
