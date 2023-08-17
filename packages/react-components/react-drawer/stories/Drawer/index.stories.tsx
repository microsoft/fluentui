import {
  Drawer,
  DrawerInline,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderNavigation,
} from '@fluentui/react-drawer';
import descriptionMd from './DrawerDescription.md';
import bestPracticesMd from './DrawerBestPractices.md';
import previewMd from './DrawerPreview.md';

export { Default } from './DrawerDefault.stories';
export { Overlay } from './DrawerOverlay.stories';
export { OverlayNoModal } from './DrawerOverlayNoModal.stories';
export { Inline } from './DrawerInline.stories';
export { Position } from './DrawerPosition.stories';
export { Size } from './DrawerSize.stories';
export { CustomSize } from './DrawerCustomSize.stories';
export { Separator } from './DrawerSeparator.stories';
export { WithNavigation } from './DrawerWithNavigation.stories';
export { WithScroll } from './DrawerWithScroll.stories';
export { DisabledTransition } from './DrawerDisabledTransition.stories';
export { CustomTransition } from './DrawerCustomTransition.stories';
export { CustomAnimation } from './DrawerCustomAnimation.stories';
export { CustomInlineAnimation } from './DrawerCustomInlineAnimation.stories';
export { AlwaysOpen } from './DrawerAlwaysOpen.stories';
export { PreventClose } from './DrawerPreventClose.stories';
export { Responsive } from './DrawerResponsive.stories';
export { Resizable } from './DrawerResizable.stories';

export default {
  title: 'Preview Components/Drawer',
  component: Drawer,
  subcomponents: {
    DrawerOverlay,
    DrawerInline,
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
