import * as React from 'react';
import { ContextualMenu } from '../../../../components/index';

export default class ContextualMenuBasicExample extends React.Component<any, any> {
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
              key: 'rename',
              name: 'Rename'
            },
            {
              key: 'properties',
              name: 'Properties'
            },
            {
              key: 'divider_2',
              name: '-',
            },
            {
              key: 'share',
              icon: 'share',
              items: [
                {
                  key: 'sharetoemail',
                  name: 'Share to Email',
                  icon: 'mail'
                },
                {
                  key: 'sharetofacebook',
                  name: 'Share to Facebook',
                },
                {
                  key: 'sharetotwitter',
                  name: 'Share to Twitter',
                  icon: 'share'
                },
              ],
              name: 'Share'
            },
            {
              key: 'print',
              icon: 'print',
              name: 'Print'
            },
            {
              key: 'music',
              icon: 'music',
              name: 'Music',
            },
          ]
        }
      />
    );
  }

}
