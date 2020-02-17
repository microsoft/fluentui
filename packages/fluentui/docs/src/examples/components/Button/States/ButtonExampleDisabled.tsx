import * as React from 'react'
import { Button, Flex, Icon, Text } from '@fluentui/react'

const ButtonExampleDisabled = () => (
  <Flex column gap="gap.smaller">
    <Flex gap="gap.smaller">
      <Button disabled>Default</Button>
      <Button disabled primary>
        Primary
      </Button>
      <Button disabled inverted>
        <Text content="Inverted Button" />
      </Button>
      <Button disabled icon iconPosition="before" primary>
        <Icon name="emoji" xSpacing="after" />
        <Text content="Click me" />
      </Button>
      <Button disabled circular title="Translation">
        <Icon name="translation" xSpacing="none" />
      </Button>
      <Button disabled text>
        <Icon name="call-video" xSpacing="before" />
        <Text content="Disabled text button" />
      </Button>
    </Flex>
    <Button disabled fluid>
      Fluid
    </Button>
  </Flex>
)

export default ButtonExampleDisabled
