import * as React from 'react';
import { IDataPoint, ILegendDataItem } from '@uifabric/charting';
import { Card, CardContentType, CardSize, ChartType, ICardProps, Priority } from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class LineAndVerticalBarChartExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Vertical bar and line chart example',
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

    const datapoints: IDataPoint[] = [
      { x: 0, y: 10 },
      { x: 6, y: 18 },
      { x: 12, y: 36 },
      { x: 21, y: 20 },
      { x: 29, y: 46 },
      { x: 34, y: 25 },
      { x: 40, y: 13 },
      { x: 48, y: 43 },
      { x: 57, y: 30 },
      { x: 64, y: 45 },
      { x: 72, y: 12 },
      { x: 78, y: 50 },
      { x: 85, y: 25 },
      { x: 90, y: 43 },
      { x: 96, y: 22 },
      { x: 100, y: 19 }
    ];

    const points: IDataPoint[][] = [
      [
        { x: 0, y: 10 },
        { x: 5, y: 18 },
        { x: 10, y: 24 },
        { x: 15, y: 25 },
        { x: 20, y: 15 },
        { x: 25, y: 30 },
        { x: 30, y: 18 },
        { x: 35, y: 32 },
        { x: 40, y: 29 },
        { x: 45, y: 43 },
        { x: 50, y: 45 }
      ]
    ];
    const colors: ILegendDataItem[] = [
      { legendText: 'first', legendColor: DefaultPalette.yellow },
      { legendText: 'second', legendColor: DefaultPalette.blue },
      { legendText: 'third', legendColor: DefaultPalette.red }
    ];

    const contentAreaList = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: {
          chartLabels: ['Vertical bar chart example'],
          chartType: ChartType.VerticalBarChart,
          dataPoints: datapoints,
          legendColors: colors
        }
      },
      {
        priority: Priority.Priority2,
        cardContentType: CardContentType.Chart,
        content: {
          chartLabel: ['Line chart example'],
          chartType: ChartType.LineChart,
          data: points,
          legendColors: colors
        }
      }
    ];

    const header = {
      headerText: 'Header Text ',
      annotationText: 'Annotation Text '
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
