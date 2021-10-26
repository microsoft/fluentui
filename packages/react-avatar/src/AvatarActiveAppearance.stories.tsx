import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const ActiveAppearance = (props: Partial<AvatarProps>) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Avatar active="active" activeAppearance="ring" {...props} />
        <strong>ring</strong>
      </div>
      <div>
        <Avatar active="active" activeAppearance="shadow" {...props} />
        <strong>shadow</strong>
      </div>
      <div>
        <Avatar active="active" activeAppearance="glow" {...props} />
        <strong>glow</strong>
      </div>
      <div>
        <Avatar active="active" activeAppearance="ring-shadow" {...props} />
        <strong>ring-shadow</strong>
      </div>
      <div>
        <Avatar active="active" activeAppearance="ring-glow" {...props} />
        <strong>ring-glow</strong>
      </div>
    </div>
  );
};
