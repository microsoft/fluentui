import * as React from 'react';
import {
  anchorProperties,
  autobind,
  BaseComponent,
  buttonProperties,
  classNamesFunction,
  css,
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
    let { disabled, children, className, href, theme, getStyles } = this.props;
    const classNames = getClassNames(getStyles!, {
      theme: theme!
    });

    return (
      href ? (
        <a
          { ...getNativeProps(this.props, anchorProperties) }
          // className={ css(
          //   'ms-Link',
          //   styles.root,
          //   className,
          //   disabled && ('is-disabled ' + styles.isDisabled),
          //   !disabled && styles.isEnabled
          // ) }
          className={ classNames.root }
          onClick={ this._onClick }
          ref={ this._resolveRef('_link') }
          target={ this.props.target }
          aria-disabled={ disabled }
        >
          { children }
        </a>
      ) : (
          <button
            { ...getNativeProps(this.props, buttonProperties) }
            // className={ css(
            //   'ms-Link',
            //   styles.root,
            //   className,
            //   disabled && ('is-disabled ' + styles.isDisabled),
            //   !disabled && styles.isEnabled
            // ) }
            className={ classNames.root }
            onClick={ this._onClick }
            ref={ this._resolveRef('_link') }
            aria-disabled={ disabled }
          >
            { children }
          </button>
        ));
  }

  public focus() {
    if (this._link) {
      this._link.focus();
    }
  }

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    let { onClick } = this.props;

    if (onClick) {
      onClick(ev);
    }
  }
}
