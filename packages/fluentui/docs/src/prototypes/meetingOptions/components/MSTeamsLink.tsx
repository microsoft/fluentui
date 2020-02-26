import * as React from 'react';
import { Text } from '@fluentui/react';

export default props => {
  const { content, children } = props;
  return (
    <Text as="a" content={content} color="brand">
      {children}
    </Text>
  );
};
