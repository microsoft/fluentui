import * as React from 'react';
import { mount } from '@cypress/react';
import { ContextualMenuItemType, DefaultButton, DirectionalHint } from '@fluentui/react';

const menuTriggerSelector = '[type="button"]';
const menuSelector = '[role="menu"]';

describe('ContextualMenu in React 18', () => {
  const menuProps = {
    shouldFocusOnMount: true,
    directionalHint: DirectionalHint.bottomLeftEdge,
    items: [
      { key: 'newItem', text: 'New', onClick: () => console.log('New clicked') },
      { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
      { key: 'rename', text: 'Rename', onClick: () => console.log('Rename clicked') },
      { key: 'edit', text: 'Edit', onClick: () => console.log('Edit clicked') },
      { key: 'properties', text: 'Properties', onClick: () => console.log('Properties clicked') },
      { key: 'linkNoTarget', text: 'Link same window', href: 'http://bing.com' },
      { key: 'linkWithTarget', text: 'Link new window', href: 'http://bing.com', target: '_blank' },
      {
        key: 'disabled',
        text: 'Disabled item',
        disabled: true,
        onClick: () => console.error('Disabled item should not be clickable.'),
      },
    ],
  };

  const MenuButton = () => {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
    );
  };
  it('renders ContextualMenu when trigger button is clicked', () => {
    mount(
      <React.StrictMode>
        <MenuButton />
      </React.StrictMode>,
    );

    cy.get(menuTriggerSelector).click().get(menuSelector).should('be.visible');
  });
});
