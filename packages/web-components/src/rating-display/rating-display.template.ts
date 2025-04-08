import { elements, type ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import type { RatingDisplay } from './rating-display.js';

/**
 * Reusable star icon symbol
 */
const star = html`
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol id="star">
      <path
        d="M9.10433 2.89874C9.47114 2.15549 10.531 2.1555 10.8978 2.89874L12.8282 6.81024L17.1448 7.43748C17.9651 7.55666 18.2926 8.56464 17.699 9.14317L14.5755 12.1878L15.3129 16.487C15.453 17.3039 14.5956 17.9269 13.8619 17.5412L10.0011 15.5114L6.14018 17.5412C5.40655 17.9269 4.54913 17.3039 4.68924 16.487L5.4266 12.1878L2.30308 9.14317C1.70956 8.56463 2.03708 7.55666 2.8573 7.43748L7.17389 6.81024L9.10433 2.89874Z"
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
    ${x => html`${staticallyCompose(x.generateIcons())}`}
    <slot name="icon" ${slotted({ property: 'slottedIcon', filter: elements('svg') })}>${star}</slot>
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
