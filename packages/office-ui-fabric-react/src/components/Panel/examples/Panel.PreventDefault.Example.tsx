import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { KeyCodes } from '@uifabric/utilities';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IPanelPreventDefaultExample {
  showPanel: boolean;
  allowEsc: boolean;
}

export class PanelPreventDefaultExample extends React.Component<{}, IPanelPreventDefaultExample> {
  constructor(props: {}) {
    super(props);
    this.state = { showPanel: false, allowEsc: true };
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
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedNear}
          // tslint:disable-next-line:jsx-no-lambda
          onDismiss={this.onDismiss}
          headerText="Panel"
        >
          <div>Hitting escape inside the text area will not close the Panel</div>
          <textarea onKeyDown={this.onKeyDown} />

          <Toggle checked={this.state.allowEsc} onChange={this.toggleAllowEsc} label="Allow ESC key to close panel" />
        </Panel>
      </div>
    );
  }

  private onKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.keyCode === KeyCodes.escape) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  private toggleAllowEsc = () => {
    this.setState({ allowEsc: !this.state.allowEsc });
  };

  private onDismiss = (ev?: React.KeyboardEvent<HTMLElement>) => {
    if (ev && ev.keyCode === KeyCodes.escape && !this.state.allowEsc) {
      ev.preventDefault();
      return;
    }

    this.setState({ showPanel: false });
  };
}
