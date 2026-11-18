import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { PresenceBadge } from '@fluentui/react-badge';
import { PresenceAvailableRegular } from '@fluentui/react-icons';
import { getStoryVariant, RTL, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

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
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const CustomIcons = () => (
  <>
    {sizes.map(size => (
      <PresenceBadge key={size} size={size} icon={<PresenceAvailableRegular />} />
    ))}
  </>
);
