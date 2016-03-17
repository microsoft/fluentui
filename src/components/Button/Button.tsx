import * as React from 'react';
import './Button.scss';

export enum ButtonType {
  normal,
  primary,
  hero,
  compound,
  command
}

export interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  buttonType?: ButtonType;
  icon?: string;
  description?: string;
  onClick?: (ev?: any) => void;
}

export default class Button extends React.Component<IButtonProps, any> {
  public static defaultProps: IButtonProps = {
    buttonType: ButtonType.normal
  };

  public render() {
    let { buttonType, children, icon, description, onClick } = this.props;
    let rootClass = 'ms-Button'
      + (buttonType === ButtonType.primary ? ' ms-Button--primary' : '')
      + (buttonType === ButtonType.hero ? ' ms-Button--hero' : '')
      + (buttonType === ButtonType.compound ? ' ms-Button--compound' : '')
      + (buttonType === ButtonType.command ? ' ms-Button--command' : '');

    const iconSpan = icon && (buttonType === ButtonType.command || buttonType === ButtonType.hero)
      ? <span className='ms-Button-icon'><i className={`ms-Icon ms-Icon--${icon}`}></i></span>
      : null;

    let descriptionSpan;
    if (ButtonType.compound) {
      descriptionSpan = <span className='ms-Button-description'>{ description }</span>;
    }

    return (
      <button {...this.props} className={ rootClass } onClick={ onClick }>
        { iconSpan }
        <span className='ms-Button-label'>{ children }</span>
        { descriptionSpan }
      </button>
    );
  }

}
