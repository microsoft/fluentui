import { ElementViewTemplate, html, ref, repeat, when } from '@microsoft/fast-element';
import type { DonutChart } from './donut-chart.js';
import { Legend } from './donut-chart.options.js';

/**
 * Generates a template for the DonutChart component.
 *
 * @public
 */
export function donutChartTemplate<T extends DonutChart>(): ElementViewTemplate<T> {
  return html<T>`
    <div ${ref('rootDiv')} class="root">
      <div ${ref('chartWrapper')}>
        <svg class="chart" width="${x => x.width}" height="${x => x.height}" aria-label="${x => x.data.chartTitle}">
          <g ${ref('group')} transform="translate(${x => x.width / 2}, ${x => x.height / 2})"></g>
        </svg>
      </div>
      ${when(
        x => !x.hideLegends,
        html<T>`
          <div class="legendContainer" role="listbox" aria-label="Legends">
            ${repeat(
              x => x.legends,
              html<Legend, T>` <button
                class="legend${(x, c) =>
                  c.parent.activeLegend === '' || c.parent.activeLegend === x.title ? '' : ' inactive'}"
                role="option"
                aria-setsize="${(x, c) => c.length}"
                aria-posinset="${(x, c) => c.index + 1}"
                aria-selected="${(x, c) => x.title === c.parent.activeLegend}"
                @mouseover="${(x, c) => c.parent.handleLegendMouseoverAndFocus(x.title)}"
                @mouseout="${(x, c) => c.parent.handleLegendMouseoutAndBlur()}"
                @focus="${(x, c) => c.parent.handleLegendMouseoverAndFocus(x.title)}"
                @blur="${(x, c) => c.parent.handleLegendMouseoutAndBlur()}"
                @click="${(x, c) => c.parent.handleLegendClick(x.title)}"
              >
                <div class="legendRect" style="background-color: ${x => x.color}; border-color: ${x => x.color};"></div>
                <div class="legendText">${x => x.title}</div>
              </button>`,
            )}
          </div>
        `,
      )}
      ${when(
        x => !x.hideTooltip && x.tooltipProps.isVisible,
        html<T>`
          <div
            class="calloutContentRoot"
            style="left: ${x => x.tooltipProps.xPos}px; top: ${x => x.tooltipProps.yPos}px"
          >
            <div class="calloutBlockContainer" style="border-color: ${x => x.tooltipProps.color};">
              <div class="calloutLegendText">${x => x.tooltipProps.legend}</div>
              <div class="calloutContentY" style="color: ${x => x.tooltipProps.color};">
                ${x => x.tooltipProps.yValue}
              </div>
            </div>
          </div>
        `,
      )}
    </div>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<DonutChart> = donutChartTemplate();
