import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { DonutChart as FluentDonutChart } from './donut-chart.js';
import { IChartDataPoint, IChartProps } from './donut-chart.options.js';

const points: IChartDataPoint[] = [
  {
    legend: 'first',
    data: 20000,
    color: '#0099BC',
  },
  {
    legend: 'second',
    data: 39000,
    color: '#77004D',
  },
];

const data: IChartProps = {
  chartTitle: 'Donut chart basic example',
  chartData: points,
};

const storyTemplate = html<StoryArgs<FluentDonutChart>>`
  <fluent-donut-chart data="${JSON.stringify(data)}" value-inside-donut="35,000" inner-radius="55">
  </fluent-donut-chart>
`;

export default {
  title: 'Components/DonutChart',
} as Meta<FluentDonutChart>;

export const Basic: Story<FluentDonutChart> = renderComponent(storyTemplate).bind({});

export const RTL: Story<FluentDonutChart> = renderComponent(html<StoryArgs<FluentDonutChart>>`
  <div style="display: flex; flex-direction: column; gap: 1rem;" dir="rtl">
    <div>
      <fluent-donut-chart data="${JSON.stringify(data)}" inner-radius="55"> </fluent-donut-chart>
    </div>
  </div>
`);
