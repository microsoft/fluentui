import * as React from 'react';
import { Flex, Input, Button, Label } from '@fluentui/react-northstar';
import { StarIcon } from '@fluentui/react-icons-northstar';

const FlexExampleInput = () => (
  <Flex gap="gap.medium" debug>
    <Flex.Item grow>
      <Flex>
        <Label icon={<StarIcon />} styles={{ background: 'darkgrey', height: 'auto', padding: '0 15px' }} />

        <Flex.Item grow>
          <Input placeholder="Find bookmarks..." fluid />
        </Flex.Item>
      </Flex>
    </Flex.Item>

    <Button content="Search" />
  </Flex>
);

export default FlexExampleInput;
