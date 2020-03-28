import * as React from 'react';
import { Text } from '@fluentui/react-northstar';

export const RosterMessage: React.FunctionComponent<{ message: string }> = ({ message }) => {
  return <Text content={message} />;
};
