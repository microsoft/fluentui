import * as React from 'react';
import './CalloutExample.scss';
import {
  Callout,
  Button
} from '../../../../components/index';

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
          title='All of your favorite people'
          subText='Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.'
        />
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
