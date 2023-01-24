import { ComponentMeta } from '@storybook/react';
import { Attachment } from '@fluentui/react-northstar';
import AttachmentDefaultBsize from '../../examples/components/Attachment/Performance/AttachmentDefault.bsize';
import AttachmentExampleRtl from '../../examples/components/Attachment/Rtl/AttachmentExample.rtl';
import AttachmentDescriptionExampleShorthand from '../../examples/components/Attachment/Slots/AttachmentDescriptionExample.shorthand';
import AttachmentHeaderExampleShorthand from '../../examples/components/Attachment/Slots/AttachmentHeaderExample.shorthand';
import AttachmentIconExampleShorthand from '../../examples/components/Attachment/Slots/AttachmentIconExample.shorthand';
import AttachmentExampleShorthand from '../../examples/components/Attachment/Types/AttachmentExample.shorthand';
import AttachmentProgressExampleShorthand from '../../examples/components/Attachment/Types/AttachmentProgressExample.shorthand';

export default { component: Attachment, title: 'Attachment' } as ComponentMeta<typeof Attachment>;

export {
  AttachmentDefaultBsize,
  AttachmentExampleRtl,
  AttachmentDescriptionExampleShorthand,
  AttachmentHeaderExampleShorthand,
  AttachmentIconExampleShorthand,
  AttachmentExampleShorthand,
  AttachmentProgressExampleShorthand,
};
