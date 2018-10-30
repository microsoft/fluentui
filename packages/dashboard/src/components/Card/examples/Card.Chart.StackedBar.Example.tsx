import * as React from 'react';
import { IChartProps as IChartingProps } from '@uifabric/charting';
import { Card, CardContentType, CardSize, ChartType, ICardProps, ICardContentDetails, IChartProps, Priority } from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class StackedBarChartExample extends React.Component<{}, {}> {
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
          { legend: 'Legend 1 text', data: 40, color: DefaultPalette.accent },
          { legend: 'Legend 2 text', data: 23, color: DefaultPalette.green },
          { legend: 'Legend 3 text', data: 35, color: DefaultPalette.orange },
          { legend: 'Legend 4 text', data: 87, color: DefaultPalette.blue }
        ]
      }
    ];

    const secondChartData: IChartingProps[] = [
      {
        chartTitle: 'UnMonitored',
        chartData: [
          { legend: 'first Lorem Ipsum is simply dummy text', data: 40, color: DefaultPalette.blueLight },
          { legend: 'second', data: 23, color: DefaultPalette.red },
          {
            legend: 'third Lorem Ipsum is simply dummy text of the printing',
            data: 35,
            color: DefaultPalette.purpleLight
          },
          { legend: 'fourth', data: 87, color: DefaultPalette.green }
        ]
      }
    ];

    const chartContent1: IChartProps = {
      chartType: ChartType.StackedBarChart,
      chartData: firstChartData,
      chartUpdatedOn: 'Updated 6:20 pm today'
    };

    const chartContent2: IChartProps = {
      chartType: ChartType.StackedBarChart,
      chartData: secondChartData,
      chartUpdatedOn: 'Updated 6:20 pm today'
    };

    const contentAreaList: ICardContentDetails[] = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: chartContent1
      },
      {
        priority: Priority.Priority2,
        cardContentType: CardContentType.Chart,
        content: chartContent2
      }
    ];

    const header = {
      headerText: 'Header Text '
    };

    return <Card cardFrameContent={cardFrameContent} header={header} cardContentList={contentAreaList} cardSize={CardSize.large} />;
  }
}
