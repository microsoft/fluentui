import * as React from 'react';

import { CompoundButton } from '@fluentui/react-modern-components-preview/compound-button';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const styles = {
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
} satisfies Record<string, React.CSSProperties>;

export const Size = (): React.ReactNode => (
  <div style={styles.wrapper}>
    <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="small">
      Size: small
    </CompoundButton>
    <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="medium">
      Size: medium
    </CompoundButton>
    <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="large">
      Size: large
    </CompoundButton>
  </div>
);

Size.parameters = {
  docs: {
    description: {
      story: 'A compound button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
