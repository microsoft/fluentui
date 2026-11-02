import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CompoundButton } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import type { CompoundButtonProps } from '@fluentui/react-components';

export const Default = (props: CompoundButtonProps): JSXElement => (
  <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" {...props}>
    Example
  </CompoundButton>
);
