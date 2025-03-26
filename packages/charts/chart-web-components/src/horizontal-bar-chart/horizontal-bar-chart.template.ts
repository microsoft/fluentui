import { ElementViewTemplate, html, ref, repeat, when } from '@microsoft/fast-element';
import type { HorizontalBarChart } from './horizontal-bar-chart.js';
import type { ChartDataPoint } from './horizontal-bar-chart.options.js';

/**
 * Generates a template for the HorizontalBarChart component.
 *
 * @public
 */
export function horizontalbarchartTemplate<T extends HorizontalBarChart>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <div ${ref('chartContainer')}></div>
      ${when(
        x => !x.hideLegends,
        html<T>`
          <div class="legendcontainer" role="listbox" aria-label="${x => x.legendListLabel}">
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
      ${when(
        x => !x.hideTooltip && x.tooltipProps.isVisible,
        html<T>`
          <div
            class="tooltip"
            style="inset-inline-start: ${x => x.tooltipProps.xPos}px; top: ${x => x.tooltipProps.yPos}px"
          >
            <div class="tooltip-line" style="border-color: ${x => x.tooltipProps.color};">
              <div class="tooltip-legend-text">${x => x.tooltipProps.legend}</div>
              <div class="tooltip-data-y" style="color: ${x => x.tooltipProps.color};">
                ${x => x.tooltipProps.yValue}
              </div>
            </div>
          </div>
        `,
      )}
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<HorizontalBarChart> = horizontalbarchartTemplate();
