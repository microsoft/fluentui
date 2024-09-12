import * as React from 'react';
import { LineChart, IChartProps, DataVizPalette } from '@fluentui/react-charts-preview';

const data: IChartProps = {
  chartTitle: 'Line Chart Basic Example',
  lineChartData: [
    {
      legend: 'From_Legacy_to_O365',
      data: [
        {
          x: new Date('2020-03-03T00:00:00.000Z'),
          y: 216000,
          onDataPointClick: () => alert('click on 217000'),
        },
        {
          x: new Date('2020-03-03T10:00:00.000Z'),
          y: 218123,
          onDataPointClick: () => alert('click on 217123'),
        },
        {
          x: new Date('2020-03-03T11:00:00.000Z'),
          y: 217124,
          onDataPointClick: () => alert('click on 217124'),
        },
        {
          x: new Date('2020-03-04T00:00:00.000Z'),
          y: 248000,
          onDataPointClick: () => alert('click on 248000'),
        },
        {
          x: new Date('2020-03-05T00:00:00.000Z'),
          y: 252000,
          onDataPointClick: () => alert('click on 252000'),
        },
        {
          x: new Date('2020-03-06T00:00:00.000Z'),
          y: 274000,
          onDataPointClick: () => alert('click on 274000'),
        },
        {
          x: new Date('2020-03-07T00:00:00.000Z'),
          y: 260000,
          onDataPointClick: () => alert('click on 260000'),
        },
        {
          x: new Date('2020-03-08T00:00:00.000Z'),
          y: 304000,
          onDataPointClick: () => alert('click on 300000'),
        },
        {
          x: new Date('2020-03-09T00:00:00.000Z'),
          y: 218000,
          onDataPointClick: () => alert('click on 218000'),
        },
      ],
      color: DataVizPalette.color3,
      lineOptions: {
        lineBorderWidth: '4',
      },
      onLineClick: () => console.log('From_Legacy_to_O365'),
    },
    {
      legend: 'All',
      data: [
        {
          x: new Date('2020-03-03T00:00:00.000Z'),
          y: 297000,
        },
        {
          x: new Date('2020-03-04T00:00:00.000Z'),
          y: 284000,
        },
        {
          x: new Date('2020-03-05T00:00:00.000Z'),
          y: 282000,
        },
        {
          x: new Date('2020-03-06T00:00:00.000Z'),
          y: 294000,
        },
        {
          x: new Date('2020-03-07T00:00:00.000Z'),
          y: 224000,
        },
        {
          x: new Date('2020-03-08T00:00:00.000Z'),
          y: 300000,
        },
        {
          x: new Date('2020-03-09T00:00:00.000Z'),
          y: 298000,
        },
      ],
      color: DataVizPalette.color4,
      lineOptions: {
        lineBorderWidth: '4',
      },
    },
    {
      legend: 'single point',
      data: [
        {
          x: new Date('2020-03-05T12:00:00.000Z'),
          y: 232000,
        },
      ],
      color: DataVizPalette.color5,
    },
  ],
};

export const LCResponsive = () => {
  const [sizes, setSizes] = React.useState<{ width?: number; height?: number }>({});

  const onResize = React.useCallback((width: number, height: number) => {
    const roundedWidth = Math.floor(width);
    const roundedHeight = Math.floor(height);
    setSizes({ width: roundedWidth, height: roundedHeight });
  }, []);

  return (
    <>
      <div>
        Width: <strong>{sizes.width}</strong> px
      </div>
      <div>
        Height: <strong>{sizes.height}</strong> px
      </div>
      <div style={{ width: '100%', height: 350 }}>
        <LineChart data={data} responsive onResize={onResize} />
      </div>
    </>
  );
};
LCResponsive.parameters = {
  docs: {
    description: {
      story: 'Line Chart Story.',
    },
  },
};
