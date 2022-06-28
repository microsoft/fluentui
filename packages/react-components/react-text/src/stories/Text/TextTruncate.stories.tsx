import * as React from 'react';
import { Text } from '@fluentui/react-text';

export const Truncate = () => (
  <Text truncate style={{ width: 100, overflow: 'hidden', whiteSpace: 'nowrap' }} block>
    This is a really really really really long text
  </Text>
);
