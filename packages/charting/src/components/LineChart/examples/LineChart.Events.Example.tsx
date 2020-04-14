import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import * as d3 from 'd3-format';

export const calloutItemStyle = mergeStyles({
  borderBottom: '1px solid #D9D9D9',
  padding: '3px',
});

interface IRootStyles {
  height: string;
  width: string;
}

export class LineChartEventsExample extends React.Component<{}, {}> {
  constructor(props: ILineChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: [
        {
          legend: 'From_Legacy_to_O365',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 297,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 284,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 294,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 294,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 298,
            },
          ],
          color: DefaultPalette.blue,
        },
        {
          legend: 'All',
          data: [
            {
              x: new Date('2020-03-03T00:00:00.000Z'),
              y: 297,
            },
            {
              x: new Date('2020-03-04T00:00:00.000Z'),
              y: 284,
            },
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282,
            },
            {
              x: new Date('2020-03-06T00:00:00.000Z'),
              y: 294,
            },
            {
              x: new Date('2020-03-07T00:00:00.000Z'),
              y: 294,
            },
            {
              x: new Date('2020-03-08T00:00:00.000Z'),
              y: 300,
            },
            {
              x: new Date('2020-03-09T00:00:00.000Z'),
              y: 298,
            },
          ],
          color: DefaultPalette.green,
        },
      ],
    };
    const rootStyle: IRootStyles = { width: '700px', height: '330px' };
    return (
      <div className={mergeStyles(rootStyle)}>
        <LineChart
          data={data}
          legendsOverflowText={'Overflow Items'}
          yMinValue={282}
          yMaxValue={301}
          yAxisTickFormat={d3.format('$,')}
          tickFormat={'%m/%d'}
          tickValues={[
            new Date('2020-03-03'),
            new Date('2020-03-04'),
            new Date('2020-03-05'),
            new Date('2020-03-06'),
            new Date('2020-03-07'),
            new Date('2020-03-08'),
            new Date('2020-03-09'),
          ]}
          eventAnnotationProps={{
            events: [
              {
                event: 'event 1',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 1 message</div>,
              },
              {
                event: 'event 2',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 2 message</div>,
              },
              {
                event: 'event 3',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 3 message</div>,
              },
              {
                event: 'event 4',
                date: new Date('2020-03-06T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 4 message</div>,
              },
              {
                event: 'event 5',
                date: new Date('2020-03-08T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 5 message</div>,
              },
            ],
            strokeColor: '#111111',
            labelColor: '#111111',
            labelHeight: 18,
            labelWidth: 50,
            mergedLabel: (count: number) => `${count} events`,
          }}
        />
      </div>
    );
  }
}
