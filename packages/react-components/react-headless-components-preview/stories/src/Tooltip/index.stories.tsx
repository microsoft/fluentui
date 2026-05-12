import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

import descriptionMd from './TooltipDescription.md';
import bestPracticesMd from './TooltipBestPractices.md';

export { Default } from './TooltipDefault.stories';
export { WithArrow } from './TooltipWithArrow.stories';
export { Positions } from './TooltipPositions.stories';
export { Controlled } from './TooltipControlled.stories';
export { RelationshipLabel } from './TooltipRelationshipLabel.stories';
export { RelationshipDescription } from './TooltipRelationshipDescription.stories';

export default {
  title: 'Headless Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
