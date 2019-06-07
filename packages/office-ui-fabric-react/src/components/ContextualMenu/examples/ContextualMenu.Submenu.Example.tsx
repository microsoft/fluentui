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
        <TextField
          value={String(this.state.hoverDelay)}
          label="Hover delay (ms)"
          type="number"
          onChange={this._onHoverDelayChanged}
          styles={{
            subComponentStyles: {
              label: { root: { display: 'inline-block', marginRight: '10px' } }
            },
            fieldGroup: { display: 'inline-flex', maxWidth: '100px' },
            wrapper: { display: 'block', marginBottom: '10px' }
          }}
        />
        <DefaultButton
          text="Click for ContextualMenu"
          menuProps={{
            shouldFocusOnMount: true,
            subMenuHoverDelay: this.state.hoverDelay,
            items: [
              {
                key: 'newItem',
                subMenuProps: {
                  items: [
                    {
                      key: 'emailMessage',
                      text: 'Email message',
                      title: 'Create an email'
                    },
                    {
                      key: 'calendarEvent',
                      text: 'Calendar event',
                      title: 'Create a calendar event'
                    }
                  ]
                },
                href: 'https://bing.com',
                text: 'New',
                target: '_blank'
              },
              {
                key: 'share',
                subMenuProps: {
                  items: [
                    {
                      key: 'sharetotwitter',
                      text: 'Share to Twitter'
                    },
                    {
                      key: 'sharetofacebook',
                      text: 'Share to Facebook'
                    },
                    {
                      key: 'sharetoemail',
                      text: 'Share to Email',
                      subMenuProps: {
                        items: [
                          {
                            key: 'sharetooutlook_1',
                            text: 'Share to Outlook',
                            title: 'Share to Outlook'
                          },
                          {
                            key: 'sharetogmail_1',
                            text: 'Share to Gmail',
                            title: 'Share to Gmail'
                          }
                        ]
                      }
                    }
                  ]
                },
                text: 'Share'
              },
              {
                key: 'shareSplit',
                split: true,
                'aria-roledescription': 'split button',
                subMenuProps: {
                  items: [
                    {
                      key: 'sharetotwittersplit',
                      text: 'Share to Twitter'
                    },
                    {
                      key: 'sharetofacebooksplit',
                      text: 'Share to Facebook'
                    },
                    {
                      key: 'sharetoemailsplit',
                      text: 'Share to Email',
                      subMenuProps: {
                        items: [
                          {
                            key: 'sharetooutlooksplit_1',
                            text: 'Share to Outlook',
                            title: 'Share to Outlook'
                          },
                          {
                            key: 'sharetogmailsplit_1',
                            text: 'Share to Gmail',
                            title: 'Share to Gmail'
                          }
                        ]
                      }
                    }
                  ]
                },
                text: 'Share w/ Split'
              }
            ]
          }}
        />
      </div>
    );
  }

  private _onHoverDelayChanged = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => {
    this.setState({
      hoverDelay: Number(newValue) || 0
    });
  };
}
