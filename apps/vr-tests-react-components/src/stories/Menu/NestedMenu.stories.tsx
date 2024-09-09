import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';

import { withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu nested within a MenuTrigger',

  decorators: [
    // https://github.com/microsoft/fluentui/issues/19782
    story => withStoryWrightSteps({ story, steps: new Steps().click('#nestedTrigger').snapshot('submenu open').end() }),
  ],
} satisfies Meta<typeof Menu>;

const ContextMenuArea = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid red ',
        width: 300,
        height: 300,
      }}
      {...props}
    >
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <Menu>
              <MenuTrigger>
                <MenuItem id="nestedTrigger">Open Folder</MenuItem>
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
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
});

export const Default = () => (
  <Menu openOnContext>
    <MenuTrigger>
      <ContextMenuArea />
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
);
Default.storyName = 'default';
