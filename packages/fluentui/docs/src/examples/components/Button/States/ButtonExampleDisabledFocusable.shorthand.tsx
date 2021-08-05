import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { MicIcon, TranslationIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleDisabledFocusable = () => (
  <Flex column gap="gap.smaller">
    <Flex gap="gap.smaller">
      <Button disabledFocusable content="Default" />
      <Button disabledFocusable content="Primary" primary />
      <Button disabledFocusable inverted content="Inverted" />
      <Button disabledFocusable icon={<MicIcon />} content="Click me" iconPosition="before" primary />
      <Button disabledFocusable circular icon={<TranslationIcon />} title="Translation" />
      <Button disabledFocusable text content="Disabled text button" icon={<CallVideoIcon />} iconPosition="before" />
    </Flex>
    <Button disabledFocusable fluid content="Fluid" />
  </Flex>
);

export default ButtonExampleDisabledFocusable;
