import { TeachingPopoverSurface } from '@fluentui/react-teaching-popover-preview';

import descriptionMd from './TeachingPopoverSurfaceDescription.md';
import bestPracticesMd from './TeachingPopoverSurfaceBestPractices.md';

export { Default } from './TeachingPopoverSurfaceDefault.stories';

export default {
  title: 'Preview Components/TeachingPopoverSurface',
  component: TeachingPopoverSurface,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
