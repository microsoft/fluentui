import * as React from 'react';

export interface ISpinnerProps {
}

export default class Spinner extends React.Component<ISpinnerProps, any> {
  render() {
    let rootClass = 'ms-Spinner';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}