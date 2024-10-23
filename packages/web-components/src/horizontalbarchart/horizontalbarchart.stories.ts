import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { HorizontalBarChart as FluentHorizontalBarChart } from './horizontalbarchart.js';
import { IChartDataPoint, IChartProps } from './horizontalbarchart.options.js';

const singleBarHBCData = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        data: 1543,
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
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
        y: 15000,
        color: '#57811b',
      },
    ],
  },
];

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

export const singleBarHBC: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div>
    <fluent-horizontalbarchart style="width: 100%" data="${JSON.stringify(singleBarHBCData)}">
    </fluent-horizontalbarchart>
  </div>
`);

export const singleBarNMVariant: Story<FluentHorizontalBarChart> = renderComponent(html<
  StoryArgs<FluentHorizontalBarChart>
>`
  <div>
    <fluent-horizontalbarchart
      style="width: 100%"
      variant="single-bar-hbc"
      data="${JSON.stringify(singleBarNMVariantData)}"
    >
    </fluent-horizontalbarchart>
  </div>
`);

export const RTL: Story<FluentHorizontalBarChart> = renderComponent(html<StoryArgs<FluentHorizontalBarChart>>`
  <div dir="rtl">
    <div>
      <fluent-horizontalbarchart _isRTL="true" data="${JSON.stringify(data)}"> </fluent-horizontalbarchart>
    </div>
  </div>
`);
