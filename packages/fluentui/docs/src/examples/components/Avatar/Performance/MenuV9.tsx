import * as React from 'react';
import { Button, Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <Menu>
          <MenuTrigger>
            <Button>Menu</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>1</MenuItem>
              <MenuItem>2</MenuItem>
              <MenuItem>3</MenuItem>
              <Menu>
                <MenuTrigger>
                  <MenuItem>submenu</MenuItem>
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>4</MenuItem>
                    <MenuItem>5</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </MenuList>
          </MenuPopover>
        </Menu>
      ))}
    </>
  );
};

export default Scenario;
