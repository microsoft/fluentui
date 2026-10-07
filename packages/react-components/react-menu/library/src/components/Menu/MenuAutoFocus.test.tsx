import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Menu } from './Menu';
import { MenuTrigger } from '../MenuTrigger';
import { MenuPopover } from '../MenuPopover';
import { MenuList } from '../MenuList';
import { MenuItem } from '../MenuItem';
import type { MenuProps } from './Menu.types';

jest.mock('@fluentui/react-tabster', () => {
  const actual = jest.requireActual('@fluentui/react-tabster');
  // JSDOM has no layout for Tabster's visibility checks; browser tests cover real focus discovery.
  const findFirstFocusable = (container: HTMLElement | null) =>
    container?.querySelector<HTMLElement>('[role="menuitem"]');
  return {
    ...actual,
    useFocusFinders: () => ({ ...actual.useFocusFinders(), findFirstFocusable }),
  };
});

describe('Menu autofocus opt-out', () => {
  const Example = (props: Omit<MenuProps, 'children'>) => (
    <Menu {...props}>
      <MenuTrigger disableButtonEnhancement>
        <button>Trigger</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>First item</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  it.each([undefined, false])('focuses the first item by default (%s)', disableAutoFocus => {
    const { getByRole } = render(<Example defaultOpen unstable_disableAutoFocus={disableAutoFocus} />);
    expect(getByRole('menuitem')).toHaveFocus();
  });

  it('preserves external focus on controlled opens, rerenders, closes and reopens', () => {
    const input = render(<input aria-label="Editor" />).getByRole('textbox');
    input.focus();
    const { rerender, getByRole } = render(<Example open={false} unstable_disableAutoFocus />);
    rerender(<Example open unstable_disableAutoFocus />);
    expect(getByRole('menuitem')).not.toHaveFocus();
    expect(input).toHaveFocus();
    rerender(<Example open unstable_disableAutoFocus hoverDelay={100} />);
    expect(input).toHaveFocus();
    rerender(<Example open={false} unstable_disableAutoFocus />);
    expect(input).toHaveFocus();
    rerender(<Example open unstable_disableAutoFocus />);
    expect(input).toHaveFocus();
  });

  it('restores trigger focus after deliberate entry even with autofocus disabled', () => {
    const { getByRole } = render(<Example defaultOpen unstable_disableAutoFocus />);
    getByRole('menuitem').focus();
    fireEvent.keyDown(getByRole('menuitem'), { key: 'Escape' });
    expect(getByRole('button')).toHaveFocus();
  });

  it('starts autofocusing if the opt-out is turned off while open', () => {
    const { getByRole, rerender } = render(<Example open unstable_disableAutoFocus />);
    rerender(<Example open unstable_disableAutoFocus={false} />);
    expect(getByRole('menuitem')).toHaveFocus();
  });
});
