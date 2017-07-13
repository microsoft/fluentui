import * as React from 'react';
import {
  BaseComponent,
  IRenderFunction,
  anchorProperties,
  assign,
  autobind,
  buttonProperties,
  getId,
  getNativeProps,
  KeyCodes,
  css,
} from '../../Utilities';
import { Icon, IIconProps } from '../../Icon';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ContextualMenu, IContextualMenuProps } from '../../ContextualMenu';
import { IButtonProps, IButton } from './Button.Props';
import { IButtonClassNames, getClassNames } from './BaseButton.classNames';

export interface IBaseButtonProps extends IButtonProps {
  baseClassName?: string;
  variantClassName?: string;
}

export interface IBaseButtonState {
  menuProps?: IContextualMenuProps | null;
}

export class BaseButton extends BaseComponent<IBaseButtonProps, IBaseButtonState> implements IButton {

  private get _isSplitButton(): boolean {
    return (!!this.props.menuProps && !!this.props.onClick) && this.props.split === true;
  }

  private get _isExpanded(): boolean {
    return !!this.state.menuProps;
  }

  public static defaultProps = {
    baseClassName: 'ms-Button',
    classNames: {},
    styles: {},
    split: false
  };

  private _buttonElement: HTMLElement;
  private _labelId: string;
  private _descriptionId: string;
  private _ariaDescriptionId: string;
  private _classNames: IButtonClassNames;

