import { MenuGrid, MenuGridCell, MenuGridRow, MenuGridRowGroup } from '@fluentui/react-menu';
import descriptionMd from './MenuGridDescription.md';

export { Default } from './MenuGridDefault.stories';
export { WithSubmenu } from './MenuGridWithSubmenu.stories';

export default {
  title: 'Components/Menu/MenuGrid',
  component: MenuGrid,
  subcomponents: {
    MenuGridCell,
    MenuGridRow,
    MenuGridRowGroup,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
