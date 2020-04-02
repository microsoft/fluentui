import * as React from 'react';
import { Icon, Flex } from '@fluentui/react-northstar';

export const RosterState: React.FunctionComponent<{ action: React.ReactNode; isMuted: boolean }> = ({
  action,
  isMuted,
}) => {
  return (
    <Flex vAlign="center">
      <Flex>{isMuted ? <Icon outline name="mic-off" xSpacing="both" /> : null}</Flex>
      {action}
    </Flex>
  );
};
