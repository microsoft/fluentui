/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Checkbox,
  Selection,
  MarqueeSelection,
  css,
  Menu,
  IMenuItemProps,
  IconName
} from '../../../../index';
import { createArray } from '../../../../utilities/array';
import './MenuExample.scss';

export class MenuBasicExample extends React.Component<{}, {}> {
  render() {
    return <Menu
    className='menu-BasicExample'
    items={
      [
        {
          key: 'newItem',
          iconProps: {
            iconName: IconName.Add
          },
          items: [
            {
              key: 'emailMessage',
              name: 'Email message',
              title: 'Create an email',
              onClick: this._onClick,
            },
            {
              key: 'calendarEvent',
              name: 'Calendar event',
              title: 'Create a calendar event',
            }
          ],
          name: 'New'
        },
        {
          key: 'upload',
          iconProps: {
            iconName: IconName.Upload,
            style: {
              color: 'salmon'
            }
          },
          onClick: this._onClick,
          name: 'Upload (Custom Color)',
          title: 'Upload a file'
        },
        {
          key: 'divider_1',
          name: '-',
        },
        {
          key: 'rename',
          name: 'Rename'
        },
        {
          key: 'properties',
          name: 'Properties'
        },
        {
          key: 'disabled',
          name: 'Disabled item',
          disabled: true,
        },
        {
          key: 'divider_2',
          name: '-',
        },
        {
          key: 'share',
          iconProps: {
            iconName: IconName.Share
          },
          items: [
            {
              key: 'sharetoemail',
              name: 'Share to Email',
              iconProps: {
                iconName: IconName.Mail
              },
            },
            {
              key: 'sharetofacebook',
              name: 'Share to Facebook',
            },
            {
              key: 'sharetotwitter',
              name: 'Share to Twitter',
              iconProps: {
                iconName: IconName.Share
              },
              items: [
                {
                  key: 'sharetoemail_1',
                  name: 'Share to Email',
                  title: 'Share to Email',
                  iconProps: {
                    iconName: IconName.Mail
                  },
                },
                {
                  key: 'sharetofacebook_1',
                  name: 'Share to Facebook',
                  title: 'Share to Facebook',
                },
                {
                  key: 'sharetotwitter_1',
                  name: 'Share to Twitter',
                  title: 'Share to Twitter',
                  iconProps: {
                    iconName: IconName.Share
                  }
                },
              ],
            },
          ],
          name: 'Share'
        },
        {
          key: 'print',
          iconProps: {
            iconName: IconName.Print
          },
          name: 'Print'
        },
        {
          key: 'music',
          iconProps: {
            iconName: IconName.MusicInCollectionFill
          },
          name: 'Music',
        },
        {
          key: 'divider_3',
          name: '-',
        },
        {
          key: 'Bing',
          name: 'Go to Bing',
          href: 'http://www.bing.com',
          onClick: this._onClick
        }
      ]
    } />
  }

  private _onClick(ev?: any, item?: IMenuItemProps) {
    console.log(item.name);
  }
}