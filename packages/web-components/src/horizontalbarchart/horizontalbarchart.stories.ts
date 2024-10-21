import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { HorizontalBarChart as FluentHorizontalBarChart } from './horizontalbarchart.js';
import { IChartDataPoint, IChartProps } from './horizontalbarchart.options.js';

const chartPoints1: IChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 40,
    color: '#0099BC',
  },
  {
    legend: 'Passport numbers (USA)',
    data: 23,
    color: '#77004D',
  },
  {
    legend: 'Social security numbers',
    data: 35,
    color: '#4F68ED',
  },
  {
    legend: 'Credit card Numbers',
    data: 87,
    color: '#AE8C00',
  },
  {
    legend: 'Tax identification numbers (USA)',
    data: 87,
    color: '#004E8C',
  },
];

const chartPoints2: IChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 40,
    color: '#0099BC',
  },
  {
    legend: 'Passport numbers (USA)',
    data: 56,
    color: '#77004D',
  },
  {
    legend: 'Social security numbers',
    data: 35,
    color: '#4F68ED',
  },
  {
    legend: 'Credit card Numbers',
    data: 92,
    color: '#AE8C00',
  },
  {
    legend: 'Tax identification numbers (USA)',
    data: 87,
    color: '#004E8C',
  },
];

const chartPoints3: IChartDataPoint[] = [
  {
    legend: 'Phone Numbers',
    data: 40,
    color: '#881798',
  },
  {
    legend: 'Credit card Numbers',
    data: 23,
    color: '#AE8C00',
  },
];

const data: IChartProps[] = [
  {
    chartTitle: 'Monitored First',
    chartData: chartPoints1,
  },
  {
    chartTitle: 'Monitored Second',
    chartData: chartPoints2,
  },
  {
    chartTitle: 'Unmonitored',
    chartData: chartPoints3,
  },
];

const storyTemplate = html<StoryArgs<FluentHorizontalBarChart>>`
  <fluent-horizontalbarchart data="${JSON.stringify(data)}"> </fluent-horizontalbarchart>
`;

export default {
  title: 'Components/HorizontalBarChart',
} as Meta<FluentHorizontalBarChart>;

export const Basic: Story<FluentHorizontalBarChart> = renderComponent(storyTemplate).bind({});

export const NMVariant: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div>
    <fluent-horizontalbarchart data="${JSON.stringify(data)}" variant="part-to-whole"> </fluent-horizontalbarchart>
  </div>
`);

export const RTL: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div style="display: flex; flex-direction: column; gap: 1rem;" dir="rtl">
    <div>
      <fluent-horizontalbarchart data="${JSON.stringify(data)}"> </fluent-horizontalbarchart>
    </div>
  </div>
`);
