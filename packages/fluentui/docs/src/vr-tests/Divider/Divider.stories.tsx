import { Meta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';

import DividerExampleImportant from '../../examples/components/Divider/Variations/DividerExampleImportant';

import DividerVerticalExampleShorthand from '../../examples/components/Divider/Variations/DividerExampleVertical.shorthand';

export default { component: Divider, title: 'Divider' } as Meta<typeof Divider>;

export { DividerExampleImportant, DividerVerticalExampleShorthand };
