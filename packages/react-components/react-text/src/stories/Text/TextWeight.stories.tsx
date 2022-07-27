import * as React from 'react';
import { Text } from '@fluentui/react-components';

export const Weight = () => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Text weight="regular">Regular weight</Text>
    <Text weight="medium">Medium weight</Text>
    <Text weight="semibold">Semibold weight</Text>
  </div>
);
