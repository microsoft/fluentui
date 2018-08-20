import * as React from 'react';
import { IDataPoint, ILegendDataItem } from '@uifabric/charting';
import { Card, CardContentType, CardSize, ChartType, ICardProps, Priority } from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class DonutAndPieChartExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Donut and Pie chart Example',
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

    const points: IDataPoint[] = [{ y: 50, x: 'A' }, { y: 25, x: 'B' }, { y: 25, x: 'C' }];
    const colors: ILegendDataItem[] = [
      { legendText: 'A', legendColor: DefaultPalette.green },
      { legendText: 'B', legendColor: DefaultPalette.blue },
      { legendText: 'C', legendColor: DefaultPalette.red }
    ];

    const contentAreaList = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: {
          chartLabels: ['Donut Chart'],
          chartType: ChartType.DonutChart,
          dataPoints: points,
          legendColors: colors
        }
      },
      {
        priority: Priority.Priority2,
        cardContentType: CardContentType.Chart,
        content: {
          chartLabels: ['Pie Chart'],
          chartType: ChartType.PieChart,
          dataPoints: points,
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
