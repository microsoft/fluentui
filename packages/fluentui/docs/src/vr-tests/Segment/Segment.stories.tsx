import { ComponentMeta } from '@storybook/react';
import { Segment } from '@fluentui/react-northstar';
import SegmentExampleRtl from '../../examples/components/Segment/Rtl/SegmentExample.rtl';
import SegmentExampleDisabledShorthand from '../../examples/components/Segment/States/SegmentExampleDisabled.shorthand';
import SegmentExampleDisabled from '../../examples/components/Segment/States/SegmentExampleDisabled';
import SegmentExampleShorthand from '../../examples/components/Segment/Types/SegmentExample.shorthand';
import SegmentExample from '../../examples/components/Segment/Types/SegmentExample';
import SegmentExampleColor from '../../examples/components/Segment/Variations/SegmentExampleColor.shorthand';
import SegmentExampleInvertedShorthand from '../../examples/components/Segment/Variations/SegmentExampleInverted.shorthand';

export default { component: Segment, title: 'Segment' } as ComponentMeta<typeof Segment>;

export {
  SegmentExampleRtl,
  SegmentExampleDisabledShorthand,
  SegmentExampleDisabled,
  SegmentExampleShorthand,
  SegmentExample,
  SegmentExampleColor,
  SegmentExampleInvertedShorthand,
};
