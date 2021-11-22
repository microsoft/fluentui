import * as React from 'react';
import { Text } from '../index'; // codesandbox-dependency: @fluentui/react-text ^9.0.0-beta

export const Truncate = () => (
  <Text truncate style={{ width: 100, overflow: 'hidden', whiteSpace: 'nowrap' }} block>
    This is a really really really really long text
  </Text>
);
