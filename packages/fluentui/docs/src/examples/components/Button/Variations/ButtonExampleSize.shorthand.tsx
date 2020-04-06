import { Button, Divider, Flex } from '@fluentui/react-northstar';
import * as React from 'react';

const ButtonExampleSizeShorthand: React.FC = () => (
  <>
    <Flex gap="gap.smaller">
      <Button size="smallest" content="Smallest" />
      <Button size="smaller" content="Smaller" />
      <Button size="small" content="Small" />
    </Flex>
    <Divider />

    <Button content="Medium (default)" />
    <Divider />

    <Flex gap="gap.smaller">
      <Button size="large" content="Large" />
      <Button size="larger" content="Larger" />
      <Button size="largest" content="Largest" />
    </Flex>
  </>
);

export default ButtonExampleSizeShorthand;
