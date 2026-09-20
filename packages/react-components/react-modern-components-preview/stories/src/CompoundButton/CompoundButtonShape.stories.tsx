import * as React from 'react';

import { CompoundButton } from '@fluentui/react-modern-components-preview/compound-button';

const styles = {
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
} satisfies Record<string, React.CSSProperties>;

export const Shape = (): React.ReactNode => (
  <div style={styles.wrapper}>
    <CompoundButton secondaryContent="Secondary content">Rounded</CompoundButton>
    <CompoundButton secondaryContent="Secondary content" shape="circular">
      Circular
    </CompoundButton>
    <CompoundButton secondaryContent="Secondary content" shape="square">
      Square
    </CompoundButton>
  </div>
);

Shape.parameters = {
  docs: {
    description: {
      story: 'A compound button can be rounded, circular, or square.',
    },
  },
};
