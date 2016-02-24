import * as React from 'react';

export interface IOverlayProps {
}

export default class Overlay extends React.Component<IOverlayProps, any> {
  render() {
    let rootClass = 'ms-Overlay';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}