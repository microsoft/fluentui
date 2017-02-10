import * as React from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import './List.Mail.Example.scss';

export class MailTile extends React.Component<any, any> {
  public render() {
    let { item } = this.props;
    return (
      <div className='ms-ListItem is-unread is-selectable'>
        <span className='ms-ListItem-primaryText'>{ item.name }</span>
        <span className='ms-ListItem-secondaryText'>{ item.title }</span>
        <span className='ms-ListItem-tertiaryText'>{ item.description }</span>
        <span className='ms-ListItem-metaText'>2:42p</span>
        <div className='ms-ListItem-selectionTarget js-toggleSelection'></div>
        <div className='ms-ListItem-actions'>
          <div className='ms-ListItem-action'></div>
          <div className='ms-ListItem-action'></div>
          <div className='ms-ListItem-action'></div>
          <div className='ms-ListItem-action'></div>
        </div>
      </div>
    );
  }
}

export interface IListMailExampleProps {
  items: any[];
}

export class ListMailExample extends React.Component<IListMailExampleProps, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Inbox</h1>
        <div className='MailList' data-is-scrollable={ true }>
          <List
            items={ this.props.items }
            onRenderCell={ (item, index) => (
              <MailTile item={ item } />
            ) }
          />
        </div>
      </div>
    );
  }
}
