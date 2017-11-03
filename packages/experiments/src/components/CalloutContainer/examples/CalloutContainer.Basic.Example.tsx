import * as React from 'react';
import { CalloutContainer } from '../CalloutContainer';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface ICalloutContainerBasicExampleState {
  isContextualSurfaceVisible?: boolean;
}

export class CalloutContainerBasicExample extends React.Component<{}, ICalloutContainerBasicExampleState> {
  public constructor() {
    super();

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);

    this.state = {
      isContextualSurfaceVisible: false
    }
  }
  public render(): JSX.Element {
    let { isContextualSurfaceVisible } = this.state;
    return (
      <div>
        <div className='ms-CalloutContainerBasicExample-buttonArea'>
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isContextualSurfaceVisible ? 'Hide callout' : 'Show callout' }
            className={ 'ms-CalloutContainer-basicExampleButton' }
          />
        </div>
        { isContextualSurfaceVisible && (
          <CalloutContainer
            className='ms-CalloutContainer'
            role={ 'alertdialog' }
            target={ '.ms-CalloutContainer-basicExampleButton' }
            onDismiss={ this._onCalloutDismiss }
            setInitialFocus={ true }
          >
            Ayyy test content
          </CalloutContainer>
        ) }
      </div>
    );
  }
  private _onShowMenuClicked() {
    this.setState({
      isContextualSurfaceVisible: !this.state.isContextualSurfaceVisible
    });
  }

  private _onCalloutDismiss() {
    this.setState({
      isContextualSurfaceVisible: false
    });
  }
}