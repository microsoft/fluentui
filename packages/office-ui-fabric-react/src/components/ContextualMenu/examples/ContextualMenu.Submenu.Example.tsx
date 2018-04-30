import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './ContextualMenuExample.scss';

export interface IContextualMenuSubmenuExampleState {
  hoverDelay: number;
}

export class ContextualMenuSubmenuExample extends React.Component<any, IContextualMenuSubmenuExampleState> {

  constructor(props: any) {
    super(props);

    this.state = {
      hoverDelay: 250
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <TextField value={ String(this.state.hoverDelay) } onChanged={ this._onHoverDelayChanged } />
        <DefaultButton
          id='ContextualMenuButton2'
          text='Click for ContextualMenu'
          menuProps={ {
            shouldFocusOnMount: true,
            subMenuHoverDelay: this.state.hoverDelay,
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
                href: 'https://bing.com',
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
              },
              {
                key: 'shareSplit',
                onClick: () => alert('Split buttons!'),
                split: true,
                subMenuProps: {
                  items: [
                    {
                      key: 'sharetotwittersplit',
                      name: 'Share to Twitter',
                    },
                    {
                      key: 'sharetofacebooksplit',
                      name: 'Share to Facebook',
                    },
                    {
                      key: 'sharetoemailsplit',
                      name: 'Share to Email',
                      subMenuProps: {
                        items: [
                          {
                            key: 'sharetooutlooksplit_1',
                            name: 'Share to Outlook',
                            title: 'Share to Outlook',
                          },
                          {
                            key: 'sharetogmailsplit_1',
                            name: 'Share to Gmail',
                            title: 'Share to Gmail',
                          }
                        ],
                      },
                    },
                  ],
                },
                name: 'Share w/ Split'
              }
            ]
          }
          }
        />
      </div>
    );
  }

  private _onHoverDelayChanged = (newValue: string) => {
    this.setState({
      hoverDelay: +newValue
    });
  }
}
