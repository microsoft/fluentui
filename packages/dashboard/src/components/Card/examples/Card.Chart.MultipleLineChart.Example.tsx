import * as React from 'react';
import { IChartProps as IChartingProps, ILineChartPoints } from '@uifabric/charting';
import {
  Card,
  CardContentType,
  CardSize,
  ChartType,
  ICardProps,
  ICardContentDetails,
  IChartProps,
  Priority
} from '../../../index';
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
          { x: '28/08', y: 10 },
          { x: '29/08', y: 18 },
          { x: '30/08', y: 24 },
          { x: '31/08', y: 25 },
          { x: '01/09', y: 15 },
          { x: '02/09', y: 30 },
          { x: '03/09', y: 18 },
          { x: '04/09', y: 32 },
          { x: '05/09', y: 29 },
          { x: '06/09', y: 43 },
          { x: '07/09', y: 45 }
        ],
        legend: 'First',
        color: DefaultPalette.blue
      },
      {
        data: [
          { x: '28/08', y: 18 },
          { x: '29/08', y: 20 },
          { x: '30/08', y: 40 },
          { x: '31/08', y: 30 },
          { x: '01/09', y: 18 },
          { x: '02/09', y: 20 },
          { x: '03/09', y: 40 },
          { x: '04/09', y: 30 },
          { x: '05/09', y: 18 },
          { x: '06/09', y: 40 },
          { x: '07/09', y: 30 }
        ],
        legend: 'Second',
        color: DefaultPalette.green
      },
      {
        data: [
          { x: '28/08', y: 20 },
          { x: '29/08', y: 15 },
          { x: '30/08', y: 30 },
          { x: '31/08', y: 35 },
          { x: '01/09', y: 30 },
          { x: '02/09', y: 15 },
          { x: '03/09', y: 30 },
          { x: '04/09', y: 27 },
          { x: '05/09', y: 29 },
          { x: '06/09', y: 35 },
          { x: '07/09', y: 42 }
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

    const chartContent1: IChartProps = {
      chartType: ChartType.LineChart,
      chartData: firstChartData
    };

    const contentAreaList: ICardContentDetails[] = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: chartContent1
      }
    ];

    const header = {
      headerText: 'Header Text '
    };

    return (
      <Card
        cardFrameContent={cardFrameContent}
        header={header}
        cardContentList={contentAreaList}
        cardSize={CardSize.mediumWide}
      />
    );
  }
}
