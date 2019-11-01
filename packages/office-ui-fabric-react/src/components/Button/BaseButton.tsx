import * as React from 'react';
import {
  BaseComponent,
  IRenderFunction,
  anchorProperties,
  assign,
  buttonProperties,
  getId,
  getNativeProps,
  KeyCodes,
  css,
  mergeAriaAttributeValues,
  portalContainsElement,
  memoizeFunction,
  nullRender
} from '../../Utilities';
import { Icon, FontIcon, ImageIcon } from '../../Icon';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ContextualMenu, IContextualMenuProps } from '../../ContextualMenu';
import { IButtonProps, IButton } from './Button.types';
import { IButtonClassNames, getBaseButtonClassNames } from './BaseButton.classNames';
import { getClassNames as getBaseSplitButtonClassNames, ISplitButtonClassNames } from './SplitButton/SplitButton.classNames';
import { KeytipData } from '../../KeytipData';
import { IKeytipProps } from '../Keytip/Keytip.types';

/**
 * {@docCategory Button}
 */
export interface IBaseButtonProps extends IButtonProps {
  baseClassName?: string;
  variantClassName?: string;
}

export interface IBaseButtonState {
  menuHidden: boolean;
}

const TouchIdleDelay = 500; /* ms */

/**
 * {@docCategory Button}
 */
export class BaseButton extends BaseComponent<IBaseButtonProps, IBaseButtonState> implements IButton {
  private get _isSplitButton(): boolean {
    return !!this.props.menuProps && !!this.props.onClick && this.props.split === true;
  }

  public static defaultProps: Partial<IBaseButtonProps> = {
    baseClassName: 'ms-Button',
    styles: {},
    split: false
  };

  private _buttonElement = React.createRef<HTMLElement>();
  private _splitButtonContainer = React.createRef<HTMLDivElement>();
  private _labelId: string;
  private _descriptionId: string;
  private _ariaDescriptionId: string;
  private _classNames: IButtonClassNames;
  private _processingTouch: boolean;
  private _lastTouchTimeoutId: number | undefined;
  private _renderedVisibleMenu: boolean = false;

  // These fields will be used to set corresponding props on the menu.
  private _menuShouldFocusOnContainer: boolean | undefined;
  private _menuShouldFocusOnMount: boolean | undefined;

  private _getMemoizedMenuButtonKeytipProps = memoizeFunction((keytipProps: IKeytipProps) => {
    return {
      ...keytipProps,
      hasMenu: true
    };
  });

  constructor(props: IBaseButtonProps, rootClassName: string) {
    super(props);

    this._warnConditionallyRequiredProps(['menuProps', 'onClick'], 'split', this.props.split!);

    this._warnDeprecations({
      rootProps: undefined,
      description: 'secondaryText',
      toggled: 'checked'
    });
    this._labelId = getId();
    this._descriptionId = getId();
    this._ariaDescriptionId = getId();

    this.state = {
      menuHidden: true
    };
  }

