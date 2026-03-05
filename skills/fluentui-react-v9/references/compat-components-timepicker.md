# Compat Components/TimePicker

`TimePicker` offers a control that’s optimized for selecting a time from a drop-down list or using free-form input to enter a custom time.

Note: TimePicker is a compat component - its internal architecture does not follow all the principles regular Fluent UI v9 components follow - it is not composed of atomic hooks and it might be more difficult to tweak its appearance and behavior. It however follows Fluent 2 design and uses design tokens, it is production ready and it is stable.

## Best practices

### Do

- Use `freeform` to give users the flexibility to input and select a time that may not be present in the predefined options.
- Use TimePicker within `Field` component to ensure an accessible label and error message are provided.

## Props

| Name                     | Type                                                                                                                                                                                                                                 | Required                | Default                     | Description                                                                                                                                                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --- | -------------------------------------------------- | -------------------------------------------- |
| `root`                   | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>                                                                                | null>`                  | No                          |                                                                                                                                                                                                                                                                            | The root combobox slot                     |
| `input`                  | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                                                                                                      | No                      |                             | The primary slot, an input with role="combobox"                                                                                                                                                                                                                            |
| `as`                     | `"input"`                                                                                                                                                                                                                            | No                      |                             |                                                                                                                                                                                                                                                                            |
| `listbox`                | `WithSlotShorthandValue<Omit<ListboxSlots, "root"> & Omit<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }, "ref"> & SelectionProps & { ...; } & RefAttributes<...>> | null`                   | No                          |                                                                                                                                                                                                                                                                            | The dropdown listbox slot                  |
| `expandIcon`             | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                         | null`                   | No                          |                                                                                                                                                                                                                                                                            | The dropdown arrow icon                    |
| `clearIcon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                         | null`                   | No                          |                                                                                                                                                                                                                                                                            | The dropdown clear icon                    |
| `size`                   | `"small" "medium" "large"`                                                                                                                                                                                                           | No                      | 'medium'                    | Controls the size of the combobox faceplate                                                                                                                                                                                                                                |
| `mountNode`              | `HTMLElement                                                                                                                                                                                                                         | { element?: HTMLElement | null; className?: string; } | null                                                                                                                                                                                                                                                                       | undefined`                                 | No  | a new element on document.body without any styling | Where the portal children are mounted on DOM |
| `appearance`             | `"outline" "underline" "filled-darker" "filled-lighter"`                                                                                                                                                                             | No                      | 'outline'                   | Controls the colors and borders of the combobox trigger.                                                                                                                                                                                                                   |
| `defaultOpen`            | `boolean`                                                                                                                                                                                                                            | No                      |                             | The default open state when open is uncontrolled                                                                                                                                                                                                                           |
| `onOpenChange`           | `((e: ComboboxBaseOpenEvents, data: ComboboxBaseOpenChangeData) => void)`                                                                                                                                                            | No                      |                             | Callback when the open/closed state of the dropdown changes                                                                                                                                                                                                                |
| `open`                   | `boolean`                                                                                                                                                                                                                            | No                      |                             | Sets the open/closed state of the dropdown. Use together with onOpenChange to fully control the dropdown's visibility                                                                                                                                                      |
| `positioning`            | `PositioningShorthand`                                                                                                                                                                                                               | No                      |                             | Configure the positioning of the combobox dropdown. Please refer to the [positioning documentation](https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--default#anchor-to-target) for more details. @defaultvalue below                      |
| `clearable`              | `boolean`                                                                                                                                                                                                                            | No                      |                             | If set, the combobox will show an icon to clear the current value.                                                                                                                                                                                                         |
| `inlinePopup`            | `boolean`                                                                                                                                                                                                                            | No                      |                             | Render the combobox's popup inline in the DOM. This has accessibility benefits, particularly for touch screen readers.                                                                                                                                                     |
| `freeform`               | `boolean`                                                                                                                                                                                                                            | No                      |                             |                                                                                                                                                                                                                                                                            |
| `hourCycle`              | `"h11" "h12" "h23" "h24"`                                                                                                                                                                                                            | No                      | undefined                   | A string value indicating whether the 12-hour format ("h11", "h12") or the 24-hour format ("h23", "h24") should be used. - 'h11' and 'h23' start with hour 0 and go up to 11 and 23 respectively. - 'h12' and 'h24' start with hour 1 and go up to 12 and 24 respectively. |
| `showSeconds`            | `boolean`                                                                                                                                                                                                                            | No                      |                             | If true, show seconds in the dropdown options and consider seconds for default validation purposes.                                                                                                                                                                        |
| `startHour`              | `0 16 20 24 2 1 5 3 4 6 7 8 9 10 11 12 13 14 15 17 18 19 21 22 23`                                                                                                                                                                   | No                      |                             | Start hour (inclusive) for the time range, 0-24.                                                                                                                                                                                                                           |
| `endHour`                | `0 16 20 24 2 1 5 3 4 6 7 8 9 10 11 12 13 14 15 17 18 19 21 22 23`                                                                                                                                                                   | No                      |                             | End hour (exclusive) for the time range, 0-24.                                                                                                                                                                                                                             |
| `increment`              | `number`                                                                                                                                                                                                                             | No                      |                             | Time increment, in minutes, of the options in the dropdown.                                                                                                                                                                                                                |
| `dateAnchor`             | `Date`                                                                                                                                                                                                                               | No                      |                             | The date in which all dropdown options are based off of.                                                                                                                                                                                                                   |
| `selectedTime`           | `Date                                                                                                                                                                                                                                | null`                   | No                          |                                                                                                                                                                                                                                                                            | Currently selected time in the TimePicker. |
| `defaultSelectedTime`    | `Date`                                                                                                                                                                                                                               | No                      |                             | Default selected time in the TimePicker, for uncontrolled scenarios.                                                                                                                                                                                                       |
| `onTimeChange`           | `((event: TimeSelectionEvents, data: TimeSelectionData) => void)`                                                                                                                                                                    | No                      |                             | Callback for when a time selection is made.                                                                                                                                                                                                                                |
| `formatDateToTimeString` | `((date: Date) => string)`                                                                                                                                                                                                           | No                      |                             | Customizes the formatting of date strings displayed in dropdown options.                                                                                                                                                                                                   |
| `parseTimeStringToDate`  | `((time: string) => TimeStringValidationResult)`                                                                                                                                                                                     | No                      |                             | In the freeform TimePicker, customizes the parsing from the input time string into a Date and provides custom validation.                                                                                                                                                  |
| `ref`                    | `Ref<HTMLInputElement>`                                                                                                                                                                                                              | No                      |                             |                                                                                                                                                                                                                                                                            |

## Examples

### Clearable

A TimePicker can be clearable and let users remove their selection.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
});

