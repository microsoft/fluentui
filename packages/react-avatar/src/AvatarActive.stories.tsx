import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Active = (props: Partial<AvatarProps>) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
      <div>
        <Avatar active="active" {...props} />
        <strong>active</strong>
      </div>
      <div>
        <Avatar active="inactive" {...props} />
        <strong>inactive</strong>
      </div>
      <div>
        <Avatar active="unset" {...props} />
        <strong>unset</strong>
      </div>
      <div>
        <Avatar active={undefined} {...props} />
        <strong>undefined</strong>
      </div>
    </div>
  );
};
