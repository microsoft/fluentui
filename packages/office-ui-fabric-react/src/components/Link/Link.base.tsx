import * as React from 'react';
import {
  anchorProperties,
  BaseComponent,
  buttonProperties,
  classNamesFunction,
  customizable,
  getNativeProps,
  createRef
} from '../../Utilities';
import {
  ILink,
  ILinkProps,
  ILinkStyleProps,
  ILinkStyles
} from './Link.types';
import { KeytipData } from '../../KeytipData';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>();

@customizable('Link', ['theme', 'getStyles'])
export class LinkBase extends BaseComponent<ILinkProps, any> implements ILink {
  private _link = createRef<HTMLAnchorElement | HTMLButtonElement | null>();

  public render(): JSX.Element {
    const { disabled, children, className, href, theme, getStyles, keytipProps } = this.props;

    const classNames = getClassNames(getStyles!, {
      className,
      isButton: !href,
      isDisabled: disabled,
      theme: theme!
    });

    const anchorNativeProps = getNativeProps(this.props, anchorProperties);
    const buttonNativeProps = getNativeProps(this.props, buttonProperties);

    const anchorElement: JSX.Element = (
      <KeytipData
        keytipProps={ keytipProps }
        ariaDescribedBy={ (anchorNativeProps as any)['aria-describedby'] }
        disabled={ disabled }
      >
        { (keytipAttributes: any): JSX.Element => (
          <a
            { ...anchorNativeProps }
            { ...keytipAttributes }
            className={ classNames.root }
            onClick={ this._onClick }
            ref={ this._link }
            target={ this.props.target }
            aria-disabled={ disabled }
          >
            { children }
          </a>
        ) }
      </KeytipData>
    );

    const buttonElement: JSX.Element = (
      <KeytipData
        keytipProps={ keytipProps }
        ariaDescribedBy={ (buttonNativeProps as any)['aria-describedby'] }
        disabled={ disabled }
      >
        { (keytipAttributes: any): JSX.Element => (
          <button
            { ...buttonNativeProps }
            { ...keytipAttributes }
            className={ classNames.root }
            onClick={ this._onClick }
            ref={ this._link }
            aria-disabled={ disabled }
          >
            { children }
          </button>
        ) }
      </KeytipData>
    );

    return href ? anchorElement : buttonElement;
  }

  public focus() {
    if (this._link.current) {
      this._link.current.focus();
    }
  }

  private _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const { onClick, disabled } = this.props;

    if (disabled) {
      ev.preventDefault();
    } else if (onClick) {
      onClick(ev);
    }
  }
}
