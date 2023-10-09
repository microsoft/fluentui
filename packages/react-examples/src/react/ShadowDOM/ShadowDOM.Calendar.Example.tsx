import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { CalendarButtonExample } from '../Calendar/Calendar.Button.Example';
import { CalendarInlineExample } from '../Calendar/Calendar.Inline.Example';

export const ShadowDOMCalendarExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <CalendarButtonExample />
      <CalendarInlineExample />
    </Shadow>
  );
};
