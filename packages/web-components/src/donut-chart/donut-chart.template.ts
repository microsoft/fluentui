import { ElementViewTemplate, html, ref, repeat, slotted, when } from '@microsoft/fast-element';
import type { DonutChart } from './donut-chart.js';

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
          <div ${ref('legendContainer')} class="legendContainer" role="listbox" aria-label="Legends">
            ${repeat(
              x => x.getLegends(),
              html<{ title: string; color: string }>` <button class="legend" role="option">
                <div class="legendRect"></div>
                <div class="legendText">${x => x.title}</div>
              </button>`,
            )}}
          </div>
        `,
      )}
      ${when(x => !x.hideTooltip, html<T>` <div ${ref('tooltip')} class="calloutContentRoot"></div> `)}
    </div>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<DonutChart> = donutChartTemplate();
