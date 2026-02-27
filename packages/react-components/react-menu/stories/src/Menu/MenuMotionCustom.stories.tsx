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
  motionTokens,
} from '@fluentui/react-components';
import { fadeAtom, blurAtom } from '@fluentui/react-motion-components-preview';

const FadeInBlurOut = createPresenceComponent({
  enter: fadeAtom({ direction: 'enter', duration: 500 }),
  exit: [
    fadeAtom({ direction: 'exit', duration: 500 }),
    blurAtom({ direction: 'exit', duration: 500, easing: motionTokens.curveEasyEase }),
  ],
});

export const MotionCustom = (): JSXElement => (
  <Menu
    surfaceMotion={{
      children: (_, motionProps) => <FadeInBlurOut {...motionProps} />,
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
