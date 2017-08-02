/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, css } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import {
  OverflowSet
} from 'office-ui-fabric-react/lib/OverflowSet';

import * as stylesImport from './OverflowSet.Example.scss';
const styles: any = stylesImport;

export class OverflowSetCustomExample extends BaseComponent<any, any> {

  public render() {
    return (
      <OverflowSet
        items={ [
          {
            key: 'search',
            onRender: (item: any) => {
              return (
                <SearchBox
                  labelText='Search'
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
        onRenderOverflowButton={ (overflowItems) => {
          return (
            <DefaultButton
              className={ css(styles.overflowButton) }
              iconProps={ { iconName: 'More' } }
              menuIconProps={ undefined }
              menuProps={ { items: overflowItems! } }
            />
          );
        } }
        onRenderItem={ (item) => {
          if (item.onRender) {
            return (
              item.onRender(item)
            );
          }
          return (
            <DefaultButton
              iconProps={ { iconName: item.icon } }
              menuProps={ item.subMenuProps }
              text={ item.name }
            >  </DefaultButton>
          );
        } }
      />
    );
  }
}