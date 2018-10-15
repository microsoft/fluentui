import * as React from 'react';
import { IChartProps as IChartingProps, ILineChartPoints } from '@uifabric/charting';
import { Card, CardContentType, CardSize, ChartType, ICardProps, ICardContentDetails, IChartProps, Priority } from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class MultipleLineChartExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Multi Line chart example',
      cardDropDownOptions: [
        {
          key: 'Remove',
          name: 'Remove',
          icon: 'PageRemove',
          ariaLabel: 'Remove card',
          title: 'Remove card',
          onClick: () => {
            alert('Remove clicked');
          }
        }
      ]
    };
    const points: ILineChartPoints[] = [
      {
        data: [
          { x: new Date('01-01-2018'), y: 10 },
          { x: new Date('01-15-2018'), y: 18 },
          { x: new Date('01-28-2018'), y: 24 },
          { x: new Date('02-01-2018'), y: 25 },
          { x: new Date('03-01-2018'), y: 15 },
          { x: new Date('03-15-2018'), y: 30 },
          { x: new Date('03-28-2018'), y: 18 },
          { x: new Date('04-04-2018'), y: 32 },
          { x: new Date('04-15-2018'), y: 29 },
          { x: new Date('05-05-2018'), y: 43 },
          { x: new Date('06-01-2018'), y: 45 }
        ],
        legend: 'First',
        color: DefaultPalette.blue
      },
      {
        data: [
          { x: new Date('01-01-2018'), y: 10 },
          { x: new Date('01-7-2018'), y: 18 },
          { x: new Date('01-15-2018'), y: 24 },
          { x: new Date('02-01-2018'), y: 25 },
          { x: new Date('03-10-2018'), y: 15 },
          { x: new Date('03-15-2018'), y: 30 },
          { x: new Date('03-20-2018'), y: 18 },
          { x: new Date('04-10-2018'), y: 32 },
          { x: new Date('04-20-2018'), y: 29 },
          { x: new Date('05-16-2018'), y: 43 },
          { x: new Date('06-01-2018'), y: 45 }
        ],
        legend: 'Second',
        color: DefaultPalette.green
      },
      {
        data: [
          { x: new Date('01-06-2018'), y: 10 },
          { x: new Date('01-18-2018'), y: 18 },
          { x: new Date('01-25-2018'), y: 24 },
          { x: new Date('02-10-2018'), y: 25 },
          { x: new Date('03-03-2018'), y: 15 },
          { x: new Date('03-07-2018'), y: 30 },
          { x: new Date('03-15-2018'), y: 18 },
          { x: new Date('04-10-2018'), y: 32 },
          { x: new Date('04-17-2018'), y: 29 },
          { x: new Date('05-10-2018'), y: 43 },
          { x: new Date('06-01-2018'), y: 45 }
        ],
        legend: 'Third',
        color: DefaultPalette.red
      }
    ];

    const firstChartData: IChartingProps[] = [
      {
        chartTitle: 'Line Chart',
        lineChartData: points
      }
    ];

    const chartContent: IChartProps = {
      chartType: ChartType.LineChart,
      chartData: firstChartData,
      timeRange: '180Days'
    };

    const contentAreaList: ICardContentDetails[] = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: chartContent
      }
    ];

    const header = {
      headerText: 'Header Text '
    };

    return <Card cardFrameContent={cardFrameContent} header={header} cardContentList={contentAreaList} cardSize={CardSize.mediumWide} />;
  }
}
