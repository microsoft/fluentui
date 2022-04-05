import * as React from 'react';
import { Button, Text, Flex } from '@fluentui/react-northstar';

const ButtonExampleFlat = () => (
  <>
    <Flex gap="gap.small" padding="padding.medium" vAlign="center">
      <Button content="Elevated" />
      <Button primary content="Elevated" />
      <Button tinted content="Elevated" />
      <Text content="By default, buttons are elevated" />
    </Flex>
    <Flex gap="gap.small" padding="padding.medium" vAlign="center">
      <Button flat content="Flat" />
      <Button flat primary content="Flat" />
      <Button flat tinted content="Flat" />
      <Text content="Add prop `flat` to get a button without shadow" />
    </Flex>
    <Flex gap="gap.small" padding="padding.medium" vAlign="center">
      <Button size="small" content="Small" />
      <Button size="small" primary content="Small" />
      <Button size="small" tinted content="Small" />
      <Text content="Small buttons are never elevated" />
    </Flex>
  </>
);

export default ButtonExampleFlat;
