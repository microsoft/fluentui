import * as React from 'react';
import {
  HorizontalBarChart,
  HorizontalBarChartVariant,
  ChartProps,
  DataVizGradientPalette,
  getGradientFromToken,
} from '@fluentui/react-charts-preview';
import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-components';

export const HorizontalBarAbsoluteScale = () => {
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
          horizontalBarChartdata: { x: 1543, y: 15000 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient1),
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, y: 15000 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, y: 15000 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient3),
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, y: 15000 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient4),
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, y: 15000 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient5),
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, y: 15000 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient6),
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, y: 15000 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient7),
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, y: 15000 },
          gradient: getGradientFromToken(DataVizGradientPalette.gradient8),
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
