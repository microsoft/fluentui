import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { MicIcon, TranslationIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleDisabled = () => (
  <Flex column gap="gap.smaller">
    <Flex gap="gap.smaller">
      <Button disabled content="Default" />
      <Button disabled content="Primary" primary />
      <Button disabled inverted content="Inverted" />
      <Button disabled icon={<MicIcon />} content="Click me" iconPosition="before" primary />
      <Button disabled circular icon={<TranslationIcon />} title="Translation" />
      <Button disabled text content="Disabled text button" icon={<CallVideoIcon />} iconPosition="before" />
    </Flex>
    <Button disabled fluid content="Fluid" />
  </Flex>
);

export default ButtonExampleDisabled;
