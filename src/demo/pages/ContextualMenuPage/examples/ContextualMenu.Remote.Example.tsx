import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContextualMenu, DirectionalHint, Button, getRTL } from '../../../../index';
import './ContextualMenuExample.scss';

export class ContextualMenuRemoteExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {isContextMenuVisible: false};
    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
  }

  public render() {
    return (
        <div>
          <Button onClick={this._onClick}> Click for ContextualMenu </Button>
            { this.state.isContextMenuVisible ? (
          <ContextualMenu
            shouldFocusOnMount={ true }
            targetElement={this.state.target}
            onDismiss={this._onDismiss}
            directionalHint={ getRTL() ? DirectionalHint.bottomRightEdge : DirectionalHint.bottomLeftEdge}
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
                  key: 'disabled',
                  name: 'Disabled item',
                  isDisabled: true,
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
                      icon: 'share',
                      items: [
                        {
                          key: 'sharetoemail_1',
                          name: 'Share to Email',
                          icon: 'mail'
                        },
                        {
                          key: 'sharetofacebook_1',
                          name: 'Share to Facebook',
                        },
                        {
                          key: 'sharetotwitter_1',
                          name: 'Share to Twitter',
                          icon: 'share'
                      },
                  ],
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
          />) : (null)}
      </div>
    );
  }

  private _onClick(event: any) {
    let win = window.open('/src/demo/pages/ContextualMenuPage/examples/Context.html', 'funWindow', 'height=500, width=500');
    let load: (ev: any) => void = (ev) => {
        let but = win.document.createElement('div');
        ReactDOM.render((<Button onClick={this._onNewClick.bind(this)} className='fancyButton'> Press me </Button>), but);
        win.document.body.appendChild(but);
      };
    if (win.addEventListener) {
      win.addEventListener('load', load);
    } else if (win.document.body.onload) {
      win.document.body.onload = load;
    }
  }

  private _onNewClick(event: any) {
    this.setState({target: event.currentTarget as HTMLElement, isContextMenuVisible: true});
  }
  private _onDismiss(event: any) {
    this.setState({isContextMenuVisible: false});
  }
}
