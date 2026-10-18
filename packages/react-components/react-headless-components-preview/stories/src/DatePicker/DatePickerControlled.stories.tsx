import * as React from 'react';
import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import styles from './date-picker.module.css';

export const Controlled = (): React.ReactNode => {
  const [value, setValue] = React.useState<Date | null>(null);
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <DatePicker
        aria-label="Controlled date"
        className={styles.input}
        value={value}
        open={open}
        onDateChange={(_event, data) => setValue(data.value)}
        onOpenChange={(_event, data) => setOpen(data.open)}
        trigger={{ children: 'Choose', className: styles.trigger }}
        popupSurface={{ className: styles.popup }}
        calendar={{ className: styles.calendar, monthPicker: null }}
      />
      <p role="status">{value?.toDateString() ?? 'No selection'}</p>
    </div>
  );
};
