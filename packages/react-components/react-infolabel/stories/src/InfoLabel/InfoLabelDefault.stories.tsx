import * as React from 'react';

import { InfoLabel, InfoLabelProps, Link } from '@fluentui/react-components';

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
