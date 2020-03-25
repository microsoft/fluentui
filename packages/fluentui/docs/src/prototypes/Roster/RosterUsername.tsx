import * as React from 'react';
import { Text } from '@fluentui/react-northstar';

export const RosterUserName: React.FunctionComponent<{ displayName: string; isActive: boolean }> = ({
  displayName,
  isActive,
}) => {
  return <Text weight={isActive ? 'semibold' : 'regular'}>{displayName}</Text>;
};
