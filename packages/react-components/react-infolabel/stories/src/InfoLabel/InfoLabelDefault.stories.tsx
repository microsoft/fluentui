import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { InfoLabel, InfoLabelProps, Link } from '@fluentui/react-components';

export const Default = (props: Partial<InfoLabelProps>): JSXElement => (
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
