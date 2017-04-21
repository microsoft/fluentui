import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';

import './Overlay.Example.scss';

export class OverlayDarkExample extends React.Component<any, any> {
  constructor() {
    super();

    this.state = { isOverlayVisible: false };
  }

  public render() {
    let { isOverlayVisible } = this.state;

    return (
      <div>
        <DefaultButton
          onClick={ () => this.setState({ isOverlayVisible: !isOverlayVisible }) }
          text='Show the overlay'
        />
        { isOverlayVisible && (
          <Overlay
            isDarkThemed={ true }
            onClick={ () => this.setState({ isOverlayVisible: false }) }>
            <div className='OverlayExample-content'>
              <p>I am content within the overlay.</p>
            </div>
          </Overlay>
        ) }
      </div>
    );
  }
}
