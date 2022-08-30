import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextualMenuItemType, DefaultButton } from '@fluentui/react';

describe('ContextualMenu in React 18', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  const menuProps = {
    shouldFocusOnMount: true,
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
    const { baseElement, getByRole, queryAllByRole } = render(
      <React.StrictMode>
        <MenuButton />
      </React.StrictMode>,
    );

    expect(queryAllByRole('menu').length).toBe(0);

    const menuTrigger = getByRole('button');
    userEvent.click(menuTrigger);

    expect(queryAllByRole('menu').length).toBe(1);

    const callOutElement = baseElement.getElementsByClassName('ms-ContextualMenu-Callout')[0];
    const callOutElementStyle = callOutElement.getAttribute('style') as string;
    // The above test is not enough since the ContextualMenu is still present in the DOM, it's just not
    // visible. This checks if ContextualMenu is rendered on screen correctly.
    expect(callOutElementStyle.includes('opacity: 0')).toBeFalsy();
  });
});
