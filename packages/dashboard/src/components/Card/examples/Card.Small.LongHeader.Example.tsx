import * as React from 'react';
import { Card, CardContentType, CardSize, ICardProps, IThumbnailItemProps, Priority } from '@uifabric/dashboard';

export class SmallCardLongHeaderExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

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
        imageSource: '../../../public/images/download.jpg',
        subheaderText: 'First item',
        description: 'This is the first thumbnail item',
        handleThumbnailItemClick: () => {
          alert('First Item clicked');
        }
      },
      {
        imageSource: '../../../public/images/download.jpg',
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
      headerText: 'The quick brown fox jumps over the lazy dogs + The quick brown fox jumps over the lazy dogs',
      annotationText: 'Annotation Text '
    };
    return (
      // tslint:disable-next-line
      <div style={{ width: 364 }}>
        <Card cardFrameContent={cardFrameContent} header={header} cardContentList={contentAreaList} cardSize={CardSize.small} />
      </div>
    );
  }
}
