import * as React from 'react';
import { Pill, CalendarIcon, Flex } from '@fluentui/react-northstar';

const PillSelectableExample = () => (
  <Flex>
    <Pill selectable image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg">
      Pill with an image
    </Pill>
    <Pill selectable icon={<CalendarIcon />}>
      Pill with an icon
    </Pill>
  </Flex>
);

export default PillSelectableExample;
