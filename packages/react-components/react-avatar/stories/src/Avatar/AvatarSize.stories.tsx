import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

export const Size = () => (
  <>
    <Avatar initials="16" size={16} shape="square" />
    <Avatar initials="20" size={20} shape="square" />
    <Avatar initials="24" size={24} shape="square" />
    <Avatar initials="28" size={28} shape="square" />
    <Avatar initials="32" size={32} shape="square" />
    <Avatar initials="36" size={36} shape="square" />
    <Avatar initials="40" size={40} shape="square" />
    <Avatar initials="48" size={48} shape="square" />
    <Avatar initials="56" size={56} shape="square" />
    <Avatar initials="64" size={64} shape="square" />
    <Avatar initials="72" size={72} shape="square" />
    <Avatar initials="96" size={96} shape="square" />
    <Avatar initials="120" size={120} shape="square" />
    <Avatar initials="128" size={128} shape="square" />
  </>
);

Size.parameters = {
  docs: {
    description: {
      story:
        'An avatar supports a range of sizes from 16 to 128. The default is 32. \n\n' +
        'Avoid using sizes 16 and 20 for interactive Avatars, ' +
        'or ensure that there is at least 8px or 4px spacing respectively to meet WCAG target size requirements.',
    },
  },
};
