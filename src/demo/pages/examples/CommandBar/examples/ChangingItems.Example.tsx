import * as React from 'react';
import { CommandBar, ICommandBarItem } from '../../../../../components/CommandBar/index';

export interface IChangingItemsCommandBarState {
  items?: ICommandBarItem[];
  farItems?: ICommandBarItem[];
}

export default class ChangingItemsCommandBarExample extends React.Component<any, IChangingItemsCommandBarState> {
  private _changeTimerId;

  constructor() {
    super();

    this.state = {
      items: [
       {
          key: 'newItem',
          name: 'New',
          icon: 'circlePlus',
          items: [
            {
              key: 'emailMessage',
              name: 'Email message',
              icon: 'mail'
            },
            {
              key: 'calendarEvent',
              name: 'Calendar event',
              icon: 'calendar'
            }
          ]
        },
        {
          key: 'upload',
          name: 'Upload',
          icon: 'upload'
        },
        {
          key: 'share',
          name: 'Share',
          icon: 'share'
        },
        {
          key: 'download',
          name: 'Download',
          icon: 'download'
        },
        {
          key: 'move',
          name: 'Move to...',
          icon: 'folderMove'
          },
        {
          key: 'copy',
          name: 'Copy to...',
          icon: 'copy'
        },
        {
          key: 'rename',
          name: 'Rename...',
          icon: 'editBox'
        }      
      ],
      farItems: [    {
        key: 'sort',
        name: 'Sort',
        icon: 'sortLines'
      },
      {
        key: 'tile',
        name: 'Grid view',
        icon: 'tile'
      },
      {
        key: 'info',
        name: 'Info',
        icon: 'circleInfo'
      }
    ]}
  }

  public componentDidMount() {
    this._changeTimerId = window.setInterval(this._updateItems.bind(this), 5000);
  }

  public componentWillUnmount() {
    if (this._changeTimerId) {
      window.clearInterval(this._changeTimerId);
    }
  }

  public render() {

    return (
      <div className='ms-ChangedItemsCommandBarExample'>
        <CommandBar
          items={ this.state.items }
          farItems={ this.state.farItems }
        />
      </div>
    );
  }

  private _updateItems() {
    let renderedItems = this.state.items;
    let renderedFarItems = this.state.farItems;

    renderedItems.push(renderedItems.shift());
    renderedFarItems.push(renderedFarItems.shift());

    this.setState({
      items: renderedItems,
      farItems: renderedFarItems
    });
  }

}
