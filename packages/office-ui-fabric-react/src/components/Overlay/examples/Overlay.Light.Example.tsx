import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';

import './Overlay.Example.scss';

export class OverlayLightExample extends React.Component<any, any> {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);

    this.state = {
      isOverlayVisible: false
    };
  }

  public render() {
    let { isOverlayVisible } = this.state;

    return (
      <div>
        <DefaultButton onClick={ this._onClick }>Show the overlay</DefaultButton>
        { isOverlayVisible && (
          <Overlay onClick={ this._onClick }>
            <div className='OverlayExample-content'>
              <p>I am content within the overlay.</p>
            </div>
          </Overlay>
        ) }
      </div>
    );
  }

  public _onClick() {
    this.setState({
      isOverlayVisible: !this.state.isOverlayVisible
    });
  }
}
