import * as React from 'react';
import { Flex, Button } from '@fluentui/react-northstar';
import { SkypeLogoIcon } from '@fluentui/react-icons-northstar';

const FlexExampleNavMenu = () => (
  <Flex gap="gap.small" debug>
    <Button content="Logo" icon={<SkypeLogoIcon />} />

    <Flex.Item push>
      <Button content="Page 1" />
    </Flex.Item>

    <Button content="Page 2" />
    <Button content="Page 3" />
  </Flex>
);

export default FlexExampleNavMenu;
