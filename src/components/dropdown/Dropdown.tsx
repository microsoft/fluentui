import * as React from 'react';

export interface ILinkProps {
}

export default class Link extends React.Component<ILinkProps, any> {
  render() {
    let rootClass = 'ms-Link';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}