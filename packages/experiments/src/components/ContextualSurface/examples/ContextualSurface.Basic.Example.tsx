import * as React from 'react';
import { ContextualSurface } from '../ContextualSurface';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IContextualSurfaceBasicExampleState {
  isContextualSurfaceVisible?: boolean;
}

export class ContextualSurfaceBasicExample extends React.Component<{}, IContextualSurfaceBasicExampleState> {
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
        <div className='ms-ContextualSurfaceBasicExample-buttonArea'>
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isContextualSurfaceVisible ? 'Hide callout' : 'Show callout' }
            className={ 'ms-ContextualSurface-basicExampleButton' }
          />
        </div>
        { isContextualSurfaceVisible && (
          <ContextualSurface
            className='ms-ContextualSurface'
            role={ 'alertdialog' }
            target={ '.ms-ContextualSurface-basicExampleButton' }
            onDismiss={ this._onCalloutDismiss }
            setInitialFocus={ true }
          >
            Ayyy test content
          </ContextualSurface>
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