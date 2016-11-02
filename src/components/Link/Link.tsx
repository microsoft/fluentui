import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import {
  anchorProperties,
  autobind,
  buttonProperties,
  css,
  getNativeProps
} from '../../Utilities';
import { ILink, ILinkProps } from './Link.Props';
import './Link.scss';

interface IMyScreen extends Screen {
  left: number;
  top: number;
}

declare var screen: IMyScreen;

export class Link extends BaseComponent<ILinkProps, any> implements ILink {
  private _link: HTMLElement;

  public render() {
    let { disabled, children, className, href } = this.props;

    return (
      href ? (
        <a
          role='link'
          { ...getNativeProps(this.props, anchorProperties) }
          className={ css('ms-Link', className, {
            'is-disabled': disabled
          }) }
          onClick={ this._onClick }
          ref={ this._resolveRef('_link') }
        >
          { children }
        </a>
      ) : (
          <button
            role='button'
            { ...getNativeProps(this.props, buttonProperties) }
            className={ css('ms-Link', className, {
              'is-disabled': disabled
            }) }
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
