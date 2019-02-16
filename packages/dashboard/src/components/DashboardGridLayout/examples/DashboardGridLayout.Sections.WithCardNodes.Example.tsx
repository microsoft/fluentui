import * as React from 'react';
import {
  CardSize,
  DashboardSectionMapping,
  DashboardGridBreakpointLayouts,
  DashboardGridSectionLayout,
  ISection
} from '@uifabric/dashboard';
import { Layout, Layouts } from 'react-grid-layout-fabric';

export interface IDashboardGridLayoutSectionsWithCardNodesState {
  sectionMapping: DashboardSectionMapping;
}

export class DashboardGridLayoutSectionsWithCardNodesExample extends React.Component<{}, IDashboardGridLayoutSectionsWithCardNodesState> {
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
        cardNodes={this._getCardNodes()}
        onSectionChange={this._onSectionChange}
      />
    );
  }

  private _getCardNodes(): JSX.Element[] {
    const result: JSX.Element[] = [];
    result.push(
      <div key="0">
        <div>Card 0</div>
      </div>
    );
    result.push(
      <div key="1">
        <div>Card 1</div>
      </div>
    );
    result.push(
      <div key="2">
        <div>Card 2</div>
      </div>
    );
    result.push(
      <div key="3">
        <div>Card 3</div>
      </div>
    );
    result.push(
      <div key="4">
        <div>Card 4</div>
      </div>
    );

    return result;
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

  private _onSectionChange = (currentLayout: Layout[], allLayouts: Layouts, sectionMapping: DashboardSectionMapping): void => {
    console.log('withCardNodes-currentLayout', currentLayout);
    console.log('withCardNodes-sectionMapping', sectionMapping);
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
        { i: '1', y: 1, x: 1, size: CardSize.small },
        { i: '2', y: 10, x: 0, size: CardSize.mediumWide },
        { i: '3', y: 13, x: 0, size: CardSize.mediumWide },
        { i: '4', y: 13, x: 6, size: CardSize.large },
        { i: 'section2', y: 9, x: 0, size: CardSize.section },
        { i: 'section3', y: 12, x: 0, size: CardSize.section },
        { i: 'section1', y: 0, x: 0, size: CardSize.section }
      ]
    };
  }
}
