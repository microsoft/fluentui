import * as React from 'react';
import './Link.scss';

export interface ILinkProps {
  text: string;
  url: string;
  target?: string;
}

export default class Link extends React.Component<ILinkProps, any> {
  public render() {
    let { text, url, target } = this.props;

    return (
      <a href={ url } className='ms-Link' target={ target }>{ text }</a>
    );
  }
}
