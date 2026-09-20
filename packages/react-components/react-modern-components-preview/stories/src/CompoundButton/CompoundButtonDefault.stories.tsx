import * as React from 'react';

import { CompoundButton } from '@fluentui/react-modern-components-preview/compound-button';
import type { CompoundButtonProps } from '@fluentui/react-modern-components-preview/compound-button';
import { CalendarMonthRegular } from '@fluentui/react-icons';

export const Default = (props: CompoundButtonProps): React.ReactNode => (
  <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" {...props}>
    Example
  </CompoundButton>
);
