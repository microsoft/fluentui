import * as React from 'react';
import './Link.scss';
import { css } from '../../utilities/css';

export default class Link extends React.Component<React.HTMLProps<HTMLLinkElement>, any> {
  public render() {
    let { children, className } = this.props;

    return (
      <a { ...this.props as any } className={ css('ms-Link', className) } role='link'>{ children }</a>
    );
  }
}
