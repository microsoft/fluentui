import * as React from 'react';
import { ContextualMenu, DirectionalHint, Button, getRTL, IconName } from '../../../../index';
import './ContextualMenuExample.scss';

export class ContextualMenuBasicExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = { isContextMenuVisible: false };
    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
  }

  public render() {
    return (
      <div>
        <Button onClick={ this._onClick } id='ContextualMenuButton1'> Click for ContextualMenu </Button>
        { this.state.isContextMenuVisible ? (
          <ContextualMenu
            shouldFocusOnMount={ true }
            targetElement='ContextualMenuButton1'
            onDismiss={ this._onDismiss }
            directionalHint={ getRTL() ? DirectionalHint.bottomRightEdge : DirectionalHint.bottomLeftEdge }
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
                      title: 'Create an email'
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
                  href: 'http://www.bing.com'
                },
              ]
            }
            />) : (null) }
      </div>
    );
  }

  private _onClick(event: any) {
    this.setState({ target: { x: event.clientX, y: event.clientY }, isContextMenuVisible: true });
  }

  private _onDismiss(event: any) {
    this.setState({ isContextMenuVisible: false });
  }
}
