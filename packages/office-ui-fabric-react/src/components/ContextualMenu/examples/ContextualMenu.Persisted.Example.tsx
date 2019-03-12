// @codepen
import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuPersistedExample extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      showCallout: false
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          text="Click for ContextualMenu"
          persistMenu={true}
          menuProps={{
            shouldFocusOnMount: true,
            shouldFocusOnContainer: true,
            items: [
              {
                key: 'newItem',
                text: 'New',
                onClick: () => console.log('New clicked')
              },
              {
                key: 'divider_1',
                itemType: ContextualMenuItemType.Divider
              },
              {
                key: 'rename',
                text: 'Rename',
                onClick: () => console.log('Rename clicked')
              },
              {
                key: 'edit',
                text: 'Edit',
                onClick: () => console.log('Edit clicked')
              },
              {
                key: 'properties',
                text: 'Properties',
                onClick: () => console.log('Properties clicked')
              },
              {
                key: 'linkNoTarget',
                text: 'Link same window',
                href: 'http://bing.com'
              },
              {
                key: 'linkWithTarget',
                text: 'Link new window',
                href: 'http://bing.com',
                target: '_blank'
              },
              {
                key: 'linkWithOnClick',
                name: 'Link click',
                href: 'http://bing.com',
                onClick: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
                  alert('Link clicked');
                  ev.preventDefault();
                },
                target: '_blank'
              },
              {
                key: 'disabled',
                text: 'Disabled item',
                disabled: true,
                onClick: () => console.error('Disabled item should not be clickable.')
              }
            ]
          }}
        />
      </div>
    );
  }
}