export const Clearable = (): JSXElement => {
  const styles = useStyles();

  return (
    <Field label="Coffee time" className={styles.root}>
      <TimePicker clearable />
    </Field>
  );
};
```

### Controlled

A TimePicker may have controlled selection and value. There are a few things to keep in mind:

1. **Control `selectedTime` with `value` (or `defaultSelectedTime` with `defaultValue`)**: When the `selectedTime` is controlled or a `defaultSelectedTime` is provided, a controlled `value` or `defaultValue` must also be defined. Otherwise, the TimePicker will not be able to display a value before the Options are rendered.
2. **Clearing input with null**: when controlled, the `selectedTime` prop should use `null` instead of `undefined` to clear the value of the TimePicker.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerProps, formatDateToTimeString } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    maxWidth: '300px',
  },
});

const DefaultSelection = () => {
  const [defaultSelectedTime] = React.useState(new Date('November 25, 2023 12:30:00'));
  return (
    <Field label="Select a time (default Selection)">
      <TimePicker
        startHour={8}
        endHour={20}
        defaultSelectedTime={defaultSelectedTime}
        defaultValue={formatDateToTimeString(defaultSelectedTime)}
      />
    </Field>
  );
};

const ControlledSelection = () => {
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(new Date('November 25, 2023 12:30:00'));
  const [value, setValue] = React.useState<string>(selectedTime ? formatDateToTimeString(selectedTime) : '');

  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setValue(data.selectedTimeText ?? '');
  };
  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  return (
    <Field label="Select a time (controlled Selection)">
      <TimePicker
        startHour={8}
        endHour={20}
        selectedTime={selectedTime}
        onTimeChange={onTimeChange}
        value={value}
        onInput={onInput}
      />
    </Field>
  );
};

export const Controlled = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <DefaultSelection />
      <ControlledSelection />
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerProps } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
});

export const Default = (props: Partial<TimePickerProps>): JSXElement => {
  const styles = useStyles();
  return (
    <Field label="Coffee time" className={styles.root}>
      <TimePicker {...props} />
    </Field>
  );
};
```

### Freeform Custom Parsing

This story sets custom time string in the dropdown options, and performs custom parsing from the input text to Date object on selection.

- The time display format in the dropdown can be customized using `formatDateToTimeString`.
- Freefrom TimePicker can have custom parsing for input text to Date object using `parseTimeStringToDate`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerProps } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
});

