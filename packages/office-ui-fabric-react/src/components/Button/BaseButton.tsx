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
import { IButtonProps, IButton } from './Button.Props';

export class BaseButton extends BaseComponent<IButtonProps, {}> implements IButton {

  /**
   * _baseClassName can be overridden by subclasses to provide a unique class prefix to the class name used for
   * sub parts of the render template.
   */
  protected _baseClassName = 'ms-Button';

  /**
   * _variantClassName can be overridden by subclasses to add an extra default class name to the root element.
   */
  protected _variantClassName = '';

  private _buttonElement: HTMLButtonElement;
  private _labelId: string;
  private _descriptionId: string;
  private _ariaDescriptionId: string;

  constructor(props: IButtonProps, rootClassName: string, deprecationMap: any) {
    super(props, { 'rootProps': null });
    this._labelId = getId();
    this._descriptionId = getId();
    this._ariaDescriptionId = getId();
  }

  public render(): JSX.Element {
    const { className, description, ariaLabel, ariaDescription, href, disabled } = this.props;
    const { _ariaDescriptionId, _labelId, _descriptionId } = this;
    const renderAsAnchor: boolean = !!href;
    const tag = renderAsAnchor ? 'a' : 'button';
    const nativeProps = getNativeProps(this.props.rootProps || this.props, renderAsAnchor ? anchorProperties : buttonProperties);

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    const ariaDescriptionSpan: React.ReactElement<React.HTMLProps<HTMLSpanElement>> = ariaDescription
      ? <span className='ms-u-screenReaderOnly' id={ _ariaDescriptionId }>{ ariaDescription }</span>
      : null;

    // Check for ariaDescription, description or aria-describedby in the native props to determine source of aria-describedby
    // otherwise default to null.
    let ariaDescribedBy;

    if (ariaDescription) {
      ariaDescribedBy = _ariaDescriptionId;
    } else if (description) {
      ariaDescribedBy = _descriptionId;
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
        {
          className: css(
            className,
            this._baseClassName,
            this._variantClassName,
            {
              'disabled': (renderAsAnchor && disabled) // add disable styling if it is an anchor
            }),
          ref: this._resolveRef('_buttonElement'),
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabel ? null : _labelId,
          'aria-describedby': ariaDescribedBy
        }),
      this.onRenderIcon(),
      this.onRenderLabel(),
      this.onRenderDescription(),
      ariaDescriptionSpan,
      this.onRenderChildren(),
    );
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }

  protected onRenderIcon() {
    let { icon } = this.props;

    return icon ? (
      <span className={ `${this._baseClassName}-icon` }>
        <i className={ `ms-Icon ms-Icon--${icon}` } />
      </span>
    ) : (
        null
      );
  }

  protected onRenderChildren() {
    let { label, children } = this.props;

    // If you provide a label, we will render children; otherwise we assume that the label is
    // pulled from children and as such we should avoid redundantly rendering trhe children.
    return label ? children : null;
  }

  protected onRenderLabel() {
    let { children, label } = this.props;

    return [
      <span className={ `${this._baseClassName}-label` } id={ this._labelId } >
        { label ? label : children }
      </span>,
      (label ? children : null)
    ];
  }

  protected onRenderDescription() {
    let { description } = this.props;

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    return description ? (
      <span className={ `${this._baseClassName}-description` } id={ this._descriptionId }>{ description }</span>
    ) : (
        null
      );
  }
}