import * as React from 'react';
import { DefaultButton, PositioningContainer } from 'office-ui-fabric-react';

export interface IPositioningContainerBasicExampleState {
  isPositioningContainerVisible?: boolean;
}

export class PositioningContainerBasicExample extends React.Component<{}, IPositioningContainerBasicExampleState> {
  constructor(props: {}) {
    super(props);

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onDismiss = this._onDismiss.bind(this);

    this.state = {
      isPositioningContainerVisible: false
    };
  }

  public render(): JSX.Element {
    const { isPositioningContainerVisible } = this.state;
    return (
      <div>
        <div className="ms-PositioningContainerBasicExample-buttonArea">
          <DefaultButton
            onClick={this._onShowMenuClicked}
            text={isPositioningContainerVisible ? 'Hide Positioning Container' : 'Show Positioning Container'}
            className={'ms-PositioningContainer-basicExampleButton'}
          />
        </div>
        {isPositioningContainerVisible && (
          <PositioningContainer
            className="ms-PositioningContainer"
            role={'alertdialog'}
            target={'.ms-PositioningContainer-basicExampleButton'}
            onDismiss={this._onDismiss}
            setInitialFocus={true}
          >
            <h1>An H1 element</h1>
          </PositioningContainer>
        )}
      </div>
    );
  }

  private _onShowMenuClicked(): void {
    this.setState({
      isPositioningContainerVisible: !this.state.isPositioningContainerVisible
    });
  }

  private _onDismiss(): void {
    this.setState({
      isPositioningContainerVisible: false
    });
  }
}
