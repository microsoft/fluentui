import * as React from 'react';

import { MenuList, MenuItemCheckbox, MenuItemCheckboxProps } from '../../index';
import { Container } from './Container';

import { EditIcon } from '../../tmp-icons.stories';

const MemoCheckbox = React.memo((props: MenuItemCheckboxProps) => {
  // use icons in the memo because JSX will always create a new object
  // possible to memoize icons but it can be overkill
  return (
    <MenuItemCheckbox icon={<EditIcon />} name={props.name} value={props.value}>
      {props.children}
    </MenuItemCheckbox>
  );
});

export const MemoCheckboxItems = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
