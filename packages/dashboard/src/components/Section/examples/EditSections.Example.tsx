import * as React from 'react';
import { Layout, Layouts } from 'react-grid-layout';
import { EditSections } from '../EditSections';
import { Section } from '../Section';
import { CardSize, DashboardGridBreakpointLayouts } from '@uifabric/dashboard';

export interface IEditSectionsExampleState {
  saveButtonDisabled: boolean;
}

export class EditSectionsExample extends React.Component<{}, IEditSectionsExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      saveButtonDisabled: true
    };
  }

  public render(): JSX.Element {
    return (
      <EditSections
        layout={this._generateLayout()}
        onLayoutChange={this._onLayoutChange}
        saveButtonDisabled={this.state.saveButtonDisabled}
        onAddSection={this._onAddSection}
      >
        <div key="0">
          <Section key="0" id="0" title="Basics" removeTitle="" isEditMode={true} />
        </div>
        <div key="1">
          <Section key="1" id="1" title="Devices and updates" removeTitle="" isEditMode={true} />
        </div>
        <div key="2">
          <Section key="2" id="2" title="Telemetry" removeTitle="" isEditMode={true} />
        </div>
      </EditSections>
    );
  }

  private _onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts): void => {
    // this.setState({
    //   ...this.state,
    //   saveButtonDisabled: false
    // });
    console.log('EditSection', currentLayout);
  };

  private _onAddSection = (): void => {
    // add a new section
  };

  private _generateLayout(): DashboardGridBreakpointLayouts {
    return {
      lg: [
        { i: '0', y: 0, x: 0, size: CardSize.section },
        { i: '1', y: 1, x: 0, size: CardSize.section },
        { i: '2', y: 2, x: 0, size: CardSize.section }
      ]
    };
  }
}
