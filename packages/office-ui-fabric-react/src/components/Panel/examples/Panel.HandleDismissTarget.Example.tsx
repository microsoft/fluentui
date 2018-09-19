import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export class PanelHandleDismissTargetExample extends React.Component<
  {},
  {
    showPanel: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = { showPanel: false };
    this._onClosePanel = this._onClosePanel.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          secondaryText="Opens the Sample Panel"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => this.setState({ showPanel: true })}
          text="Open Panel"
        />
        <Panel
          headerText="Panel - Handle close button clicks or light dismissal"
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedNear}
          isFooterAtBottom={true}
          // tslint:disable-next-line:jsx-no-lambda
          onDismiss={ev => {
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
          }}
          onRenderFooterContent={this._onRenderFooterContent}
          isLightDismiss={true}
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _onRenderFooterContent = (): JSX.Element => {
    return (
      <div>
        <DefaultButton onClick={this._onClosePanel}>Dismiss</DefaultButton>
      </div>
    );
  };

  private _onClosePanel = () => {
    this.setState({ showPanel: false });
  };
}
