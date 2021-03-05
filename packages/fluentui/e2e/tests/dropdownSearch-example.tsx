import { Dropdown, dropdownSearchInputSlotClassNames } from '@fluentui/react-northstar';
import * as React from 'react';

export const selectors = {
  input: `.${dropdownSearchInputSlotClassNames.input}`,
};

const DropdownSearchExample = () => <Dropdown items={['Bar', 'Baz', 'Qux']} search />;

export default DropdownSearchExample;
