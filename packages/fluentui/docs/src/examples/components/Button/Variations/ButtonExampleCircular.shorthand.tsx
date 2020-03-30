import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { Emoji, Broadcast } from '@fluentui/react-icons-northstar';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular content="C" />
    <Button circular icon={<Emoji />} title="Emoji" />
    <Button circular icon={<Broadcast />} primary title="Broadcast" />
  </Flex>
);
export default ButtonExampleCircular;
