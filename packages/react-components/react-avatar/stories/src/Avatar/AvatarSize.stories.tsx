import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Size = (): JSXElement => (
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
      story:
        'An avatar supports a range of sizes from 16 to 128. The default is 32. \n\n' +
        'Avoid using sizes 16 and 20 for interactive Avatars, ' +
        'or ensure that there is at least 8px or 4px spacing respectively to meet WCAG target size requirements.',
    },
  },
};
