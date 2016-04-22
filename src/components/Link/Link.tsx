import * as React from 'react';
import './Link.scss';
import { ILinkProps } from './Link.Props';

export default class Link extends React.Component<ILinkProps, any> {
  public render() {
    let { text, url, target } = this.props;

    return (
      <a href={ url } className='ms-Link' target={ target } role='link'>{ text }</a>
    );
  }
}
