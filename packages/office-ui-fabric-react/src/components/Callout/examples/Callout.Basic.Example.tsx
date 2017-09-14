import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { Link } from 'office-ui-fabric-react/lib/Link';
import './CalloutExample.scss';

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
        <div className='ms-CalloutBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton! }>
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isCalloutVisible ? 'Hide callout' : 'Show callout' }
          />
        </div>
        { isCalloutVisible && (
          <Callout
            className='ms-CalloutExample-callout'
            ariaLabelledBy={ 'callout-label-1' }
            ariaDescribedBy={ 'callout-description-1' }
            role={ 'alertdialog' }
            gapSpace={ 0 }
            targetElement={ this._menuButtonElement }
            onDismiss={ this._onCalloutDismiss }
            setInitialFocus={ true }
          >
            <div className='ms-CalloutExample-header'>
              <p className='ms-CalloutExample-title' id={ 'callout-label-1' }>
                All of your favorite people
              </p>
            </div>
            <div className='ms-CalloutExample-inner'>
              <div className='ms-CalloutExample-content'>
                <p className='ms-CalloutExample-subText' id={ 'callout-description-1' }>
                  Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                </p>
              </div>
              <div className='ms-CalloutExample-actions'>
                <Link className='ms-CalloutExample-link' href='http://microsoft.com'>Go to microsoft</Link>
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
