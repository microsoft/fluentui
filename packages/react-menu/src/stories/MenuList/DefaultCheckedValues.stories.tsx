import * as React from 'react';
import { MenuList } from '../../index';
import { CheckboxItems } from './CheckboxItems.stories';

export const DefaultCheckedValues = () => <CheckboxItems defaultCheckedValues={{ edit: ['cut'] }} />;

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
