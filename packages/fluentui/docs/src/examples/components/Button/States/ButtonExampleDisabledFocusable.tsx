import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { MicIcon, TranslationIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleDisabledFocusable = () => (
  <Flex column gap="gap.smaller">
    <Flex gap="gap.smaller">
      <Button disabledFocusable>Default</Button>
      <Button disabledFocusable primary>
        <Button.Content>Primary</Button.Content>
      </Button>
      <Button disabledFocusable inverted>
        <Button.Content content="Inverted Button" />
      </Button>
      <Button disabledFocusable icon iconPosition="before" primary>
        <MicIcon xSpacing="after" />
        <Button.Content content="Click me" />
      </Button>
      <Button disabledFocusable circular title="Translation">
        <TranslationIcon xSpacing="none" />
      </Button>
      <Button disabledFocusable text>
        <CallVideoIcon xSpacing="before" />
        <Button.Content content="Disabled text button" />
      </Button>
    </Flex>
    <Button disabledFocusable fluid>
      <Button.Content>Fluid</Button.Content>
    </Button>
  </Flex>
);

export default ButtonExampleDisabledFocusable;
