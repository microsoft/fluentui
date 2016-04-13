import * as React from 'react';
import './Button.scss';
import { css } from '../../utilities/css';
import { assign } from '../../utilities/object';
import { IButtonProps, ButtonType, ElementType } from './Button.Props';

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
      'ms-Button--command': buttonType === ButtonType.command,
      'ms-Button--icon' : buttonType === ButtonType.icon
    });

    const iconSpan = icon && (buttonType === ButtonType.command || buttonType === ButtonType.hero || buttonType === ButtonType.icon)
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
