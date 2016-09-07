import * as React from 'react';
import './CalloutExample.scss';
import {
  Callout,
  Button,
  CommandBar
} from '../../../../index';
import { items } from '../../CommandBarPage/examples/data';

export interface ICalloutBaiscExampleState {
  isCalloutVisible?: boolean;
}

export class CalloutNestedExample extends React.Component<any, ICalloutBaiscExampleState> {
  private _menuButtonElement: HTMLElement;

  public constructor() {
    super();

    this._onDismiss = this._onDismiss.bind(this);

    this.state = {
      isCalloutVisible: false,
    };
  }

  public render() {
    let { isCalloutVisible } = this.state;

    return (
      <div className='ms-CalloutExample'>
        <div className='ms-CalloutBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onDismiss } >{ isCalloutVisible ? 'Hide callout' : 'Show callout' }</Button>
        </div>
        { isCalloutVisible ? (
          <div>
            <Callout
              className='ms-CalloutExample-callout'
              gapSpace={ 20 }
              targetElement={ this._menuButtonElement }
              onDismiss={ (ev: any) => { this._onDismiss(ev); } }
              setInitialFocus={ true }
              >
              <div className='ms-Callout-header'>
                <p className='ms-Callout-title'>
                  Callout title here
                </p>
              </div>
              <div className='ms-Callout-inner'>
                <div className='ms-Callout-content'>
                  <p className='ms-Callout-subText'>
                    Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                  </p>
                </div>
              </div>
              <CommandBar items={ this.props.items } />
            </Callout>
          </div>
        ) : (null) }
      </div>
    );
  }

  private _onDismiss(ev: any) {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }
}
