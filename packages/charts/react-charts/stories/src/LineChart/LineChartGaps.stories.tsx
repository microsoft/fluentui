import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { LineChartProps, LineChart, ChartProps, CustomizedCalloutData, DataVizPalette } from '@fluentui/react-charts';

export const LineChartGaps = (props: LineChartProps): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(400);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _calculateCalloutDescription = (calloutDataProps: CustomizedCalloutData): string | undefined => {
    if (calloutDataProps.values.filter(value => value.legend === 'Low Confidence Data*').length > 0) {
      return '* This data was below our confidence threshold.';
    }
    return undefined;
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const margins = { left: 35, top: 20, bottom: 35, right: 20 };

  const data: ChartProps = {
    chartTitle: 'Line Chart',
    lineChartData: [
      {
        legend: 'Confidence Level',
        legendShape: 'dottedLine',
        hideNonActiveDots: true,
        lineOptions: {
          strokeDasharray: '5',
          strokeLinecap: 'butt',
          strokeWidth: '2',
          lineBorderWidth: '4',
        },
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 250000,
            hideCallout: true,
          },
          {
            x: new Date('2020-03-10T00:00:00.000Z'),
            y: 250000,
            hideCallout: true,
          },
        ],
        color: DataVizPalette.color11,
      },
      {
        legend: 'Normal Data',
        gaps: [
          {
            startIndex: 3,
            endIndex: 4,
          },
          {
            startIndex: 6,
            endIndex: 7,
          },
          {
            startIndex: 1,
            endIndex: 2,
          },
        ],
        hideNonActiveDots: true,
        lineOptions: {
          lineBorderWidth: '4',
        },
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 216000,
          },
          {
            x: new Date('2020-03-03T10:30:00.000Z'),
            y: 218123,
            hideCallout: true,
          },
          // gap here
          {
            x: new Date('2020-03-03T11:00:00.000Z'),
            y: 219000,
            hideCallout: true,
          },
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 248000,
            hideCallout: true,
          },
          // gap here
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 252000,
            hideCallout: true,
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: 274000,
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 260000,
            hideCallout: true,
          },
          // gap here
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 300000,
            hideCallout: true,
          },
          {
            x: new Date('2020-03-08T12:00:00.000Z'),
            y: 218000,
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 218000,
          },
          {
            x: new Date('2020-03-10T00:00:00.000Z'),
            y: 269000,
          },
        ],
        color: DataVizPalette.color12,
      },
      {
        legend: 'Low Confidence Data*',
        legendShape: 'dottedLine',
        hideNonActiveDots: true,
        lineOptions: {
          strokeDasharray: '2',
          strokeDashoffset: '-1',
          strokeLinecap: 'butt',
          lineBorderWidth: '4',
        },
        gaps: [
          {
            startIndex: 3,
            endIndex: 4,
          },
          {
            startIndex: 1,
            endIndex: 2,
          },
        ],
        data: [
          {
            x: new Date('2020-03-03T10:30:00.000Z'),
            y: 218123,
          },
          {
            x: new Date('2020-03-03T11:00:00.000Z'),
            y: 219000,
          },
          // gap here
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 248000,
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 252000,
          },
          // gap here
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 260000,
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 300000,
          },
        ],
        color: DataVizPalette.color13,
      },
      {
        legend: 'Green Data',
        lineOptions: {
          lineBorderWidth: '4',
        },
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
          {
            x: new Date('2020-03-10T00:00:00.000Z'),
            y: 299000,
          },
        ],
        color: DataVizPalette.success,
      },
    ],
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth_Gaps">Change Width:</label>
        <input
          type="range"
          value={width}
          min={500}
          max={1500}
          id="changeWidth_Gaps"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="ChangeHeight_Gaps">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Gaps"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
      </div>
      <div style={rootStyle}>
        <LineChart
          data={data}
          legendsOverflowText={'Overflow Items'}
          yMinValue={150000}
          yMaxValue={400000}
          height={height}
          width={width}
          margins={margins}
          getCalloutDescriptionMessage={_calculateCalloutDescription}
          enablePerfOptimization={true}
        />
      </div>
    </>
  );
};
LineChartGaps.parameters = {
  docs: {
    description: {},
  },
};
