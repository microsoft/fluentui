import * as React from 'react';
import {
  IDGLCard,
  ICardContentDetails,
  Priority,
  CardContentType,
  CardSize,
  DashboardGridLayoutWithAddCardPanel,
  DashboardGridBreakpointLayouts,
  IThumbnailItemProps
} from '../../../index';

// Cards information that go into the layout and add card panel
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

const getHeader = (name: string) => {
  return {
    headerText: 'Card ' + name,
    annotationText: 'Annotation Text '
  };
};

const contentAreaList: ICardContentDetails[] = [
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
const cardsVisibleInLayout: IDGLCard[] = [
  {
    id: '0',
    cardFrameContent: cardFrameContent,
    header: getHeader('0'),
    cardContentList: contentAreaList,
    cardSize: CardSize.small,
    x: 0,
    y: 0,
    addCardInfo: {
      addCardPanelBodyText:
        'Add and manage users in your organization, help reset their passwords, manage their licenses,' +
        ' and see their latest Azure AD Connect sync.',
      addCardPanelHeader: 'User Management',
      addCardPanelImageUrl: '../../../../public/images/CompoundButtonStack.svg'
    }
  },
  {
    id: '1',
    cardFrameContent: cardFrameContent,
    header: getHeader('1'),
    cardContentList: contentAreaList,
    cardSize: CardSize.mediumTall,
    x: 1,
    y: 0,
    addCardInfo: {
      addCardPanelBodyText: 'View and manage your billing balance, subscription status, and payment info.',
      addCardPanelHeader: 'Billing',
      addCardPanelImageUrl: '../../../../public/images/DetailsList.svg'
    }
  },
  {
    id: '2',
    cardFrameContent: cardFrameContent,
    header: getHeader('2'),
    cardContentList: contentAreaList,
    cardSize: CardSize.large,
    x: 2,
    y: 0,
    addCardInfo: {
      addCardPanelBodyText: 'Get guidance on deploying Microsoft 365 features and services, and get training for you and your end users.',
      addCardPanelHeader: 'Training and guides',
      addCardPanelImageUrl: '../../../../public/images/Donut.svg'
    }
  },
  {
    id: '3',
    cardFrameContent: cardFrameContent,
    header: getHeader('3'),
    cardContentList: contentAreaList,
    cardSize: CardSize.small,
    x: 0,
    y: 1,
    addCardInfo: {
      addCardPanelBodyText: 'Install or deploy Office 365 ProPlus software and see how many licensed users have activated it.',
      addCardPanelHeader: 'Office 365 software',
      addCardPanelImageUrl: '../../../../public/images/LineChart.svg'
    }
  },
  {
    id: '4',
    cardFrameContent: cardFrameContent,
    header: getHeader('4'),
    cardContentList: contentAreaList,
    cardSize: CardSize.mediumWide,
    x: 0,
    y: 2,
    addCardInfo: {
      addCardPanelBodyText: "Stay Informed of new products, features, and changes as they're announced.",
      addCardPanelHeader: 'Message Center',
      addCardPanelImageUrl: '../../../../public/images/StackedBarChart.svg'
    }
  },
  {
    id: '5',
    cardFrameContent: cardFrameContent,
    header: getHeader('5'),
    cardContentList: contentAreaList,
    cardSize: CardSize.mediumWide,
    x: 0,
    y: 3,
    addCardInfo: {
      addCardPanelBodyText: "Stay Informed of new products, features, and changes as they're announced.",
      addCardPanelHeader: 'Message Center',
      addCardPanelImageUrl: '../../../../public/images/StackedBarChart.svg'
    }
  }
];

const cardsVisibleInAddCardPanel: IDGLCard[] = [
  {
    id: '6',
    cardFrameContent: cardFrameContent,
    header: getHeader('6'),
    cardContentList: contentAreaList,
    cardSize: CardSize.small,
    x: 0,
    y: 0,
    addCardInfo: {
      addCardPanelBodyText:
        'Add and manage users in your organization, help reset their passwords, manage their licenses, ' +
        'and see their latest Azure AD Connect sync.',
      addCardPanelHeader: 'User Management',
      addCardPanelImageUrl: '../../../../public/images/CompoundButtonStack.svg'
    }
  },
  {
    id: '7',
    cardFrameContent: cardFrameContent,
    header: getHeader('7'),
    cardContentList: contentAreaList,
    cardSize: CardSize.small,
    x: 1,
    y: 0,
    addCardInfo: {
      addCardPanelBodyText: 'View and manage your billing balance, subscription status, and payment info.',
      addCardPanelHeader: 'Billing',
      addCardPanelImageUrl: '../../../../public/images/DetailsList.svg'
    }
  },
  {
    id: '8',
    cardFrameContent: cardFrameContent,
    header: getHeader('8'),
    cardContentList: contentAreaList,
    cardSize: CardSize.mediumWide,
    x: 2,
    y: 0,
    addCardInfo: {
      addCardPanelBodyText: 'Get guidance on deploying Microsoft 365 features and services, and get training for you and your end users.',
      addCardPanelHeader: 'Training and guides',
      addCardPanelImageUrl: '../../../../public/images/Donut.svg'
    }
  },
  {
    id: '9',
    cardFrameContent: cardFrameContent,
    header: getHeader('9'),
    cardContentList: contentAreaList,
    cardSize: CardSize.mediumTall,
    x: 0,
    y: 1,
    addCardInfo: {
      addCardPanelBodyText: 'Install or deploy Office 365 ProPlus software and see how many licensed users have activated it.',
      addCardPanelHeader: 'Office 365 software',
      addCardPanelImageUrl: '../../../../public/images/LineChart.svg'
    }
  },
  {
    id: '10',
    cardFrameContent: cardFrameContent,
    header: getHeader('10'),
    cardContentList: contentAreaList,
    cardSize: CardSize.small,
    x: 0,
    y: 2,
    addCardInfo: {
      addCardPanelBodyText: "Stay Informed of new products, features, and changes as they're announced.",
      addCardPanelHeader: 'Message Center',
      addCardPanelImageUrl: '../../../../public/images/StackedBarChart.svg'
    }
  },
  {
    id: '11',
    cardFrameContent: cardFrameContent,
    header: getHeader('11'),
    cardContentList: contentAreaList,
    cardSize: CardSize.mediumWide,
    x: 0,
    y: 2,
    addCardInfo: {
      addCardPanelBodyText: "Stay Informed of new products, features, and changes as they're announced.",
      addCardPanelHeader: 'Message Center',
      addCardPanelImageUrl: '../../../../public/images/ThumbnailList.svg'
    }
  }
];

export interface IDGLWithAddCardPanelState {
  isOpen: boolean;
}

export class DGLWithAddCardPanelExample extends React.Component<{}, IDGLWithAddCardPanelState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  public render(): JSX.Element {
    return (
      <>
        <button onClick={this._openAddCardPanel}>Add Card</button>
        <DashboardGridLayoutWithAddCardPanel
          cardsVisibleInAddCardPanel={cardsVisibleInAddCardPanel}
          cardsVisibleInLayout={cardsVisibleInLayout}
          isOpen={this.state.isOpen}
          sectionTitle={'First section'}
          panelHeader={'Drag cards to your home page'}
          onLayoutChange={this._onLayoutChange}
        />
      </>
    );
  }

  private _openAddCardPanel = () => {
    this.setState({ isOpen: true });
  };

  private _onLayoutChange(newLayout: DashboardGridBreakpointLayouts): void {
    console.log('The new layout is: ', newLayout);
  }
}
