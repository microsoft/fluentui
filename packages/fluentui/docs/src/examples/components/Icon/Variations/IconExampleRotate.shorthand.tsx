import * as React from 'react';
import { Flex, Icon } from '@fluentui/react';

const IconExampleRotate = () => (
  <Flex gap="gap.smaller">
    <Icon name="call-video" rotate={45} />
    <Icon name="skype-logo" rotate={45} />
    <Icon name="emoji" rotate={45} />
    <Icon name="more" rotate={45} />
  </Flex>
);

export default IconExampleRotate;
