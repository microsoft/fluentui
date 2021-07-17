import * as React from 'react';

import { MenuList, MenuItemRadio, MenuItemRadioProps } from '../../index';
import { Container } from './Container';

import { EditIcon } from '../../tmp-icons.stories';

const MemoRadio = React.memo((props: MenuItemRadioProps) => {
  // use icons in the memo because JSX will always create a new object
  // possible to memoize icons but it can be overkill
  return (
    <MenuItemRadio icon={<EditIcon />} name={props.name} value={props.value}>
      {props.children}
    </MenuItemRadio>
  );
});

export const MemoRadioItems = () => {
  return (
    <Container>
      <MenuList>
        <MemoRadio name="font" value="segoe">
          Segoe
        </MemoRadio>
        <MemoRadio name="font" value="calibri">
          Calibri
        </MemoRadio>
        <MemoRadio name="font" value="arial">
          Arial
        </MemoRadio>
      </MenuList>
    </Container>
  );
};

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
