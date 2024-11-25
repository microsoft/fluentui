import { ElementViewTemplate, html, ref, repeat, when } from '@microsoft/fast-element';
import type { HorizontalBarChart } from './horizontal-bar-chart.js';
import { ChartDataPoint } from './horizontal-bar-chart.options.js';

/**
 * Generates a template for the HorizontalBarChart component.
 *
 * @public
 */
export function horizontalbarchartTemplate<T extends HorizontalBarChart>(): ElementViewTemplate<T> {
  return html<T>`
    <template ${ref('rootDiv')}>
      <div ${ref('chartContainer')}></div>
      ${when(
        x => !x.hideLegends,
        html<T>`
          <div class="legendcontainer" role="listbox" aria-label="${x => x.legendListLabel || 'Legends'}">
            ${repeat(
              x => x.uniqueLegends,
              html<ChartDataPoint, T>` <button
                class="legend${(x, c) =>
                  c.parent.activeLegend === '' || c.parent.activeLegend === x.legend ? '' : ' inactive'}"
                role="option"
                aria-setsize="${(x, c) => c.length}"
                aria-posinset="${(x, c) => c.index + 1}"
                aria-selected="${(x, c) => x.legend === c.parent.activeLegend}"
                @mouseover="${(x, c) => c.parent.handleLegendMouseoverAndFocus(x.legend)}"
                @mouseout="${(x, c) => c.parent.handleLegendMouseoutAndBlur()}"
                @focus="${(x, c) => c.parent.handleLegendMouseoverAndFocus(x.legend)}"
                @blur="${(x, c) => c.parent.handleLegendMouseoutAndBlur()}"
                @click="${(x, c) => c.parent.handleLegendClick(x.legend)}"
              >
                <div
                  class="legend-rect"
                  style="background-color: ${x => x.color}; border-color: ${x => x.color};"
                ></div>
                <div class="legend-text">${x => x.legend}</div>
              </button>`,
            )}
          </div>
        `,
      )}
      <fluent-tooltip anchor="${x => x.tooltipProps.id}" positioning="above-start">
        <div class="tooltip-line" style="border-color: ${x => x.tooltipProps.color};">
          <div class="tooltip-legend-text">${x => x.tooltipProps.legend}</div>
          <div class="tooltip-data-y" style="color: ${x => x.tooltipProps.color};">${x => x.tooltipProps.yValue}</div>
        </div>
      </fluent-tooltip>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<HorizontalBarChart> = horizontalbarchartTemplate();
