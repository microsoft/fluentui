import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  createPresenceComponent,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import { fadeAtom, blurAtom } from '@fluentui/react-motion-components-preview';

const FadeInBlurOut = createPresenceComponent({
  enter: fadeAtom({ duration: 500, direction: 'enter' }),
  exit: [fadeAtom({ duration: 500, direction: 'exit' }), blurAtom({ duration: 500, direction: 'exit' })],
});

export const MotionCustom = (): JSXElement => (
  <Menu
    surfaceMotion={{
      // The children render function replaces the default MenuSurfaceMotion component.
      // The first argument is the default component (ignored here since we're replacing it).
      // The second argument contains the resolved slot props:
      //   - motionProps: visible, appear, unmountOnExit, children (the menu popover), and event callbacks
      //   - mainAxis: a menu-specific slide distance param unused by the custom motion, so it is discarded
      children: (_, { mainAxis: _mainAxis, ...motionProps }) => <FadeInBlurOut {...motionProps} />,
    }}
  >
    <MenuTrigger disableButtonEnhancement>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>New</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

MotionCustom.parameters = {
  docs: {
    description: {
      story:
        'Menu animations can be customized using the [Motion APIs](?path=/docs/motion-apis-createpresencecomponent--docs), together with the `surfaceMotion` slot.',
    },
  },
};
