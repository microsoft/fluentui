import * as React from 'react';
import { Text } from '@fluentui/react-northstar';

export default props => {
  const { content, children } = props;
  return (
    <Text as="a" content={content} color="brand">
      {children}
    </Text>
  );
};
