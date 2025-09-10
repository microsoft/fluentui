import '@testing-library/jest-dom';
import * as React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as renderer from 'react-test-renderer';
import { CommandBar } from './CommandBar';

afterEach(() => {
  cleanup();
  // Remove any leftover callouts appended to document.body
  document.body.innerHTML = '';
});

describe('CommandBar deprecated', () => {
  it('renders commands correctly (snapshot)', () => {
    const tree = renderer
      .create(
        <CommandBar
          items={[
            { key: '1', name: 'asdf' },
            { key: '2', name: 'asdf' },
          ]}
          className="TestClassName"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('opens a menu with subMenuProps.items', () => {
    render(
      <CommandBar
        items={[
          {
            name: 'TestText 1',
            key: 'TestKey1',
            className: 'MenuItem',
            subMenuProps: {
              items: [
                {
                  name: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass',
                },
              ],
            },
          },
        ]}
      />,
    );
    // The top-level button should be in the document
    const menuButton = screen.getByText('TestText 1');
    expect(menuButton).toBeInTheDocument();

    // Click to open submenu
    userEvent.click(menuButton);

    // Submenu item should appear
    expect(screen.getByText('SubmenuText 1')).toBeInTheDocument();
    expect(document.querySelector('.SubMenuClass')).toBeTruthy();
  });

  it('keeps menu open after update if item is still present', () => {
    const initialItems = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: { items: [{ name: 'SubmenuText 1', key: 'SubmenuKey1', className: 'SubMenuClass' }] },
      },
    ];
    const { rerender } = render(<CommandBar items={initialItems} />);

    const menuButton = screen.getByText('TestText 1');
    userEvent.click(menuButton);
    expect(screen.getByText('SubmenuText 1')).toBeInTheDocument();

    // Update props: add a second item
    rerender(<CommandBar items={[...initialItems, { name: 'Test Key 2', key: 'TestKey2' }]} />);

    // Submenu remains open
    expect(screen.getByText('SubmenuText 1')).toBeInTheDocument();
  });

  it('closes menu after update if item is no longer present', () => {
    const initialItems = [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: { items: [{ name: 'SubmenuText 1', key: 'SubmenuKey1', className: 'SubMenuClass' }] },
      },
    ];
    const { rerender } = render(<CommandBar items={initialItems} />);

    const menuButton = screen.getByText('TestText 1');
    userEvent.click(menuButton);
    expect(screen.getByText('SubmenuText 1')).toBeInTheDocument();

    // Update props: remove all items
    rerender(<CommandBar items={[]} />);

    // Submenu should be closed
    expect(screen.queryByText('SubmenuText 1')).not.toBeInTheDocument();
  });

  it('updates menu after update if subMenuProps change', () => {
    const makeItems = (subClass: string) => [
      {
        name: 'TestText 1',
        key: 'TestKey1',
        subMenuProps: { items: [{ name: 'SubmenuText 1', key: 'SubmenuKey1', className: subClass }] },
      },
    ];
    const { rerender } = render(<CommandBar items={makeItems('SubMenuClass')} />);

    const menuButton = screen.getByText('TestText 1');
    userEvent.click(menuButton);
    expect(document.querySelector('.SubMenuClass')).toBeTruthy();

    // Re-render with updated submenu item class
    rerender(<CommandBar items={makeItems('SubMenuClassUpdate')} />);

    // Submenu stays open with updated class
    expect(document.querySelector('.SubMenuClassUpdate')).toBeTruthy();
  });
});
