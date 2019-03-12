import * as React from 'react';
import {
  CardContentType,
  CardSize,
  ChartType,
  DashboardSectionMapping,
  DashboardGridBreakpointLayouts,
  DashboardGridSectionLayout,
  IAction,
  ICard,
  ICardContentDetails,
  ISection,
  IThumbnailItemProps,
  Priority
} from '@uifabric/dashboard';
import { Layout, Layouts } from 'react-grid-layout-fabric';
import { ILegendDataItem } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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

const colors: ILegendDataItem[] = [
  { legendText: 'first', legendColor: DefaultPalette.yellow },
  { legendText: 'second', legendColor: DefaultPalette.blue },
  { legendText: 'third', legendColor: DefaultPalette.red }
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
      chartLabels: ['My first chart!'],
      chartType: ChartType.VerticalBarChart,
      dataPoints: datapoints,
      legendColors: colors
    }
  }
];

const mediumTallContentAreaList: ICardContentDetails[] = [
  {
    priority: Priority.Priority1,
    cardContentType: CardContentType.Chart,
    content: {
      chartLabels: ['My first chart!'],
      chartType: ChartType.VerticalBarChart,
      dataPoints: datapoints,
      legendColors: colors
    }
  }
];

const getHeader = (name: string) => {
  return {
    headerText: 'Card ' + name,
    annotationText: 'Annotation Text '
  };
};

export interface IDashboardGridLayoutSectionsNoncollapsibleExampleState {
  sectionMapping: DashboardSectionMapping;
}

export class DashboardGridLayoutSectionsNoncollapsibleExample extends React.Component<
  {},
  IDashboardGridLayoutSectionsNoncollapsibleExampleState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sectionMapping: {
        section1: ['0', '1'],
        section2: ['2'],
        section3: ['3', '4']
      }
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
    const ids = ['section1', 'section2', 'section3'];
    return [
      {
        id: ids[0],
        title: 'This is the first section',
        cardIds: this.state.sectionMapping[ids[0]]
      },
      {
        id: ids[1],
        title: 'This is the second section',
        cardIds: this.state.sectionMapping[ids[1]]
      },
      {
        id: ids[2],
        title: 'This is the third section',
        cardIds: this.state.sectionMapping[ids[2]]
      }
    ];
  }

  private _cards(): ICard[] {
    return [
      {
        id: '0',
        cardFrameContent: cardFrameContent,
        header: getHeader('0'),
        cardContentList: contentAreaList,
        cardSize: CardSize.small
      },
      {
        id: '1',
        cardFrameContent: cardFrameContent,
        header: getHeader('1'),
        cardContentList: mediumTallContentAreaList,
        cardSize: CardSize.mediumTall,
        actions: actions
      },
      {
        id: '2',
        cardFrameContent: cardFrameContent,
        header: getHeader('2'),
        cardContentList: contentAreaList,
        cardSize: CardSize.small
      },
      {
        id: '3',
        cardFrameContent: cardFrameContent,
        header: getHeader('3'),
        cardContentList: contentAreaList,
        cardSize: CardSize.mediumWide,
        actions: actions
      },
      {
        id: '4',
        cardFrameContent: cardFrameContent,
        header: getHeader('4'),
        cardContentList: largeContentAreaList,
        cardSize: CardSize.large,
        actions: actions
      }
    ];
  }

  private _onSectionChange = (currentLayout: Layout[], allLayouts: Layouts, sectionMapping: DashboardSectionMapping): void => {
    console.log('nonCollapse-currentLayout', currentLayout);
    console.log('nonCollapse-sectionMapping', sectionMapping);
    this.setState({
      ...this.state,
      sectionMapping: sectionMapping
    });
    // For storing the information to local storage:
    // - this.state.sectionMapping, save to storage.
    // - transform allLayouts (for all breakpoints) to type of DashboardGridBreakpointLayouts and save to storage.
  };

  private _getLayout(): DashboardGridBreakpointLayouts {
    return {
      lg: [
        { i: '0', y: 1, x: 0, size: CardSize.small },
        { i: '1', y: 1, x: 1, size: CardSize.mediumTall },
        { i: '2', y: 10, x: 0, size: CardSize.mediumWide },
        { i: '3', y: 13, x: 0, size: CardSize.mediumWide },
        { i: '4', y: 13, x: 6, size: CardSize.large },
        { i: 'section1', y: 0, x: 0, size: CardSize.section },
        { i: 'section2', y: 9, x: 0, size: CardSize.section },
        { i: 'section3', y: 12, x: 0, size: CardSize.section }
      ]
    };
  }
}