  public render(): JSX.Element {
    const {
      ariaDescription,
      ariaLabel,
      ariaHidden,
      className,
      disabled,
      allowDisabledFocus,
      primaryDisabled,
      secondaryText = this.props.description,
      href,
      iconProps,
      menuIconProps,
      styles,
      checked,
      variantClassName,
      theme,
      toggle,
      getClassNames
    } = this.props;

    const { menuHidden } = this.state;

    // Button is disabled if the whole button (in case of splitbutton is disabled) or if the primary action is disabled
    const isPrimaryButtonDisabled = disabled || primaryDisabled;

    this._classNames = getClassNames
      ? getClassNames(
          theme!,
          className!,
          variantClassName!,
          iconProps && iconProps.className,
          menuIconProps && menuIconProps.className,
          isPrimaryButtonDisabled!,
          checked!,
          !menuHidden,
          !!this.props.menuProps,
          this.props.split,
          !!allowDisabledFocus
        )
      : getBaseButtonClassNames(
          theme!,
          styles!,
          className!,
          variantClassName!,
          iconProps && iconProps.className,
          menuIconProps && menuIconProps.className,
          isPrimaryButtonDisabled!,
          !!this.props.menuProps,
          checked!,
          !menuHidden,
          this.props.split
        );

    const { _ariaDescriptionId, _labelId, _descriptionId } = this;
    // Anchor tag cannot be disabled hence in disabled state rendering
    // anchor button as normal button
    const renderAsAnchor: boolean = !isPrimaryButtonDisabled && !!href;
    const tag = renderAsAnchor ? 'a' : 'button';

    const nativeProps = getNativeProps(
      assign(renderAsAnchor ? {} : { type: 'button' }, this.props.rootProps, this.props),
      renderAsAnchor ? anchorProperties : buttonProperties,
      [
        'disabled' // let disabled buttons be focused and styled as disabled.
      ]
    );

    // Check for ariaLabel passed in via Button props, and fall back to aria-label passed in via native props
    const resolvedAriaLabel = ariaLabel || (nativeProps as any)['aria-label'];

    // Check for ariaDescription, secondaryText or aria-describedby in the native props to determine source of aria-describedby
    // otherwise default to undefined so property does not appear in output.
    let ariaDescribedBy = undefined;
    if (ariaDescription) {
      ariaDescribedBy = _ariaDescriptionId;
    } else if (secondaryText && this.props.onRenderDescription !== nullRender) {
      // for buttons like CompoundButton with a valid onRenderDescription, we need to set an ariaDescribedBy
      // for buttons that do not render anything (via nullRender), we should not set an ariaDescribedBy
      ariaDescribedBy = _descriptionId;
    } else if ((nativeProps as any)['aria-describedby']) {
      ariaDescribedBy = (nativeProps as any)['aria-describedby'];
    }

    // If an explicit ariaLabel is given, use that as the label and we're done.
    // If an explicit aria-labelledby is given, use that and we're done.
    // If any kind of description is given (which will end up as an aria-describedby attribute),
    // set the labelledby element. Otherwise, the button is labeled implicitly by the descendent
    // text on the button (if it exists). Never set both aria-label and aria-labelledby.
    let ariaLabelledBy = undefined;
    if (!resolvedAriaLabel) {
      if ((nativeProps as any)['aria-labelledby']) {
        ariaLabelledBy = (nativeProps as any)['aria-labelledby'];
      } else if (ariaDescribedBy) {
        ariaLabelledBy = this._hasText() ? _labelId : undefined;
      }
    }

    const dataIsFocusable =
      (this.props as any)['data-is-focusable'] === false || (disabled && !allowDisabledFocus) || this._isSplitButton ? false : true;

    const buttonProps = assign(nativeProps, {
      className: this._classNames.root,
      ref: this._buttonElement,
      disabled: isPrimaryButtonDisabled && !allowDisabledFocus,
      onKeyDown: this._onKeyDown,
      onKeyPress: this._onKeyPress,
      onKeyUp: this._onKeyUp,
      onMouseDown: this._onMouseDown,
      onMouseUp: this._onMouseUp,
      onClick: this._onClick,
      'aria-label': resolvedAriaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-disabled': isPrimaryButtonDisabled,
      'data-is-focusable': dataIsFocusable,
      'aria-pressed': toggle ? !!checked : undefined // aria-pressed attribute should only be present for toggle buttons
    });

    if (ariaHidden) {
      buttonProps['aria-hidden'] = true;
    }

    if (this._isSplitButton) {
      return this._onRenderSplitButtonContent(tag, buttonProps);
    } else if (this.props.menuProps) {
      assign(buttonProps, {
        'aria-expanded': !menuHidden,
        'aria-owns': !menuHidden ? this._labelId + '-menu' : null,
        'aria-haspopup': true
      });
    }

    return this._onRenderContent(tag, buttonProps);
  }

  public componentDidMount() {
    // For split buttons, touching anywhere in the button should drop the dropdown, which should contain the primary action.
    // This gives more hit target space for touch environments. We're setting the onpointerdown here, because React
    // does not support Pointer events yet.
    if (this._isSplitButton && this._splitButtonContainer.current && 'onpointerdown' in this._splitButtonContainer.current) {
      this._events.on(this._splitButtonContainer.current, 'pointerdown', this._onPointerDown, true);
    }
  }

