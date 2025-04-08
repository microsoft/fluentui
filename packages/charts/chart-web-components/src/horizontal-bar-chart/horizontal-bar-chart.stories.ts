import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { HorizontalBarChart as FluentHorizontalBarChart } from './horizontal-bar-chart.js';
import type { ChartDataPoint, ChartProps } from './horizontal-bar-chart.options.js';
import { Variant } from './horizontal-bar-chart.options.js';

const singleBarHBCData = [
  {
    chartSeriesTitle: 'one',
    chartData: [
      {
        legend: 'one',
        data: 1543,
        total: 15000,
        color: '#637cef',
      },
    ],
  },
  {
    chartSeriesTitle: 'two',
    chartData: [
      {
        legend: 'two',
        data: 800,
        total: 15000,
        color: '#e3008c',
      },
    ],
  },
  {
    chartSeriesTitle: 'three',
    chartData: [
      {
        legend: 'three',
        data: 8888,
        total: 15000,
        color: '#2aa0a4',
      },
    ],
  },
  {
    chartSeriesTitle: 'four',
    chartData: [
      {
        legend: 'four',
        data: 15888,
        total: 15000,
        color: '#9373c0',
      },
    ],
  },
  {
    chartSeriesTitle: 'five',
    chartData: [
      {
        legend: 'five',
        data: 11444,
        total: 15000,
        color: '#13a10e',
      },
    ],
  },
  {
    chartSeriesTitle: 'six',
    chartData: [
      {
        legend: 'six',
        data: 14000,
        total: 15000,
        color: '#3a96dd',
      },
    ],
  },
  {
    chartSeriesTitle: 'seven',
    chartData: [
      {
        legend: 'seven',
        data: 9855,
        total: 15000,
        color: '#ca5010',
      },
    ],
  },
  {
    chartSeriesTitle: 'eight',
    chartData: [
      {
        legend: 'eight',
        data: 4250,
        total: 15000,
        color: '#57811b',
      },
    ],
  },
];

const singleBarNMVariantData: ChartProps[] = [
  {
    chartSeriesTitle: 'one',
    chartData: [
      {
        legend: 'one',
        data: 1543,
        total: 15000,
        color: '#637cef',
      },
    ],
    chartDataText: '1.5k/15k hours',
  },
  {
    chartSeriesTitle: 'two',
    chartData: [
      {
        legend: 'two',
        data: 800,
        total: 15000,
        color: '#e3008c',
      },
    ],
    chartDataText: '800/15k hours',
  },
  {
    chartSeriesTitle: 'three',
    chartData: [
      {
        legend: 'three',
        data: 8888,
        total: 15000,
        color: '#2aa0a4',
      },
    ],
    chartDataText: '8.9k/15k hours',
  },
  {
    chartSeriesTitle: 'four',
    chartData: [
      {
        legend: 'four',
        data: 15888,
        total: 15000,
        color: '#9373c0',
      },
    ],
    chartDataText: '16k/15k hours',
  },
  {
    chartSeriesTitle: 'five',
    chartData: [
      {
        legend: 'five',
        data: 11444,
        total: 15000,
        color: '#13a10e',
      },
    ],
    chartDataText: '11k/15k hours',
  },
  {
    chartSeriesTitle: 'six',
    chartData: [
      {
        legend: 'six',
        data: 14000,
        total: 15000,
        color: '#3a96dd',
      },
    ],
    chartDataText: '14k/15k hours',
  },
  {
    chartSeriesTitle: 'seven',
    chartData: [
      {
        legend: 'seven',
        data: 9855,
        total: 15000,
        color: '#ca5010',
      },
    ],
    chartDataText: '9.9k/15k hours',
  },
  {
    chartSeriesTitle: 'eight',
    chartData: [
      {
        legend: 'eight',
        data: 4250,
        total: 15000,
        color: '#57811b',
      },
    ],
    chartDataText: '4.3k/15k hours',
  },
];

const chartPoints1: ChartDataPoint[] = [
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

const chartPoints2: ChartDataPoint[] = [
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

const chartPoints3: ChartDataPoint[] = [
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

const data: ChartProps[] = [
  {
    chartSeriesTitle: 'Monitored First',
    chartData: chartPoints1,
  },
  {
    chartSeriesTitle: 'Monitored Second',
    chartData: chartPoints2,
  },
  {
    chartSeriesTitle: 'Unmonitored',
    chartData: chartPoints3,
  },
];

const singlePointData = [
  {
    chartSeriesTitle: 'one',
    chartData: [
      {
        legend: 'one',
        data: 1543,
        total: 15000,
        gradient: ['#637cef', '#e3008c'],
      },
    ],
  },
];

const benchmarkData: ChartProps[] = [
  {
    chartSeriesTitle: 'one',
    chartData: [
      {
        legend: 'one',
        data: 10,
        total: 100,
        color: '#637cef',
      },
    ],
    benchmarkData: 50,
  },
  {
    chartSeriesTitle: 'two',
    chartData: [
      {
        legend: 'two',
        data: 30,
        total: 200,
        color: '#e3008c',
      },
    ],
    benchmarkData: 30,
  },
  {
    chartSeriesTitle: 'three',
    chartData: [
      {
        legend: 'three',
        data: 15,
        total: 50,
        color: '#2aa0a4',
      },
    ],
    benchmarkData: 5,
  },
];

const storyTemplate = html<StoryArgs<FluentHorizontalBarChart>>`
  <fluent-horizontal-bar-chart style="width: 100%" data="${JSON.stringify(data)}"> </fluent-horizontal-bar-chart>
`;

export default {
  title: 'Components/HorizontalBarChart',
} as Meta<FluentHorizontalBarChart>;

export const RTL: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div dir="rtl">
    <div>
      <fluent-horizontal-bar-chart style="width: 100%" data="${JSON.stringify(data)}"> </fluent-horizontal-bar-chart>
    </div>
  </div>
`);

export const singleDataPoint: Story<FluentHorizontalBarChart> = renderComponent(html<
  StoryArgs<FluentHorizontalBarChart>
>`
  <div>
    <fluent-horizontal-bar-chart style="width: 100%" variant="single-bar" data="${JSON.stringify(singlePointData)}">
    </fluent-horizontal-bar-chart>
  </div>
`);

export const Benchmark: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <fluent-horizontal-bar-chart style="width: 100%" variant="single-bar" data="${JSON.stringify(benchmarkData)}">
  </fluent-horizontal-bar-chart>
`);

export const singleBarNMVariant: Story<FluentHorizontalBarChart> = renderComponent(html<
  StoryArgs<FluentHorizontalBarChart>
>`
  <div>
    <fluent-horizontal-bar-chart
      style="width: 100%"
      variant="single-bar"
      data="${JSON.stringify(singleBarNMVariantData)}"
    >
    </fluent-horizontal-bar-chart>
  </div>
`);

export const singleBarHBC: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div>
    <fluent-horizontal-bar-chart
      style="width: 100%"
      data="${JSON.stringify(singleBarHBCData)}"
      variant="${Variant.AbsoluteScale}"
    >
    </fluent-horizontal-bar-chart>
  </div>
`);

export const Basic: Story<FluentHorizontalBarChart> = renderComponent(storyTemplate).bind({});
