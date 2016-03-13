import * as React from 'react';

export interface IPanelProps {
}

export default class Panel extends React.Component<IPanelProps, any> {
  public render() {
    let rootClass = 'ms-Panel';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}