  public componentDidUpdate(prevProps: IBaseButtonProps, prevState: IBaseButtonState) {
    // If Button's menu was closed, run onAfterMenuDismiss.
    if (this.props.onAfterMenuDismiss && !prevState.menuHidden && this.state.menuHidden) {
      this.props.onAfterMenuDismiss();
    }
  }

  public focus(): void {
    if (this._isSplitButton && this._splitButtonContainer.current) {
      this._splitButtonContainer.current.focus();
    } else if (this._buttonElement.current) {
      this._buttonElement.current.focus();
    }
  }

  public dismissMenu(): void {
    this._dismissMenu();
  }

  public openMenu(shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean): void {
    this._openMenu(shouldFocusOnContainer, shouldFocusOnMount);
  }

  private _onRenderContent(tag: any, buttonProps: IButtonProps): JSX.Element {
    const props = this.props;
    const Tag = tag;
    const {
      menuIconProps,
      menuProps,
      onRenderIcon = this._onRenderIcon,
      onRenderAriaDescription = this._onRenderAriaDescription,
      onRenderChildren = this._onRenderChildren,
      onRenderMenu = this._onRenderMenu,
      onRenderMenuIcon = this._onRenderMenuIcon,
      disabled
    } = props;
    let { keytipProps } = props;
    if (keytipProps && menuProps) {
      keytipProps = this._getMemoizedMenuButtonKeytipProps(keytipProps);
    }

    const Button = (keytipAttributes?: any): JSX.Element => (
      <Tag {...buttonProps} {...keytipAttributes}>
        <span className={this._classNames.flexContainer} data-automationid="splitbuttonprimary">
          {onRenderIcon(props, this._onRenderIcon)}
          {this._onRenderTextContents()}
          {onRenderAriaDescription(props, this._onRenderAriaDescription)}
          {onRenderChildren(props, this._onRenderChildren)}
          {!this._isSplitButton &&
            (menuProps || menuIconProps || this.props.onRenderMenuIcon) &&
            onRenderMenuIcon(this.props, this._onRenderMenuIcon)}
          {menuProps && !menuProps.doNotLayer && this._shouldRenderMenu() && onRenderMenu(menuProps, this._onRenderMenu)}
        </span>
      </Tag>
    );

    const Content = keytipProps ? (
      // If we're making a split button, we won't put the keytip here
      <KeytipData
        keytipProps={!this._isSplitButton ? keytipProps : undefined}
        ariaDescribedBy={(buttonProps as any)['aria-describedby']}
        disabled={disabled}
      >
        {(keytipAttributes: any): JSX.Element => Button(keytipAttributes)}
      </KeytipData>
    ) : (
      Button()
    );

    if (menuProps && menuProps.doNotLayer) {
      return (
        <span style={{ display: 'inline-block' }}>
          {Content}
          {this._shouldRenderMenu() && onRenderMenu(menuProps, this._onRenderMenu)}
        </span>
      );
    }

    return Content;
  }

  /**
   * Method to help determine if the menu's component tree should
   * be rendered. It takes into account whether the menu is expanded,
   * whether it is a persisted menu and whether it has been shown to the user.
   */
  private _shouldRenderMenu() {
    const { menuHidden } = this.state;
    const { persistMenu, renderPersistedMenuHiddenOnMount } = this.props;

    if (!menuHidden) {
      // Always should render a menu when it is expanded
      return true;
    } else if (persistMenu && (this._renderedVisibleMenu || renderPersistedMenuHiddenOnMount)) {
      // _renderedVisibleMenu ensures that the first rendering of
      // the menu happens on-screen, as edge's scrollbar calculations are off if done while hidden.
      return true;
    }

    return false;
  }

