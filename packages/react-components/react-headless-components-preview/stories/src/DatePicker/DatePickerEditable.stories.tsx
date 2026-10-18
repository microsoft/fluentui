import * as React from 'react';
import { DatePicker } from '@fluentui/react-headless-components-preview/date-picker';
import styles from './date-picker.module.css';

export const Editable = (): React.ReactNode => {
  const [error, setError] = React.useState<string>();
  return (
    <div>
      <DatePicker
        aria-label="Start date"
        aria-describedby="date-error"
        aria-invalid={!!error}
        className={styles.input}
        allowTextInput
        openOnClick={false}
        required
        trigger={{ children: 'Choose', className: styles.trigger }}
        popupSurface={{ className: styles.popup }}
        calendar={{ className: styles.calendar, monthPicker: null }}
        onValidationResult={(_event, data) => setError(data.error)}
      />
      <p id="date-error" role="status">
        {error}
      </p>
    </div>
  );
};
