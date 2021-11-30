import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Size = (props: Partial<AvatarProps>) => (
  <>
    <Avatar {...props} label={20} size={20} />
    <Avatar {...props} label={24} size={24} />
    <Avatar {...props} label={28} size={28} />
    <Avatar {...props} label={32} size={32} />
    <Avatar {...props} label={36} size={36} />
    <Avatar {...props} label={40} size={40} />
    <Avatar {...props} label={48} size={48} />
    <Avatar {...props} label={56} size={56} />
    <Avatar {...props} label={64} size={64} />
    <Avatar {...props} label={72} size={72} />
    <Avatar {...props} label={96} size={96} />
    <Avatar {...props} label={120} size={120} />
    <Avatar {...props} label={128} size={128} />
  </>
);

Size.parameters = {
  docs: {
    description: {
      story: 'An avatar supports a ramp of sizes from 20 to 128. The default is 32.',
    },
  },
};
