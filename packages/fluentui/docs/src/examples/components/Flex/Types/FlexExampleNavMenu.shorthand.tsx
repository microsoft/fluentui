import * as React from 'react';
import { Flex, Button } from '@fluentui/react-northstar';
import { SkypeLogo } from '@fluentui/react-icons-northstar';

const FlexExampleNavMenu = () => (
  <Flex gap="gap.small" debug>
    <Button content="Logo" icon={<SkypeLogo />} />

    <Flex.Item push>
      <Button content="Page 1" />
    </Flex.Item>

    <Button content="Page 2" />
    <Button content="Page 3" />
  </Flex>
);

export default FlexExampleNavMenu;
