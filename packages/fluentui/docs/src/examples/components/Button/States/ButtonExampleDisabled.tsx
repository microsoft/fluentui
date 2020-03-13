import * as React from 'react';
import { Button, Flex, Icon } from '@fluentui/react';

const ButtonExampleDisabled = () => (
  <Flex column gap="gap.smaller">
    <Flex gap="gap.smaller">
      <Button disabled>Default</Button>
      <Button disabled primary>
        <Button.Content>Primary</Button.Content>
      </Button>
      <Button disabled inverted>
        <Button.Content content="Inverted Button" />
      </Button>
      <Button disabled icon iconPosition="before" primary>
        <Icon name="emoji" xSpacing="after" />
        <Button.Content content="Click me" />
      </Button>
      <Button disabled circular title="Translation">
        <Icon name="translation" xSpacing="none" />
      </Button>
      <Button disabled text>
        <Icon name="call-video" xSpacing="before" />
        <Button.Content content="Disabled text button" />
      </Button>
    </Flex>
    <Button disabled fluid>
      <Button.Content>Fluid</Button.Content>
    </Button>
  </Flex>
);

export default ButtonExampleDisabled;
