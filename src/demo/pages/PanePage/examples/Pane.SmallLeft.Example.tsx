import * as React from 'react';
import {
  Button,
  Pane,
  PaneContent,
  PaneType,
  WrappedContent
} from '../../../../index';

export class PaneSmallLeftExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPane: false
    };
  }

  public render() {
    return (
      <div>
        <Pane
          isOpen={ this.state.showPane }
          type={ PaneType.smallFixedNear }
          onDismiss= { this._closePane.bind(this) }
          headerText='Pane - Small, left-aligned, fixed'
          >
          <WrappedContent className='myContent'>
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
          </WrappedContent>
          <PaneContent className='ms-font-m'>
            Pane content goes here.
          </PaneContent>
        </Pane>
        <Button description='Opens the Sample Pane' onClick={ this._showPane.bind(this) }>Open Pane</Button>
      </div>
    );
  }

  private _showPane() {
    this.setState({ showPane: true });
  }
  private _closePane() {
    this.setState({ showPane: false });
  }
}
