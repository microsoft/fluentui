import * as React from 'react';
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

const ExampleContent = () => {
  return (
    <div>
      <h3>Popover content</h3>

      <Button>test inside</Button>
      <div>This is some popover content</div>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton>Example</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

export const Default = (props: PopoverProps) => {
  return (
    <>
      <Popover trapFocus>
        <PopoverTrigger>
          <Button id="btn1-trigger">Popover trigger</Button>
        </PopoverTrigger>
        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
      <Button id="btn2-bottom">test2222</Button>
    </>
  );
};
