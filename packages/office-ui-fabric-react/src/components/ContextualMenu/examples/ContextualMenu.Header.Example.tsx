import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ContextualMenu, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import './ContextualMenuExample.scss';

export class ContextualMenuHeaderExample extends React.Component<{}, {}> {

  public render() {

    return (
      <DefaultButton
        id='ContextualMenuButton1'
        text='Click for ContextualMenu'
        menuProps={
          {
            shouldFocusOnMount: true,
            items: [
              {
                key: 'Actions',
                itemType: 2,
                name: 'Actions'
              },
              {
                key: 'upload',
                iconProps: {
                  iconName: 'Upload',
                  style: {
                    color: 'salmon'
                  }
                },
                name: 'Upload',
                title: 'Upload a file'
              },
              {
                key: 'rename',
                name: 'Rename'
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
                    },
                  ],
                },
                name: 'Sharing'
              },
              {
                key: 'navigation',
                itemType: 2,
                name: 'Navigation'
              },
              {
                key: 'properties',
                name: 'Properties'
              },
              {
                key: 'print',
                iconProps: {
                  iconName: 'Print'
                },
                name: 'Print'
              },

              {
                key: 'Bing',
                name: 'Go to Bing',
                href: 'http://www.bing.com'
              },
            ]
          } } />
    );
  }
}
