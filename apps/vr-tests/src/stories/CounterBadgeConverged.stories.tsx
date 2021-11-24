import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CounterBadge } from '@fluentui/react-badge';

storiesOf('CounterBadge Converged - colors', module).addStory(
  'default',
  () => (
    <div style={{ display: 'flex', gap: 10 }}>
      {(['brand', 'danger', 'important', 'informative'] as const).map(color => (
        <CounterBadge count={5} appearance="filled" color={color} key={color} />
      ))}
    </div>
  ),
  { includeRtl: true },
);
