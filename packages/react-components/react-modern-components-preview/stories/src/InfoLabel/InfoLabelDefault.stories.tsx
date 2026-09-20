import * as React from 'react';
import type { InfoLabelProps } from '@fluentui/react-modern-components-preview/info-label';

import { InfoLabel } from '@fluentui/react-modern-components-preview/info-label';
import { Link } from '@fluentui/react-components';

export const Default = (props: Partial<InfoLabelProps>): React.ReactNode => (
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
