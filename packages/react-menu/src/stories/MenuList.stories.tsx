import { MenuList } from '../index';
import descriptionMd from './MenuListDescription.md';

export { Default } from './MenuListDefault.stories';
export { MenuListWithNestedSubmenus } from './MenuListNestedSubmenus.stories';

export default {
  title: 'Components/MenuList',
  component: MenuList,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
