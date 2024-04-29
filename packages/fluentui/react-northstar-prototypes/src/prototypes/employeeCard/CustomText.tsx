import * as React from 'react';
import { Text } from '@fluentui/react-northstar';

const CustomText = props => {
  const { muted, ...restProps } = props;
  return <Text {...restProps} styles={{ ...(muted && { color: '#888' }) }} />;
};

export default CustomText;
