import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  InlineDrawer,
  OverlayDrawer,
} from '@fluentui/react-headless-components-preview/drawer';

import descriptionMd from './DrawerDescription.md';
export { Default } from './DefaultDrawer.stories';
export { Inline } from './InlineDrawer.stories';

export default {
  title: 'Headless Components/Drawer',
  component: Drawer,
  subcomponents: {
    OverlayDrawer,
    InlineDrawer,
    DrawerHeader,
    DrawerHeaderTitle,
    DrawerHeaderNavigation,
    DrawerBody,
    DrawerFooter,
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
