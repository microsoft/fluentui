import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { MicIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular content="C" />
    <Button circular icon={<MicIcon />} title="Microphone" />
    <Button circular icon={<CallVideoIcon />} primary title="Call Video" />
  </Flex>
);
export default ButtonExampleCircular;
