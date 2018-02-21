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

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>();

@customizable('Link', ['theme', 'getStyles'])
export class LinkBase extends BaseComponent<ILinkProps, any> implements ILink {
  private _link: HTMLElement;

  public render() {
    const { disabled, children, className, href, theme, getStyles } = this.props;

    const classNames = getClassNames(getStyles!, {
      className,
      isButton: !href,
      isDisabled: disabled,
      theme: theme!
    });

    const anchorElement: JSX.Element = (
      <a
        { ...getNativeProps(this.props, anchorProperties) }
        className={ classNames.root }
        onClick={ this._onClick }
        ref={ this._resolveRef('_link') }
        target={ this.props.target }
        aria-disabled={ disabled }
      >
        { children }
      </a>
    );

    const buttonElement: JSX.Element = (
      <button
        { ...getNativeProps(this.props, buttonProperties) }
        className={ classNames.root }
        onClick={ this._onClick }
        ref={ this._resolveRef('_link') }
        aria-disabled={ disabled }
      >
        { children }
      </button>
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
    const { onClick } = this.props;

    if (onClick) {
      onClick(ev);
    }
  }
}
