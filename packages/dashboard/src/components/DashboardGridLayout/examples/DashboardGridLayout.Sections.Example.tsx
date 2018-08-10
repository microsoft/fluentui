import * as React from 'react';
import {
  CardContentType,
  CardSize,
  ChartType,
  DashboardSectionMapping,
  DashboardGridBreakpointLayouts,
  DashboardGridSectionLayout,
  ICard,
  ICardContentDetails,
  IAction,
  ISection,
  IThumbnailItemProps,
  Priority
} from '@uifabric/dashboard';

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
  }
];

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

const largeContentAreaList: ICardContentDetails[] = [
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

const mediumTallContentAreaList: ICardContentDetails[] = [
  {
    priority: Priority.Priority1,
    cardContentType: CardContentType.Chart,
    content: {
      chartLabel: 'My first chart!',
      chartType: ChartType.VerticalBarChart,
      dataPoints: datapoints,
      colors: ['green', 'yellow']
    }
  }
];

const header = {
  headerText: 'Header Text ',
  annotationText: 'Annotation Text '
};

export interface IDashboardGridLayoutSectionsExampleState {
  sectionMapping: DashboardSectionMapping;
  layouts: DashboardGridBreakpointLayouts;
}

export class DashboardGridLayoutSectionsExample extends React.Component<{}, IDashboardGridLayoutSectionsExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sectionMapping: {
        section1: ['0', '1'],
        section2: ['2'],
        section3: ['3', '4']
      },
      layouts: this._getLayout()
    };
  }

  public render(): JSX.Element {
    return (
      <DashboardGridSectionLayout
        isDraggable={true}
        layout={this._getLayout()}
        sections={this._sections()}
        cards={this._cards()}
        onSectionChange={this._onSectionChange}
      />
    );
  }

  private _sections(): ISection[] {
    const keys = ['section1', 'section2', 'section3'];
    return [
      {
        key: keys[0],
        id: keys[0],
        title: 'This is the first section',
        keysOfCard: this.state.sectionMapping[keys[0]]
      },
      {
        key: keys[1],
        id: keys[1],
        title: 'This is the second section',
        keysOfCard: this.state.sectionMapping[keys[1]]
      },
      {
        key: keys[2],
        id: keys[2],
        title: 'This is the third section',
        keysOfCard: this.state.sectionMapping[keys[2]]
      }
    ];
  }

  private _cards(): ICard[] {
    return [
      {
        key: '0',
        cardFrameContent: cardFrameContent,
        header: header,
        cardContentList: contentAreaList,
        cardSize: CardSize.small
      },
      {
        key: '1',
        cardFrameContent: cardFrameContent,
        header: header,
        cardContentList: mediumTallContentAreaList,
        cardSize: CardSize.mediumTall,
        actions: actions
      },
      {
        key: '2',
        cardFrameContent: cardFrameContent,
        header: header,
        cardContentList: contentAreaList,
        cardSize: CardSize.small
      },
      {
        key: '3',
        cardFrameContent: cardFrameContent,
        header: header,
        cardContentList: contentAreaList,
        cardSize: CardSize.mediumWide,
        actions: actions
      },
      {
        key: '4',
        cardFrameContent: cardFrameContent,
        header: header,
        cardContentList: largeContentAreaList,
        cardSize: CardSize.large,
        actions: actions
      }
    ];
  }

  private _onSectionChange = (newMapping: DashboardSectionMapping): void => {
    this.setState({
      ...this.state,
      sectionMapping: newMapping
    });
  };

  private _getLayout(): DashboardGridBreakpointLayouts {
    return {
      lg: [
        { i: 'section1', y: 0, x: 0, size: CardSize.section },
        { i: '0', y: 1, x: 0, size: CardSize.small },
        { i: '1', y: 1, x: 1, size: CardSize.mediumTall },
        { i: 'section2', y: 9, x: 0, size: CardSize.section },
        { i: '2', y: 10, x: 0, size: CardSize.mediumWide },
        { i: 'section3', y: 12, x: 0, size: CardSize.section },
        { i: '3', y: 13, x: 0, size: CardSize.mediumWide },
        { i: '4', y: 13, x: 6, size: CardSize.large }
      ]
    };
  }
}
