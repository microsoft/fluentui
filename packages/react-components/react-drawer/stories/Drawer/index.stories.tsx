import {
  Drawer,
  InlineDrawer,
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderNavigation,
} from '@fluentui/react-drawer';
import descriptionMd from './DrawerDescription.md';
import bestPracticesMd from './DrawerBestPractices.md';
import previewMd from './DrawerPreview.md';

export { Default } from './DrawerDefault.stories';
export { Overlay } from './OverlayDrawer.stories';
export { OverlayNoModal } from './OverlayDrawerNoModal.stories';
export { Inline } from './InlineDrawer.stories';
export { Position } from './DrawerPosition.stories';
export { Size } from './DrawerSize.stories';
export { CustomSize } from './DrawerCustomSize.stories';
export { Separator } from './DrawerSeparator.stories';
export { WithTitle } from './DrawerWithTitle.stories';
export { WithNavigation } from './DrawerWithNavigation.stories';
export { WithScroll } from './DrawerWithScroll.stories';
export { MotionCustom } from './DrawerMotionCustom.stories';
export { MotionDisabled } from './DrawerMotionDisabled.stories';
export { AlwaysOpen } from './DrawerAlwaysOpen.stories';
export { PreventClose } from './DrawerPreventClose.stories';
export { Responsive } from './DrawerResponsive.stories';
export { Resizable } from './DrawerResizable.stories';

export default {
  title: 'Preview Components/Drawer',
  component: Drawer,
  subcomponents: {
    OverlayDrawer,
    InlineDrawer,
    DrawerHeader,
    DrawerHeaderTitle,
    DrawerHeaderNavigation,
    DrawerBody,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd, previewMd].join('\n'),
      },
    },
  },
};
