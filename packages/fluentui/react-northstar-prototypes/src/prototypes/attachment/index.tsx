import * as React from 'react';

import { ComponentPrototype, PrototypeSection } from '../Prototypes';
import { AttachmentLinkPreview } from './AttachmentLinkPreview';
import { AttachmentQuotedReply } from './AttachmentQuotedReply';

export default () => (
  <PrototypeSection title="Attachment">
    <ComponentPrototype title="Quoted Reply Attachment" description="Using Attachment as chiclet for quoted replies.">
      <AttachmentQuotedReply />
    </ComponentPrototype>
    <ComponentPrototype title="Link Preview Attachment" description="Using Attachment as chiclet for link previews.">
      <AttachmentLinkPreview />
    </ComponentPrototype>
  </PrototypeSection>
);
