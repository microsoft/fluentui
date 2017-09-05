import * as React from 'react';
import {
  BaseComponent,
  anchorProperties,
  autobind,
  buttonProperties,
  css,
  getNativeProps
} from '../../Utilities';
import { ILink, ILinkProps } from './Link.Props';
import * as stylesImport from './Link.scss';
const styles: any = stylesImport;

interface IMyScreen extends Screen {
  left: number;
  top: number;
}

export class Link extends BaseComponent<ILinkProps, any> implements ILink {
  private _link: HTMLElement;

  public render() {
    let { disabled, children, className, href } = this.props;

    return (
      href ? (
        <a
          { ...getNativeProps(this.props, anchorProperties) }
          className={ css(
            'ms-Link',
            styles.root,
            className,
            disabled && ('is-disabled ' + styles.isDisabled),
            !disabled && styles.isEnabled
          ) }
          onClick={ this._onClick }
          ref={ this._resolveRef('_link') }
          target={ this.props.target }
        >
          { children }
        </a>
      ) : (
          <button
            { ...getNativeProps(this.props, buttonProperties) }
            className={ css(
              'ms-Link',
              styles.root,
              className,
              disabled && ('is-disabled ' + styles.isDisabled)
            ) }
            onClick={ this._onClick }
            ref={ this._resolveRef('_link') }
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
