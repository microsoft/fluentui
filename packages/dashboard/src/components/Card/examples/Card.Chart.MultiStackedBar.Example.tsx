import * as React from 'react';
import { IDataPoint, ILegendDataItem } from '@uifabric/charting';
import { Card, CardContentType, CardSize, ChartType, ICardProps, Priority } from '@uifabric/dashboard';
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

    const points: IDataPoint[][] = [
      [
        { x: 'Debit card numbers (EU and USA)', y: 40 },
        { x: 'Passport numbers (USA)', y: 23 },
        { x: 'Social security numbers', y: 35 }
      ],
      [{ x: 'Credit card numbers', y: 87 }, { x: 'Tax identification numbers (USA)', y: 87 }]
    ];

    const colors: ILegendDataItem[] = [
      { legendText: 'Debit card numbers (EU and USA)', legendColor: DefaultPalette.blueLight },
      { legendText: 'Passport numbers (USA)', legendColor: DefaultPalette.blue },
      { legendText: 'Social security numbers', legendColor: DefaultPalette.blueMid },
      { legendText: 'Credit card numbers', legendColor: DefaultPalette.red },
      { legendText: 'Tax identification numbers (USA)', legendColor: DefaultPalette.black }
    ];

    const chartContent = {
      chartLabels: ['Monitored', 'Unmonitored'],
      chartType: ChartType.StackedBarChart,
      data: points,
      barHeight: 8,
      chartUpdatedOn: 'Updated 6:20 pm today',
      compactChartWidth: 394,
      legendColors: colors
    };

    const textContent = {
      subHeaderText: 'Edit data loss prevention policies',
      bodyText:
        'Information based on your data loss prevention (DLP) policies may take up to 24 hours to appear in this activity report'
    };

    const contentAreaList = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: chartContent
      },
      {
        priority: Priority.Priority2,
        cardContentType: CardContentType.BodyText,
        content: textContent
      }
    ];

    const header = {
      headerText: 'Sensitive info types'
    };

    return (
      <Card
        cardFrameContent={cardFrameContent}
        header={header}
        cardContentList={contentAreaList}
        cardSize={CardSize.mediumTall}
      />
    );
  }
}
