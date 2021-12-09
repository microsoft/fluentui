import * as React from 'react';
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { CompoundButton } from '../../../CompoundButton';

export const Icon = () => (
  <>
    <CompoundButton secondaryContent="This is the secondary content" icon={<CalendarMonth24Regular />}>
      Text
    </CompoundButton>
    <CompoundButton
      secondaryContent="This is the secondary content"
      icon={<CalendarMonth24Regular />}
      iconPosition="after"
    >
      Text
    </CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content" icon={<CalendarMonth24Regular />} />
  </>
);
Icon.parameters = {
  docs: {
    description: {
      story:
        'The CompoundButton has an `icon` slot that, if specified, renders an icon either `before` ' +
        'or `after` the children, as specified by the `iconPosition` prop.',
    },
  },
};
