import * as React from 'react';
import './Link.scss';
import { css } from '../../utilities/css';

export default class Link extends React.Component<React.HTMLProps<HTMLLinkElement>, any> {

  constructor(props: React.HTMLProps<HTMLLinkElement>) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  public render() {
    let { children, className, href } = this.props;

    return (
      href ? (
      <a
        { ...this.props as any }
        className={ css('ms-Link', className) }
        role='link'
        onClick={ this._onClick }>
        { children }
      </a>
      ) : (
      <div
        { ...this.props as any }
        className={ css('ms-Link', className) }
        role='button'
        data-is-focusable='true'
        onClick={ this._onClick }>
        { children }
      </div>
      ));
  }

  private _onClick(ev: React.MouseEvent) {
    let { onClick } = this.props;

    if (onClick) {
      onClick(ev);
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}
