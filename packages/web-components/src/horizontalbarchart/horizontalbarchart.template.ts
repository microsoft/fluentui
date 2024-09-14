import { ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { HorizontalBarChart } from './horizontalbarchart.js';

/**
 * Generates a template for the HorizontalBarChart component.
 *
 * @public
 */
export function horizontalbarchartTemplate<T extends HorizontalBarChart>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <div class="root" part="root">
        <horizontalbarchart></horizontalbarchart>
      </div>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<HorizontalBarChart> = horizontalbarchartTemplate();
