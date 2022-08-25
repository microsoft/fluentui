import * as React from 'react';
import { ComponentPrototype, PrototypeSection } from '../Prototypes';
import { ChatRefreshSimple } from './ChatRefreshSimple';
import { ChatRefreshTimestampTooltip } from './ChatRefreshTimestampTooltip';

export default () => (
  <PrototypeSection title="Chat Refresh">
    <ComponentPrototype title="Simple" description="Message metadata sits outside the bubble.">
      <ChatRefreshSimple />
    </ComponentPrototype>
    <ComponentPrototype
      title="Timestamp Tooltip"
      description="Message tooltip can be modified to render a tooltip on hover."
    >
      <ChatRefreshTimestampTooltip />
    </ComponentPrototype>
  </PrototypeSection>
);
