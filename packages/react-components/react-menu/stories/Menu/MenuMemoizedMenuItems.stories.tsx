import * as React from 'react';
import { Button, Menu, MenuTrigger, MenuList, MenuItemCheckbox, MenuPopover } from '@fluentui/react-components';
import { EditFilled, EditRegular, bundleIcon } from '@fluentui/react-icons';
import type { MenuItemCheckboxProps } from '@fluentui/react-components';

const EditIcon = bundleIcon(EditFilled, EditRegular);

const MemoCheckbox = React.memo((props: MenuItemCheckboxProps) => {
  // use icons in the memo because JSX will always create a new object
  // possible to memoize icons but it can be overkill
  return (
    <MenuItemCheckbox icon={<EditIcon />} name={props.name} value={props.value}>
      {props.children}
    </MenuItemCheckbox>
  );
});

export const MemoizedMenuItems = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Toggle menu</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MemoCheckbox name="font" value="segoe">
            Segoe
          </MemoCheckbox>
          <MemoCheckbox name="font" value="calibri">
            Calibri
          </MemoCheckbox>
          <MemoCheckbox name="font" value="arial">
            Arial
          </MemoCheckbox>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

MemoizedMenuItems.parameters = {
  docs: {
    description: {
      story: [
        '⚠️ _Rerendering menu items is a cheap operation and React philosophy encourages rerenders._',
        '_Memoization is not free, so use it only when there are concrete benefits to doing so._',
        '',
        'Memoized menu items can be created using [React.memo](https://reactjs.org/docs/react-api.html#reactmemo)',
        'to optimize rerenders of menu items if their props have not changed. Can be useful for selectable items,',
        'since each selection will rerender all items in the menu by default.',
      ].join('\n'),
    },
  },
};
