import * as React from 'react';
import {
  BaseComponent,
  IRenderFunction,
  anchorProperties,
  assign,
  autobind,
  buttonProperties,
  css,
  getId,
  getNativeProps
} from '../../Utilities';
import { Icon, IIconProps } from '../../Icon';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ContextualMenu, IContextualMenuProps } from '../../ContextualMenu';
import { IButtonProps, IButton } from './Button.Props';

export interface IBaseButtonProps extends IButtonProps {
  baseClassName?: string;
  variantClassName?: string;
}

export interface IBaseButtonState {
  menuProps?: IContextualMenuProps | null;
}

export class BaseButton extends BaseComponent<IBaseButtonProps, IBaseButtonState> implements IButton {

  public static defaultProps = {
    baseClassName: 'ms-Button',
    classNames: {},
    styles: {}
  };

  private _buttonElement: HTMLButtonElement;
  private _labelId: string;
  private _descriptionId: string;
  private _ariaDescriptionId: string;

  constructor(props: IBaseButtonProps, rootClassName: string) {
    super(props);

    this._warnDeprecations({
      rootProps: null,
      icon: 'iconProps',
      menuIconName: 'menuIconProps'
    });

    this._labelId = getId();
    this._descriptionId = getId();
    this._ariaDescriptionId = getId();
    this.state = {
      menuProps: null
    };
  }

  public render(): JSX.Element {
    const {
      ariaDescription,
      ariaLabel,
      baseClassName,
      className,
      styles,
      description,
      disabled,
      href,
      variantClassName
         } = this.props;
    const { _ariaDescriptionId, _labelId, _descriptionId } = this;
    const renderAsAnchor: boolean = !!href;
    const tag = renderAsAnchor ? 'a' : 'button';
    const nativeProps = getNativeProps(
      assign({}, this.props.rootProps, this.props),
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

    const buttonProps = assign(
      nativeProps,
      {
        className: css(
          styles.root,
          disabled ? styles.rootDisabled : styles.rootEnabled,

          className, // legacy: root class name
          baseClassName, // legacy: base class name
          variantClassName, // legacy: variant of the base
          disabled && 'disabled' // (legacy)
        ),
        ref: this._resolveRef('_buttonElement'),
        'disabled': disabled,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabel ? null : _labelId,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': disabled,
        tabIndex: disabled ? -1 : undefined,
        'data-is-focusable': disabled ? false : true
      }
    );

    // Override onClick if contextualMenuItems passed in. Eventually allow _onToggleMenu to
    // be assigned to split button click if onClick already has a value
    if (this.props.menuProps) {
      assign(buttonProps, { 'onClick': this._onToggleMenu });
    }

    return this._onRenderContent(tag, buttonProps);
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }

  private _onRenderContent(tag: any, buttonProps: IButtonProps): JSX.Element {
    let props = this.props;
    let {
      baseClassName,
      styles,
      menuIconName,
      menuProps,
      onRenderIcon = this._onRenderIcon,
      onRenderText = this._onRenderText,
      onRenderDescription = this._onRenderDescription,
      onRenderAriaDescription = this._onRenderAriaDescription,
      onRenderChildren = this._onRenderChildren,
      onRenderMenu = this._onRenderMenu,
      onRenderMenuIcon = this._onRenderMenuIcon
    } = props;

    const className = css(baseClassName + '-flexContainer', styles.flexContainer);

    return React.createElement(
      tag,
      buttonProps,
      React.createElement(
        'div',
        { className },
        onRenderIcon(props, this._onRenderIcon),
        onRenderText(props, this._onRenderText),
        onRenderDescription(props, this._onRenderDescription),
        onRenderAriaDescription(props, this._onRenderAriaDescription),
        onRenderChildren(props, this._onRenderChildren),
        (menuProps || menuIconName || this.props.onRenderMenuIcon) && onRenderMenuIcon(this.props, this._onRenderMenuIcon),
        this.state.menuProps && onRenderMenu(menuProps, this._onRenderMenu)
      ));
  }

  @autobind
  private _onRenderIcon(buttonProps?: IButtonProps, defaultRender?: IRenderFunction<IButtonProps>) {
    let { baseClassName, styles, icon, iconProps, disabled } = this.props;

    if (icon || iconProps) {
      iconProps = iconProps || {
        iconName: icon
      } as IIconProps;
    }

    return iconProps && (
      <Icon { ...iconProps } className={
        css(
          `${baseClassName}-icon`,
          styles.icon,
          disabled ? styles.iconDisabled : styles.iconEnabled,
          iconProps.className
        ) } />
    );
  }

  @autobind
  private _onRenderText() {
    let { baseClassName, styles, children, text, disabled } = this.props;

    // For backwards compat, we should continue to take in the text content from children.
    if (text === undefined && typeof (children) === 'string') {
      text = children;
    }

    return text && (
      <span
        className={
          css(
            `${baseClassName}-label`,
            styles.label,
            disabled ? styles.labelDisabled : styles.labelEnabled
          ) }
        id={ this._labelId }
      >
        { text }
      </span>
    );
  }

  @autobind
  private _onRenderChildren(): JSX.Element | null {
    const { children } = this.props;

    // If children is just a string, either it or the text will be rendered via onRenderLabel
    // If children is another component, it will be rendered after text
    if (typeof (children) === 'string') {
      return null;
    }

    return children as any;
  }

  @autobind
  private _onRenderDescription() {
    const { baseClassName, styles, description, disabled } = this.props;

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    return description ? (
      <span
        className={
          css(
            `${baseClassName}-description`,
            styles.description,
            disabled ? styles.descriptionDisabled : styles.descriptionEnabled
          ) }
        id={ this._descriptionId }
      >
        { description }
      </span>
    ) : (
        null
      );
  }

  @autobind
  private _onRenderAriaDescription() {
    const { ariaDescription, styles } = this.props;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    return ariaDescription ? (
      <span className={ styles.screenReaderText as string } id={ this._ariaDescriptionId }>{ ariaDescription }</span>
    ) : (
        null
      );
  }

  @autobind
  private _onRenderMenuIcon(props: IButtonProps): JSX.Element | null {
    let { baseClassName, styles, disabled, menuIconProps, menuIconName } = this.props;

    if (menuIconProps === undefined) {
      menuIconProps = {
        iconName: menuIconName === undefined ? 'ChevronDown' : menuIconName
      };
    }

    return (
      menuIconProps ?
        <Icon
          { ...menuIconProps }
          className={
            css(
              `${baseClassName}-icon`,
              styles.menuIcon,
              disabled ? styles.menuIconDisabled : styles.menuIconEnabled,
              menuIconProps.className
            ) }
        />
        :
        null
    );
  }

  @autobind
  private _onRenderMenu(menuProps: IContextualMenuProps): JSX.Element {
    return (
      <ContextualMenu
        className={ css('ms-BaseButton-menuHost') }
        isBeakVisible={ true }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        items={ menuProps.items }
        target={ this._buttonElement }
        labelElementId={ this._labelId }
        onDismiss={ this._onToggleMenu }
      />
    );
  }

  @autobind
  private _onToggleMenu() {
    const { menuProps } = this.props;
    let currentMenuProps = this.state.menuProps;

    this.setState({ menuProps: currentMenuProps ? null : menuProps });
  }

}
