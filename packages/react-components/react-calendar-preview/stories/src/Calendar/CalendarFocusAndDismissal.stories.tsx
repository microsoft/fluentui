import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { CalendarRegular } from '@fluentui/react-icons';
import { Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarDayHandle } from '@fluentui/react-calendar-preview';

export const CalendarFocusAndDismissal = (): JSXElement => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Date | null>(null);
  const dayRef = React.useRef<CalendarDayHandle>(null);

  React.useEffect(() => {
    if (open) {
      dayRef.current?.focus();
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={(_event, data) => setOpen(data.open)} trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Button icon={<CalendarRegular />}>{value?.toDateString() ?? 'Select date'}</Button>
      </PopoverTrigger>
      <PopoverSurface aria-label="Choose a date">
        <Calendar
          value={value}
          layout="overlay"
          dayPicker={{ ref: dayRef, closeButton: { title: 'Close calendar' } }}
          onSelectDate={(_event, data) => {
            setValue(data.date);
            setOpen(false);
          }}
          onDismiss={() => setOpen(false)}
        />
      </PopoverSurface>
    </Popover>
  );
};

CalendarFocusAndDismissal.parameters = {
  docs: {
    description: {
      story:
        'Use the day picker handle for initial focus. Calendar reports Escape and close-button dismissal; ' +
        'the surrounding Popover owns positioning, light dismissal, the focus trap, and return focus.',
    },
  },
};
