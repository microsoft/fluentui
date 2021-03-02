import { Dropdown, Divider } from '@fluentui/react-northstar';
import * as React from 'react';

const inputItems = ['Bruce Wayne'];

const DropdownCustomClearableExample = () => (
  <>
    <Dropdown
      defaultValue="Bruce Wayne"
      clearable
      items={inputItems}
      placeholder="Select your hero"
      clearIndicator={{ content: 'clear' }}
    />
    <Divider />
    <Dropdown
      defaultValue="Bruce Wayne"
      clearable
      items={inputItems}
      placeholder="Select your hero"
      clearIndicator={{ children: 'clear' }}
    />
    <Divider />
    <Dropdown
      defaultValue="Bruce Wayne"
      clearable
      items={inputItems}
      placeholder="Select your hero"
      clearIndicator={<div>clear</div>}
    />
    <Divider />
    <Dropdown
      defaultValue="Bruce Wayne"
      clearable
      items={inputItems}
      placeholder="Select your hero"
      clearIndicator={'clear'}
    />
    <Divider />
    <Dropdown defaultValue="Bruce Wayne" clearable items={inputItems} placeholder="Select your hero" />
  </>
);

export default DropdownCustomClearableExample;
