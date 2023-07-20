import * as React from 'react';

import { Link, Button } from '@fluentui/react-components';
import { InfoLabel, InfoLabelProps } from '@fluentui/react-components/unstable';

export const Default = (props: Partial<InfoLabelProps>) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <Button>hello</Button>
    <InfoLabel
      info={
        <>
          This is example information for an InfoButton. <Link href="https://react.fluentui.dev">Learn more</Link>
        </>
      }
      {...props}
    >
      Example label
    </InfoLabel>
    <Button>hello</Button>
  </div>
);
