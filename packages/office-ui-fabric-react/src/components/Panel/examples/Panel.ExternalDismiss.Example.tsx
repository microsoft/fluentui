import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import './PanelExample.scss';

export class PanelExternalDismissExample extends React.Component<
  {},
  {
    showPanel: boolean;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = { showPanel: false };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton text="Open panel" onClick={this._showPanel} />
        <Panel
          className={ 'ms-PanelExample-offset' }
          isOpen={this.state.showPanel}
          isExternalDismiss={true}
          headerText="External Dismiss Panel"
          onDismiss={this._hidePanel}
        >
          <span>External dismiss closes the panel when anywhere outside the panel and overlay is clicked without stopping propagation.</span>
        </Panel>
      </div>
    );
  }

  private _showPanel = (): void => {
    this.setState({ showPanel: true });
  };

  private _hidePanel = (): void => {
    this.setState({ showPanel: false });
  };
}