const formatDateToTimeString = (date: Date) => {
  const localeTimeString = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h12',
  });
  if (date.getHours() < 12) {
    return `Morning: ${localeTimeString}`;
  }
  return `Afternoon: ${localeTimeString}`;
};

export const FreeformCustomParsing = (): JSXElement => {
  const styles = useStyles();

  const [anchor] = React.useState(() => new Date(2023, 1, 1));

  const parseTimeStringToDate: TimePickerProps['parseTimeStringToDate'] = (time: string | undefined) => {
    if (!time) {
      return { date: null };
    }

    const [hours, minutes] = (time.split(' ')[1].match(/\d+/g) ?? []).map(Number);
    const adjustedHours = time.includes('Afternoon: ') && hours !== 12 ? hours + 12 : hours;
    const date = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate(), adjustedHours, minutes);

    return { date };
  };

  const [selectedTimeText, setSelectedTimeText] = React.useState<string | undefined>(undefined);
  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTimeText(data.selectedTimeText);
  };

  return (
    <div>
      <Field label="Coffee time" className={styles.root}>
        <TimePicker
          freeform
          dateAnchor={anchor}
          formatDateToTimeString={formatDateToTimeString}
          parseTimeStringToDate={parseTimeStringToDate}
          onTimeChange={onTimeChange}
        />
      </Field>
      {selectedTimeText && <div>Selected time: {selectedTimeText}</div>}
    </div>
  );
};
```

### Freeform With Error Handling

TimePicker supports the `freeform` prop, which allows freeform text input.
The selection behavior of freeform TimePicker aligns with the native `change` event behavior for text input:

- When the value in the TimePicker input changes, and the TimePicker loses focus, the selected time is computed from the `input` value.
- When TimePicker input value has changed and Enter key is pressed on the `input`:
  - if the dropdown is expanded and the `input` value is prefix of an option, the selected time is set to the matching option.
  - if the dropdown is collapsed or the `input` value does not match any option, the selected time is computed from `input` value.

The selected time is available in `onTimeChange` callback. Use Field to display the error message based on the error type provided by `onTimeChange`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, FieldProps, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerErrorType, TimePickerProps } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

const getErrorMessage = (error?: TimePickerErrorType): FieldProps['validationMessage'] => {
  switch (error) {
    case 'invalid-input':
      return 'Invalid time format. Please use the 24-hour format HH:MM.';
    case 'out-of-bounds':
      return 'Time out of the 10:00 to 19:59 range.';
    case 'required-input':
      return 'Time is required.';
    default:
      return '';
  }
};

export const FreeformWithErrorHandling = (): JSXElement => {
  const styles = useStyles();

  const [errorType, setErrorType] = React.useState<TimePickerErrorType>();
  const handleTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setErrorType(data.errorType);
  };

  return (
    <Field
      required
      label={
        `Type a time outside of 10:00 to 19:59,` +
        ` type an invalid time, or leave the input empty and close the TimePicker.`
      }
      validationMessage={getErrorMessage(errorType)}
    >
      <TimePicker className={styles.control} freeform startHour={10} endHour={20} onTimeChange={handleTimeChange} />
    </Field>
  );
};
```

### Time Picker With Date Picker

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';
import { TimePicker, TimePickerProps, formatDateToTimeString } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    columnGap: '20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    maxWidth: '600px',
    marginBottom: '10px',
  },
});

export const TimePickerWithDatePicker = (): JSXElement => {
  const styles = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(null);

  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timePickerValue, setTimePickerValue] = React.useState<string>(
    selectedTime ? formatDateToTimeString(selectedTime) : '',
  );

  const onSelectDate: DatePickerProps['onSelectDate'] = date => {
    setSelectedDate(date);
    if (date && selectedTime) {
      setSelectedTime(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes(),
        ),
      );
    }
  };

  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setTimePickerValue(data.selectedTimeText ?? '');
  };
  const onTimePickerInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTimePickerValue(ev.target.value);
  };

  return (
    <div>
      <div className={styles.root}>
        <Field label="Select a date">
          <DatePicker placeholder="Select a date..." value={selectedDate} onSelectDate={onSelectDate} />
        </Field>
        <Field label="Select a time">
          <TimePicker
            placeholder="Select a time..."
            freeform
            dateAnchor={selectedDate ?? undefined}
            selectedTime={selectedTime}
            onTimeChange={onTimeChange}
            value={timePickerValue}
            onInput={onTimePickerInput}
          />
        </Field>
      </div>

      {selectedDate && (
        <div>Selected date time: {selectedTime ? selectedTime.toString() : selectedDate.toString()}</div>
      )}
    </div>
  );
};
```
