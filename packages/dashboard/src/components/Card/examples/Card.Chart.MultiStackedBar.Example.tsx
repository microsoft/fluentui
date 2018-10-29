import * as React from 'react';
import { IChartProps as IChartingProps, IChartDataPoint } from '@uifabric/charting';
import { Card, CardContentType, CardSize, ChartType, IChartProps, ICardContentDetails, ICardProps, Priority } from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class MultiStackedBarChartExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Multi Stacked bar chart example',
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

    const firstChartPoints: IChartDataPoint[] = [
      { legend: 'Debit card numbers (EU and USA)', data: 40, color: DefaultPalette.red },
      { legend: 'Passport numbers (USA)', data: 23, color: DefaultPalette.green },
      { legend: 'Social security numbers', data: 35, color: DefaultPalette.yellow },
      { legend: 'Credit card numbers', data: 87, color: DefaultPalette.blue },
      { legend: 'Tax identification numbers (USA)', data: 87, color: DefaultPalette.purple }
    ];

    const secondChartPoints: IChartDataPoint[] = [
      { legend: 'Phone Numbers', data: 40, color: DefaultPalette.blue },
      { legend: 'Credit card Numbers', data: 23, color: DefaultPalette.green },
      { legend: 'Asset Numbers', data: 35, color: DefaultPalette.yellow }
    ];

    const data: IChartingProps[] = [
      {
        chartTitle: 'Monitored',
        chartData: firstChartPoints
      },
      {
        chartTitle: 'Unmonitored',
        chartData: secondChartPoints
      }
    ];

    const chartContent1: IChartProps = {
      chartType: ChartType.StackedBarChart,
      chartData: data,
      chartUpdatedOn: 'Updated 6:20 pm today'
    };

    const chartContent2: IChartProps = {
      chartType: ChartType.StackedBarChart,
      chartData: data,
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
      headerText: 'Sensitive info types'
    };

    return <Card cardFrameContent={cardFrameContent} header={header} cardContentList={contentAreaList} cardSize={CardSize.mediumTall} />;
  }
}
