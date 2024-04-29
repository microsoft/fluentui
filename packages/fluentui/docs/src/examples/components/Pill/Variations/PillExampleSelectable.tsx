import * as React from 'react';
import { Pill, CalendarIcon, PillGroup } from '@fluentui/react-northstar';

const PillSelectableExample = () => (
  <PillGroup>
    <Pill selectable image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg">
      Pill with an image
    </Pill>
    <Pill selectable icon={<CalendarIcon />}>
      Pill with an icon
    </Pill>
  </PillGroup>
);

export default PillSelectableExample;
