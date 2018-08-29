import * as React from 'react';
import { IChartProps as IChartingProps } from '@uifabric/charting';
import {
  Card,
  CardContentType,
  CardSize,
  ChartType,
  ICardProps,
  ICardContentDetails,
  IChartProps,
  Priority
} from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class DonutChartExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Stacked bar chart example',
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

    const firstChartData: IChartingProps[] = [
      {
        chartTitle: 'Monitored',
        chartData: [
          { legend: 'Legend1', data: 40, color: DefaultPalette.red },
          { legend: 'Legend2', data: 23, color: DefaultPalette.green },
          { legend: 'Legend3', data: 35, color: DefaultPalette.yellow },
          { legend: 'Legend4', data: 87, color: DefaultPalette.blue }
        ]
      }
    ];

    const chartContent1: IChartProps = {
      chartType: ChartType.DonutChart,
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
      headerText: 'Donut Chart '
    };

    return (
      <Card
        cardFrameContent={cardFrameContent}
        header={header}
        cardContentList={contentAreaList}
        cardSize={CardSize.large}
      />
    );
  }
}
