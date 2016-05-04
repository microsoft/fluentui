import * as React from 'react';
import {
  Button,
  Overlay
} from '../../../../components/index';

import './Overlay.Basic.Example.scss';

export default class OverlayBasicExample extends React.Component<any, any> {
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
        <Button onClick={ this._onClick }>Show the overlay</Button>
        { isOverlayVisible && (
        <Overlay onClick={ this._onClick }>
          <div className='ms-OverlayBasicExample'>
            <p>I am content within the overlay.</p>
          </div>
        </Overlay>
        )}
      </div>
    );
  }

  public _onClick() {
    this.setState({
      isOverlayVisible: !this.state.isOverlayVisible
    });
  }
}