  private _onRenderIcon = (buttonProps?: IButtonProps, defaultRender?: IRenderFunction<IButtonProps>): JSX.Element | null => {
    const { iconProps } = this.props;

    if (iconProps && (iconProps.iconName !== undefined || iconProps.imageProps)) {
      const { className, imageProps, ...rest } = iconProps;

      // If the styles prop is specified as part of iconProps, fall back to regular Icon as FontIcon and ImageIcon do not have such prop.
      if (iconProps.styles) {
        return <Icon className={css(this._classNames.icon, className)} imageProps={imageProps} {...rest} />;
      }
      if (iconProps.iconName) {
        return <FontIcon className={css(this._classNames.icon, className)} {...rest} />;
      }
      if (imageProps) {
        return <ImageIcon className={css(this._classNames.icon, className)} imageProps={imageProps} {...rest} />;
      }
    }
    return null;
  };

  private _onRenderTextContents = (): JSX.Element | (JSX.Element | null)[] => {
    const {
      text,
      children,
      secondaryText = this.props.description,
      onRenderText = this._onRenderText,
      onRenderDescription = this._onRenderDescription
    } = this.props;

    if (text || typeof children === 'string' || secondaryText) {
      return (
        <span className={this._classNames.textContainer}>
          {onRenderText(this.props, this._onRenderText)}
          {onRenderDescription(this.props, this._onRenderDescription)}
        </span>
      );
    }
    return [onRenderText(this.props, this._onRenderText), onRenderDescription(this.props, this._onRenderDescription)];
  };

  private _onRenderText = (): JSX.Element | null => {
    let { text } = this.props;
    const { children } = this.props;

    // For backwards compat, we should continue to take in the text content from children.
    if (text === undefined && typeof children === 'string') {
      text = children;
    }

    if (this._hasText()) {
      return (
        <span key={this._labelId} className={this._classNames.label} id={this._labelId}>
          {text}
        </span>
      );
    }

    return null;
  };

  private _hasText(): boolean {
    // _onRenderTextContents and _onRenderText do not perform the same checks. Below is parity with what _onRenderText used to have
    // before the refactor that introduced this function. _onRenderTextContents does not require props.text to be undefined in order
    // for props.children to be used as a fallback. Purely a code maintainability/reuse issue, but logged as Issue #4979
    return this.props.text !== null && (this.props.text !== undefined || typeof this.props.children === 'string');
  }

  private _onRenderChildren = (): JSX.Element | null => {
    const { children } = this.props;

    // If children is just a string, either it or the text will be rendered via onRenderLabel
    // If children is another component, it will be rendered after text
    if (typeof children === 'string') {
      return null;
    }

    return children as any;
  };

  private _onRenderDescription = (props: IButtonProps) => {
    const { secondaryText = this.props.description } = props;

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    return secondaryText ? (
      <span key={this._descriptionId} className={this._classNames.description} id={this._descriptionId}>
        {secondaryText}
      </span>
    ) : null;
  };

  private _onRenderAriaDescription = () => {
    const { ariaDescription } = this.props;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    return ariaDescription ? (
      <span className={this._classNames.screenReaderText} id={this._ariaDescriptionId}>
        {ariaDescription}
      </span>
    ) : null;
  };

  private _onRenderMenuIcon = (props: IButtonProps): JSX.Element | null => {
    const { menuIconProps } = this.props;

    return <FontIcon iconName="ChevronDown" {...menuIconProps} className={this._classNames.menuIcon} />;
  };

  private _onRenderMenu = (menuProps: IContextualMenuProps): JSX.Element => {
    const { persistMenu } = this.props;
    const { menuHidden } = this.state;
    const MenuType = this.props.menuAs || (ContextualMenu as React.ReactType<IContextualMenuProps>);

    // the accessible menu label (accessible name) has a relationship to the button.
    // If the menu props do not specify an explicit value for aria-label or aria-labelledBy,
    // AND the button has text, we'll set the menu aria-labelledBy to the text element id.
    if (!menuProps.ariaLabel && !menuProps.labelElementId && this._hasText()) {
      menuProps = { ...menuProps, labelElementId: this._labelId };
    }

    return (
      <MenuType
        id={this._labelId + '-menu'}
        directionalHint={DirectionalHint.bottomLeftEdge}
        {...menuProps}
        shouldFocusOnContainer={this._menuShouldFocusOnContainer}
        shouldFocusOnMount={this._menuShouldFocusOnMount}
        hidden={persistMenu ? menuHidden : undefined}
        className={css('ms-BaseButton-menuhost', menuProps.className)}
        target={this._isSplitButton ? this._splitButtonContainer.current : this._buttonElement.current}
        onDismiss={this._onDismissMenu}
      />
    );
  };

