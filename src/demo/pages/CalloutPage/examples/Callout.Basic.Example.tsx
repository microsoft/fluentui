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

export default class CalloutBasicExample extends React.Component<any, ICalloutBaiscExampleState> {
  private _menuButtonElement: HTMLElement;

  public constructor() {
    super();

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);

    this.state = {
      isCalloutVisible: false,
    };
  }

  public render() {
    let { isCalloutVisible } = this.state;

    return (
      <div className='ms-CalloutBasicExample'>
        <div className='ms-CalloutExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onShowMenuClicked } >{ isCalloutVisible ? 'Hide callout' : 'Show callout' }</Button>
        </div>
        { isCalloutVisible ? (
        <Callout
          gapSpace={ 20 }
          targetElement={ this._menuButtonElement }
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
            </div>
            <Link href='http://microsoft.com'>Go to microsoft</Link>
        </Callout>
        ) : (null) }
      </div>
    );
  }

  private _onShowMenuClicked() {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }
}
