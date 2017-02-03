import * as React from 'react';
import {
  BaseComponent,
  autobind,
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
    const nativeProps = getNativeProps(
      this.props.rootProps || this.props,
      renderAsAnchor ? anchorProperties : buttonProperties,
      [
        'disabled' // Let disabled buttons be focused and styled as disabled.
      ]);

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

    let buttonProps = assign(
      nativeProps,
      {
        className: css(
          className,
          this._baseClassName,
          this._variantClassName,
          { 'is-disabled': disabled },
          { 'is-enabled': !disabled }
        ),
        ref: this._resolveRef('_buttonElement'),
        onClick: this._onClick,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabel ? null : _labelId,
        'aria-describedby': ariaDescribedBy
      }
    );

    return this.onRenderContent(tag, buttonProps);
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }

  protected onRenderContent(tag, buttonProps): JSX.Element {
    return React.createElement(
      tag,
      buttonProps,
      this.onRenderIcon(),
      this.onRenderLabel(),
      this.onRenderDescription(),
      this.onRenderAriaDescription(),
      this.onRenderChildren()
    );
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

  protected onRenderLabel() {
    let { children, label } = this.props;

    // For backwards compat, we should continue to take in the label content from children.
    if (!label && typeof (children) === 'string') {
      label = children;
    }

    return label ? (
      <span className={ `${this._baseClassName}-label` } id={ this._labelId } >
        { label }
      </span>
    ) : (null);
  }

  protected onRenderChildren() {
    // By default, a single string child will be rendered in the label. But having
    // this overridable allows us to create more ellaborate buttons that can render
    // children ouside of the label.
    return null;
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

  protected onRenderAriaDescription() {
    let { ariaDescription } = this.props;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    return ariaDescription ? (
      <span className='ms-u-screenReaderOnly' id={ this._ariaDescriptionId }>{ ariaDescription }</span>
    ) : (
        null
      );
  }

  @autobind
  private _onClick(ev) {
    let { disabled, onClick } = this.props;

    if (disabled) {
      ev.preventDefault();
    } else {
      if (onClick) {
        onClick(ev);
      }
    }
  }
}
