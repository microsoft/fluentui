import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelFooterExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = { showPanel: false };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          description='Opens the Sample Panel'
          onClick={ this._onShowPanel }
          text='Open Panel'
        />
        <Panel
          isOpen={ this.state.showPanel }
          type={ PanelType.smallFixedFar }
          onDismiss={ this._onClosePanel }
          isFooterAtBottom={ true }
          headerText='Panel with footer at bottom'
          closeButtonAriaLabel='Close'
          onRenderFooterContent={ () => {
            return (
              <div>
                <PrimaryButton
                  onClick={ this._onClosePanel }
                  style={ { 'marginRight': '8px' } } >
                  Save
                </PrimaryButton>
                <DefaultButton
                  onClick={ this._onClosePanel }
                >
                  Cancel
                </DefaultButton>
              </div>
            );
          } }
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _onClosePanel = () => {
    this.setState({ showPanel: false });
  }

  private _onShowPanel = () => {
    this.setState({ showPanel: true });
  }
}
