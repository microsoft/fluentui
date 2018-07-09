import * as React from 'react';
import { DashboardGridLayout } from '../DashboardGridLayout';
import { DashboardGridBreakpointLayouts, Size } from '../DashboardGridLayout.types';
import { CardSize, Priority, CardContentType } from '@uifabric/experiments/src/components/Card/Card.types';
import { Card } from '@uifabric/experiments/src/components/Card';
import { IThumbnailItemProps } from '@uifabric/experiments/src/components/Card/ThumbnailList/ThumbnailList.types';

export class DashboardGridLayoutCardExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Small Card',
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
          />
        </div>
        <div key="1">
          <Card
            cardFrameContent={cardFrameContent}
            header={header}
            cardContentList={contentAreaList}
            cardSize={CardSize.mediumTall}
          />
        </div>
        <div key="2">
          <Card
            cardFrameContent={cardFrameContent}
            header={header}
            cardContentList={contentAreaList}
            cardSize={CardSize.small}
          />
        </div>
      </DashboardGridLayout>
    );
  }

  private _generateLayout(): DashboardGridBreakpointLayouts {
    return {
      lg: [
        { i: '0', y: 0, x: 0, size: Size.small },
        { i: '1', y: 0, x: 1, size: Size.mediumTall },
        { i: '2', y: 1, x: 0, size: Size.small }
      ]
    };
  }
}
