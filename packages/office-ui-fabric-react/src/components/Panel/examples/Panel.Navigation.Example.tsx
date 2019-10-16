import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export class PanelNavigationExample extends React.Component<
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
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._onShowPanel} text="Open Panel" />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._onClosePanel}
          isFooterAtBottom={true}
          headerText="Panel with custom navigation content"
          closeButtonAriaLabel="Close"
          onRenderNavigationContent={this._onRenderNavigationContent}
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _onClosePanel = () => {
    this.setState({ showPanel: false });
  };

  private _onRenderNavigationContent: IRenderFunction<IPanelProps> = (
    props?: IPanelProps,
    defaultRender?: IRenderFunction<IPanelProps>
  ): JSX.Element => {
    return (
      <React.Fragment>
        <SearchBox
          placeholder="Search here..."
          styles={{
            root: {
              margin: '5px',
              height: 'auto',
              width: '100%'
            }
          }}
        />
        {defaultRender!(props)}
      </React.Fragment>
    );
  };

  private _onShowPanel = () => {
    this.setState({ showPanel: true });
  };
}
