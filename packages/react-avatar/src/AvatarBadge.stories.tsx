import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Badge = (props: Partial<AvatarProps>) => (
  <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(6, 32px)' }}>
    <span>
      <Avatar badge={{ status: 'available' }} aria-label="available avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'busy' }} aria-label="busy avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'outOfOffice' }} aria-label="outOfOffice avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'away' }} aria-label="away avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'offline' }} aria-label="offline avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'doNotDisturb' }} aria-label="doNotDisturb avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'available', outOfOffice: true }} aria-label="available outOfOffice avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'busy', outOfOffice: true }} aria-label="busy outOfOffice avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'outOfOffice', outOfOffice: true }} aria-label="outOfOffice avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'away', outOfOffice: true }} aria-label="away outOfOffice avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'offline', outOfOffice: true }} aria-label="offline outOfOffice avatar" />
    </span>
    <span>
      <Avatar badge={{ status: 'doNotDisturb', outOfOffice: true }} aria-label="doNotDisturb outOfOffice avatar" />
    </span>
  </div>
);

Badge.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a badge to indicate presence status.',
    },
  },
};
