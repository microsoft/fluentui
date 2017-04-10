/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  OverflowResizer
} from '../index';

export class OverflowSetBasicExample extends BaseComponent<any, any> {

  public render() {
    return (
      <OverflowResizer
        updatedOverflowState={ (prevState, props) => {
          let { measuredOverflowItems, measuredItems } = prevState;

          for (let item of measuredItems) {
            if (item.small !== true) {
              item.small = true;
              return { measuredItems, measuredOverflowItems };
            }
          }

          measuredOverflowItems.push(measuredItems.pop());
          return { measuredItems, measuredOverflowItems }
        } }
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
        overflowSetProps={ {
          onRenderItem: (item, i) => {
            return (
              <DefaultButton
                icon={ item.icon }
                menuProps={ item.subMenuProps }
                text={ item.small ? null : item.name }
              >  </DefaultButton>
            );
          }
        } }
      />

    );
  }
}