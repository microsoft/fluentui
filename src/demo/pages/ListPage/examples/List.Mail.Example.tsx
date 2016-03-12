import * as React from 'react';
import {
  List
} from '../../../../components/index';
import './List.Mail.Example.scss';

export class MailTile extends React.Component<any, any> {
  public render() {
    let { item } = this.props;
    return (
      <div className="ms-ListItem is-unread is-selectable">
        <span className="ms-ListItem-primaryText">{ item.name }</span>
        <span className="ms-ListItem-secondaryText">{ item.title }</span>
        <span className="ms-ListItem-tertiaryText">{ item.description }</span>
        <span className="ms-ListItem-metaText">2:42p</span>
        <div className="ms-ListItem-selectionTarget js-toggleSelection"></div>
        <div className="ms-ListItem-actions">
          <div className="ms-ListItem-action"></div>
          <div className="ms-ListItem-action"></div>
          <div className="ms-ListItem-action"></div>
          <div className="ms-ListItem-action"></div>
        </div>
    </div>
    );
  }
}

export default class MailListExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Inbox</h1>
        <div className='MailList'>
          <List
            items={ createListItems(10000) }
            onRenderCell={ (item, index) => (
              <MailTile item={ item } />
            )}
          />
        </div>
      </div>
    );
  }
}

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');


// Create a set of test items, complete with random lorem-ipsum descriptions.
function createListItems(count: number): any {
  return Array.apply(null, Array(count)).map((item, index) => ({
    key: 'item-' + index,
    name: lorem(2),
    title: lorem(2 + Math.round(Math.random() * 4)),
    description: lorem(10 + Math.round(Math.random() * 50))
  }));
}

function lorem(wordCount: number): string {
  return Array.apply(null, Array(wordCount))
    .map(item => LOREM_IPSUM[Math.floor(Math.random() * LOREM_IPSUM.length)])
    .join(' ')
}
