import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  HeatMapChart,
  HeatMapChartDataPoint,
  HeatMapChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { formatPrefix as d3FormatPrefix } from 'd3-format';

const yPoint: string[] = ['CHN', 'IND', 'USA', 'IDN', 'PAK'];
const xPoint: string[] = ['1980', '1990', '2000', '2010', '2020'];
const dataMatrix: number[][] = [
  [818315000, 981235000, 1135185000, 1262645000, 1337705000, 1411100000],
  [557501301, 696828385, 870452165, 1059633675, 1240613620, 1396387127],
  [205052000, 227225000, 249623000, 282162411, 309327143, 331511512],
  [115228394, 148177096, 182159874, 214072421, 244016173, 271857970],
  [59290872, 80624057, 115414069, 154369924, 194454498, 227196741],
];

function getDataPoints(valueFilter: (value: number) => boolean): HeatMapChartDataPoint[] {
  const dataPoints: HeatMapChartDataPoint[] = [];
  dataMatrix.forEach((row, ri) => {
    row.forEach((value, ci) => {
      if (ci > 0 && valueFilter(value)) {
        dataPoints.push({
          x: xPoint[ci - 1],
          y: yPoint[ri],
          value: value / 1e6,
          rectText: getRectText(value),
          descriptionMessage: getDescription(xPoint[ci - 1], yPoint[ri], value, row[ci - 1]),
          callOutAccessibilityData: {
            ariaLabel: getDescription(xPoint[ci - 1], yPoint[ri], value, row[ci - 1]),
          },
        });
      }
    });
  });
  return dataPoints;
}

const d3SiPrefixMap: { [key: string]: string } = {
  k: 'K',
  G: 'B',
};
function getRectText(value: number): string {
  let rectText = d3FormatPrefix('.1', value)(value);
  const lastChar = rectText.slice(-1);
  if (Object.keys(d3SiPrefixMap).includes(lastChar)) {
    rectText = rectText.slice(0, -1) + d3SiPrefixMap[lastChar];
  }
  return rectText;
}

const yPointMap: { [key: string]: string } = {
  CHN: 'China',
  IND: 'India',
  USA: 'United States',
  IDN: 'Indonesia',
  PAK: 'Pakistan',
};
function getDescription(x: string, y: string, value: number, prevValue: number): string {
  const percentageChange = ((value - prevValue) / prevValue) * 100;
  return `${yPointMap[y]}, ${x}. ${value}, ${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(2)}%.`;
}

export const HeatMapChartCustomAccessibility: React.FunctionComponent<{}> = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(450);
  const [height, setHeight] = React.useState<number>(350);

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const HeatMapData: HeatMapChartProps['data'] = [
    {
      value: 250,
      legend: '< 500M',
      data: getDataPoints((value: number) => value < 5e8),
    },
    {
      value: 750,
      legend: '500M - 1B',
      data: getDataPoints((value: number) => value >= 5e8 && value <= 1e9),
    },
    {
      value: 1250,
      legend: '> 1B',
      data: getDataPoints((value: number) => value > 1e9),
    },
  ];

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <label htmlFor="ChangeWidth_Custom">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          id="ChangeWidth_Custom"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="ChangeHeight_Custom">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Custom"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightSlider${height}`}
        />
      </div>
      <h4>Heat map showing population growth over decades</h4>
      <div style={rootStyle}>
        <HeatMapChart
          chartTitle="Heat map chart custom accessibility example"
          data={HeatMapData}
          xAxisStringFormatter={(point: string) => `FY ${point}`}
          width={width}
          height={height}
          domainValuesForColorScale={[0, 1500]}
          rangeValuesForColorScale={[
            getColorFromToken(DataVizPalette.color6),
            getColorFromToken(DataVizPalette.color10),
          ]}
          reflowProps={{ mode: 'min-width' }}
        />
      </div>
    </>
  );
};
