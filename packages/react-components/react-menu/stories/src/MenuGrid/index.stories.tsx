import { MenuGrid, MenuGridRow, MenuGridCell } from '@fluentui/react-menu';
import descriptionMd from './MenuGridDescription.md';

export { Default } from './MenuGridDefault.stories';
export { WithSubmenu } from './MenuGridWithSubmenu.stories';

export default {
  title: 'Components/Menu/MenuGrid',
  component: MenuGrid,
  subcomponents: {
    MenuGridRow,
    MenuGridCell,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
