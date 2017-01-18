import * as React from 'react';
import {
  BaseComponent,
  css,
  assign,
  getId,
  getNativeProps,
  buttonProperties,
  anchorProperties
} from '../../Utilities';
import { IButtonProps, IButton, ButtonType } from './Button.Props';
import './Button.scss';

export interface IButtonState {
  labelId?: string;
  descriptionId?: string;
  ariaDescriptionId?: string;
}

export class Button extends BaseComponent<IButtonProps, IButtonState> implements IButton {
  public static defaultProps: IButtonProps = {
    buttonType: ButtonType.normal
  };
  private _buttonElement: HTMLButtonElement;

  constructor(props: IButtonProps) {
    super(props, { 'rootProps': null });

    this.state = {
      labelId: getId('Button'),
      descriptionId: getId('Button'),
      ariaDescriptionId: getId('Button')
    };
  }

  public render(): JSX.Element {
    let { buttonType, children, icon, description, ariaLabel, ariaDescription, href, disabled, onClick } = this.props;
    let { labelId, descriptionId, ariaDescriptionId } = this.state;

    const renderAsAnchor: boolean = !!href;
    const tag = renderAsAnchor ? 'a' : 'button';
    const nativeProps = getNativeProps(this.props.rootProps || this.props, renderAsAnchor ? anchorProperties : buttonProperties);
    const className = css((this.props.className), 'ms-Button', {
      'ms-Button--primary': buttonType === ButtonType.primary,
      'ms-Button--hero': buttonType === ButtonType.hero,
      'ms-Button--silhouette': buttonType === ButtonType.silhouette,
      'ms-Button--compound': buttonType === ButtonType.compound,
      'ms-Button--command': buttonType === ButtonType.command,
      'ms-Button--icon': buttonType === ButtonType.icon,
      'disabled': (renderAsAnchor && disabled) // add disable styling if it is an anchor
      // if not utilize default button disabled behavior.
    });

    const iconSpan = icon && (buttonType === ButtonType.command || buttonType === ButtonType.hero || buttonType === ButtonType.silhouette || buttonType === ButtonType.icon)
      ? <span className='ms-Button-icon'><i className={ `ms-Icon ms-Icon--${icon}` }></i></span>
      : null;

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    const descriptionSpan: React.ReactElement<React.HTMLProps<HTMLSpanElement>> = description
      ? <span className='ms-Button-description' id={ descriptionId }>{ description }</span>
      : null;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    const ariaDescriptionSpan: React.ReactElement<React.HTMLProps<HTMLSpanElement>> = ariaDescription
      ? <span className='ms-u-screenReaderOnly' id={ ariaDescriptionId }>{ ariaDescription }</span>
      : null;

    // Check for ariaDescription, description or aria-describedby in the native props to determine source of aria-describedby
    // otherwise default to null.
    let ariaDescribedBy;

    if (ariaDescription) {
      ariaDescribedBy = ariaDescriptionId;
    } else if (description) {
      ariaDescribedBy = descriptionId;
    } else if (nativeProps['aria-describedby']) {
      ariaDescribedBy = nativeProps['aria-describedby'];
    } else {
      ariaDescribedBy = null;
    }

    // Firefox bug 984869 (https://bugzilla.mozilla.org/show_bug.cgi?id=984869) causes the contents of a button to wrap when using flexbox.
    // Until the fix ships (probably in March 2017), wrap the button contents in a div to allow using flexbox.
    // More information: http://stackoverflow.com/questions/30979265/css-flexbox-wraps-content-in-firefox-not-chrome
    const containerDiv = React.createElement(
      'div',
      { className: 'ms-Button-container' },
      iconSpan,
      <span className='ms-Button-label' id={ labelId } >{ children }</span>,
      descriptionSpan,
      ariaDescriptionSpan
    )

    return React.createElement(
      tag,
      assign(
        {},
        nativeProps,
        href ? { href } : null,
        {
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabel ? null : labelId,
          'aria-describedby': ariaDescribedBy,
          'ref': (c: HTMLButtonElement): HTMLButtonElement => this._buttonElement = c
        },
        onClick && { 'onClick': onClick },
        disabled && { 'disabled': disabled },
        { className }),
      containerDiv
    );
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }
}