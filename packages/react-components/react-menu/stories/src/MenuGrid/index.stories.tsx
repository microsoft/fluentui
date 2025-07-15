import {
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuItemLink,
  MenuItemRadio,
  MenuGrid,
  MenuSplitGroup,
} from '@fluentui/react-components';
import descriptionMd from './MenuGridDescription.md';

export { Default } from './MenuGridDefault.stories';

export default {
  title: 'Components/Menu/MenuGrid',
  component: MenuGrid,
  subcomponents: {
    MenuDivider,
    MenuGroup,
    MenuGroupHeader,
    MenuItem,
    MenuItemCheckbox,
    MenuItemLink,
    MenuItemRadio,
    MenuSplitGroup,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
