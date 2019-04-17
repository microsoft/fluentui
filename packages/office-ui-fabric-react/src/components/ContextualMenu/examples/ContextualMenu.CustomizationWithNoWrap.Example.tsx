import * as React from 'react';
import { DirectionalHint, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import './ContextualMenuExample.scss';

export class ContextualMenuCustomizationWithNoWrapExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <DefaultButton
        className="ContextualMenuButton3"
        text="Click for ContextualMenu"
        menuProps={{
          shouldFocusOnMount: true,
          directionalHint: DirectionalHint.bottomLeftEdge,
          className: 'ms-ContextualMenu-customizationExample',
          items: [
            {
              key: 'newItem',
              text: 'New'
            },
            {
              key: 'upload',
              text: 'Upload'
            },
            {
              key: 'divider_1',
              itemType: ContextualMenuItemType.Divider
            },
            {
              key: 'charm',
              text: 'Charm',
              className: 'Charm-List',
              subMenuProps: {
                focusZoneProps: {
                  direction: FocusZoneDirection.bidirectional,
                  checkForNoWrap: true
                },
                items: [
                  {
                    key: 'bulb',
                    text: 'Lightbulb',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'run',
                    text: 'Running',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'plane',
                    text: 'Airplane',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'page',
                    text: 'Page',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'cake',
                    text: 'Cake',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'soccer',
                    text: 'Soccer',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'home',
                    text: 'Home',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'emoji',
                    text: 'Emoji2',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'work',
                    text: 'Work',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'coffee',
                    text: 'Coffee',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'people',
                    text: 'People',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'stopwatch',
                    text: 'Stopwatch',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'music',
                    text: 'MusicInCollectionFill',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'lock',
                    text: 'Lock',
                    onRender: this._renderCharmMenuItem,
                    className: 'ms-ContextualMenu-customizationExample-item'
                  },
                  {
                    key: 'item3',
                    text: 'Item 3',
                    'data-no-horizontal-wrap': true
                  },
                  {
                    key: 'item4',
                    text: 'Item 4',
                    'data-no-horizontal-wrap': true
                  }
                ]
              }
            },
            {
              key: 'categories',
              text: 'Categorize',
              subMenuProps: {
                items: [
                  {
                    key: 'categories',
                    text: 'categories',
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
                      }
                    ],
                    onRender: this._renderCategoriesList
                  },
                  {
                    key: 'divider_1',
                    itemType: ContextualMenuItemType.Divider
                  },
                  {
                    key: 'clear',
                    text: 'Clear categories'
                  },
                  {
                    key: 'manage',
                    text: 'Manage categories'
                  }
                ]
              }
            }
          ]
        }}
      />
    );
  }

  private _renderCharmMenuItem = (item: any, dismissMenu: () => void): JSX.Element => {
    return (
      <IconButton
        {...item}
        iconProps={{ iconName: item.text }}
        className="ms-ContextualMenu-customizationExample-icon ms-ContextualMenu-link"
        data-is-focusable={true}
        onClick={dismissMenu}
        data-no-vertical-wrap={true}
      />
    );
  };

  private _renderCategoriesList(item: any): JSX.Element {
    return (
      <ul className="ms-ContextualMenu-customizationExample-categoriesList">
        <li className="ms-ContextualMenu-item">
          {item.categoryList.map((category: any) => (
            <DefaultButton
              key={category.name}
              className="ms-ContextualMenu-link ms-ContextualMenu-customizationExample-button"
              role="menuitem"
            >
              <div>
                <span
                  className="ms-ContextualMenu-icon ms-ContextualMenu-customizationExample-categorySwatch"
                  style={{ backgroundColor: category.color }}
                />
                <span className="ms-ContextualMenu-itemText">{category.name}</span>
              </div>
            </DefaultButton>
          ))}
        </li>
      </ul>
    );
  }
}
