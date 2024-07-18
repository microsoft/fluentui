import * as React from 'react';
import type { Meta } from '@storybook/react';
import { PresenceBadge } from '@fluentui/react-badge';
import { getStoryVariant, RTL } from '../../utilities';

const sizes = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

export default {
  title: 'PresenceBadge Converged - sizes',
} satisfies Meta<typeof PresenceBadge>;

export const Default = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    {sizes.map(size => (
      <PresenceBadge status="available" key={size} size={size} />
    ))}
  </div>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
