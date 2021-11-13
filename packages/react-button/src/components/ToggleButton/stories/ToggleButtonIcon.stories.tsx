import * as React from 'react';
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { ToggleButton } from '../../../ToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Icon = () => (
  <>
    <ToggleButton icon={<CalendarMonth24Regular />}>Text</ToggleButton>
    <ToggleButton icon={<CalendarMonth24Regular />} iconPosition="after">
      Text
    </ToggleButton>
    <ToggleButton icon={<CalendarMonth24Regular />} />
  </>
);
Icon.parameters = {
  docs: {
    description: {
      story:
        'The ToggleButton has an `icon` slot that, if specified, renders an icon either `before` ' +
        'or `after` the children, as specified by the `iconPosition` prop.',
    },
  },
};
