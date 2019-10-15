import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelHandleDismissTargetExampleState {
  showPanel: boolean;
}
export class PanelHandleDismissTargetExample extends React.Component<{}, IPanelHandleDismissTargetExampleState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel
          headerText="Panel - Handle close button clicks or light dismissal"
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedNear}
          isFooterAtBottom={true}
          onDismiss={this._onDismiss}
          onRenderFooterContent={this._onRenderFooterContent}
          isLightDismiss={true}
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _onRenderFooterContent = () => {
    return (
      <div>
        <DefaultButton onClick={this._hidePanel}>Dismiss</DefaultButton>
      </div>
    );
  };

  private _showPanel = (): void => {
    this.setState({ showPanel: true });
  };

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };

  private _onDismiss = (ev?: React.SyntheticEvent<HTMLElement>) => {
    if (!ev) {
      console.log('Panel dismissed.');
      return;
    }

    console.log('Close button clicked or light dismissed.');
    if (ev.nativeEvent.srcElement && ev.nativeEvent.srcElement.className.indexOf('ms-Button-icon') !== -1) {
      console.log('Close button clicked.');
    }
    if (ev.nativeEvent.srcElement && ev.nativeEvent.srcElement.className.indexOf('ms-Overlay') !== -1) {
      console.log('Light dismissed.');
    }
  };
}
