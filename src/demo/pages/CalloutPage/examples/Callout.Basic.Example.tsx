import * as React from 'react';
import './CalloutExample.scss';
import {
  Callout,
  Button,
  Link
} from '../../../../index';

export interface ICalloutBaiscExampleState {
  isCalloutVisible?: boolean;
}

export class CalloutBasicExample extends React.Component<any, ICalloutBaiscExampleState> {
  private _menuButtonElement: HTMLElement;

  public constructor() {
    super();

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);

    this.state = {
      isCalloutVisible: false
    };
  }

  public render() {
    let { isCalloutVisible } = this.state;

    return (
      <div className='ms-CalloutExample'>
        <div className='ms-CalloutBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onShowMenuClicked } >{ isCalloutVisible ? 'Hide callout' : 'Show callout' }</Button>
        </div>
        { isCalloutVisible && (
          <Callout
            className='ms-CalloutExample-callout'
            gapSpace={ 20 }
            targetElement={ this._menuButtonElement }
            onDismiss={ this._onCalloutDismiss }
            setInitialFocus={ true }
            >
            <div className='ms-Callout-header'>
              <p className='ms-Callout-title'>
                All of your favorite people
              </p>
            </div>
            <div className='ms-Callout-inner'>
              <div className='ms-Callout-content'>
                <p className='ms-Callout-subText'>
                  Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                </p>
              </div>
              <div className='ms-Callout-actions'>
                <Link className='ms-Callout-link' href='http://microsoft.com'>Go to microsoft</Link>
              </div>
            </div>
          </Callout>
        ) }
      </div>
    );
  }

  private _onShowMenuClicked() {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  private _onCalloutDismiss() {
    this.setState({
      isCalloutVisible: false
    });
  }
}
