import { Dropdown, Flex } from '@fluentui/react-northstar';
import * as React from 'react';

const inputItems = ['Robert Tolbert', 'Wanda Howard', 'Tim Deboer', 'Amanda Brady'];

const DropdownExampleDisabled = () => {
  return (
    <Flex column gap="gap.smaller">
      <Dropdown disabled items={inputItems} placeholder="Select your hero, if you can ..." />
      <Dropdown disabled search items={inputItems} placeholder="Start typing a name, if you can ..." />
    </Flex>
  );
};

export default DropdownExampleDisabled;
