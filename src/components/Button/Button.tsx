import * as React from 'react';
import './Button.scss';

export enum ButtonType {
  normal,
  primary,
  hero,
  compound,
  command
}

export interface IButtonProps {
  children?: any;
  type?: ButtonType;
  icon?: string;
  title?: string;
  description?: string;
  onClick?: (ev?: any) => void;
}

export default class Button extends React.Component<IButtonProps, any> {
  public static defaultProps: IButtonProps = {
    type: ButtonType.normal
  };

  public render() {
    let { type, children, icon, title, description, onClick } = this.props;
    let rootClass = 'ms-Button'
      + (type === ButtonType.primary ? ' ms-Button--primary' : '')
      + (type === ButtonType.hero ? ' ms-Button--hero' : '')
      + (type === ButtonType.compound ? ' ms-Button--compound' : '')
      + (type === ButtonType.command ? ' ms-Button--command' : '');

    const iconSpan = icon && (type === ButtonType.command || type === ButtonType.hero)
      ? <span className="ms-Button-icon"><i className={`ms-Icon ms-Icon--${icon}`}></i></span>
      : null;

    let descriptionSpan;
    if (ButtonType.compound) {
      descriptionSpan = <span className="ms-Button-description">{ description }</span>;
    }

    return (
      <button className={ rootClass } onClick={ onClick } title={ title }>
        { iconSpan }
        <span className="ms-Button-label">{ children }</span>
        { descriptionSpan }
      </button>
    );
  }

}
