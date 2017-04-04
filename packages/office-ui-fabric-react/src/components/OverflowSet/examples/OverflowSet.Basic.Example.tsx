/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import {
  OverflowSet
} from '../index';
import { items } from './items';

export class OverflowSetBasicExample extends BaseComponent<any, any> {

  public render() {
    return (
      <div>
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
              ['data-automation-id']: 'newItemMenu',
              subMenuProps: {
                items: [
                  {
                    key: 'emailMessage',
                    name: 'Email message',
                    icon: 'Mail',
                    ['data-automation-id']: 'newEmailButton'
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
              ['data-automation-id']: 'uploadButton'
            },
            {
              key: 'share',
              name: 'Share',
              icon: 'Share',
              onClick: () => { return; }
            }
          ]
          }
          onRenderItem={ (item, i) => {
            return (
              <DefaultButton
                text={ item.name }
                icon={ item.icon }
                onClick={ item.onClick }
                menuProps={ item.subMenuProps ? item.subMenuProps : null }
              >
              </DefaultButton>
            );
          } }
        >
        </OverflowSet>
      </div>
    );
  }
}