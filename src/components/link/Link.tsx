import * as React from 'react';
import './Link.scss';

export interface IListItemProps {
  text: string;
  url: string;

}

export default class ListItem extends React.Component<IListItemProps, any> {
  render() {
    let { text, url } = this.props;

    return (
      <a href={ url } className='ms-Link'>{ text }</a>
    );
  }
}
