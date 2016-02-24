import * as React from 'react';

export interface IProgressIndicatorProps {
}

export default class ProgressIndicator extends React.Component<IProgressIndicatorProps, any> {
  render() {
    let rootClass = 'ms-ProgressIndicator';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}