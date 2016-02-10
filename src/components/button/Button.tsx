import * as React from 'react';

export interface IButtonProps {
  children?: any;
  type?: string;
  description?: string;
}

export default class Button extends React.Component<IButtonProps, any> {
  render() {
    let { type, children, description } = this.props;
    let rootClass = 'ms-Button' + (type ? ' ms-Button--' + type : '');

    let iconSpan;
    if (type === 'command' || type === 'hero') {
      iconSpan = <span className="ms-Button-icon"><i className="ms-Icon ms-Icon--plus"></i></span>;
    }   

    let descriptionSpan;
    if (type === 'compound') {
      descriptionSpan = <span className="ms-Button-description">{ description }</span>;
    }

    return (
      <button className={ rootClass }>
        { iconSpan }
        <span className="ms-Button-label">{ children }</span>
        { descriptionSpan }
      </button>
    );
  }
}