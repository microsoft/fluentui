import * as React from 'react';
import {
  BaseComponent,
  css,
  assign,
  getId,
  getNativeProps,
  buttonProperties,
  anchorProperties
} from '../../../Utilities';
import { IButtonProps, IButton } from './ButtonBase.Props';
import './ButtonBase.scss';

export interface IButtonState {
  labelId?: string;
  descriptionId?: string;
  ariaDescriptionId?: string;
}

export class ButtonBase extends BaseComponent<IButtonProps, IButtonState> implements IButton {
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
    let {  children, ariaLabel, ariaDescription, href, disabled, onClick } = this.props;
    let { labelId, descriptionId, ariaDescriptionId } = this.state;

    const renderAsAnchor: boolean = !!href;
    const tag = renderAsAnchor ? 'a' : 'button';
    const nativeProps = getNativeProps(this.props.rootProps || this.props, renderAsAnchor ? anchorProperties : buttonProperties);
    const className = css((this.props.className), 'ms-Button');

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
    } else if (nativeProps['aria-describedby']) {
      ariaDescribedBy = nativeProps['aria-describedby'];
    } else {
      ariaDescribedBy = null;
    }

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
      children,
      ariaDescriptionSpan
    );
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }
}