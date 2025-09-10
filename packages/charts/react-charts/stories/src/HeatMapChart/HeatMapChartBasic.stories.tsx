import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { HeatMapChart, HeatMapChartProps, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';

export const HeatMapChartBasic: React.FunctionComponent<{}> = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(450);
  const [height, setHeight] = React.useState<number>(350);

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const yPointMapping: { [key: string]: string } = {
    p1: 'Ohio',
    p2: 'Alaska',
    p3: 'Texas',
    p4: 'DC',
    p5: 'NYC',
  };
  const yPoint: string[] = ['p1', 'p2', 'p3', 'p4', 'p5'];

  const xPoint: Date[] = [
    new Date('2020-03-03'), // 0
    new Date('2020-03-04'), // 1
    new Date('2020-03-05'), // 2
    new Date('2020-03-06'), // 3
    new Date('2020-03-07'), // 4
    new Date('2020-03-08'), // 5
    new Date('2020-03-09'), // 6
    new Date('2020-03-10'), // 7
  ];
  const HeatMapData: HeatMapChartProps['data'] = [
    {
      value: 100,
      legend: 'Excellent (0-200)',
      data: [
        {
          x: xPoint[2],
          y: yPoint[2],
          value: 46,
          rectText: 46,
          ratio: [46, 2391],
          descriptionMessage: 'air quality seems to be excellent today',
        },
      ],
    },
    {
      value: 250,
      legend: 'Good (201-300)',
      data: [
        {
          x: xPoint[0],
          y: yPoint[1],
          value: 265,
          rectText: 265,
          ratio: [265, 2479],
          descriptionMessage: 'today we have good air quality in Alaska',
        },
        {
          x: xPoint[1],
          y: yPoint[0],
          value: 250,
          rectText: 250,
          ratio: [250, 2043],
          descriptionMessage: 'a sudden rise of 150 units in Ohio today',
        },
        {
          x: xPoint[2],
          y: yPoint[0],
          value: 235,
          rectText: 235,
          ratio: [235, 2043],
          descriptionMessage: 'air quality seems to have decreased by only 15 units from yesterday',
        },
        {
          x: xPoint[6],
          y: yPoint[2],
          value: 300,
          rectText: 300,
          ratio: [300, 2391],
          descriptionMessage: 'air comes to control a little bit more than yesterday',
        },
        {
          x: xPoint[0],
          y: yPoint[3],
          value: 290,
          rectText: 290,
          ratio: [290, 2462],
          descriptionMessage: '1st day in the week, DC witnesses good air quality',
        },
        {
          x: xPoint[4],
          y: yPoint[4],
          value: 280,
          rectText: 280,
          ratio: [280, 2486],
          descriptionMessage: `Air quality index decreases by exactly 300 units,
            giving the people of NYC good hope`,
        },
        {
          x: xPoint[5],
          y: yPoint[3],
          value: 300,
          rectText: 300,
          ratio: [300, 2462],
          descriptionMessage: '60 units decreased from yesterday.',
        },
      ],
    },
    {
      value: 350,
      legend: 'Medium (301-400)',
      data: [
        {
          x: xPoint[1],
          y: yPoint[1],
          value: 345,
          rectText: 345,
          ratio: [345, 2479],
          descriptionMessage: 'Alaska has just reported nearly 100 units hike in air quality',
        },
        {
          x: xPoint[6],
          y: yPoint[1],
          value: 325,
          rectText: 325,
          ratio: [325, 2479],
          descriptionMessage: `Alaska to 300`,
        },
        {
          x: xPoint[5],
          y: yPoint[2],
          value: 390,
          rectText: 390,
          ratio: [390, 2391],
          descriptionMessage: 'air comes to control a little bit',
        },
        {
          x: xPoint[1],
          y: yPoint[3],
          value: 385,
          rectText: 385,
          ratio: [385, 2462],
          descriptionMessage: 'Washington DC witnesses a hike of nearly 100 units in air quality',
        },
        {
          x: xPoint[4],
          y: yPoint[3],
          value: 360,
          rectText: 360,
          ratio: [360, 2462],
          descriptionMessage: 'a 200% hike in the air quality index',
        },
        {
          x: xPoint[1],
          y: yPoint[2],
          value: 400,
          rectText: 400,
          ratio: [400, 2391],
          descriptionMessage: 'a sudden spike in the badness of the air quality',
        },
        {
          x: xPoint[3],
          y: yPoint[0],
          value: 400,
          rectText: 400,
          ratio: [400, 2043],
          descriptionMessage: 'situation got worse in air quality due to industrial smoke',
        },
      ],
    },
    {
      value: 450,
      legend: 'Danger (401-500)',
      data: [
        {
          x: xPoint[4],
          y: yPoint[0],
          value: 423,
          rectText: 423,
          ratio: [423, 2043],
          descriptionMessage: 'we can see an increase of 23 units',
        },
        {
          x: xPoint[2],
          y: yPoint[1],
          value: 463,
          rectText: 463,
          ratio: [463, 2479],
          descriptionMessage: 'day by day, situation is getting worse in Alaska',
        },
        {
          x: xPoint[3],
          y: yPoint[2],
          value: 480,
          rectText: 480,
          ratio: [480, 2391],
          descriptionMessage: 'same story, today also air quality decreases. a bad day in Texas',
        },
        {
          x: xPoint[2],
          y: yPoint[3],
          value: 491,
          rectText: 491,
          ratio: [491, 2462],
          descriptionMessage: 'Day by day, 100 units are increasing in air quality',
        },
        {
          x: xPoint[1],
          y: yPoint[4],
          value: 433,
          rectText: 433,
          ratio: [433, 2486],
          descriptionMessage: `They say good things stay for a short time, today
            this saying became reality. New York has witnessed nearly 300% bad air quality`,
        },
        {
          x: xPoint[5],
          y: yPoint[4],
          value: 473,
          rectText: 473,
          ratio: [473, 2486],
          descriptionMessage: `Today is the same fate as the 2nd day. still, air quality
            stays above 400`,
        },
      ],
    },
    {
      value: 550,
      legend: 'Very Danger (501-600)',
      data: [
        {
          x: xPoint[5],
          y: yPoint[0],
          value: 600,
          rectText: 600,
          ratio: [600, 2043],
          descriptionMessage: 'looks like god has cursed us with poisonous air. worst air quality index',
        },
        {
          x: xPoint[5],
          y: yPoint[1],
          value: 536,
          rectText: 536,
          ratio: [536, 2479],
          descriptionMessage: `shh!, all the hopes were washed away in the rain yesterday,
            with another hike of 400% in air quality`,
        },
        {
          x: xPoint[3],
          y: yPoint[1],
          value: 520,
          rectText: 520,
          ratio: [520, 2479],
          descriptionMessage: 'Alaska planning to build air purifier to control the air quality',
        },
        {
          x: xPoint[4],
          y: yPoint[2],
          value: 525,
          rectText: 525,
          ratio: [525, 2391],
          descriptionMessage: 'air worsens badly today due to farmers burning the harvest',
        },
        {
          x: xPoint[6],
          y: yPoint[3],
          value: 560,
          rectText: 560,
          ratio: [560, 2462],
          descriptionMessage: `Due to industrial pollution and the
            burning of harvest, it resulted in bad air quality in Washington DC`,
        },
        {
          x: xPoint[3],
          y: yPoint[4],
          value: 580,
          rectText: 580,
          ratio: [580, 2486],
          descriptionMessage: `Air quality index is becoming worse day by day, leaving the
            people of NYC in very bad medical conditions.`,
        },
        {
          x: xPoint[6],
          y: yPoint[4],
          value: 590,
          rectText: 590,
          ratio: [590, 2486],
          descriptionMessage: `finally, the weekend ends with very bad air quality in New York City`,
        },
      ],
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
        <label htmlFor="changeWidth_Example">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          onChange={_onWidthChange}
          id="changeWidth_Example"
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight_Example">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Example"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightSlider${height}`}
        />
      </div>
      <h4>Heat map explaining the Air Quality Index</h4>
      <div style={rootStyle}>
        <HeatMapChart
          culture={window.navigator.language}
          chartTitle="Heat map chart basic example"
          data={HeatMapData}
          yAxisStringFormatter={(point: string) => yPointMapping[point as string]}
          xAxisNumberFormatString=".7s"
          yAxisNumberFormatString=".3s"
          width={width}
          height={height}
          domainValuesForColorScale={[0, 200, 400, 600]}
          rangeValuesForColorScale={[
            getColorFromToken(DataVizPalette.success),
            getColorFromToken(DataVizPalette.warning),
            getColorFromToken(DataVizPalette.error),
            getColorFromToken(DataVizPalette.highError),
          ]}
          reflowProps={{ mode: 'min-width' }}
        />
      </div>
    </>
  );
};
