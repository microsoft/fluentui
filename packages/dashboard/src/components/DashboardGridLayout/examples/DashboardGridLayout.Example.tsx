import * as React from 'react';
import { DashboardGridLayout } from '../DashboardGridLayout';
import { Layout, Layouts } from 'react-grid-layout-fabric';
import { CardSize, DashboardGridBreakpointLayouts } from '@uifabric/dashboard';
import * as exampleStyles from './DashboardGridLayout.Example.scss';

export class DashboardGridLayoutExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <DashboardGridLayout isDraggable={true} layout={this._generateLayout()} onLayoutChange={this._onLayoutChange}>
        <div key="0" className={exampleStyles.card}>
          <div>Card 1</div>
        </div>
        <div key="1" className={exampleStyles.card}>
          <div>Card 2</div>
        </div>
        <div key="2" className={exampleStyles.card}>
          <div>Card 3</div>
        </div>
      </DashboardGridLayout>
    );
  }

  private _onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts): void => {
    // save allLayouts to your storage in the type of DashboardGridBreakpointLayouts
  };

  private _generateLayout(): DashboardGridBreakpointLayouts {
    return {
      lg: [
        { i: '0', y: 0, x: 0, size: CardSize.small },
        { i: '1', y: 0, x: 1, size: CardSize.mediumTall },
        { i: '2', y: 1, x: 0, size: CardSize.small }
      ]
    };
  }
}
