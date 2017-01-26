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
    const { className, children, icon, description, ariaLabel, ariaDescription, href, disabled } = this.props;
    const { _ariaDescriptionId, _labelId, _descriptionId } = this;
    const renderAsAnchor: boolean = !!href;
    const tag = renderAsAnchor ? 'a' : 'button';
    const nativeProps = getNativeProps(this.props.rootProps || this.props, renderAsAnchor ? anchorProperties : buttonProperties);

    const iconSpan = icon ? (
      <span className={ `${this._baseClassName}-icon` }>
        <i className={ `ms-Icon ms-Icon--${icon}` } />
      </span>
    ) : (
        null
      );

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    const descriptionSpan: React.ReactElement<React.HTMLProps<HTMLSpanElement>> = description ? (
      <span className={ `${this._baseClassName}-description` } id={ _descriptionId }>{ description }</span>
    ) : (
        null
      );

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
            this._variantClassName,
            {
              'disabled': (renderAsAnchor && disabled) // add disable styling if it is an anchor
            }),
          ref: this._resolveRef('_buttonElement'),
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabel ? null : _labelId,
          'aria-describedby': ariaDescribedBy
        }),
      iconSpan,
      <span className={ `${this._baseClassName}-label` } id={ _labelId } >{ children }</span>,
      descriptionSpan,
      ariaDescriptionSpan
    );
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }
}