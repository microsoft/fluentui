import * as React from 'react';
import { ContextualMenu, DirectionalHint, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import './ContextualMenuExample.scss';

export interface IContextualMenuMultiselectExampleState {
  selection?: { [key: string]: boolean };
  isContextMenuVisible?: boolean;
}

export class ContextualMenuCustomizationExample extends React.Component<any, IContextualMenuMultiselectExampleState> {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
    this.state = {
      selection: {},
      isContextMenuVisible: false
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          onClick={ this._onClick }
          className='ContextualMenuButton3'
          text='Click for ContextualMenu'
        />
        { this.state.isContextMenuVisible ? (
          <ContextualMenu
            target='.ContextualMenuButton3'
            shouldFocusOnMount={ false }
            onDismiss={ this._onDismiss }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            className='ms-ContextualMenu-customizationExample'
            items={
              [
                {
                  key: 'newItem',
                  icon: 'Add',
                  subMenuProps: {
                    items: [
                      {
                        key: 'emailMessage',
                        name: 'Email message',
                      },
                      {
                        key: 'calendarEvent',
                        name: 'Calendar event',
                      }
                    ],
                  },
                  name: 'New'
                },
                {
                  key: 'upload',
                  icon: 'Upload',
                  name: 'Upload'
                },
                {
                  key: 'divider_1',
                  itemType: ContextualMenuItemType.Divider
                },
                {
                  key: 'charm',
                  name: 'Charm',
                  className: 'Charm-List',
                  subMenuProps: {
                    arrowDirection: FocusZoneDirection.bidirectional,
                    items: [
                      {
                        key: 'none',
                        name: 'None'
                      },
                      {
                        key: 'bulb',
                        name: 'Lightbulb',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'run',
                        name: 'Running',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'plane',
                        name: 'Airplane',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'page',
                        name: 'Page',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'cake',
                        name: 'Cake',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'soccer',
                        name: 'Soccer',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'home',
                        name: 'Home',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'emoji',
                        name: 'Emoji2',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'work',
                        name: 'Work',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'coffee',
                        name: 'Coffee',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'people',
                        name: 'People',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'stopwatch',
                        name: 'Stopwatch',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'music',
                        name: 'MusicInCollectionFill',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      },
                      {
                        key: 'lock',
                        name: 'Lock',
                        onRender: this._renderCharmMenuItem,
                        className: 'ms-ContextualMenu-customizationExample-item'
                      }
                    ]
                  },
                },
                {
                  key: 'categories',
                  name: 'Categorize',
                  subMenuProps: {
                    items: [
                      {
                        key: 'categories',
                        name: 'categories',
                        categoryList: [
                          {
                            name: 'Personal',
                            color: 'yellow'
                          },
                          {
                            name: 'Work',
                            color: 'green'
                          },
                          {
                            name: 'Birthday',
                            color: 'blue'
                          },
                          {
                            name: 'Spam',
                            color: 'grey'
                          },
                          {
                            name: 'Urgent',
                            color: 'red'
                          },
                          {
                            name: 'Hobbies',
                            color: 'black'
                          },
                        ],
                        onRender: this._renderCategoriesList
                      },
                      {
                        key: 'divider_1',
                        itemType: ContextualMenuItemType.Divider
                      },
                      {
                        key: 'clear',
                        name: 'Clear categories'
                      },
                      {
                        key: 'manage',
                        name: 'Manage categories'
                      }
                    ]
                  },
                }
              ]
            }
          />) : null }
      </div>
    );
  }

  private _renderCharmMenuItem(item: any) {
    return (
      <IconButton
        iconProps={ { iconName: item.name } }
        className='ms-ContextualMenu-customizationExample-icon ms-ContextualMenu-link'
        data-is-focusable={ true }
      />
    );
  }

  private _renderCategoriesList(item: any) {
    return (
      <ul className='ms-ContextualMenu-customizationExample-categoriesList'>
        <li className='ms-ContextualMenu-item'>
          { item.categoryList.map((category: any) =>
            <button className='ms-ContextualMenu-link' role='menuitem'>
              <div>
                <span
                  className='ms-ContextualMenu-icon ms-ContextualMenu-customizationExample-categorySwatch'
                  style={ { backgroundColor: category.color } } />
                <span className='ms-ContextualMenu-itemText'>
                  { category.name }
                </span>
              </div>
            </button>
          ) }
        </li>
      </ul>
    );
  }

  private _onClick(event: any) {
    this.setState({ isContextMenuVisible: true });
  }

  private _onDismiss(event: any) {
    this.setState({ isContextMenuVisible: false });
  }

}
