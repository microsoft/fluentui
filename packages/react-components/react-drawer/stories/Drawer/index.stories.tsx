import { Drawer } from '@fluentui/react-drawer';
import descriptionMd from './DrawerDescription.md';
import DrawerBestpracticesMd from './DrawerBestPractices.md';
import previewMd from './DrawerPreview.md';

export { Default } from './DrawerDefault.stories';

export default {
  title: 'Preview Components/Drawer/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, DrawerBestpracticesMd, previewMd].join('\n'),
      },
    },
  },
};
