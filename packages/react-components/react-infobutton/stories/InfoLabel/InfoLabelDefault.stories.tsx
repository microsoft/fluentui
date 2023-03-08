import * as React from 'react';

import { InfoLabel, InfoLabelProps } from '@fluentui/react-infobutton';

export const Default = (props: Partial<InfoLabelProps>) => (
  <InfoLabel content="Example info" {...props}>
    Example info label
  </InfoLabel>
);
