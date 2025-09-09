import {
  MenuGrid,
  MenuGridCell,
  MenuGridGroup,
  MenuGridGroupHeader,
  MenuGridItem,
  MenuGridRow,
} from '@fluentui/react-menu-grid-preview';
import descriptionMd from './MenuGridDescription.md';
import bestPracticesMd from './MenuGridBestPractices.md';

export { Default } from './MenuGridDefault.stories';
export { GroupingItems } from './MenuGridGroupingItems.stories';
export { Asymmetric } from './MenuGridAsymmetric.stories';
export { WithSubmenu } from './MenuGridWithSubmenu.stories';
export { MoreComplexMenus } from './MenuGridMoreComplexMenus.stories';

export default {
  title: 'Preview Components/Menu/MenuGrid',
  component: MenuGrid,
  subcomponents: {
    MenuGridCell,
    MenuGridGroup,
    MenuGridGroupHeader,
    MenuGridItem,
    MenuGridRow,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
