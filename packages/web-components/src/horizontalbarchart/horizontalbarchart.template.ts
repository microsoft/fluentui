import { ElementViewTemplate, html, ref, repeat, when } from '@microsoft/fast-element';
import { createTabster, getGroupper, getMover, getTabsterAttribute, TABSTER_ATTRIBUTE_NAME } from 'tabster';
import type { HorizontalBarChart, HorizontalBarDataViewModel } from './horizontalbarchart.js';
import { ChartDataPoint, ChartProps } from './horizontalbarchart.options.js';

// During the page startup.
const tabsterCore = createTabster(window);
getMover(tabsterCore);
getGroupper(tabsterCore);

/**
 * Generates a template for the HorizontalBarChart component.
 *
 * @public
 */
export function horizontalbarchartTemplate<T extends HorizontalBarChart>(): ElementViewTemplate<T> {
  return html<T>` <template>
    <div>
      <div class="chartcontainer" ${ref('chartContainer')}></div>
      ${repeat(
        x => x.data,
        html<ChartProps>` <div
          key="${(x, c) => c.index}"
          id="_MSBC_bar-${(x, c) => c.index}"
          data-tabster=${(x, c) => c.parent.getChartTabsterAttribute()}
        >
          <div style="position: relative">
            <div class="chartTitleDiv">
              <div>
                <span class="chartTitle">${x => (x?.chartTitle ? x?.chartTitle : '')}</span>
              </div>
              ${when(
                (x, c) => c.parent.showRatio(x),
                html<ChartProps>`<div role="text">
                  <span class="ratioNumerator">${x => x!.chartData![0].data}</span>
                  <span class="ratioDenominator">/${x => x!.chartData![0].data + x!.chartData![1].data}</span>
                </div>`,
              )}
            </div>
            <svg
              ${ref('svgContainer')}
              height="20"
              width="100%"
              aria-label=${x => (x?.chartTitle ? x?.chartTitle : '')}
            >
              ${x => x.chartData.map(item => html`<rect x="0" y="0" width="10%" height="15" fill="green" />`)}
            </svg>
          </div>
        </div>`,
        {
          positioning: true,
        },
      )}
      <div class="legendcontainer" ${ref('legendContainer')}></div>
    </div>
  </template>`;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<HorizontalBarChart> = horizontalbarchartTemplate();
