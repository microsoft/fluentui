import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Size = (props: Partial<AvatarProps>) => (
  <div style={{ display: 'flex', gap: '5px' }}>
    <Avatar name="20" initials="20" size={20} />
    <Avatar name="24" initials="24" size={24} />
    <Avatar name="28" initials="28" size={28} />
    <Avatar name="32" initials="32" size={32} />
    <Avatar name="36" initials="36" size={36} />
    <Avatar name="40" initials="40" size={40} />
    <Avatar name="48" initials="48" size={48} />
    <Avatar name="56" initials="56" size={56} />
    <Avatar name="64" initials="64" size={64} />
    <Avatar name="72" initials="72" size={72} />
    <Avatar name="96" initials="96" size={96} />
    <Avatar name="120" initials="120" size={120} />
    <Avatar name="128" initials="128" size={128} />
  </div>
);

Size.parameters = {
  docs: {
    description: {
      story: 'An avatar supports a range of sizes from 20 to 128. The default is 32.',
    },
  },
};
