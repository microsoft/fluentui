import { ComponentMeta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import SvgPlayground from '../../examples/components/SvgIcon/Playground';
import SvgIconExampleRtl from '../../examples/components/SvgIcon/Rtl/SvgIconExample.rtl';
import SvgIconExampleRotateRtl from '../../examples/components/SvgIcon/Rtl/SvgIconExampleRotate.rtl';
import SvgIconExampleRotate from '../../examples/components/SvgIcon/Variations/SvgIconExampleRotate.shorthand';

export default { component: SvgIcon, title: 'SvgIcon' } as ComponentMeta<typeof SvgIcon>;

export { SvgPlayground, SvgIconExampleRtl, SvgIconExampleRotateRtl, SvgIconExampleRotate };
