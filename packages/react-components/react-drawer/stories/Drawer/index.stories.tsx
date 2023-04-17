import { Drawer } from '@fluentui/react-drawer';
import descriptionMd from './DrawerDescription.md';
import bestPracticesMd from './DrawerBestPractices.md';
import previewMd from './DrawerPreview.md';

export { Default } from './DrawerDefault.stories';
export { Position } from './DrawerPosition.stories';
export { Inline } from './DrawerInline.stories';
export { Size } from './DrawerSize.stories';
export { CustomSize } from './DrawerCustomSize.stories';
export { DefaultOpen } from './DrawerDefaultOpen.stories';
export { AlwaysOpen } from './DrawerAlwaysOpen.stories';
export { Separator } from './DrawerSeparator.stories';

export default {
  title: 'Preview Components/Drawer/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd, previewMd].join('\n'),
      },
    },
  },
};
