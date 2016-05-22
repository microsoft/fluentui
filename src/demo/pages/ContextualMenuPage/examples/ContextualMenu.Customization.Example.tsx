import * as React from 'react';
import { css } from '../../../../utilities/css';
import { ContextualMenu } from '../../../../index';

export class ContextualMenuCustomizationExample extends React.Component<any, any> {
  public render() {
    return (
      <ContextualMenu
        shouldFocusOnMount={ false }
        items={
          [
            {
              key: 'newItem',
              icon: 'circlePlus',
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
              name: 'New'
            },
            {
              key: 'upload',
              icon: 'upload',
              name: 'Upload'
            },
            {
              key: 'divider_1',
              name: '-',
            },
            {
              key: 'charm',
              name: 'Charm',
              items: [
                {
                  key: 'none',
                  name: 'None'
                },
                {
                  key: 'cat',
                  name: 'cat',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'dog',
                  name: 'dog',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'plane',
                  name: 'plane',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'page',
                  name: 'page',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'firstAid',
                  name: 'firstAid',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'trophy',
                  name: 'trophy',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'home',
                  name: 'home',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'pill',
                  name: 'pill',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'briefcase',
                  name: 'briefcase',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'coffee',
                  name: 'coffee',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'people',
                  name: 'people',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'stopwatch',
                  name: 'stopwatch',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'music',
                  name: 'music',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                },
                {
                  key: 'bag',
                  name: 'bag',
                  onRender: this._renderCharmMenuItem,
                  className: 'ms-ContextualMenu-customizationExample-item'
                }
              ]
            },
            {
              key: 'categories',
              name: 'Categorize',
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
                  name: '-',
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
            }
          ]
        }
      />
    );
  }

  private _renderCharmMenuItem(item: any) {
    return <i className={ css('ms-Icon', 'ms-ContextualMenu-customizationExample-icon', 'ms-Icon--' + item.name) } />;
  }

  private _renderCategoriesList(item: any) {
    return (
      <ul className='ms-ContextualMenu-customizationExample-categoriesList'>
        <li className='ms-ContextualMenu-item'>
          { item.categoryList.map( category =>
            <button className='ms-ContextualMenu-link' role='menuitem'>
              <div>
                <span
                  className='ms-ContextualMenu-icon ms-ContextualMenu-customizationExample-categorySwatch'
                  style={ {backgroundColor: category.color} }/>
                <span className='ms-ContextualMenu-itemText ms-font-m ms-font-weight-regular'>
                  { category.name }
                </span>
              </div>
            </button>
          )}
        </li>
      </ul>
      );
  }

}
