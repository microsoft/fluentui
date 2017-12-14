import * as React from 'react';
import {
  BaseComponent,
  anchorProperties,
  autobind,
  buttonProperties,
  getId,
  getNativeProps,
  customizable,
  nullRender
} from '../../../Utilities';
import { hiddenContentStyle, mergeStyles } from '../../../Styling';
import { Icon } from '../../../Icon';
import { IButtonBaseProps, IButtonBase, IButtonBaseStyleProps, IButtonBaseStyles } from './Button.base.types';
import {
  classNamesFunction
} from '../../../Utilities';

const getClassNames = classNamesFunction<IButtonBaseStyleProps, IButtonBaseStyles>();

@customizable('ButtonBase', ['theme'])
export class ButtonBase extends BaseComponent<IButtonBaseProps, {}> implements IButtonBase {

  public static defaultProps = {
    forceWrapper: false
  };

  private _classNames: {[key in keyof IButtonBaseStyles]: string };
  private _buttonElement: HTMLElement;
  private _labelId: string;
  private _descriptionId: string;
  private _ariaDescriptionId: string;

  constructor(props: IButtonBaseProps, rootClassName: string) {
    super(props);

    this._labelId = getId();
    this._descriptionId = getId();
    this._ariaDescriptionId = getId();
  }

  public render(): JSX.Element {
    const {
      theme,
      className,
      disabled,
      href,
      checked,
      primary,
      getStyles,
      expanded,
      forceWrapper,
      labelId = this._labelId,
      onRenderIcon = this._onRenderIcon,
      onRenderAriaDescription = this._onRenderAriaDescription,
      onRenderChildren = this._onRenderChildren,
      onRenderMenuIcon = this._onRenderMenuIcon,
      onRenderPrefix,
      onRenderSuffix
    } = this.props;

    // Anchor tag cannot be disabled hence in disabled state rendering
    // anchor button as normal button
    const renderAsAnchor: boolean = !disabled && !!href;

    const nativeProps = this._getNativeProps(this.props, renderAsAnchor);

    const { ariaDescribedBy, ariaLabelledBy, ariaLabel } = this._getAriaProps(this.props, nativeProps);

    this._classNames = getClassNames(getStyles!, { theme: theme!, disabled, checked, expanded, primary });

    const RootType = renderAsAnchor ? 'a' : 'button';

    const renderWrapper: boolean = !!onRenderPrefix || !!onRenderSuffix || !!forceWrapper;

    const Button = (
      <RootType
        {...nativeProps}
        className={ mergeStyles(this._classNames.button, className) }
        type={ !renderAsAnchor && 'button' }
        disabled={ disabled }
        data-is-focusable={ ((this.props as any)['data-is-focusable'] === false || disabled) ? false : true }
        aria-pressed={ checked }
        aria-label={ ariaLabel }
        aria-labelledby={ ariaLabelledBy }
        aria-describedby={ ariaDescribedBy }
        data-target-id={ !renderWrapper && this.props.labelId ? labelId : null }
      >
        { onRenderIcon(this.props, this._onRenderIcon) }
        { this._onRenderTextContents(this.props) }
        { onRenderAriaDescription(this.props, this._onRenderAriaDescription) }
        { onRenderChildren(this.props, this._onRenderChildren) }
        { onRenderMenuIcon(this.props, this._onRenderMenuIcon) }
      </RootType>
    );

    if (renderWrapper) {
      return (
        <div
          data-target-id={ renderWrapper && this.props.labelId ? labelId : null }
          className={ mergeStyles(this._classNames.root, className + '-root') }>
          { onRenderPrefix && onRenderPrefix() }
          { Button }
          { onRenderSuffix && onRenderSuffix() }
        </div>
      );
    }

    return Button;
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }

  @autobind
  private _getNativeProps(props: IButtonBaseProps, renderAsAnchor: boolean) {
    return getNativeProps(
      props,
      renderAsAnchor ? anchorProperties : buttonProperties,
      ['disabled']
    );
  }

  @autobind
  private _onRenderIcon(props: IButtonBaseProps): JSX.Element | null {
    return props.iconProps ? <Icon className={ this._classNames.icon } {...props.iconProps} /> : null;
  }

  @autobind
  private _onRenderMenuIcon(props: IButtonBaseProps): JSX.Element | null {
    return props.menuIconProps ? <Icon className={ this._classNames.menuIcon } {...props.menuIconProps} /> : null;
  }

  @autobind
  private _onRenderTextContents(props: IButtonBaseProps): JSX.Element | null {
    let {
      description,
      children,
      text = typeof (children) === 'string' ? children : undefined, // default to children if children is string
      onRenderText = this._onRenderText,
      onRenderDescription = this._onRenderDescription
    } = props;

    if (
      text
      || description
      || this.props.onRenderText && this.props.onRenderText !== nullRender
      || this.props.onRenderDescription && this.props.onRenderDescription !== nullRender
    ) {
      return (
        <div className={ this._classNames.textContainer } >
          { onRenderText({ ...props, text }, this._onRenderText) }
          { onRenderDescription(props, this._onRenderDescription) }
        </div>
      );
    }

    return null;
  }

  @autobind
  private _onRenderText(props: IButtonBaseProps): JSX.Element | null {
    let {
      text,
      labelId = this._labelId
    } = props;

    if (text) {
      return (
        <div
          key={ labelId }
          className={ this._classNames.label }
          id={ labelId }
        >
          { text }
        </div>
      );
    }

    return null;
  }

  @autobind
  private _onRenderDescription(props: IButtonBaseProps): JSX.Element | null {
    const {
    description,
      descriptionId = this._descriptionId
    } = this.props;

    if (description) {
      return (
        <div
          key={ descriptionId }
          className={ this._classNames.description }
          id={ descriptionId }
        >
          { description }
        </div>
      );
    }

    return null;
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
  private _onRenderAriaDescription(props: IButtonBaseProps): JSX.Element | null {
    const {
      ariaDescriptionId = this._ariaDescriptionId,
      ariaDescription
    } = this.props;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    if (ariaDescription) {
      return (
        <span className={ mergeStyles(hiddenContentStyle) } id={ ariaDescriptionId }>{ ariaDescription }</span>
      );
    }

    return null;
  }

  private _getAriaProps(props: IButtonBaseProps, nativeProps: {}) {
    let ariaDescribedBy: string | null = null;
    let ariaLabelledBy: string | null = null;
    let nativeAriaDescribedBy: string | null = (nativeProps as any)['aria-describedby'];
    let nativeAriaLabelledBy: string | null = (nativeProps as any)['aria-labelledby'];

    if (props.ariaDescription) {
      ariaDescribedBy = this._ariaDescriptionId;
    } else if (props.description) {
      ariaDescribedBy = this._descriptionId;
    } else if (nativeAriaDescribedBy) {
      ariaDescribedBy = nativeAriaDescribedBy;
    }

    if (!props.ariaLabel) {
      if (nativeAriaLabelledBy) {
        ariaLabelledBy = nativeAriaLabelledBy;
      } else if (ariaDescribedBy) {
        ariaLabelledBy = props.text ? this._labelId : null;
      }
    }

    return {
      ariaDescribedBy,
      ariaLabelledBy,
      ariaLabel: props.ariaLabel,
      ariaHidden: props.ariaHidden,
      ariaDescription: props.ariaDescription
    };
  }
}