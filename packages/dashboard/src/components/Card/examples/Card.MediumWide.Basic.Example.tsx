import * as React from 'react';
import { Card, CardContentType, CardSize, IAction, ICardProps, IThumbnailItemProps, Priority } from '@uifabric/dashboard';
export class MediumWideCardBasicExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Medium Wide Card',
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
        imageSource: '../../../public/images/download.jpg',
        subheaderText: 'First item',
        description: 'This is the first thumbnail item',
        handleThumbnailItemClick: () => {
          alert('First Item clicked');
        },
        altImageText: 'First item',
        imageAriaHidden: true
      },
      {
        imageSource: '../../../public/images/download.jpg',
        subheaderText: 'Second item',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        handleThumbnailItemClick: () => {
          alert('Second Item clicked');
        },
        altImageText: 'Second item'
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
        cardSize={CardSize.mediumWide}
        actions={actions}
      />
    );
  }
}
