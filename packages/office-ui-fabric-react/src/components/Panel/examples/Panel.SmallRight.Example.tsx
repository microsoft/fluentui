import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
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
        <DefaultButton
          description='Opens the Sample Panel'
          onClick={ this._onShowPanel }
          text='Open Panel'
        />
        <Panel
          isOpen={ this.state.showPanel }
          type={ PanelType.smallFixedFar }
          onDismiss={ this._onClosePanel }
          headerText='Panel - Small, right-aligned, fixed, with footer'
          closeButtonAriaLabel='Close'
          onRenderFooterContent={ this._onRenderFooterContent }
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

  @autobind
  private _onClosePanel(): void {
    this.setState({ showPanel: false });
  }

  @autobind
  private _onRenderFooterContent(): JSX.Element {
    return (
      <div>
        <PrimaryButton
          onClick={ this._onClosePanel }
          style={ { 'marginRight': '8px' } }
        >
          Save
        </PrimaryButton>
        <DefaultButton
          onClick={ this._onClosePanel }
        >
          Cancel
        </DefaultButton>
      </div>
    );
  }

  private _onShowPanel = () => {
    this.setState({ showPanel: true });
  }
}
