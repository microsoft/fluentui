import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import DividerExampleContent from '../../examples/components/Divider/Types/DividerExampleContent';
import DividerExampleImportant from '../../examples/components/Divider/Variations/DividerExampleImportant';
import DividerExampleSize from '../../examples/components/Divider/Variations/DividerExampleSize';
import DividerVerticalExampleShorthand from '../../examples/components/Divider/Variations/DividerExampleVertical.shorthand';

export default { component: Divider, title: 'Divider' } as ComponentMeta<typeof Divider>;

export { DividerExampleContent, DividerExampleImportant, DividerExampleSize, DividerVerticalExampleShorthand };
