import * as React from 'react';
import { Button, Flex } from '@fluentui/react-future';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular content="C" />
    <Button circular icon="emoji" title="Emoji" />
    <Button circular icon="broadcast" primary title="Broadcast" />
  </Flex>
);
export default ButtonExampleCircular;
