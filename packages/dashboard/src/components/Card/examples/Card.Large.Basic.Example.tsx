import * as React from 'react';
import { IChartProps as IChartingProps } from '@uifabric/charting';
import {
  Card,
  CardContentType,
  CardSize,
  ChartType,
  IAction,
  ICardProps,
  IChartProps,
  IGridRow,
  IGridColumn,
  GridColumnContentType,
  Priority
} from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class LargeCardBasicExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Large Card',
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

    const gridRows: IGridRow[] = [
      {
        c1: {
          content: 'cell1',
          facepileImageSrc: '../../../public/images/facepile.png'
        },
        c2: {
          content: 'cell2',
          iconName: 'AdminALogoInverse32'
        },
        c3: {
          content: 'cell3',
          iconName: 'AdminALogoInverse32'
        },
        // Disabling ts-lint for the signature because Details List expects row parameter as any
        // tslint:disable-next-line
        onRowClicked: (item: any) => {
          alert('Row Clicked1: ' + item.c1.content);
        }
      }, // row 1
      {
        c1: {
          content: 'cell4',
          facepileImageSrc: '../../../public/images/facepile2.png'
        },
        c2: {
          content: 'cell5',
          iconName: 'AdminALogoInverse32'
        },
        c3: {
          content: 'cell6',
          iconName: 'AdminALogoInverse32'
        },
        // Disabling ts-lint for the signature because Details List expects row parameter as any
        // tslint:disable-next-line
        onRowClicked: (item: any) => {
          alert('Row Clicked2: ' + item.c1.content);
        }
      } // row 2
    ];

    const gridColumns: IGridColumn[] = [
      {
        key: GridColumnContentType.facepile,
        name: 'Display Name'
      },
      {
        key: GridColumnContentType.icon,
        name: 'Value'
      },
      {
        key: GridColumnContentType.textOnly,
        name: 'More'
      }
    ];

    const isHeaderVisible = false;

    const actionButtonText = 'more';
    const data: IChartingProps[] = [
      {
        chartTitle: 'one',
        chartData: [{ legend: 'one', horizontalBarChartdata: { x: 1543, y: 15000 }, color: DefaultPalette.tealDark }]
      },
      {
        chartTitle: 'two',
        chartData: [{ legend: 'two', horizontalBarChartdata: { x: 800, y: 15000 }, color: DefaultPalette.purple }]
      },
      {
        chartTitle: 'three',
        chartData: [{ legend: 'three', horizontalBarChartdata: { x: 8888, y: 15000 }, color: DefaultPalette.redDark }]
      },
      {
        chartTitle: 'four',
        chartData: [
          { legend: 'four', horizontalBarChartdata: { x: 15888, y: 15000 }, color: DefaultPalette.themeDarkAlt }
        ]
      },
      {
        chartTitle: 'five',
        chartData: [
          { legend: 'five', horizontalBarChartdata: { x: 11444, y: 15000 }, color: DefaultPalette.themePrimary }
        ]
      },
      {
        chartTitle: 'six',
        chartData: [{ legend: 'six', horizontalBarChartdata: { x: 14000, y: 15000 }, color: DefaultPalette.greenDark }]
      },
      {
        chartTitle: 'seven',
        chartData: [{ legend: 'seven', horizontalBarChartdata: { x: 9855, y: 15000 }, color: DefaultPalette.accent }]
      },
      {
        chartTitle: 'eight',
        chartData: [{ legend: 'eight', horizontalBarChartdata: { x: 4250, y: 15000 }, color: DefaultPalette.blueLight }]
      }
    ];

    const chartContent: IChartProps = {
      chartType: ChartType.HorizontalBarChart,
      chartData: data
    };
    const contentAreaList = [
      {
        priority: Priority.Priority2,
        cardContentType: CardContentType.GridList,
        content: {
          gridRows: gridRows,
          gridColumns: gridColumns,
          isHeaderVisible: isHeaderVisible,
          isRowClickable: true,
          actionButtonText: actionButtonText,
          onActionLinkClicked: () => {
            alert('more button clicked');
          }
        }
      },
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: chartContent
      }
    ];

    const header = {
      headerText: 'Header Text ',
      annotationText: 'Annotation Text '
    };

    const actions: IAction[] = [
      {
        title: 'Action 1',
        action: () => {
          alert('Action1 clicked');
        }
      },
      {
        title: 'Action 2',
        action: () => {
          alert('Action2 clicked');
        }
      },
      {
        title: 'Action 3',
        action: () => {
          alert('Action3 clicked');
        }
      },
      {
        title: 'Action 4',
        action: () => {
          alert('Action4 clicked');
        }
      },
      {
        title: 'Action 5',
        action: () => {
          alert('Action5 clicked');
        }
      },
      {
        title: 'Action 6',
        action: () => {
          alert('Action6 clicked');
        }
      },
      {
        title: 'Action 7',
        action: () => {
          alert('Action7 clicked');
        }
      },
      {
        title: 'Action 8',
        action: () => {
          alert('Action8 clicked');
        }
      },
      {
        title: 'Action 9',
        action: () => {
          alert('Action9 clicked');
        }
      }
    ];

    return (
      <Card
        cardFrameContent={cardFrameContent}
        header={header}
        cardContentList={contentAreaList}
        cardSize={CardSize.large}
        actions={actions}
      />
    );
  }
}
