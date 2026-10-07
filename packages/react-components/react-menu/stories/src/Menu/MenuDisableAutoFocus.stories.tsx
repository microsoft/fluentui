import * as React from 'react';
import {
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  useFocusFinders,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import type { JSXElement, MenuProps } from '@fluentui/react-components';

export const DisableAutoFocus = (): JSXElement => {
  const [input, setInput] = React.useState<HTMLInputElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const { findFirstFocusable } = useFocusFinders();
  const restoreFocusTarget = useRestoreFocusTarget();
  const onOpenChange: MenuProps['onOpenChange'] = (event, data) => {
    if (data.type === 'clickOutside' && event.target === input) {
      return;
    }
    setOpen(data.open);
  };

  return (
    <>
      <Input
        ref={setInput}
        {...restoreFocusTarget}
        aria-label="Find an action"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? 'editable-input-menu' : undefined}
        placeholder="Type to open actions"
        onChange={() => setOpen(true)}
        onKeyDown={event => {
          if (event.key === 'ArrowDown') {
            if (open) {
              findFirstFocusable(popoverRef.current)?.focus();
            }
            setOpen(true);
            event.preventDefault();
          } else if (event.key === 'Escape' || event.key === 'Tab') {
            setOpen(false);
          }
        }}
      />
      <Menu open={open} onOpenChange={onOpenChange} unstable_disableAutoFocus positioning={{ target: input }}>
        <MenuPopover ref={popoverRef}>
          <MenuList id="editable-input-menu">
            <MenuItem>New document</MenuItem>
            <MenuItem>Open document</MenuItem>
            <MenuItem>Save document</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

DisableAutoFocus.parameters = {
  docs: {
    description: {
      story: [
        '`unstable_disableAutoFocus` keeps focus in this editable input when the controlled Menu opens.',
        'It applies only to this Menu, not nested menus, and does not disable focus restoration on close.',
        'The consumer supplies accessible trigger semantics, deliberate keyboard entry (ArrowDown once open),',
        'and Escape/Tab dismissal while focus remains outside the MenuPopover.',
        'This is an action menu, not a combobox: query handling and any search-specific keyboard contract remain consumer responsibilities.',
      ].join(' '),
    },
  },
};
