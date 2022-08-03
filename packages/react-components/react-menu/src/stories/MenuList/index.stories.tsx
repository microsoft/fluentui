import { MenuList } from '@fluentui/react-components';
import descriptionMd from './MenuListDescription.md';

export { Default } from './MenuListDefault.stories';
export { MenuListWithNestedSubmenus } from './MenuListNestedSubmenus.stories';

export default {
  title: 'Components/Menu/MenuList',
  component: MenuList,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
