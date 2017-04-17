/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  OverflowSet
} from '../index';

export class OverflowSetBasicExample extends BaseComponent<any, any> {

  public render() {
    return (
      <OverflowSet
        items={ [
          {
            key: 'search',
            'onRender': () => {
              return (
                <SearchBox
                  onChange={ (newValue) => console.log('SearchBox onChange fired: ' + newValue) }
                  onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
                />
              );
            }
          },
          {
            key: 'newItem',
            name: 'New',
            icon: 'Add',
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: () => { return; },
            subMenuProps: {
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail',
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar'
                }
              ],
            },
          },
          {
            key: 'upload',
            name: 'Upload',
            icon: 'Upload',
            onClick: () => { return; },
          },
          {
            key: 'share',
            name: 'Share',
            icon: 'Share',
            onClick: () => { return; }
          }
        ] }
        overflowItems={ [
          {
            key: 'newItem',
            name: 'Add',
            icon: 'Add',
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: () => { return; },
            subMenuProps: {
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail',
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar'
                }
              ],
            },
          },
          {
            key: 'move',
            name: 'Move to...',
            icon: 'MoveToFolder',
            onClick: () => { return; }
          },
          {
            key: 'copy',
            name: 'Copy to...',
            icon: 'Copy',
            onClick: () => { return; }
          },
          {
            key: 'rename',
            name: 'Rename...',
            icon: 'Edit',
            onClick: () => { return; }
          },
          {
            key: 'disabled',
            name: 'Disabled...',
            icon: 'Cancel',
            disabled: true,
            onClick: () => { return; }
          }
        ]
        }
        onRenderItem={ (item, i) => {
          return (
            <DefaultButton
              icon={ item.icon }
              menuProps={ item.subMenuProps }
              text={ item.small ? null : item.name }
            >  </DefaultButton>
          );
        } }
      />
    );
  }
}