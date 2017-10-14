import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuSubmenuExample extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <DefaultButton
          id='ContextualMenuButton2'
          text='Click for ContextualMenu'
          menuProps={ {
            shouldFocusOnMount: true,
            items: [
              {
                key: 'newItem',
                subMenuProps: {
                  items: [
                    {
                      key: 'emailMessage',
                      name: 'Email message',
                      title: 'Create an email'
                    },
                    {
                      key: 'calendarEvent',
                      name: 'Calendar event',
                      title: 'Create a calendar event',
                    }
                  ],
                },
                name: 'New'
              },
              {
                key: 'share',
                subMenuProps: {
                  items: [
                    {
                      key: 'sharetotwitter',
                      name: 'Share to Twitter',
                    },
                    {
                      key: 'sharetofacebook',
                      name: 'Share to Facebook',
                    },
                    {
                      key: 'sharetoemail',
                      name: 'Share to Email',
                      subMenuProps: {
                        items: [
                          {
                            key: 'sharetooutlook_1',
                            name: 'Share to Outlook',
                            title: 'Share to Outlook',
                          },
                          {
                            key: 'sharetogmail_1',
                            name: 'Share to Gmail',
                            title: 'Share to Gmail',
                          }
                        ],
                      },
                    },
                  ],
                },
                name: 'Share'
              }
            ]
          }
          }
        />
      </div>
    );
  }
}
