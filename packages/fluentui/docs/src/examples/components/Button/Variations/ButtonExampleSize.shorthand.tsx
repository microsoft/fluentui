import { Button, Divider, Flex } from '@fluentui/react-northstar';
import * as React from 'react';

const ButtonExampleSizeShorthand: React.FC = () => (
  <>
    <Flex gap="gap.smaller">
      <Button size="small" content="Small" />
    </Flex>

    <Divider />

    <Button content="Default" />
  </>
);

export default ButtonExampleSizeShorthand;
