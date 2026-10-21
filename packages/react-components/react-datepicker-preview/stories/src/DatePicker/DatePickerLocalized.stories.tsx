import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { createCalendarDateTimeFormatter } from '@fluentui/react-calendar-preview';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const Localized = (): JSXElement => (
  <Field label="Date du rendez-vous">
    <DatePicker
      allowTextInput
      today={new Date(2030, 0, 15)}
      defaultValue={new Date(2030, 0, 15)}
      formatDate={date => new Intl.DateTimeFormat('fr-FR').format(date)}
      parseDate={text => {
        const [day, month, year] = text.split('/').map(Number);
        if (!day || !month || !year) {
          return null;
        }
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
      }}
      contentAfter={{ 'aria-label': 'Ouvrir le calendrier' }}
      popupSurface={{ 'aria-label': 'Calendrier' }}
      calendar={{
        firstDayOfWeek: 'monday',
        formatters: {
          dateTime: createCalendarDateTimeFormatter('fr-FR'),
          previousMonthLabel: data => `Mois précédent ${data.formattedDate}`,
          nextMonthLabel: data => `Mois suivant ${data.formattedDate}`,
          previousYearLabel: data => `Année précédente ${data.formattedDate}`,
          nextYearLabel: data => `Année suivante ${data.formattedDate}`,
          previousYearRangeLabel: data => `Années précédentes ${data.formattedRange}`,
          nextYearRangeLabel: data => `Années suivantes ${data.formattedRange}`,
          monthPickerHeaderLabel: data => `${data.formattedDate}, changer l'année`,
          yearPickerHeaderLabel: data => `${data.formattedDate}, changer le mois`,
          yearRangePickerHeaderLabel: data => `${data.formattedRange}, changer l'année`,
          weekNumberLabel: data => `Semaine ${data.weekNumber}`,
          selectedDateLabel: data => `Date sélectionnée ${data.formattedDate}`,
          todayDateLabel: data => `Aujourd'hui ${data.formattedDate}`,
          dayMarkedLabel: data => `${data.formattedDate}, marqué`,
        },
        goToTodayButton: { children: "Aller à aujourd'hui" },
      }}
    />
  </Field>
);