  private _onDismissMenu: IContextualMenuProps['onDismiss'] = ev => {
    const { menuProps } = this.props;

    if (menuProps && menuProps.onDismiss) {
      menuProps.onDismiss(ev);
    }
    if (!ev || !ev.defaultPrevented) {
      this._dismissMenu();
    }
  };

  private _dismissMenu = (): void => {
    this._menuShouldFocusOnMount = undefined;
    this._menuShouldFocusOnContainer = undefined;
    this.setState({ menuHidden: true });
  };

  private _openMenu = (shouldFocusOnContainer?: boolean, shouldFocusOnMount: boolean = true): void => {
    if (this.props.menuProps) {
      this._menuShouldFocusOnContainer = shouldFocusOnContainer;
      this._menuShouldFocusOnMount = shouldFocusOnMount;
      this._renderedVisibleMenu = true;
      this.setState({ menuHidden: false });
    }
  };

  private _onToggleMenu = (shouldFocusOnContainer: boolean): void => {
    let shouldFocusOnMount = true;
    if (this.props.menuProps && this.props.menuProps.shouldFocusOnMount === false) {
      shouldFocusOnMount = false;
    }

    this.state.menuHidden ? this._openMenu(shouldFocusOnContainer, shouldFocusOnMount) : this._dismissMenu();
  };

  private _onRenderSplitButtonContent(tag: any, buttonProps: IButtonProps): JSX.Element {
    const {
      styles = {},
      disabled,
      allowDisabledFocus,
      checked,
      getSplitButtonClassNames,
      primaryDisabled,
      menuProps,
      toggle,
      role,
      primaryActionButtonProps
    } = this.props;
    let { keytipProps } = this.props;
    const { menuHidden } = this.state;

    const classNames = getSplitButtonClassNames
      ? getSplitButtonClassNames(!!disabled, !menuHidden, !!checked, !!allowDisabledFocus)
      : styles && getBaseSplitButtonClassNames(styles!, !!disabled, !menuHidden, !!checked, !!primaryDisabled);

    assign(buttonProps, {
      onClick: undefined,
      tabIndex: -1,
      'data-is-focusable': false
    });

    const ariaDescribedBy = buttonProps.ariaDescription;

    if (keytipProps && menuProps) {
      keytipProps = this._getMemoizedMenuButtonKeytipProps(keytipProps);
    }

    const containerProps = getNativeProps<React.HTMLAttributes<HTMLSpanElement>>(buttonProps, [], ['disabled']);

    // Add additional props to apply on primary action button
    if (primaryActionButtonProps) {
      assign(buttonProps, { ...primaryActionButtonProps });
    }

    const SplitButton = (keytipAttributes?: any): JSX.Element => (
      <div
        {...containerProps}
        data-ktp-target={keytipAttributes ? keytipAttributes['data-ktp-target'] : undefined}
        role={role ? role : 'button'}
        aria-disabled={disabled}
        aria-haspopup={true}
        aria-expanded={!menuHidden}
        aria-pressed={toggle ? !!checked : undefined} // aria-pressed attribute should only be present for toggle buttons
        aria-describedby={mergeAriaAttributeValues(ariaDescribedBy, keytipAttributes ? keytipAttributes['aria-describedby'] : undefined)}
        className={classNames && classNames.splitButtonContainer}
        onKeyDown={this._onSplitButtonContainerKeyDown}
        onTouchStart={this._onTouchStart}
        ref={this._splitButtonContainer}
        data-is-focusable={true}
        onClick={!disabled && !primaryDisabled ? this._onSplitButtonPrimaryClick : undefined}
        tabIndex={!disabled || allowDisabledFocus ? 0 : undefined}
        aria-roledescription={buttonProps['aria-roledescription']}
        onFocusCapture={this._onSplitContainerFocusCapture}
      >
        <span style={{ display: 'flex' }}>
          {this._onRenderContent(tag, buttonProps)}
          {this._onRenderSplitButtonMenuButton(classNames, keytipAttributes)}
          {this._onRenderSplitButtonDivider(classNames)}
        </span>
      </div>
    );

    return keytipProps ? (
      <KeytipData keytipProps={keytipProps} disabled={disabled}>
        {(keytipAttributes: any): JSX.Element => SplitButton(keytipAttributes)}
      </KeytipData>
    ) : (
      SplitButton()
    );
  }

