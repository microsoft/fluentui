import * as React from 'react';
import { Avatar } from '../index';

export const Size = () => (
  <>
    <Avatar initials="16" size={16} />
    <Avatar initials="20" size={20} />
    <Avatar initials="24" size={24} />
    <Avatar initials="28" size={28} />
    <Avatar initials="32" size={32} />
    <Avatar initials="36" size={36} />
    <Avatar initials="40" size={40} />
    <Avatar initials="48" size={48} />
    <Avatar initials="56" size={56} />
    <Avatar initials="64" size={64} />
    <Avatar initials="72" size={72} />
    <Avatar initials="96" size={96} />
    <Avatar initials="120" size={120} />
    <Avatar initials="128" size={128} />
  </>
);

Size.parameters = {
  docs: {
    description: {
      story: 'An avatar supports a range of sizes from 16 to 128. The default is 32.',
    },
  },
};
