/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import {
  OverflowGroup, GutterWidth
} from 'office-ui-fabric-react/lib/OverflowGroup';
import { items } from './items';

export class OverflowGroupBasicExample extends BaseComponent<any, any> {

  public render() {
    return (
      <div>
        <OverflowGroup
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
          gutterWidth={ GutterWidth.medium }
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
        </OverflowGroup>

        <OverflowGroup
          gutterWidth={ GutterWidth.medium }
        >
          <DefaultButton>
            Hi There
          </DefaultButton>
          <DefaultButton>
            Hi There
          </DefaultButton>
        </OverflowGroup >
      </div>
    );
  }
}