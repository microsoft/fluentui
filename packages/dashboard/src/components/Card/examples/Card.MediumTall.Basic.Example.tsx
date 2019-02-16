import * as React from 'react';
import { Card, CardContentType, CardSize, ICardProps, ICompoundAction, Priority } from '@uifabric/dashboard';

export class MediumTallCardBasicExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Medium Tall Card',
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
      ],
      href: 'https://developer.microsoft.com/en-us/fabric',
      cardFrameMenuTitle: 'more',
      cardFrameMenuAriaLabel: 'more'
    };

    const compoundButtonStack: ICompoundAction[] = [
      {
        title: 'Compound Button 1',
        action: () => {
          alert('Compound Button 1 clicked');
        },
        description: 'Compund Button 1 description',
        ariaLabel: 'Compound Button 1'
      },
      {
        title: 'Compound Button 2',
        action: () => {
          alert('Compound Button 2 clicked');
        },
        description: 'Compund Button 2 description'
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
        cardContentType: CardContentType.CompoundButtonStack,
        content: {
          actions: compoundButtonStack
        }
      }
    ];
    const actionBarOverflowButtonTitle = 'more actions';
    const actionBarOverflowButtonAriaLabel = 'more actions';
    const actionBarOverflowButtonAriaDescription = 'more actions';

    const header = {
      headerText: 'Header Text ',
      annotationText: 'Annotation Text ',
      fontSize: 1
    };
    return (
      <Card
        cardFrameContent={cardFrameContent}
        header={header}
        cardContentList={contentAreaList}
        cardSize={CardSize.mediumTall}
        actionBarOverflowButtonTitle={actionBarOverflowButtonTitle}
        actionBarOverflowButtonAriaLabel={actionBarOverflowButtonAriaLabel}
        actionBarOverflowButtonAriaDescription={actionBarOverflowButtonAriaDescription}
      />
    );
  }
}
