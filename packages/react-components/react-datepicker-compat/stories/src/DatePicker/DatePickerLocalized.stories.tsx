import * as React from 'react';
import { DatePicker, defaultDatePickerStrings } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';
import type { DatePickerProps, CalendarStrings } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

const localizedStrings: CalendarStrings = {
  ...defaultDatePickerStrings,
  days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  shortDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  goToToday: 'Ir a hoy',
};

const onFormatDate = (date?: Date) => {
  return !date ? '' : `${localizedStrings.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const Localized = (props: Partial<DatePickerProps>) => {
  const styles = useStyles();

  return (
    <Field label="Selecciona una fecha">
      <DatePicker
        strings={localizedStrings}
        className={styles.control}
        formatDate={onFormatDate}
        placeholder="Selecciona una fecha..."
        {...props}
      />
    </Field>
  );
};

Localized.parameters = {
  docs: {
    description: {
      story: 'DatePicker accepts a `strings` prop that allows custom localization.',
    },
  },
};
