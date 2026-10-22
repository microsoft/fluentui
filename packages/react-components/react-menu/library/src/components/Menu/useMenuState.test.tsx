import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react';
import { useMergedRefs } from '@fluentui/react-utilities';
import {
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  renderMenu_unstable,
  useMenuContextValues_unstable,
  useMenuRestoreFocus_unstable,
  useMenuState_unstable,
} from '../../index';
import type { MenuProps } from '../../index';

const UnfocusedMenu = (props: MenuProps) => {
  const state = useMenuState_unstable(props);
  return renderMenu_unstable(state, useMenuContextValues_unstable(state));
};

const children: MenuProps['children'] = [
  <MenuTrigger key="trigger" disableButtonEnhancement>
    <button>Trigger</button>
  </MenuTrigger>,
  <MenuPopover key="popover">
    <MenuList>
      <MenuItem>First</MenuItem>
      <MenuItem>Second</MenuItem>
    </MenuList>
  </MenuPopover>,
];

describe('useMenuState_unstable', () => {
  it.each([{ defaultOpen: true }, { open: true }])('does not install opening focus for %j', props => {
    const { getByRole } = render(<UnfocusedMenu {...props}>{children}</UnfocusedMenu>);

    expect(getByRole('menu')).toBeInTheDocument();
    expect(getByRole('menuitem', { name: 'First' })).not.toHaveFocus();
    expect(getByRole('button', { name: 'Trigger' })).not.toHaveFocus();
  });

  it('supports controlled opening without installing focus', () => {
    const { rerender, queryByRole, getByRole } = render(<UnfocusedMenu open={false}>{children}</UnfocusedMenu>);
    expect(queryByRole('menu')).toBeNull();

    rerender(<UnfocusedMenu open>{children}</UnfocusedMenu>);

    expect(getByRole('menu')).toBeInTheDocument();
    expect(getByRole('menuitem', { name: 'First' })).not.toHaveFocus();
  });

  it('retains open changes and item dismissal through the public context/render boundary', () => {
    const onOpenChange = jest.fn();
    const { getByRole, queryByRole } = render(
      <UnfocusedMenu onOpenChange={onOpenChange} surfaceMotion={null}>
        {children}
      </UnfocusedMenu>,
    );

    fireEvent.click(getByRole('button', { name: 'Trigger' }));
    expect(getByRole('menu')).toBeInTheDocument();
    fireEvent.click(getByRole('menuitem', { name: 'Second' }));

    expect(queryByRole('menu')).toBeNull();
    expect(onOpenChange.mock.calls.map(([, data]) => data.open)).toEqual([true, false]);
    expect(onOpenChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ type: 'menuItemClick', bubble: true }),
    );
  });

  it('preserves selectable state and stable refs across state changes', () => {
    const onCheckedValueChange = jest.fn();
    const { result } = renderHook(() => useMenuState_unstable({ children, onCheckedValueChange }));
    const { triggerRef, menuPopoverRef, setOpen } = result.current;

    const { getByRole } = render(
      <button
        onClick={event => result.current.onCheckedValueChange(event, { name: 'commands', checkedItems: ['save'] })}
      >
        Select
      </button>,
    );
    fireEvent.click(getByRole('button'));

    expect(result.current.checkedValues).toEqual({ commands: ['save'] });
    expect(result.current.triggerRef).toBe(triggerRef);
    expect(result.current.menuPopoverRef).toBe(menuPopoverRef);
    expect(result.current.setOpen).toBe(setOpen);
    expect(onCheckedValueChange).toHaveBeenCalledTimes(1);
  });

  it('keeps checked values controlled', () => {
    const checkedValues = { commands: ['open'] };
    const onCheckedValueChange = jest.fn();
    const { result } = renderHook(() => useMenuState_unstable({ children, checkedValues, onCheckedValueChange }));

    const { getByRole } = render(
      <button
        onClick={event => result.current.onCheckedValueChange(event, { name: 'commands', checkedItems: ['save'] })}
      >
        Select
      </button>,
    );
    fireEvent.click(getByRole('button'));

    expect(result.current.checkedValues).toBe(checkedValues);
    expect(onCheckedValueChange).toHaveBeenCalledWith(expect.anything(), { name: 'commands', checkedItems: ['save'] });
  });
});

const RestorationFixture = ({ open }: { open: boolean }) => {
  const state = useMenuState_unstable({ open, children: <span /> });
  useMenuRestoreFocus_unstable(state);
  const triggerRef = useMergedRefs(state.triggerRef);
  const popoverRef = useMergedRefs(state.menuPopoverRef);

  return (
    <>
      <button ref={triggerRef}>Trigger</button>
      <div ref={popoverRef}>
        <button>Inside</button>
      </div>
      <button>Outside</button>
    </>
  );
};

describe('useMenuRestoreFocus_unstable', () => {
  it('does not focus the trigger on initial closed mount or unrelated rerenders', () => {
    const { getByRole, rerender } = render(<RestorationFixture open={false} />);
    rerender(<RestorationFixture open={false} />);
    expect(getByRole('button', { name: 'Trigger' })).not.toHaveFocus();
  });

  it('restores focus when closing while the exiting popover still contains focus', () => {
    const { getByRole, rerender } = render(<RestorationFixture open />);
    getByRole('button', { name: 'Inside' }).focus();

    rerender(<RestorationFixture open={false} />);

    expect(getByRole('button', { name: 'Trigger' })).toHaveFocus();
  });

  it('restores focus when closing after focus has fallen to body', () => {
    const { getByRole, rerender } = render(<RestorationFixture open />);
    const inside = getByRole('button', { name: 'Inside' });
    inside.focus();
    inside.blur();
    expect(document.body).toHaveFocus();

    rerender(<RestorationFixture open={false} />);

    expect(getByRole('button', { name: 'Trigger' })).toHaveFocus();
  });

  it('preserves intentionally external focus on close', () => {
    const { getByRole, rerender } = render(<RestorationFixture open />);
    getByRole('button', { name: 'Outside' }).focus();

    rerender(<RestorationFixture open={false} />);

    expect(getByRole('button', { name: 'Outside' })).toHaveFocus();
  });
});
