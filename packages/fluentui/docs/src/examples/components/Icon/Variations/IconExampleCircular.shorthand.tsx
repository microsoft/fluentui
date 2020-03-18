import * as React from 'react';
import { Flex, Icon } from '@fluentui/react-northstar';

const IconExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Icon name="skype-logo" circular bordered />
    <Icon name="emoji" circular bordered />
    <Icon name="play" circular bordered />
    <Icon name="call" circular bordered />
    <Icon name="call-video" circular bordered />
    <Icon name="calendar outline" circular bordered />
    <Icon name="translation" circular bordered />
    <Icon name="star outline" circular bordered />
  </Flex>
);

export default IconExampleCircular;
