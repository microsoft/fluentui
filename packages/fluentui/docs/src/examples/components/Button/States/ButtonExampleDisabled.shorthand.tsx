import * as React from 'react';
import { Button, Flex, Header } from '@fluentui/react-northstar';
import { EmojiIcon, TranslationIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleDisabled = () => (
  <>
    <Header as="h4" content="Disabled" />
    <Flex column gap="gap.smaller">
      <Flex gap="gap.smaller">
        <Button disabled content="Default" />
        <Button disabled content="Primary" primary />
        <Button disabled inverted content="Inverted" />
        <Button disabled icon={<EmojiIcon />} content="Click me" iconPosition="before" primary />
        <Button disabled circular icon={<TranslationIcon />} title="Translation" />
        <Button disabled text content="Disabled text button" icon={<CallVideoIcon />} iconPosition="before" />
      </Flex>
      <Button disabled fluid content="Fluid" />
    </Flex>
    <Header as="h4" content="Focusable variants" />
    <Flex column gap="gap.smaller">
      <Flex gap="gap.smaller">
        <Button disabledFocusable content="Default" />
        <Button disabledFocusable content="Primary" primary />
        <Button disabledFocusable inverted content="Inverted" />
        <Button disabledFocusable icon={<EmojiIcon />} content="Click me" iconPosition="before" primary />
        <Button disabledFocusable circular icon={<TranslationIcon />} title="Translation" />
        <Button disabledFocusable text content="Disabled text button" icon={<CallVideoIcon />} iconPosition="before" />
      </Flex>
      <Button disabledFocusable fluid content="Fluid" />
    </Flex>
  </>
);

export default ButtonExampleDisabled;
