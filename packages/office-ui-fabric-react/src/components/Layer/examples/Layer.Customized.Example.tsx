import * as React from 'react';
import { Customizer } from '@uifabric/utilities';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';

export interface ILayerCustomizedExampleState {
  showPanel: boolean;
  trapPanel: boolean;
}

export class LayerCustomizedExample extends React.Component<{}, ILayerCustomizedExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showPanel: false,
      trapPanel: false
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <p>
          A <code>Panel</code> is rendered, trapped in a specified container. Use 'Show panel' to show/hide the panel (or click the X to
          dismiss it). Use 'Trap panel' to release the panel from its bounds.
        </p>
        <Checkbox label="Show panel" checked={this.state.showPanel} onChange={this._onShowPanelChange} />
        <Checkbox label="Trap panel" checked={this.state.trapPanel} onChange={this._onTrapPanelChange} />
        <Customizer
          scopedSettings={
            this.state.trapPanel
              ? {
                  Layer: {
                    hostId: 'test'
                  }
                }
              : {}
          }
        >
          {this.state.showPanel ? (
            <Panel
              isOpen={true}
              hasCloseButton={true}
              headerText="Test"
              focusTrapZoneProps={{
                isClickableOutsideFocusTrap: true,
                forceFocusInsideTrap: false
              }}
              onDismissed={this._onDismissPanel}
            />
          ) : (
            <div />
          )}
        </Customizer>
        <LayerHost
          id="test"
          style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
            border: '1px solid #ccc'
          }}
        />
      </div>
    );
  }

  private _onDismissPanel = (): void => {
    this.setState({
      showPanel: false
    });
  };

  private _onShowPanelChange = (event: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean): void => {
    this.setState({
      showPanel: !!checked
    });
  };

  private _onTrapPanelChange = (event: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean): void => {
    this.setState({
      trapPanel: !!checked
    });
  };
}
