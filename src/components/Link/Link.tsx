import * as React from 'react';
import { css } from '../../utilities/css';
import './Link.scss';

export class Link extends React.Component<React.HTMLProps<HTMLLinkElement>, any> {

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
      <button
        { ...this.props as any }
        className={ css('ms-Link', className) }
        role='button'
        onClick={ this._onClick }>
        { children }
      </button>
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
