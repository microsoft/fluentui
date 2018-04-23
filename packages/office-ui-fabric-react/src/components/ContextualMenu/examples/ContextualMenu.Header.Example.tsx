import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuHeaderExample extends React.Component<{}, {}> {

  public render(): JSX.Element {

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
                  name: 'Upload',
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
                  name: 'Share'
                },
                subMenuProps: {
                  items: [
                    {
                      key: 'sharetoemail',
                      name: 'Share to Email',
                      iconProps: {
                        name: 'Mail'
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
                        name: 'Share'
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
                  name: 'Print'
                },
                name: 'Print'
              },

              {
                key: 'Bing',
                name: 'Go to Bing',
                href: 'http://www.bing.com'
              },
            ]
          } }
      />
    );
  }
}
