import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  HorizontalBarChart,
  HorizontalBarChartVariant,
  ChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-components';

export const HorizontalBarAbsoluteScale = (): JSXElement => {
  const [hideLabels, setHideLabels] = React.useState<boolean>(false);
  const _onCheckChange = (e: React.ChangeEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setHideLabels(checked.checked as boolean);
  };
  const data: ChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, total: 15000 },
          color: getColorFromToken(DataVizPalette.color17),
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, total: 15000 },
          color: getColorFromToken(DataVizPalette.color18),
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, total: 15000 },
          color: getColorFromToken(DataVizPalette.color19),
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, total: 15000 },
          color: getColorFromToken(DataVizPalette.color20),
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, total: 15000 },
          color: getColorFromToken(DataVizPalette.color21),
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, total: 15000 },
          color: getColorFromToken(DataVizPalette.color22),
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, total: 15000 },
          color: getColorFromToken(DataVizPalette.color23),
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, total: 15000 },
          color: getColorFromToken(DataVizPalette.color24),
        },
      ],
    },
  ];
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Checkbox label="Hide labels" checked={hideLabels} onChange={_onCheckChange} />
      </div>
      <div style={{ maxWidth: 600 }}>
        <HorizontalBarChart data={data} variant={HorizontalBarChartVariant.AbsoluteScale} hideLabels={hideLabels} />
      </div>
    </>
  );
};
HorizontalBarAbsoluteScale.parameters = {
  docs: {
    description: {},
  },
};
