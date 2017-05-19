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
import * as stylesImport from './BaseButton.scss';
const styles: any = stylesImport;

export interface IButtonClassNames {
  base?: string;
  variant?: string;
  isDisabled?: string;
  isEnabled?: string;
  isToggled?: string;
  description?: string;
  flexContainer?: string;
  icon?: string;
  menuIcon?: string;
  label?: string;
  root?: string;
}

/**
 * These props are not in the Props file as they are undocumented props only specific to BaseButton.
 *
 * @export
 * @interface IBaseButtonProps
 * @extends {IButtonProps}
 */
export interface IBaseButtonProps extends IButtonProps {
  /**
   *  Custom class names for individual elements within the button DOM.
   */
  classNames?: IButtonClassNames;
}

export interface IBaseButtonState {
  menuProps?: IContextualMenuProps | null;
}

export class BaseButton extends BaseComponent<IBaseButtonProps, IBaseButtonState> implements IButton {

  public static defaultProps: IBaseButtonProps = {
    classNames: {
      base: 'ms-Button',
      variant: '',
      isEnabled: '',
      isDisabled: '',
      isToggled: ''
    }
  };

  private _buttonElement: HTMLButtonElement;
  private _labelId: string;
  private _descriptionId: string;
  private _ariaDescriptionId: string;

  constructor(props: IButtonProps, rootClassName: string) {
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
    const { description, ariaLabel, ariaDescription, href, disabled, toggled, classNames } = this.props;
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
        className: css(
          styles.root,
          this.props.className,
          classNames.base,
          classNames.variant,
          classNames.root,
          {
            'disabled': disabled,
            [classNames.isDisabled]: disabled,
            [classNames.isEnabled]: !disabled,
            [classNames.isToggled]: toggled
          }),
        ref: this._resolveRef('_buttonElement'),
        'disabled': disabled,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabel ? null : _labelId,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': disabled,
        'aria-pressed': toggled
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
      classNames,
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
    const className = css(classNames.base + '-flexContainer', styles.flexContainer, classNames.flexContainer);

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
    let { classNames, icon, iconProps } = this.props;

    if (icon || iconProps) {
      iconProps = iconProps || {
        iconName: icon
      } as IIconProps;
    }

    return iconProps && (
      <Icon { ...iconProps } className={ css(`${classNames.base}-icon`, classNames.icon, iconProps.className) } />
    );
  }

  @autobind
  private _onRenderText() {
    let { classNames, children, text } = this.props;

    // For backwards compat, we should continue to take in the text content from children.
    if (text === undefined && typeof (children) === 'string') {
      text = children;
    }

    return text && (
      <span className={ css(`${classNames.base}-label`, classNames.label) } id={ this._labelId } >
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
    const { classNames, description } = this.props;

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    return description ? (
      <span
        className={ css(`${classNames.base}-description`, classNames.description) }
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
    const { ariaDescription } = this.props;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    return ariaDescription ? (
      <span className={ styles.screenReaderOnly } id={ this._ariaDescriptionId }>{ ariaDescription }</span>
    ) : (
        null
      );
  }

  @autobind
  private _onRenderMenuIcon(props: IButtonProps): JSX.Element | null {
    let { classNames, menuIconProps, menuIconName } = this.props;

    if (menuIconProps === undefined) {
      menuIconProps = {
        iconName: menuIconName === undefined ? 'ChevronDown' : menuIconName
      };
    }

    return (
      menuIconProps ?
        <Icon
          { ...menuIconProps }
          className={ css(`${classNames.base}-icon`, classNames.menuIcon, menuIconProps.className) }
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
        className={ css('ms-BaseButton-menuhost', menuProps.className) }
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
