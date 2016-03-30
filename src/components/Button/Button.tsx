import * as React from 'react';
import './Button.scss';
import { css } from '../../utilities/css';
import { assign } from '../../utilities/object';

export enum ElementType {
  button,
  anchor
}

export enum ButtonType {
  normal,
  primary,
  hero,
  compound,
  command
}

export interface IButtonProps extends React.HTMLProps<HTMLElement> {
elementType?: ElementType;
  buttonType?: ButtonType;
  icon?: string;
  description?: string;
}

export default class Button extends React.Component<IButtonProps, any> {
  public static defaultProps: IButtonProps = {
    elementType: ElementType.button,
    buttonType: ButtonType.normal
  };

  public render() {
    let { buttonType, children, icon, description } = this.props;

    const tag = this.props.elementType === ElementType.button ? 'button' : 'a';

    const className = css(this.props.className, 'ms-Button', {
      'ms-Button--primary': buttonType === ButtonType.primary,
      'ms-Button--hero': buttonType === ButtonType.hero,
      'ms-Button--compound': buttonType === ButtonType.compound,
      'ms-Button--command': buttonType === ButtonType.command
    });

    const iconSpan = icon && (buttonType === ButtonType.command || buttonType === ButtonType.hero)
      ? <span className='ms-Button-icon'><i className={`ms-Icon ms-Icon--${icon}`}></i></span>
      : null;

    let descriptionSpan;
    if (ButtonType.compound) {
      descriptionSpan = <span className='ms-Button-description'>{ description }</span>;
    }

    return React.createElement(
      tag,
      assign({}, this.props, { className }),
      iconSpan,
      <span className='ms-Button-label'>{ children }</span>,
      descriptionSpan
    );
  }

}
