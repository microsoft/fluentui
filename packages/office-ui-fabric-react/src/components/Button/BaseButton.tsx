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
import styles from './BaseButton.scss';

export interface IBaseButtonClassNames {
  base: string;
  variant: string;
  isDisabled: string;
  isEnabled: string;
  description?: string;
  flexContainer?: string;
  icon?: string;
  label?: string;
  root?: string;
};

export class BaseButton extends BaseComponent<IButtonProps, {}> implements IButton {

  protected classNames: IBaseButtonClassNames = {
    base: 'ms-Button',
    variant: '',
    isEnabled: '',
    isDisabled: ''
  };

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
    const { description, ariaLabel, ariaDescription, href, disabled } = this.props;
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
          this.props.className,
          this.classNames.base,
          this.classNames.variant,
          this.classNames.root,
          {
            'disabled': disabled,
            [this.classNames.isDisabled]: disabled,
            [this.classNames.isEnabled]: !disabled
          }),
        ref: this._resolveRef('_buttonElement'),
        'disabled': disabled,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabel ? null : _labelId,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': disabled
      }
    );

    return this.onRenderContent(tag, buttonProps);
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }

  protected onRenderContent(tag: any, buttonProps: IButtonProps): JSX.Element {
    return React.createElement(
      tag,
      buttonProps,
      React.createElement('div', { className: css(styles.flexContainer, this.classNames.flexContainer) },
        this.onRenderIcon(),
        this.onRenderLabel(),
        this.onRenderDescription(),
        this.onRenderAriaDescription(),
        this.onRenderChildren()
      ));
  }

  protected onRenderIcon() {
    let { icon } = this.props;

    return icon ? (
      <span className={ css(`${this.classNames.base}-icon`, this.classNames.icon) }>
        <i className={ `ms-Icon ms-Icon--${icon}` } />
      </span>
    ) : (
        null
      );
  }

  protected onRenderLabel() {
    let { children, label } = this.props;

    // For backwards compat, we should continue to take in the label content from children.
    if (label === undefined && typeof (children) === 'string') {
      label = children;
    }

    return label ? (
      <span className={ css(`${this.classNames.base}-label`, this.classNames.label) } id={ this._labelId } >
        { label }
      </span>
    ) : (null);
  }

  protected onRenderChildren() {
    let { children, label } = this.props;

    // There is no label and the label will be rendered, we don't want the label to appear twice.
    // If there is a label and the children are of type string it was likely intentional and both
    // should render.
    if (label === undefined && typeof (children) === 'string') {
      return null;
    }

    return children;
  }

  protected onRenderDescription() {
    let { description } = this.props;

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    return description ? (
      <span
        className={ css(`${this.classNames.base}-description`, this.classNames.description) }
        id={ this._descriptionId }
      >
        { description }
      </span>
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
}
