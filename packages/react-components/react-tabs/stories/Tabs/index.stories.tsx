import { Tab, TabList } from '@fluentui/react-components';

import descriptionMd from './TabListDescription.md';
import bestPracticesMd from './TabListBestPractices.md';

export { Default } from './TabListDefault.stories';
export { Horizontal } from './TabListHorizontal.stories';
export { Vertical } from './TabListVertical.stories';
export { Appearance } from './TabListAppearance.stories';
export { Disabled } from './TabListDisabled.stories';
export { SizeSmall } from './TabListSizeSmall.stories';
export { SizeMedium } from './TabListSizeMedium.stories';
export { SizeLarge } from './TabListSizeLarge.stories';
export { WithIcon } from './TabListWithIcon.stories';
export { IconOnly } from './TabListIconOnly.stories';
export { SelectTabOnFocus } from './TabListSelectTabOnFocus.stories';
export { WithOverflow } from './TabListWithOverflow.stories';
export { WithPanels } from './TabListWithPanels.stories';

export default {
  title: 'Components/TabList',
  component: TabList,
  subcomponents: {
    Tab,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
