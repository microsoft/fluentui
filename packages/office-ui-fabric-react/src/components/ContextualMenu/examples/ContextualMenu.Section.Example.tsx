import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuSectionExample extends React.Component<any, any> {

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          id='ContextualMenuButton1'
          text='Click for ContextualMenu'
          menuProps={ {
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
                    },
                    {
                      key: 'deleteItem',
                      name: 'Delete',
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
                      name: 'Share'
                    },
                    {
                      key: 'print',
                      name: 'Print'
                    },
                    {
                      key: 'music',
                      name: 'Music',
                    },
                  ]
                }
              },
              {
                key: 'section',
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                  title: 'Navigation',
                  items: [
                    {
                      key: 'Bing',
                      name: 'Go to Bing',
                      href: 'http://www.bing.com'
                    }
                  ]
                }
              }
            ]
          }
          }
        />
      </div>
    );
  }
}
