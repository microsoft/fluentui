import * as React from 'react';
import './Button.scss';
import { css } from '../../utilities/css';
import { assign } from '../../utilities/object';
import { IButtonProps, ButtonType, ElementType } from './Button.Props';

export interface IButtonState {
  labelId?: string;
  descriptionId?: string;
}

let _instance = 0;

export class Button extends React.Component<IButtonProps, IButtonState> {
  public static defaultProps: IButtonProps = {
    elementType: ElementType.button,
    buttonType: ButtonType.normal
  };
  private _buttonElement: HTMLButtonElement;

  constructor(props: IButtonProps) {
    super(props);

    this.state = {
      labelId: `Button-${ _instance++ }`,
      descriptionId: `Button-${ _instance++ }`,
    };
  }

  public render(): JSX.Element {
    let { buttonType, children, icon, description, ariaLabel } = this.props;
    let {labelId, descriptionId } = this.state;

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
    if (buttonType === ButtonType.compound) {
      descriptionSpan = <span className='ms-Button-description' id={ descriptionId }>{ description }</span>;
    }

    return React.createElement(
      tag,
      assign({
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabel ? null : labelId,
        'aria-describedby': buttonType === ButtonType.compound ? descriptionId : null,
        'ref':  (c: HTMLButtonElement): HTMLButtonElement => this._buttonElement = c
        },
        this.props,
        { className }),
      iconSpan,
      <span className='ms-Button-label' id={ labelId } >{ children }</span>,
      descriptionSpan
    );
  }

  public focus(): void {
      if (this._buttonElement) {
          this._buttonElement.focus();
      }
  }
}
