import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

export const Badge = (props: Partial<AvatarProps>) => (
  <>
    <Avatar {...props} badge={{ status: 'busy' }} />
    <Avatar {...props} badge={{ status: 'outOfOffice' }} />
    <Avatar {...props} badge={{ status: 'away' }} />
    <Avatar {...props} badge={{ status: 'available' }} />
    <Avatar {...props} badge={{ status: 'offline' }} />
    <Avatar {...props} badge={{ status: 'doNotDisturb' }} />
    <br />
    <Avatar {...props} badge={{ status: 'busy', outOfOffice: true }} />
    <Avatar {...props} badge={{ status: 'outOfOffice', outOfOffice: true }} />
    <Avatar {...props} badge={{ status: 'away', outOfOffice: true }} />
    <Avatar {...props} badge={{ status: 'available', outOfOffice: true }} />
    <Avatar {...props} badge={{ status: 'offline', outOfOffice: true }} />
    <Avatar {...props} badge={{ status: 'doNotDisturb', outOfOffice: true }} />
  </>
);

Badge.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a badge to indicate presence status.',
    },
  },
};
