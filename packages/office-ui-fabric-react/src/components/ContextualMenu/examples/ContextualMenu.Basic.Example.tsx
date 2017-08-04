import * as React from 'react';
import { ContextualMenu, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import './ContextualMenuExample.scss';

export class ContextualMenuBasicExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      isContextMenuVisible: false,
      showCallout: false
    };
    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
  }

  public render() {
    let { showCallout } = this.state;

    return (
      <div>
        <DefaultButton onClick={ this._onClick } id='ContextualMenuButton1' text='Click for ContextualMenu' />
        { this.state.isContextMenuVisible ? (
          <ContextualMenu
            shouldFocusOnMount={ true }
            target={ this.state.target }
            onDismiss={ this._onDismiss }
            directionalHint={ getRTL() ? DirectionalHint.bottomRightEdge : DirectionalHint.bottomLeftEdge }
            items={
              [
                {
                  key: 'newItem',
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
                  },
                  name: 'New'
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
                },
                {
                  key: 'divider_1',
                  itemType: ContextualMenuItemType.Divider
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
                  itemType: ContextualMenuItemType.Divider
                },
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
                {
                  key: 'divider_3',
                  itemType: ContextualMenuItemType.Divider,
                },
                {
                  key: 'Bing',
                  name: 'Go to Bing',
                  target: '_blank',
                  href: 'http://www.bing.com'
                },
              ]
            }
          />) : (null) }

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

  private _onClick(event: React.MouseEvent<any>) {
    this.setState({ target: event.currentTarget, isContextMenuVisible: true });
  }

  private _onDismiss(event: any) {
    this.setState({ isContextMenuVisible: false });
  }
}