  private _onSplitContainerFocusCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    const container = this._splitButtonContainer.current;

    // If the target is coming from the portal we do not need to set focus on the container.
    if (!container || (ev.target && portalContainsElement(ev.target, container))) {
      return;
    }

    // We should never be able to focus the individual buttons in a split button. Focus
    // should always remain on the container.
    container.focus();
  };

  private _onSplitButtonPrimaryClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!this.state.menuHidden) {
      this._dismissMenu();
    }

    if (!this._processingTouch && this.props.onClick) {
      this.props.onClick(ev);
    } else if (this._processingTouch) {
      this._onMenuClick(ev);
    }
  };

  private _onRenderSplitButtonDivider(classNames: ISplitButtonClassNames | undefined): JSX.Element | null {
    if (classNames && classNames.divider) {
      return <span className={classNames.divider} aria-hidden={true} />;
    }
    return null;
  }

  private _onRenderSplitButtonMenuButton(classNames: ISplitButtonClassNames | undefined, keytipAttributes: any): JSX.Element {
    const { allowDisabledFocus, checked, disabled, splitButtonMenuProps, splitButtonAriaLabel } = this.props;
    const { menuHidden } = this.state;
    let menuIconProps = this.props.menuIconProps;

    if (menuIconProps === undefined) {
      menuIconProps = {
        iconName: 'ChevronDown'
      };
    }

    const splitButtonProps = {
      ...splitButtonMenuProps,
      styles: classNames,
      checked: checked,
      disabled: disabled,
      allowDisabledFocus: allowDisabledFocus,
      onClick: this._onMenuClick,
      menuProps: undefined,
      iconProps: { ...menuIconProps, className: this._classNames.menuIcon },
      ariaLabel: splitButtonAriaLabel,
      'aria-haspopup': true,
      'aria-expanded': !menuHidden,
      'data-is-focusable': false
    };

    // Add data-ktp-execute-target to the split button if the keytip is defined
    return (
      <BaseButton
        {...splitButtonProps}
        data-ktp-execute-target={keytipAttributes ? keytipAttributes['data-ktp-execute-target'] : keytipAttributes}
        onMouseDown={this._onMouseDown}
        tabIndex={-1}
      />
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>) => {
    // explicity cancelling event so click won't fire after this
    if (this.props.disabled && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else if (!this.props.disabled) {
      if (this.props.menuProps) {
        this._onMenuKeyDown(ev);
      } else if (this.props.onKeyDown !== undefined) {
        this.props.onKeyDown(ev); // not cancelling event because it's not disabled
      }
    }
  };

  private _onKeyUp = (ev: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>) => {
    if (!this.props.disabled && this.props.onKeyUp !== undefined) {
      this.props.onKeyUp(ev); // not cancelling event because it's not disabled
    }
  };

  private _onKeyPress = (ev: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>) => {
    if (!this.props.disabled && this.props.onKeyPress !== undefined) {
      this.props.onKeyPress(ev); // not cancelling event because it's not disabled
    }
  };

  private _onMouseUp = (ev: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>) => {
    if (!this.props.disabled && this.props.onMouseUp !== undefined) {
      this.props.onMouseUp(ev); // not cancelling event because it's not disabled
    }
  };

  private _onMouseDown = (ev: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>) => {
    if (!this.props.disabled && this.props.onMouseDown !== undefined) {
      this.props.onMouseDown(ev); // not cancelling event because it's not disabled
    }
  };

  private _onClick = (ev: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>) => {
    if (!this.props.disabled) {
      if (this.props.menuProps) {
        this._onMenuClick(ev);
      } else if (this.props.onClick !== undefined) {
        this.props.onClick(ev); // not cancelling event because it's not disabled
      }
    }
  };

  private _onSplitButtonContainerKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      if (this._buttonElement.current) {
        this._buttonElement.current.click();
        ev.preventDefault();
        ev.stopPropagation();
      }
    } else {
      this._onMenuKeyDown(ev);
    }
  };

  private _onMenuKeyDown = (ev: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    const isUp = ev.which === KeyCodes.up;
    const isDown = ev.which === KeyCodes.down;

    if (!ev.defaultPrevented && this._isValidMenuOpenKey(ev)) {
      const { onMenuClick } = this.props;
      if (onMenuClick) {
        onMenuClick(ev, this);
      }

      this._onToggleMenu(false);
      ev.preventDefault();
      ev.stopPropagation();
    }

    if (!(ev.altKey || ev.metaKey) && (isUp || isDown)) {
      // Suppose a menu, with shouldFocusOnMount: false, is open, and user wants to keyboard to the menu items
      // We need to re-render the menu with shouldFocusOnMount as true.

      if (!this.state.menuHidden && this.props.menuProps) {
        const currentShouldFocusOnMount =
          this._menuShouldFocusOnMount !== undefined ? this._menuShouldFocusOnMount : this.props.menuProps.shouldFocusOnMount;
        if (!currentShouldFocusOnMount) {
          ev.preventDefault();
          ev.stopPropagation();
          this._menuShouldFocusOnMount = true;
          this.forceUpdate();
        }
      }
    }
  };

  private _onTouchStart: () => void = () => {
    if (this._isSplitButton && this._splitButtonContainer.current && !('onpointerdown' in this._splitButtonContainer.current)) {
      this._handleTouchAndPointerEvent();
    }
  };

  private _onPointerDown(ev: PointerEvent) {
    if (ev.pointerType === 'touch') {
      this._handleTouchAndPointerEvent();

      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  }

  private _handleTouchAndPointerEvent() {
    // If we already have an existing timeeout from a previous touch and pointer event
    // cancel that timeout so we can set a nwe one.
    if (this._lastTouchTimeoutId !== undefined) {
      this._async.clearTimeout(this._lastTouchTimeoutId);
      this._lastTouchTimeoutId = undefined;
    }
    this._processingTouch = true;

    this._lastTouchTimeoutId = this._async.setTimeout(() => {
      this._processingTouch = false;
      this._lastTouchTimeoutId = undefined;
    }, TouchIdleDelay);
  }

  /**
   * Returns if the user hits a valid keyboard key to open the menu
   * @param ev - the keyboard event
   * @returns True if user clicks on custom trigger key if enabled or alt + down arrow if not. False otherwise.
   */
  private _isValidMenuOpenKey(ev: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>): boolean {
    if (this.props.menuTriggerKeyCode) {
      return ev.which === this.props.menuTriggerKeyCode;
    } else if (this.props.menuProps) {
      return ev.which === KeyCodes.down && (ev.altKey || ev.metaKey);
    }

    // Note: When enter is pressed, we will let the event continue to propagate
    // to trigger the onClick event on the button
    return false;
  }

  private _onMenuClick = (ev: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>) => {
    const { onMenuClick } = this.props;
    if (onMenuClick) {
      onMenuClick(ev, this);
    }

    if (!ev.defaultPrevented) {
      // When Edge + Narrator are used together (regardless of if the button is in a form or not), pressing
      // "Enter" fires this method and not _onMenuKeyDown. Checking ev.nativeEvent.detail differentiates
      // between a real click event and a keypress event (detail should be the number of mouse clicks).
      // ...Plot twist! For a real click event in IE 11, detail is always 0 (Edge sets it properly to 1).
      // So we also check the pointerType property, which both Edge and IE set to "mouse" for real clicks
      // and "" for pressing "Enter" with Narrator on.
      const shouldFocusOnContainer = ev.nativeEvent.detail !== 0 || (ev.nativeEvent as PointerEvent).pointerType === 'mouse';
      this._onToggleMenu(shouldFocusOnContainer);
      ev.preventDefault();
      ev.stopPropagation();
    }
  };
}
