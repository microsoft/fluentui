import * as React from 'react';
import {
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useFocusFinders,
  useId,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

export const ExternalEditableTrigger = (): JSXElement => {
  const [triggerElement, setTriggerElement] = React.useState<HTMLInputElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const listRef = React.useRef<HTMLDivElement>(null);
  const enterMenuRef = React.useRef(false);
  const menuId = useId('commands');
  const { findFirstFocusable } = useFocusFinders();

  React.useEffect(() => {
    if (open && enterMenuRef.current) {
      enterMenuRef.current = false;
      findFirstFocusable(listRef.current)?.focus();
    }
  }, [open, findFirstFocusable]);

  return (
    <>
      <Input
        aria-label="Find commands"
        value={query}
        input={{
          ref: setTriggerElement,
          'aria-haspopup': 'menu',
          'aria-expanded': open,
          'aria-controls': open ? menuId : undefined,
        }}
        onChange={(_, data) => {
          setQuery(data.value);
          setOpen(true);
        }}
        onClick={() => setOpen(true)}
        onKeyDown={event => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (open) {
              findFirstFocusable(listRef.current)?.focus();
            } else {
              enterMenuRef.current = true;
              setOpen(true);
            }
          } else if (event.key === 'Escape' && open) {
            event.preventDefault();
            event.stopPropagation();
            setOpen(false);
          } else if (event.key === 'Tab') {
            setOpen(false);
          }
        }}
      />
      <Menu
        open={open}
        onOpenChange={(_, data) => setOpen(data.open)}
        unstable_disableAutoFocus
        unstable_triggerElement={triggerElement}
      >
        <MenuPopover>
          <MenuList id={menuId} ref={listRef} aria-label="Commands" aria-labelledby={undefined}>
            <MenuItem>New document</MenuItem>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuItem>Share</MenuItem>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Copy link</MenuItem>
                  <MenuItem>Send a copy</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

ExternalEditableTrigger.parameters = {
  docs: {
    description: {
      story: [
        'Experimental external-trigger composition: typing or clicking opens commands without moving focus from the input.',
        'Press ArrowDown to move DOM focus into the menu, then use normal Menu navigation, including nested menus.',
        'The text does not filter commands. This is not a combobox or an aria-activedescendant implementation.',
        'Registration supplies containment, focus restoration, and a positioning fallback, not input event handlers or ARIA.',
        'The owner supplies keyboard entry, input Tab/Escape dismissal, expanded state, and an explicit MenuList name.',
        'Focus restoration does not reopen the menu because opening is driven by editing or clicking, not onFocus.',
        'Only opening autofocus is suppressed; submenu defaults, close restoration, and native Tab progression are retained.',
      ].join(' '),
    },
  },
};
