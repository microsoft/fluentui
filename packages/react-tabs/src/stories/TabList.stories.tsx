import { TabList } from '../index';

import descriptionMd from './TabListDescription.md';
import bestPracticesMd from './TabListBestPractices.md';

export { Default } from './TabListDefault.stories';
export { Horizontal } from './TabListHorizontal.stories';
export { Vertical } from './TabListVertical.stories';
export { Appearance } from './TabListAppearance.stories';
export { Disabled } from './TabListDisabled.stories';
export { SizeSmall } from './TabListSizeSmall.stories';
export { SizeMedium } from './TabListSizeMedium.stories';
export { WithIcon } from './TabListWithIcon.stories';
export { IconOnly } from './TabListIconOnly.stories';

export default {
  title: 'Preview Components/TabList',
  component: TabList,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
