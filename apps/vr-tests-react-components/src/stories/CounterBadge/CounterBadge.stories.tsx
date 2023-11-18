import * as React from 'react';
import { CounterBadge } from '@fluentui/react-badge';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, RTL } from '../../utilities';

export default {
  title: 'CounterBadge Converged - colors',
} as ComponentMeta<typeof CounterBadge>;

export const Default = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    {(['brand', 'danger', 'important', 'informative'] as const).map(color => (
      <CounterBadge count={5} appearance="filled" color={color} key={color} />
    ))}
  </div>
);

Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
