import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { HorizontalBarChart as FluentHorizontalBarChart } from './horizontal-bar-chart.js';
import { ChartDataPoint, ChartProps } from './horizontal-bar-chart.options.js';

const singleBarHBCData = [
  {
    chartTitle: 'one',
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
    chartTitle: 'two',
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
    chartTitle: 'three',
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
    chartTitle: 'four',
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
    chartTitle: 'five',
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
    chartTitle: 'six',
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
    chartTitle: 'seven',
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
    chartTitle: 'eight',
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

const singleBarNMVariantData = [
  {
    chartTitle: 'one',
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
    chartTitle: 'two',
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
    chartTitle: 'three',
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
    chartTitle: 'four',
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
    chartTitle: 'five',
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
    chartTitle: 'six',
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
    chartTitle: 'seven',
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
    chartTitle: 'eight',
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

const singlePointData = [
  {
    chartTitle: 'one',
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

const storyTemplate = html<StoryArgs<FluentHorizontalBarChart>>`
  <fluent-horizontal-bar-chart data="${JSON.stringify(data)}"> </fluent-horizontal-bar-chart>
`;

export default {
  title: 'Components/HorizontalBarChart',
} as Meta<FluentHorizontalBarChart>;

export const Basic: Story<FluentHorizontalBarChart> = renderComponent(storyTemplate).bind({});

export const singleBarHBC: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div>
    <fluent-horizontal-bar-chart style="width: 100%" data="${JSON.stringify(singleBarHBCData)}">
    </fluent-horizontal-bar-chart>
  </div>
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

export const singleDataPoint: Story<FluentHorizontalBarChart> = renderComponent(html<
  StoryArgs<FluentHorizontalBarChart>
>`
  <div>
    <fluent-horizontal-bar-chart style="width: 100%" variant="single-bar" data="${JSON.stringify(singlePointData)}">
    </fluent-horizontal-bar-chart>
  </div>
`);

export const RTL: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div dir="rtl">
    <div>
      <fluent-horizontal-bar-chart data="${JSON.stringify(data)}"> </fluent-horizontal-bar-chart>
    </div>
  </div>
`);
