import * as React from 'react';
import { HeatMapChart } from '../HeatMapChart';
import { IHeatMapChartProps } from '../HeatMapChart.types';

interface IHeatMapChartBasicExampleState {
  width: number;
  height: number;
}

export class HeatMapChartBasicExample extends React.Component<{}, IHeatMapChartBasicExampleState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = {
      width: 450,
      height: 350,
    };
  }
  public render(): React.ReactNode {
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const ypointMapping: { [key: string]: string } = {
      p1: 'ohio',
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
      new Date('2020-03-09'), // 4
      new Date('2020-03-10'), // 5
    ];
    const HeatMapData: IHeatMapChartProps['data'] = [
      {
        value: 100,
        legend: 'Execllent (0-200)',
        data: [
          {
            x: xPoint[0],
            y: yPoint[2],
            value: 50,
            rectText: 50,
            ratio: [50, 2391],
            descriptionMessage: 'a good day to start with in Texas with best air quality',
          },
          {
            x: xPoint[4],
            y: yPoint[1],
            value: 25,
            rectText: 25,
            ratio: [25, 2479],
            descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
            off and people of alaska are hoping for more of this days`,
          },
          {
            x: xPoint[0],
            y: yPoint[0],
            value: 100,
            rectText: 100,
            ratio: [100, 2043],
            descriptionMessage: 'on This day we have an excellent air quality clear sky',
          },
          {
            x: xPoint[3],
            y: yPoint[3],
            value: 46,
            rectText: 46,
            ratio: [46, 2462],
            descriptionMessage: 'Due to heavy rain today, pollutants got washed off and air quality increases',
          },
          {
            x: xPoint[6],
            y: yPoint[0],
            value: 35,
            rectText: 35,
            ratio: [35, 2043],
            descriptionMessage: `some miracle has happend. form 600 units to 35 units.weather professionals
               are investigation on this miracle to get scientific explination `,
          },
          {
            x: xPoint[0],
            y: yPoint[4],
            value: 60,
            rectText: 60,
            ratio: [60, 2486],
            descriptionMessage: `A good Sunny Day to start the 1st day of week
            and that too with a excellent air quality`,
          },
          {
            x: xPoint[2],
            y: yPoint[4],
            value: 70,
            rectText: 70,
            ratio: [70, 2486],
            descriptionMessage: `Nature is palying hide and seek with us, today
            there is decrease of nearly 200% in air quality index`,
          },
        ],
      },
      {
        value: 250,
        legend: 'Good (201-300)',
        data: [
          {
            x: xPoint[2],
            y: yPoint[2],
            value: 246,
            rectText: 246,
            ratio: [246, 2391],
            descriptionMessage: 'air quality is seems to be very nice today',
          },
          {
            x: xPoint[0],
            y: yPoint[1],
            value: 265,
            rectText: 265,
            ratio: [265, 2479],
            descriptionMessage: 'today we have a good air quality in the alaska',
          },
          {
            x: xPoint[1],
            y: yPoint[0],
            value: 250,
            rectText: 250,
            ratio: [250, 2043],
            descriptionMessage: 'a sudden rise of 150 units in the ohio today',
          },
          {
            x: xPoint[2],
            y: yPoint[0],
            value: 235,
            rectText: 235,
            ratio: [235, 2043],
            descriptionMessage: 'air quality seems to decrease only 15 units from yesterday',
          },
          {
            x: xPoint[6],
            y: yPoint[2],
            value: 300,
            rectText: 300,
            ratio: [300, 2391],
            descriptionMessage: 'air comes to control little bit more that yesterday',
          },
          {
            x: xPoint[0],
            y: yPoint[3],
            value: 290,
            rectText: 290,
            ratio: [290, 2462],
            descriptionMessage: '1st day in the week, DC witnesses a good air quality',
          },
          {
            x: xPoint[4],
            y: yPoint[4],
            value: 280,
            rectText: 280,
            ratio: [280, 2486],
            descriptionMessage: `Air quality index is decreases exactly 200 units
            giving the people of NYC a good hope`,
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
            descriptionMessage: 'alaska has just reported nearly 100 units hike air quality',
          },
          {
            x: xPoint[6],
            y: yPoint[1],
            value: 325,
            rectText: 325,
            ratio: [325, 2479],
            descriptionMessage: `alaska to 300`,
          },
          {
            x: xPoint[5],
            y: yPoint[2],
            value: 390,
            rectText: 390,
            ratio: [390, 2391],
            descriptionMessage: 'air comes to control little bit',
          },
          {
            x: xPoint[1],
            y: yPoint[3],
            value: 385,
            rectText: 385,
            ratio: [385, 2462],
            descriptionMessage: 'washington DC witnesses a hike of nearly 100 units in air quality',
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
            x: xPoint[5],
            y: yPoint[3],
            value: 300,
            rectText: 300,
            ratio: [300, 2462],
            descriptionMessage: '60 units decreased form yesterday.',
          },
        ],
      },
      {
        value: 450,
        legend: 'Danger (401-500)',
        data: [
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
            descriptionMessage: 'stuation gor worse in air quality, due to industrial smoke',
          },
          {
            x: xPoint[4],
            y: yPoint[0],
            value: 423,
            rectText: 423,
            ratio: [423, 2043],
            descriptionMessage: 'we can see increase by 23 units',
          },
          {
            x: xPoint[2],
            y: yPoint[1],
            value: 463,
            rectText: 463,
            ratio: [463, 2479],
            descriptionMessage: 'day by day situation is getting worse in the alaska',
          },
          {
            x: xPoint[3],
            y: yPoint[2],
            value: 480,
            rectText: 480,
            ratio: [480, 2391],
            descriptionMessage: 'same story, tolday also air quality decreases. a bad day in texas',
          },
          {
            x: xPoint[2],
            y: yPoint[3],
            value: 491,
            rectText: 491,
            ratio: [491, 2462],
            descriptionMessage: 'Day by Day 100 units are increasing in air quality',
          },
          {
            x: xPoint[1],
            y: yPoint[4],
            value: 433,
            rectText: 433,
            ratio: [433, 2486],
            descriptionMessage: `They say good things stay for shor time, today
            this saying becaome reality, new york has witnessed nearly 300% bad air quality`,
          },
          {
            x: xPoint[5],
            y: yPoint[4],
            value: 473,
            rectText: 473,
            ratio: [473, 2486],
            descriptionMessage: `Today is the same fate as the 2nd day. still air quality
            stay's above 400`,
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
            descriptionMessage: 'looks like the god has cursed us with the poision air. worst air quality index',
          },
          {
            x: xPoint[5],
            y: yPoint[1],
            value: 536,
            rectText: 536,
            ratio: [536, 2479],
            descriptionMessage: `shhh!, all the hopes are washed away in the rain yesterday,
            again hike of 400% in air quality`,
          },
          {
            x: xPoint[3],
            y: yPoint[1],
            value: 520,
            rectText: 520,
            ratio: [520, 2479],
            descriptionMessage: 'Alaska planning to bulild the air purifier to control in the air quality',
          },
          {
            x: xPoint[4],
            y: yPoint[2],
            value: 525,
            rectText: 525,
            ratio: [525, 2391],
            descriptionMessage: 'air decreases badly today due to farmer bufing the harvest',
          },
          {
            x: xPoint[6],
            y: yPoint[3],
            value: 560,
            rectText: 560,
            ratio: [560, 2462],
            descriptionMessage: `Due to industiral pollution and the
            burning of harvest in the alaska, resulted to bad air quality in the washington DC`,
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
            descriptionMessage: `finally the Weekend end's with very bad air quality in the new your city`,
          },
        ],
      },
    ];
    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <div style={rootStyle}>
          <HeatMapChart
            data={HeatMapData}
            // eslint-disable-next-line react/jsx-no-bind
            yAxisStringFormatter={(point: string) => ypointMapping[point as string]}
            xAxisNumberFormatString=".7s"
            yAxisNumberFormatString=".3s"
            width={this.state.width}
            height={this.state.height}
            domainValuesForColorScale={[0, 600]}
            rangeValuesForColorScale={['lightblue', 'darkblue']}
          />
        </div>
      </>
    );
  }
  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
}
