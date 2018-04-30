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

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>();

@customizable('Link', ['theme', 'getStyles'])
export class LinkBase extends BaseComponent<ILinkProps, any> implements ILink {
  private _link = createRef<HTMLAnchorElement | HTMLButtonElement | null>();

  public render(): JSX.Element {
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
        ref={ this._link }
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
        ref={ this._link }
        aria-disabled={ disabled }
      >
        { children }
      </button>
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
