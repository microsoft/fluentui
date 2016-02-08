import * as React from 'react';

export interface IButtonProps {
  isPrimary?: boolean;
  children?: any;
}

export default class Button extends React.Component<IButtonProps, any> {
  render() {
    let { isPrimary, children } = this.props;
    let rootClass = 'ms-Button' + (isPrimary ? ' ms-Button--primary' : '');

    return (
      <button className={ rootClass }>

        <span className="ms-Button-icon"><i className="ms-Icon ms-Icon--plus"></i></span>
        <span className="ms-Button-label">{ children }</span>
        <span className="ms-Button-description"></span>
      </button>
    );
  }
}