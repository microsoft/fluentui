import * as React from 'react';
import { Pill, Flex } from '@fluentui/react-northstar';

const PillAppearanceExample = () => (
  <Flex
    gap="gap.medium"
    style={{
      background: 'rgba(0,0,0,.2)',
    }}
  >
    <Pill appearance="filled">Filled Pill (Default)</Pill>
    <Pill appearance="inverted">Inverted Pill</Pill>
    <Pill appearance="outline">Outlined Pill</Pill>
  </Flex>
);

export default PillAppearanceExample;
