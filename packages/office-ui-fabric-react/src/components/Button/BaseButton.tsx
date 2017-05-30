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
  memoize
} from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { Icon, IIconProps } from '../../Icon';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ContextualMenu, IContextualMenuProps } from '../../ContextualMenu';
import { IButtonProps, IButton, IButtonStyles } from './Button.Props';

export interface IBaseButtonProps extends IButtonProps {
  baseClassName?: string;
  variantClassName?: string;
}

export interface IBaseButtonState {
  menuProps?: IContextualMenuProps | null;
}

interface IButtonClassNames {
  root?: string;
  flexContainer?: string;
  icon?: string;
  label?: string;
  menuIcon?: string;
  description?: string;
  screenReaderText?: string;
}

export class BaseButton extends BaseComponent<IBaseButtonProps, IBaseButtonState> implements IButton {

  public static defaultProps = {
    baseClassName: 'ms-Button',
    classNames: {},
    styles: {}
  };

  private _buttonElement: HTMLElement;
  private _labelId: string;
  private _descriptionId: string;
  private _ariaDescriptionId: string;
  private _classNames: IButtonClassNames;

  constructor(props: IBaseButtonProps, rootClassName: string) {
    super(props);

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

    this._classNames = this._getClassNames(
      styles,
      className,
      variantClassName,
      iconProps && iconProps.className,
      disabled,
      checked
    );

    const { _ariaDescriptionId, _labelId, _descriptionId } = this;
    const renderAsAnchor: boolean = !!href;
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
    } else if (nativeProps['aria-describedby']) {
      ariaDescribedBy = nativeProps['aria-describedby'];
    } else {
      ariaDescribedBy = null;
    }

    const buttonProps = assign(
      nativeProps,
      {
        className: this._classNames.root,
        ref: this._resolveRef('_buttonElement'),
        'disabled': disabled,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabel ? null : _labelId,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': disabled,
        'data-is-focusable': disabled ? false : true,
        'aria-pressed': checked
      }
    );

    // Override onClick if contextualMenuItems passed in. Eventually allow _onToggleMenu to
    // be assigned to split button click if onClick already has a value
    if (this.props.menuProps) {
      assign(
        buttonProps,
        {
          'onClick': this._onToggleMenu,
          'aria-expanded': this.state.menuProps ? true : false
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
      menuProps,
      onRenderIcon = this._onRenderIcon,
      onRenderText = this._onRenderText,
      onRenderDescription = this._onRenderDescription,
      onRenderAriaDescription = this._onRenderAriaDescription,
      onRenderChildren = this._onRenderChildren,
      onRenderMenu = this._onRenderMenu,
      onRenderMenuIcon = this._onRenderMenuIcon
    } = props;

    const className = mergeStyles(baseClassName + '-flexContainer', styles.flexContainer);

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
      <Icon { ...iconProps } className={ this._classNames.icon } />
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
      menuIconProps,
      styles
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
          className={
            mergeStyles(
              `${baseClassName}-icon`,
              styles.menuIcon,
              disabled && styles.menuIconDisabled,
              !disabled && checked && styles.menuIconChecked,
              menuIconProps.className
            ) as string }
        />
        :
        null
    );
  }

  @autobind
  private _onRenderMenu(menuProps: IContextualMenuProps): JSX.Element {
    return (
      <ContextualMenu
        isBeakVisible={ true }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        {...menuProps}
        className={ mergeStyles('ms-BaseButton-menuhost', menuProps.className) as string }
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

  @memoize
  private _getClassNames(
    styles: IButtonStyles,
    className: string,
    variantClassName: string,
    iconClassName: string,
    disabled: boolean,
    checked: boolean
    ): IButtonClassNames {
    return {
      root: mergeStyles(
        className,
        'ms-Button',
        variantClassName,
        styles.root,
        checked && [
          'is-checked',
          styles.rootChecked
        ],
        disabled && [
          'is-disabled',
          styles.rootDisabled
        ],
        !disabled && {
          ':hover': styles.rootHovered,
          ':hover .ms-Button-description': styles.descriptionHovered,
          ':active': styles.rootPressed,
          ':active .ms-Button-description': styles.descriptionPressed
        }
      ) as string,

      flexContainer: mergeStyles(
        'ms-Button-flexContainer',
        styles.flexContainer
      ) as string,

      icon: mergeStyles(
        'ms-Button-icon',
        iconClassName,
        styles.icon,
        checked && styles.iconChecked,
        disabled && styles.iconDisabled,
      ) as string,

      label: mergeStyles(
        'ms-Button-label',
        styles.label,
        checked && styles.labelChecked,
        disabled && styles.labelDisabled,
      ) as string,

      menuIcon: mergeStyles(
        'ms-Button-menuIcon',
        styles.menuIcon,
        checked && styles.menuIconChecked,
        disabled && styles.menuIconDisabled
      ) as string,

      description: mergeStyles(
        'ms-Button-description',
        styles.description,
        checked && styles.descriptionChecked,
        disabled && styles.descriptionDisabled
      ) as string,

      screenReaderText: mergeStyles(
        'ms-Button-screenReaderText',
        styles.screenReaderText
      ) as string
    };
  }
}
