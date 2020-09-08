import * as React from 'react';
import { Button, Flex, TeamCreateIcon } from '@fluentui/react-northstar';

const ButtonExampleInverted = () => (
  <Flex
    gap="gap.smaller"
    styles={({ theme: { siteVariables } }) => ({
      backgroundColor: siteVariables.colorScheme.brand.background2,
      padding: '20px',
    })}
  >
    <Button inverted content="Inverted Button" />
    <Button inverted icon={<TeamCreateIcon />} iconOnly title="Create" />
  </Flex>
);

export default ButtonExampleInverted;
