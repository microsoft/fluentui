import * as React from 'react';
import { Text } from '../index';

export const Font = () => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Text font="base">This is the default font</Text>
    <Text font="numeric">This is numeric font</Text>
    <Text font="monospace">This is monospace font</Text>
  </div>
);
