import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export const IncompleteContent = () => (
  <MessageBar messageBarType={MessageBarType.warning}>This content is pre-release and is subject to change.</MessageBar>
);
