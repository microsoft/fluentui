import * as React from 'react'
import { Button, Icon, Text, Flex } from '@fluentui/react'

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.large">
    <Button icon primary>
      <Icon name="call-video" xSpacing="after" />
      <Text content="Join call" />
    </Button>
    <Button icon>
      <Text content="Join call" />
      <Icon name="call-video" xSpacing="before" />
    </Button>
    <Button icon text>
      <Icon name="call-video" xSpacing="after" />
      <Text content="Join call" />
    </Button>
  </Flex>
)

export default ButtonExampleContentAndIcon
