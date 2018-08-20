import * as React from 'react';
import { IDataPoint, ILegendDataItem } from '@uifabric/charting';
import { Card, CardContentType, CardSize, ChartType, ICardProps, Priority } from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class MultipleLineChartExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Multiple Line chart example',
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
      ],
      [
        { x: 0, y: 18 },
        { x: 5, y: 20 },
        { x: 10, y: 40 },
        { x: 15, y: 30 },
        { x: 20, y: 18 },
        { x: 22, y: 20 },
        { x: 35, y: 40 },
        { x: 40, y: 30 },
        { x: 42, y: 18 },
        { x: 43, y: 20 },
        { x: 45, y: 40 },
        { x: 50, y: 30 }
      ],
      [
        { x: 0, y: 20 },
        { x: 5, y: 15 },
        { x: 10, y: 30 },
        { x: 15, y: 35 },
        { x: 20, y: 30 },
        { x: 22, y: 15 },
        { x: 35, y: 30 },
        { x: 40, y: 27 },
        { x: 42, y: 29 },
        { x: 43, y: 35 },
        { x: 45, y: 40 },
        { x: 50, y: 42 }
      ]
    ];
    const colors: ILegendDataItem[] = [
      { legendText: 'first', legendColor: DefaultPalette.yellow },
      { legendText: 'second', legendColor: DefaultPalette.blue },
      { legendText: 'third', legendColor: DefaultPalette.red }
    ];

    const contentAreaList = [
      {
        priority: Priority.Priority2,
        cardContentType: CardContentType.Chart,
        content: {
          chartLabels: ['Line chart example'],
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
