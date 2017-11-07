import * as React from 'react';
import { DynamicallyPositionedContainer } from '../DynamicallyPositionedContainer';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IDynamicallyPositionedContainerBasicExampleState {
  isDynamicallyPositionedContainerVisible?: boolean;
}

export class DynamicallyPositionedContainerBasicExample extends React.Component<{}, IDynamicallyPositionedContainerBasicExampleState> {
  public constructor() {
    super();

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);

    this.state = {
      isDynamicallyPositionedContainerVisible: false
    }
  }
  public render(): JSX.Element {
    let { isDynamicallyPositionedContainerVisible } = this.state;
    return (
      <div>
        <div className='ms-DynamicallyPositionedContainerBasicExample-buttonArea'>
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isDynamicallyPositionedContainerVisible ? 'Hide callout' : 'Show callout' }
            className={ 'ms-DynamicallyPositionedContainer-basicExampleButton' }
          />
        </div>
        { isDynamicallyPositionedContainerVisible && (
          <DynamicallyPositionedContainer
            className='ms-DynamicallyPositionedContainer'
            role={ 'alertdialog' }
            target={ '.ms-DynamicallyPositionedContainer-basicExampleButton' }
            onDismiss={ this._onCalloutDismiss }
            setInitialFocus={ true }
          >
            Ayyy test content
          </DynamicallyPositionedContainer>
        ) }
      </div>
    );
  }
  private _onShowMenuClicked() {
    this.setState({
      isDynamicallyPositionedContainerVisible: !this.state.isDynamicallyPositionedContainerVisible
    });
  }

  private _onCalloutDismiss() {
    this.setState({
      isDynamicallyPositionedContainerVisible: false
    });
  }
}