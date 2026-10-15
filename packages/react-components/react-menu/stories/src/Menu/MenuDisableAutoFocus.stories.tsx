import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useFocusFinders,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

export const DisableAutoFocus = (): JSXElement => {
  const [open, setOpen] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);
  const enterMenuRef = React.useRef(false);
  const { findFirstFocusable } = useFocusFinders();

  React.useEffect(() => {
    if (open && enterMenuRef.current) {
      enterMenuRef.current = false;
      findFirstFocusable(listRef.current)?.focus();
    }
  }, [open, findFirstFocusable]);

  return (
    <Menu
      open={open}
      onOpenChange={(_, data) => {
        enterMenuRef.current = false;
        setOpen(data.open);
      }}
      unstable_disableAutoFocus
    >
      <MenuTrigger disableButtonEnhancement>
        <Button
          onKeyDown={event => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              if (open) {
                findFirstFocusable(listRef.current)?.focus();
              } else {
                enterMenuRef.current = true;
                setOpen(true);
              }
            }
          }}
        >
          Toggle menu; Down Arrow enters commands
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList ref={listRef}>
          <MenuItem>New document</MenuItem>
          <MenuItem>Print document</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

DisableAutoFocus.parameters = {
  docs: {
    description: {
      story: [
        'The experimental unstable_disableAutoFocus prop lets an application own focus entry instead of automatically focusing the first menu item.',
        'This API example keeps focus on the trigger when the menu opens; press Down Arrow to explicitly enter the commands.',
        'Ordinary menus should retain the default autofocus behavior.',
        'The prop does not provide an editable-input search widget, external trigger registration, or v8 ContextualMenu compatibility.',
      ].join(' '),
    },
  },
};
