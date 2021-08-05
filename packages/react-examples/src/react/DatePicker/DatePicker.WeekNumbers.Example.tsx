import * as React from 'react';
import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  IDropdownOption,
  mergeStyles,
  defaultDatePickerStrings,
} from '@fluentui/react';

const days: IDropdownOption[] = [
  { text: 'Sunday', key: DayOfWeek.Sunday },
  { text: 'Monday', key: DayOfWeek.Monday },
  { text: 'Tuesday', key: DayOfWeek.Tuesday },
  { text: 'Wednesday', key: DayOfWeek.Wednesday },
  { text: 'Thursday', key: DayOfWeek.Thursday },
  { text: 'Friday', key: DayOfWeek.Friday },
  { text: 'Saturday', key: DayOfWeek.Saturday },
];
const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });

export const DatePickerWeekNumbersExample: React.FunctionComponent = () => {
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  const onDropdownChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
    setFirstDayOfWeek(option.key as number);
  }, []);

  return (
    <div className={rootClass}>
      <DatePicker
        firstDayOfWeek={firstDayOfWeek}
        showWeekNumbers={true}
        firstWeekOfYear={1}
        showMonthPickerAsOverlay={true}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
      <Dropdown
        label="Select the first day of the week"
        options={days}
        selectedKey={firstDayOfWeek}
        onChange={onDropdownChange}
      />
    </div>
  );
};