  constructor(props: IBaseButtonProps, rootClassName: string) {
    super(props);

    this._warnConditionallyRequiredProps(
      ['menuProps', 'onClick'],
      'split',
      this.props.split
    );

    this._warnDeprecations({
      rootProps: null,
      icon: 'iconProps',
      menuIconName: 'menuIconProps',
      toggled: 'checked'
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
      className,
      description,
      disabled,
      href,
      iconProps,
      styles,
      checked,
      variantClassName
         } = this.props;

    this._classNames = getClassNames(
      styles,
      className,
      variantClassName,
      iconProps && iconProps.className,
      disabled,
      checked
    );

    const { _ariaDescriptionId, _labelId, _descriptionId } = this;
    // Anchor tag cannot be disabled hence in disabled state rendering
    // anchor button as normal button
    const renderAsAnchor: boolean = !disabled && !!href;
    const tag = renderAsAnchor ? 'a' : 'button';
    const nativeProps = getNativeProps(
      assign(
        renderAsAnchor ? {} : { type: 'button' },
        this.props.rootProps,
        this.props),
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
    } else if ((nativeProps as any)['aria-describedby']) {
      ariaDescribedBy = (nativeProps as any)['aria-describedby'];
    } else {
      ariaDescribedBy = null;
    }

    const tabIndex = (this.props.tabIndex === undefined) ? (this._isSplitButton ? -1 : 0) : this.props.tabIndex;

    const buttonProps = assign(
      nativeProps,
      {
        className: this._classNames.root,
        ref: this._resolveRef('_buttonElement'),
        'disabled': disabled,
        tabIndex: tabIndex,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabel ? null : _labelId,
        'aria-describedby': ariaDescribedBy,
        'data-is-focusable': ((this.props as any)['data-is-focusable'] === false || disabled) ? false : true,
        'aria-pressed': checked
      }
    );

    if (this._isSplitButton) {
      return (
        this._onRenderSplitButtonContent(tag, buttonProps)
      );
    } else if (this.props.menuProps) {
      assign(
        buttonProps,
        {
          'onClick': this._onToggleMenu,
          'aria-expanded': this._isExpanded,
          'aria-owns': this.state.menuProps ? this._labelId + '-menu' : null,
          'aria-haspopup': true
        }
      );
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
      menuIconProps,
      menuProps,
      onRenderIcon = this._onRenderIcon,
      onRenderText = this._onRenderText,
      onRenderDescription = this._onRenderDescription,
      onRenderAriaDescription = this._onRenderAriaDescription,
      onRenderChildren = this._onRenderChildren,
      onRenderMenu = this._onRenderMenu,
      onRenderMenuIcon = this._onRenderMenuIcon
    } = props;

    return React.createElement(
      tag,
      buttonProps,
      React.createElement(
        'div',
        { className: this._classNames.flexContainer },
        onRenderIcon(props, this._onRenderIcon),
        onRenderText(props, this._onRenderText),
        onRenderDescription(props, this._onRenderDescription),
        onRenderAriaDescription(props, this._onRenderAriaDescription),
        onRenderChildren(props, this._onRenderChildren),
        !this._isSplitButton && (menuProps || menuIconName || menuIconProps || this.props.onRenderMenuIcon) && onRenderMenuIcon(this.props, this._onRenderMenuIcon),
        this.state.menuProps && onRenderMenu(menuProps, this._onRenderMenu)
      ));
  }

  @autobind
  private _onRenderIcon(buttonProps?: IButtonProps, defaultRender?: IRenderFunction<IButtonProps>) {
    let {
      baseClassName,
      disabled,
      icon,
      iconProps,
      styles,
      checked
       } = this.props;

    if (icon || iconProps) {
      iconProps = iconProps || {
        iconName: icon
      } as IIconProps;
    }

    return iconProps && (
      Icon({
        ...iconProps,
        className: this._classNames.icon
      })
    );
  }

  @autobind
  private _onRenderText() {
    let {
      children,
      disabled,
      styles,
      text
            } = this.props;

    // For backwards compat, we should continue to take in the text content from children.
    if (text === undefined && typeof (children) === 'string') {
      text = children;
    }

    return text && (
      <span
        className={ this._classNames.label }
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
  private _onRenderDescription(props: IButtonProps) {
    const {
    description
    } = this.props;

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    return description ? (
      <span className={ this._classNames.description } id={ this._descriptionId }>
        { description }
      </span>
    ) : (
        null
      );
  }

  @autobind
  private _onRenderAriaDescription() {
    const {
     ariaDescription,
      styles
     } = this.props;

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
    let {
      baseClassName,
      checked,
      disabled,
      menuIconName,
      menuIconProps
       } = this.props;

    if (menuIconProps === undefined) {
      menuIconProps = {
        iconName: menuIconName === undefined ? 'ChevronDown' : menuIconName
      };
    }

    return (
      menuIconProps ?
        <Icon
          { ...menuIconProps }
          className={ this._classNames.icon }
        />
        :
        null
    );
  }

  @autobind
  private _onRenderMenu(menuProps: IContextualMenuProps): JSX.Element {
    return (
      <ContextualMenu
        id={ this._labelId + '-menu' }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        {...menuProps}
        className={ 'ms-BaseButton-menuhost ' + menuProps.className }
        target={ this._buttonElement }
        labelElementId={ this._labelId }
        onDismiss={ this._onToggleMenu }
      />
    );
  }

  @autobind
  private _onToggleMenu(): void {
    const { menuProps } = this.props;
    let currentMenuProps = this.state.menuProps;

    this.setState({ menuProps: currentMenuProps ? null : menuProps });
  }

  private _onRenderSplitButtonContent(tag: any, buttonProps: IButtonProps): JSX.Element {
    const {
      styles,
      disabled
    } = this.props;

    return (
      <div
        aria-labelledby={ buttonProps.ariaLabel }
        aria-disabled={ disabled }
        aria-haspopup={ true }
        aria-expanded={ this._isExpanded }
        aria-pressed={ this.props.checked }
        aria-describedby={ buttonProps.ariaDescription }
        className={ css(disabled ? styles.splitButtonContainerDisabled : styles.splitButtonContainer) }
        tabIndex={ 0 }
        onKeyDown={ this.props.disabled ? null : this._onSplitButtonKeyDown }
      >
        <span aria-hidden={ true } style={ { 'display': 'flex' } }>
          { this._onRenderContent(tag, buttonProps) }
          { this._onRenderSplitButtonMenuButton() }
        </span>
      </div >
    );
  }

  private _onRenderSplitButtonMenuButton(): JSX.Element {
    let {
      menuIconName,
      menuIconProps,
      styles,
      disabled
    } = this.props;

    if (menuIconProps === undefined) {
      menuIconProps = {
        iconName: menuIconName === undefined ? 'ChevronDown' : menuIconName
      };
    }

    return (
      <BaseButton
        tabIndex={ -1 }
        variantClassName='ms-Button--icon'
        styles={ {
          root: disabled ? styles.splitButtonMenuButtonDisabled : styles.splitButtonMenuButton,
          rootChecked: styles.splitButtonMenuButtonChecked,
          icon: disabled ? styles.splitButtonMenuIconDisabled : styles.splitButtonMenuIcon,
          flexContainer: styles.splitButtonFlexContainer
        } }
        checked={ this.props.checked }
        disabled={ this.props.disabled }
        onClick={ this._onToggleMenu }
        menuProps={ null }
        iconProps={ menuIconProps } />
    );
  }

  @autobind
  private _onSplitButtonKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    switch (ev.which) {
      case KeyCodes.enter:
      case KeyCodes.space:
        this.props.onClick(null);
        return;
    }

    if (ev.altKey) {
      switch (ev.which) {
        case KeyCodes.down:
          this._onToggleMenu();
          return;
      }
    }
  }
}
