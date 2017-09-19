import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuSectionExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showCallout: false
    };
  }

  public render() {
    let { showCallout } = this.state;

    return (
      <div>
        <DefaultButton
          id='ContextualMenuButton1'
          text='Click for ContextualMenu'
          menuProps={ {
            title: 'My Menu',
            items:
            [
              {
                key: 'section',
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                  topDivider: true,
                  bottomDivider: true,
                  title: 'Actions',
                  items: [
                    {
                      key: 'newItem',
                      name: 'New',
                      iconProps: {
                        iconName: 'Add'
                      },
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
                      }
                    },
                    {
                      key: 'upload',
                      onClick: () => {
                        this.setState({ showCallout: true });
                      },
                      iconProps: {
                        iconName: 'Upload',
                        style: {
                          color: 'salmon'
                        }
                      },
                      name: 'Upload (Custom Color)',
                      title: 'Upload a file'
                    }
                  ]
                }
              },
              {
                key: 'section',
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                  title: 'Social',
                  items: [
                    {
                      key: 'share',
                      iconProps: {
                        iconName: 'Share'
                      },
                      subMenuProps: {
                        items: [
                          {
                            key: 'sharetoemail',
                            name: 'Share to Email',
                            iconProps: {
                              iconName: 'Mail'
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
                              iconName: 'Share'
                            },
                            subMenuProps: {
                              items: [
                                {
                                  key: 'sharetoemail_1',
                                  name: 'Share to Email',
                                  title: 'Share to Email',
                                  iconProps: {
                                    iconName: 'Mail'
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
                                    iconName: 'Share'
                                  }
                                },
                              ],
                            },
                          },
                        ],
                      },
                      name: 'Share'
                    },
                    {
                      key: 'print',
                      iconProps: {
                        iconName: 'Print'
                      },
                      name: 'Print'
                    },
                    {
                      key: 'music',
                      iconProps: {
                        iconName: 'MusicInCollectionFill'
                      },
                      name: 'Music',
                    },

                  ]
                }
              }
            ]
          }
          }
        />
        { showCallout && (
          <Callout
            setInitialFocus={ true }
            onDismiss={ () => this.setState({ showCallout: false }) }
          >
            <DefaultButton
              onClick={ () => this.setState({ showCallout: false }) }
              text='Hello world'
            />
          </Callout>
        ) }
      </div>
    );
  }
}
