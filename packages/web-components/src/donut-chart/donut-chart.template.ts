import { ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { DonutChart } from './donut-chart.js';

/**
 * Generates a template for the DonutChart component.
 *
 * @public
 */
export function donutChartTemplate<T extends DonutChart>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <div class="root" part="root">
        <donut-chart></donut-chart>
      </div>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<DonutChart> = donutChartTemplate();
