import * as React from 'react';
import { Button, PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelSmallRightExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPanel: false
    };
  }

  public render() {
    return (
      <div>
        <Button description='Opens the Sample Panel' onClick={ this._showPanel.bind(this) }>Open Panel</Button>
        <Panel
          isOpen={ this.state.showPanel }
          type={ PanelType.smallFixedFar }
          onDismiss={ this._closePanel.bind(this) }
          headerText='Panel - Small, right-aligned, fixed, with footer'
          onRenderFooterContent={ () => {
            return (
              <div>
                <PrimaryButton
                  onClick={ this._closePanel.bind(this) }
                  style={ { 'marginRight': '8px' } } >
                  Save
                </PrimaryButton>
                <DefaultButton
                  onClick={ this._closePanel.bind(this) }
                >
                  Cancel
                </DefaultButton>
              </div>
            );
          } }
        >
          <ChoiceGroup
            options={ [
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                checked: true
              },
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              },
              {
                key: 'D',
                text: 'Option D',
                checked: true,
                disabled: true
              }
            ] }
            label='Pick one'
            required={ true }
          />
        </Panel>
      </div>
    );
  }

  private _showPanel() {
    this.setState({ showPanel: true });
  }
  private _closePanel() {
    this.setState({ showPanel: false });
  }
}
