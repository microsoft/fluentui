import * as React from 'react';

import { Link } from '@fluentui/react-components';
import { InfoLabel, InfoLabelProps } from '@fluentui/react-infolabel-preview';

export const Default = (props: Partial<InfoLabelProps>) => (
  <InfoLabel
    info={
      <>
        This is example information for an InfoLabel. <Link href="https://react.fluentui.dev">Learn more</Link>
      </>
    }
    {...props}
  >
    Example label
  </InfoLabel>
);
