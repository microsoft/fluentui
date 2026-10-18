import * as React from 'react';
import { Button, Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

const today = new Date(2030, 0, 15);

export const Controlled = (): JSXElement => {
  const [value, setValue] = React.useState<Date | null>(today);
  const [open, setOpen] = React.useState(false);
  return (
    <Field label="Appointment">
      <DatePicker
        today={today}
        value={value}
        open={open}
        onDateChange={(_, data) => setValue(data.value)}
        onOpenChange={(_, data) => setOpen(data.open)}
      />
      <Button onClick={() => setValue(null)}>Clear selection</Button>
    </Field>
  );
};
