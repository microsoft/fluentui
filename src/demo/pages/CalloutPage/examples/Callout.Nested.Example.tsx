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

    this._onDismissCallout = this._onDismissCallout.bind(this);

    this.state = {
      isCalloutVisible: false,
    };
  }

  public render() {
    let { isCalloutVisible } = this.state;

    return (
      <div className='ms-CalloutBasicExample'>
        <div className='ms-CalloutBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onDismissCallout } >{ isCalloutVisible ? 'Hide callout' : 'Show callout' }</Button>
        </div>
        { isCalloutVisible ? (
          <div>
            <Callout
              gapSpace={ 20 }
              targetElement={ this._menuButtonElement }
              onDismiss= { (ev: any) => { this._onDismissCallout(ev); } }
              >
              <div className='ms-CalloutExample-cmdBarHost'>
                <div className='ms-CalloutExample-title'>Callout Title</div>
                <div> some callout content</div>
                <div> some and some more content</div>
                <div> and some more</div>
                <div>
                  <CommandBar
                    items={ this.props.items }
                    />
                </div>
              </div>
            </Callout>
          </div>
        ) : (null) }
      </div>
    );
  }

  private _onDismissCallout(ev: any) {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }
}
