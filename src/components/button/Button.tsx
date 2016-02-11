import * as React from 'react';

export enum ButtonType {
  Default,
  Primary,
  Hero,
  Compound,
  Command
}

export interface IButtonProps {
  children?: any;
  type?: ButtonType;
  description?: string;
}

export default class Button extends React.Component<IButtonProps, any> {

  render() {  
    let { type, children, description } = this.props;
    let rootClass = 'ms-Button'
      + (type === ButtonType.Primary ? ' ms-Button--primary' : '')
      + (type === ButtonType.Hero ? ' ms-Button--hero' : '')
      + (type === ButtonType.Compound ? ' ms-Button--compound' : '')
      + (type === ButtonType.Command ? ' ms-Button--command' : '');

    let iconSpan;
    if (type === ButtonType.Command || type === ButtonType.Hero) {
      iconSpan = <span className="ms-Button-icon"><i className="ms-Icon ms-Icon--plus"></i></span>;
    }   

    let descriptionSpan;
    if (ButtonType.Compound) {
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
