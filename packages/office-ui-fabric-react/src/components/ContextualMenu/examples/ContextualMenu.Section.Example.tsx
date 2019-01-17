import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuSectionExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          id="ContextualMenuSectionExample"
          text="Click for ContextualMenu"
          menuProps={{
            items: [
              {
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                  key: 'section1',
                  topDivider: true,
                  bottomDivider: true,
                  title: 'Actions',
                  items: [
                    {
                      key: 'newItem',
                      text: 'New'
                    },
                    {
                      key: 'deleteItem',
                      text: 'Delete'
                    }
                  ]
                }
              },
              {
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                  key: 'section2',
                  title: 'Social',
                  items: [
                    {
                      key: 'share',
                      text: 'Share'
                    },
                    {
                      key: 'print',
                      text: 'Print'
                    },
                    {
                      key: 'music',
                      text: 'Music'
                    }
                  ]
                }
              },
              {
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                  key: 'section3',
                  title: 'Navigation',
                  items: [
                    {
                      key: 'Bing',
                      text: 'Go to Bing',
                      href: 'http://www.bing.com'
                    }
                  ]
                }
              }
            ]
          }}
        />
      </div>
    );
  }
}
