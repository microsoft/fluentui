import * as React from 'react';
import {
  anchorProperties,
  autobind,
  BaseComponent,
  buttonProperties,
  classNamesFunction,
  customizable,
  getNativeProps
} from '../../Utilities';
import {
  ILink,
  ILinkProps,
  ILinkStyleProps,
  ILinkStyles
} from './Link.types';
import { KeytipHost } from '../../Keytip';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>();

@customizable('Link', ['theme', 'getStyles'])
export class LinkBase extends BaseComponent<ILinkProps, any> implements ILink {
  private _link: HTMLElement;

  public render() {
    const { disabled, children, className, href, theme, getStyles, keytipProps } = this.props;

    const classNames = getClassNames(getStyles!, {
      className,
      isButton: !href,
      isDisabled: disabled,
      theme: theme!
    });

    const anchorElement: JSX.Element = (
      <KeytipHost keytipProps={ keytipProps }>
        { (keytipAttributes: any): JSX.Element => (
          <a
            { ...keytipAttributes }
            { ...getNativeProps(this.props, anchorProperties) }
            className={ classNames.root }
            onClick={ this._onClick }
            ref={ this._resolveRef('_link') }
            target={ this.props.target }
            aria-disabled={ disabled }
          >
            { children }
          </a>
        ) }
      </KeytipHost>
    );

    const buttonElement: JSX.Element = (
      <KeytipHost keytipProps={ keytipProps }>
        { (keytipAttributes: any): JSX.Element => (
          <button
            { ...keytipAttributes }
            { ...getNativeProps(this.props, buttonProperties) }
            className={ classNames.root }
            onClick={ this._onClick }
            ref={ this._resolveRef('_link') }
            aria-disabled={ disabled }
          >
            { children }
          </button>
        ) }
      </KeytipHost>
    );

    return href ? anchorElement : buttonElement;
  }

  public focus() {
    if (this._link) {
      this._link.focus();
    }
  }

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    const { onClick, disabled } = this.props;

    if (disabled) {
      ev.preventDefault();
    } else if (onClick) {
      onClick(ev);
    }
  }
}
