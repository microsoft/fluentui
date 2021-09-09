import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuProps } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';

// FIXME need to redeclare types since type import is under a @ts-ignore
type MenuOpenEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;

export const ControllingOpenAndClose = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (event: MenuOpenEvents, data: { open: boolean }) => {
    setOpen(data.open);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(e.target.checked);
  };

  return (
    <div>
      <label style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
        open
        <input type="checkbox" name="state" value="open" checked={open} onChange={onChange} />
      </label>

      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger>
          <Button>Toggle menu</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

ControllingOpenAndClose.parameters = {
  docs: {
    description: {
      story: [
        'The opening and close of the `Menu` can be controlled with your own state.',
        'The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate',
        'event.',
        '',
        '_When controlling the open state of the `Menu`, extra effort is required to ensure that interactions are_',
        '_still approriate and that keyboard accessibility does not degrade._',
      ].join('\n'),
    },
  },
};
