import * as React from 'react';
import { CalloutContainer } from '../CalloutContainer';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface ICalloutContainerBasicExampleState {
  isContextualSurfaceVisible?: boolean;
}

export class CalloutContainerBasicExample extends React.Component<{}, ICalloutContainerBasicExampleState> {
  private _menuButtonElement: HTMLElement | null;
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
        <div className='ms-CalloutContainerBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isContextualSurfaceVisible ? 'Hide callout' : 'Show callout' }
          />
        </div>
        { isContextualSurfaceVisible && (
          <CalloutContainer
            className='ms-CalloutContainer'
            role={ 'alertdialog' }
            target={ this._menuButtonElement }
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