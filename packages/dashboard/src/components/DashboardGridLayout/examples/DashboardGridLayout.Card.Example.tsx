import * as React from 'react';
import {
  Card,
  CardContentType,
  CardSize,
  ChartType,
  DashboardGridBreakpointLayouts,
  DashboardGridLayout,
  IAction,
  IThumbnailItemProps,
  Priority
} from '@uifabric/dashboard';

export class DashboardGridLayoutCardExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Example Card',
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
    const thumbnailItems: IThumbnailItemProps[] = [
      {
        imageSource: './src/images/download.jpg',
        subheaderText: 'First item',
        description: 'This is the first thumbnail item',
        handleThumbnailItemClick: () => {
          alert('First Item clicked');
        }
      },
      {
        imageSource: './src/images/download.jpg',
        subheaderText: 'Second item',
        description: 'Lorem ipsum dolor sit amet, ',
        handleThumbnailItemClick: () => {
          alert('Second Item clicked');
        }
      }
    ];

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

    const contentAreaList = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.BodyText,
        content: {
          subHeaderText: 'Subheader Text',
          bodyText: 'Body Text'
        }
      },
      {
        priority: Priority.Priority2,
        cardContentType: CardContentType.ThumbnailList,
        content: {
          thumbnailItems: thumbnailItems
        }
      }
    ];

    const datapoints = [
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

    const largeContentAreaList = [
      {
        priority: Priority.Priority2,
        cardContentType: CardContentType.ThumbnailList,
        content: {
          thumbnailItems: thumbnailItems
        }
      },
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: {
          chartLabel: 'My first chart!',
          chartType: ChartType.VerticalBarChart,
          dataPoints: datapoints,
          colors: ['red', 'yellow']
        }
      }
    ];

    const mediumTallContentAreaList = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.Chart,
        content: {
          chartLabel: 'My first chart!',
          chartType: ChartType.VerticalBarChart,
          dataPoints: datapoints,
          colors: ['red', 'yellow']
        }
      }
    ];

    const header = {
      headerText: 'Header Text ',
      annotationText: 'Annotation Text '
    };
    return (
      <DashboardGridLayout isDraggable={true} layout={this._generateLayout()}>
        <div key="0">
          <Card
            cardFrameContent={cardFrameContent}
            header={header}
            cardContentList={contentAreaList}
            cardSize={CardSize.small}
            disableDrag={true}
          />
        </div>
        <div key="1">
          <Card
            cardFrameContent={cardFrameContent}
            header={header}
            cardContentList={mediumTallContentAreaList}
            cardSize={CardSize.mediumTall}
            actions={actions}
          />
        </div>
        <div key="2">
          <Card cardFrameContent={cardFrameContent} header={header} cardContentList={contentAreaList} cardSize={CardSize.small} />
        </div>
        <div key="3">
          <Card
            cardFrameContent={cardFrameContent}
            header={header}
            cardContentList={contentAreaList}
            cardSize={CardSize.mediumWide}
            actions={actions}
          />
        </div>
        <div key="4">
          <Card
            cardFrameContent={cardFrameContent}
            header={header}
            cardContentList={largeContentAreaList}
            cardSize={CardSize.large}
            actions={actions}
          />
        </div>
      </DashboardGridLayout>
    );
  }

  private _generateLayout(): DashboardGridBreakpointLayouts {
    return {
      lg: [
        { i: '0', y: 0, x: 0, size: CardSize.small, disableDrag: true },
        { i: '1', y: 0, x: 1, size: CardSize.mediumTall },
        { i: '2', y: 1, x: 0, size: CardSize.small },
        { i: '3', y: 0, x: 2, size: CardSize.mediumWide },
        { i: '4', y: 1, x: 2, size: CardSize.large }
      ]
    };
  }
}
