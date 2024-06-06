import { ElementViewTemplate, html, repeat } from '@microsoft/fast-element';
import type { RatingDisplay } from './rating-display.js';

/**
 * A reusable star icon symbol
 */
const star = html`
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol id="star" viewBox="0 0 12 12">
      <path
        d="M5.28347 1.54556C5.57692 0.95096 6.42479 0.950961 6.71825 1.54556L7.82997 3.79817L10.3159 4.15939C10.9721 4.25474 11.2341 5.06112 10.7592 5.52394L8.96043 7.27736L9.38507 9.75321C9.49716 10.4067 8.81122 10.9051 8.22431 10.5966L6.00086 9.42761L3.7774 10.5966C3.19049 10.9051 2.50455 10.4067 2.61664 9.75321L3.04128 7.27736L1.24246 5.52394C0.767651 5.06111 1.02966 4.25474 1.68584 4.15939L4.17174 3.79817L5.28347 1.54556Z"
      />
    </symbol>
  </svg>
`;

/**
 * Generates a template for the Rating Display component.
 *
 * @public
 */
export function ratingDisplayTemplate<T extends RatingDisplay>(): ElementViewTemplate<T> {
  return html<T>`
    <template role="img" class=${x => (x.value <= 0 ? 'blank' : '')}>
      ${star}
      ${repeat(
        x => Array.from({ length: Math.round(Math.abs(x.max)) * 2 }, (_, i) => (i + 1) / 2),
        html<number>`<svg
          class="${x => (x % 1 === 0 ? '' : 'half')} ${(x, c) =>
            x === Math.round(c.parent.value * 2) / 2 ? 'selected' : ''}"
        >
          <use xlink:href="#star"></use>
        </svg>`,
      )}
      <span class="value" part="value">${x => x.value}</span>
    </template>
  `;
}

/**
 * The template for the Rating Display component.
 *
 * @public
 */
export const template: ElementViewTemplate<RatingDisplay> = ratingDisplayTemplate();
