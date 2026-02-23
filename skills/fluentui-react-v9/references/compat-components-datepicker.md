# Compat Components/DatePicker

Picking a date can be tough without context. A date picker (DatePicker) offers a popup control that’s optimized for picking a single date from a calendar view where contextual information like the day of the week or fullness of the calendar is important. You can modify the calendar to provide additional context or to limit available dates.

Note: DatePicker is a compat component - its internal architecture does not follow all the principles regular Fluent UI v9 components follow - it is not composed of atomic hooks and it might be more difficult to tweak its appearance and behavior.
It however follows Fluent 2 design and uses design tokens, it is production ready and it is stable.

## Best practices

### Do

- Use the `DatePicker` control the way it's designed and built.
- The control provides the date in a specific format. If the date can be entered in an input field, provide helper text in the appropriate format.
- The control provides English strings by default. For localized apps, you must override these using the strings prop.
- Use `<Field>` when possible and provide the `required` prop through the `<Field>` component.

### Don't

- Don't try to change its behavior or appearance.

## Props

| Name         | Type                                                                                                                                                     | Required | Default   | Description                                                                                                                                                                                                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`       | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null>`   | No        |                                                                                                                                                                                                                                                                                                 | Wrapper element which visually appears to be the input and is used for borders, focus styling, etc. (A wrapper is needed to properly position `contentBefore` and `contentAfter` relative to `input`.) The root slot receives the `className` and `style` specified directly on the `<Input>`. All other top-level native props will be applied to the primary slot, `input`. |
| `input`      | `({ as?: "input"; } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "children"> & { ...; })`                          | No       |           | The actual `<input>` element. `type="text"` will be automatically applied unless overridden. This is the "primary" slot, so native props specified directly on the `<Input>` will go here (except `className` and `style`, which go to the `root` slot). The top-level `ref` will also go here. |
| `onChange`   | `((ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void)`                                                                                 | No       |           | Called when the user changes the input's value.                                                                                                                                                                                                                                                 |
| `as`         | `"input"`                                                                                                                                                | No       |           |                                                                                                                                                                                                                                                                                                 |
| `size`       | `"small" "medium" "large"`                                                                                                                               | No       | 'medium'  | Size of the input (changes the font size and spacing).                                                                                                                                                                                                                                          |
| `appearance` | `"outline" "underline" "filled-darker" "filled-lighter" "filled-darker-shadow" "filled-lighter-shadow"`                                                  | No       | 'outline' |

Note: 'filled-darker-shadow' and 'filled-lighter-shadow' are deprecated and will be removed in the future. | Controls the colors and borders of the input. |
| `type` | `"number" "search" "time" "text" "tel" "url" "email" "date" "datetime-local" "month" "password" "week"` | No | 'text' | An input can have different text-based [types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types) based on the type of value the user will enter. Note that no custom styling is currently applied for alternative types, and some types may activate browser-default styling which does not match the Fluent design language. (For non-text-based types such as `button` or `checkbox`, use the appropriate component or an `<input>` element instead.) |
| `contentBefore` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null` | No | | Element before the input text, within the input border |
| `contentAfter` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null` | No | | Element after the input text, within the input border |
| `calendar` | `Partial<CalendarProps>` | No | | |
| `popupSurface` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null` | No | | |
| `mountNode` | `HTMLElement | { element?: HTMLElement | null; className?: string; } | null | undefined` | No | a new element on document.body without any styling | Where the portal children are mounted on DOM |
| `onSelectDate` | `((date: Date | null) => void)` | No | | Callback issued when a date is selected |
| `underlined` | `boolean` | No | false | Whether or not the Input of the DatePicker is underlined. |
| `isMonthPickerVisible` | `boolean` | No | true | Whether the month picker is shown beside the day picker or hidden. |
| `showMonthPickerAsOverlay` | `boolean` | No | false | Show month picker on top of date picker when visible. |
| `allowTextInput` | `boolean` | No | false | Whether the DatePicker allows input a date string directly or not |
| `disableAutoFocus` | `boolean` | No | true | Whether the DatePicker should open automatically when the control is focused WARNING: setting this to false creates an accessibility violation and is not recommended |
| `openOnClick` | `boolean` | No | true | Whether the DatePicker should open when the input is clicked |
| `defaultOpen` | `boolean` | No | false | Whether the DatePicker should be open by default |
| `open` | `boolean` | No | false | Whether the DatePicker is open or not |
| `onOpenChange` | `((open: boolean) => void)` | No | | Callback to run when the DatePicker's open state changes |
| `onValidationResult` | `((data: DatePickerValidationResultData) => void)` | No | | Callback to run after the DatePicker's input has been validated |
| `inlinePopup` | `boolean` | No | false | Whether the DatePicker should render the popup as inline or in a portal |
| `positioning` | `PositioningProps` | No | below | Configure the positioning of the DatePicker dialog |
| `today` | `Date` | No | | Value of today. If unspecified, current time in client machine will be used. |
| `value` | `Date | null` | No | | Default value of the DatePicker, if any When the component is controlled, `null` should be used instead of `undefined` to avoid controlled vs. uncontrolled ambiguity. |
| `formatDate` | `((date?: Date) => string)` | No | date.toString() | Optional method to format the chosen date to a string to display in the DatePicker |
| `parseDateFromString` | `((dateStr: string) => Date | null)` | No | new Date(Date.parse(dateStr)) | Optional method to parse the text input value to date, it is only useful when allowTextInput is set to true |
| `firstDayOfWeek` | `0 1 2 3 4 5 6` | No | DayOfWeek.Sunday | The first day of the week for your locale. |
| `strings` | `CalendarStrings` | No | | Localized strings to use in the Calendar |
| `highlightCurrentMonth` | `boolean` | No | false | Whether the month picker should highlight the current month |
| `highlightSelectedMonth` | `boolean` | No | false | Whether the month picker should highlight the selected month |
| `showWeekNumbers` | `boolean` | No | false | Whether the calendar should show the week number (weeks 1 to 53) before each week row |
| `firstWeekOfYear` | `0 1 2` | No | FirstWeekOfYear.FirstFullWeek | Defines when the first week of the year should start, FirstWeekOfYear.FirstDay, FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values |
| `showGoToToday` | `boolean` | No | | Whether the "Go to today" link should be shown or not |
| `borderless` | `boolean` | No | false | Determines if the DatePicker has a border. |
| `dateTimeFormatter` | `DateFormatting` | No | | Apply additional formatting to dates, for example localized date formatting. |
| `minDate` | `Date` | No | | The minimum allowable date. |
| `maxDate` | `Date` | No | | The maximum allowable date. |
| `initialPickerDate` | `Date` | No | | The initially highlighted date. |
| `allFocusable` | `boolean` | No | false | Allows all elements to be focused, including disabled ones |
| `showCloseButton` | `boolean` | No | | Whether the CalendarDay close button should be shown or not. |
| `ref` | `Ref<HTMLInputElement>` | No | | |

## Examples

### Controlled

A DatePicker can be controlled by manually keeping track of the state and updating it. When controlled, the value prop should use null instead of undefined to clear the value of the DatePicker.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { addDays } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { AriaLiveAnnouncer, Button, Field, makeStyles, useAnnounce } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  control: {
    maxWidth: '300px',
  },
  button: {
    marginRight: '10px',
  },
});

export const Controlled = (): JSXElement => {
  const styles = useStyles();
  const { announce } = useAnnounce();

  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(null);

  const goPrevious = React.useCallback(() => {
    setSelectedDate(prevSelectedDate => {
      const newDate = prevSelectedDate ? addDays(prevSelectedDate, -1) : new Date();
      announce(newDate.toDateString());
      return newDate;
    });
  }, [announce]);

  const goNext = React.useCallback(() => {
    setSelectedDate(prevSelectedDate => {
      const newDate = prevSelectedDate ? addDays(prevSelectedDate, 1) : new Date();
      announce(newDate.toDateString());
      return newDate;
    });
  }, [announce]);

  return (
    <AriaLiveAnnouncer>
      <div className={styles.root}>
        <Field label="Select a date">
          <DatePicker
            value={selectedDate}
            onSelectDate={setSelectedDate}
            placeholder="Select a date..."
            className={styles.control}
          />
        </Field>
        <div>
          <Button className={styles.button} onClick={goPrevious}>
            Previous
          </Button>
          <Button className={styles.button} onClick={goNext}>
            Next
          </Button>
        </div>
      </div>
    </AriaLiveAnnouncer>
  );
};
```

### Custom Date Formatting

Applications can customize how dates are formatted and parsed. Formatted dates can be ambiguous, so the control will avoid parsing the formatted strings of dates selected using the UI when text input is allowed. In this example, we are formatting and parsing dates as dd/MM/yy.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Field, makeStyles } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  control: {
    maxWidth: '300px',
  },
  clearButton: {
    marginBottom: '5px',
  },
});

const onFormatDate = (date?: Date): string => {
  return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
};

export const CustomDateFormatting = (): JSXElement => {
  const styles = useStyles();

  const [value, setValue] = React.useState<Date | null | undefined>(null);
  const datePickerRef = React.useRef<HTMLInputElement>(null);

  const onClick = React.useCallback((): void => {
    setValue(null);
    datePickerRef.current?.focus();
  }, []);

  const onParseDateFromString = React.useCallback(
    (newValue: string): Date => {
      const previousValue = value || new Date();
      const newValueParts = (newValue || '').trim().split('/');
      const day =
        newValueParts.length > 0 ? Math.max(1, Math.min(31, parseInt(newValueParts[0], 10))) : previousValue.getDate();
      const month =
        newValueParts.length > 1
          ? Math.max(1, Math.min(12, parseInt(newValueParts[1], 10))) - 1
          : previousValue.getMonth();
      let year = newValueParts.length > 2 ? parseInt(newValueParts[2], 10) : previousValue.getFullYear();
      if (year < 100) {
        year += previousValue.getFullYear() - (previousValue.getFullYear() % 100);
      }
      return new Date(year, month, day);
    },
    [value],
  );

  return (
    <div className={styles.root}>
      <Field label="Select a date. Input format is day slash month slash year.">
        <DatePicker
          ref={datePickerRef}
          allowTextInput
          value={value}
          onSelectDate={setValue as (date?: Date | null) => void}
          formatDate={onFormatDate}
          parseDateFromString={onParseDateFromString}
          placeholder="Select a date..."
          className={styles.control}
        />
      </Field>
      <div>
        <Button onClick={onClick} className={styles.clearButton}>
          Clear
        </Button>
        <div>Selected date: {(value || '').toString()}</div>
      </div>
    </div>
  );
};
```

### Date Boundaries

A DatePicker allows setting date boundaries. To set a max boundary, use the `maxDate` prop. To set a minimum boundary, use the `minDate` prop. When date boundaries are set the DatePicker will not allow out-of-bounds dates to be picked or entered.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { addMonths, addYears } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  inputControl: {
    maxWidth: '300px',
  },
});

const today = new Date();
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);

const onFormatDate = (date?: Date): string => {
  return !date ? '' : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const DateBoundaries = (): JSXElement => {
  const styles = useStyles();

  return (
    <Field label={`The date boundaries for this example are ${minDate.toDateString()} to ${maxDate.toDateString()}.`}>
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select a date..."
        formatDate={onFormatDate}
        allowTextInput
        className={styles.inputControl}
      />
    </Field>
  );
};
```

### Date Range

DatePicker allows you to set the selection range type. The range can be `Day`, `Month`, `Week`, and `WorkWeek`. The default is `Day`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Label, makeStyles, Select } from '@fluentui/react-components';
import { DateRangeType } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },

  control: {
    maxWidth: '300px',
  },
});

const dateRangeOptions = {
  Day: DateRangeType.Day,
  'Work Week': DateRangeType.WorkWeek,
  Week: DateRangeType.Week,
  Month: DateRangeType.Month,
};

export const DateRange = (): JSXElement => {
  const styles = useStyles();
  const [dateRangeType, setDateRangeType] = React.useState('Week');

  return (
    <div className={styles.container}>
      <Field label="Select a date">
        <DatePicker
          calendar={{
            dateRangeType: dateRangeOptions[dateRangeType as keyof typeof dateRangeOptions],
          }}
          placeholder="Select a date..."
          className={styles.control}
        />
      </Field>
      <div>
        <Label htmlFor="select-daterange-id">Select a DateRangeType</Label>
        <Select
          onChange={(ev, data) => setDateRangeType(data.value)}
          value={dateRangeType}
          className={styles.control}
          id="select-daterange-id"
        >
          {Object.keys(dateRangeOptions).map(key => (
            <option key={key}>{key}</option>
          ))}
        </Select>
      </div>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const Default = (props: Partial<DatePickerProps>): JSXElement => {
  const styles = useStyles();

  return (
    <Field label="Select a date">
      <DatePicker className={styles.control} placeholder="Select a date..." {...props} />
    </Field>
  );
};
```

### Disabled

DatePicker can be disabled to restrict user interaction.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const Disabled = (): JSXElement => {
  const styles = useStyles();

  return (
    <Field label="Disabled DatePicker">
      <DatePicker disabled placeholder="Select a date..." className={styles.control} />
    </Field>
  );
};
```

### Error Handling

To add error handling to a DatePicker, use `onValidationResult` along with Field. `onValidationResult`provides an error type string that can be used with defaultDatePickerErrorStrings to get default messages.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { addMonths, addYears } from '@fluentui/react-calendar-compat';
import { DatePicker, defaultDatePickerErrorStrings } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';
import type { DatePickerValidationResultData } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

const today = new Date();
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);

const onFormatDate = (date?: Date): string => {
  return !date ? '' : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const ErrorHandling = (): JSXElement => {
  const styles = useStyles();
  const [error, setError] = React.useState<DatePickerValidationResultData['error']>(undefined);

  return (
    <Field
      required
      label={
        `Select a date out of bounds (minDate: ${minDate.toDateString()}, maxDate: ${maxDate.toDateString()}),` +
        ` type an invalid input, or leave the input empty and close the DatePicker.`
      }
      validationMessage={error && defaultDatePickerErrorStrings[error]}
    >
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        formatDate={onFormatDate}
        placeholder="Select a date..."
        allowTextInput
        onValidationResult={data => setError(data.error)}
        className={styles.control}
      />
    </Field>
  );
};
```

### First Day Of The Week

A DatePicker allows you to set the first day of the week.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DayOfWeek } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Dropdown, Field, makeStyles, Option, useId } from '@fluentui/react-components';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  firstDaySelector: {
    display: 'inline-flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
});

export const FirstDayOfTheWeek = (): JSXElement => {
  const dropdownId = useId('dropdown-default');
  const styles = useStyles();

  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  const onOptionSelect = React.useCallback(
    (
      _: React.ChangeEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
      data: { optionValue: string | undefined; selectedOptions: string[] },
    ) => {
      if (data.optionValue) {
        setFirstDayOfWeek(DayOfWeek[data.optionValue as keyof typeof DayOfWeek]);
      }
    },
    [],
  );

  return (
    <div className={styles.root}>
      <Field label="Start date">
        <DatePicker firstDayOfWeek={firstDayOfWeek} placeholder="Select a date..." />
      </Field>
      <div className={styles.firstDaySelector}>
        <label id={dropdownId}>Select the first day of the week</label>
        <Dropdown aria-labelledby={dropdownId} onOptionSelect={onOptionSelect} value={days[firstDayOfWeek]}>
          {days.map((day, index) => (
            <Option key={index}>{day}</Option>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};
```

### Localized

DatePicker accepts a `strings` prop that allows custom localization.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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

export const Localized = (props: Partial<DatePickerProps>): JSXElement => {
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
```

### Required

DatePicker supports required validation. The validation will happen when the DatePicker loses focus.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const Required = (): JSXElement => {
  const styles = useStyles();

  return (
    <Field label="Date required" required>
      <DatePicker className={styles.control} placeholder="Select a date..." />
    </Field>
  );
};
```

### Text Input

A DatePicker supports user input. Clicking the input field will open the DatePicker, and clicking the field again will dismiss the DatePicker and allow text input. When using keyboard navigation (tabbing into the field), text input is allowed by default, and pressing Enter will open the DatePicker.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const TextInput = (): JSXElement => {
  const styles = useStyles();

  return (
    <Field label="Select a date">
      <DatePicker allowTextInput placeholder="Select a date..." className={styles.control} />
    </Field>
  );
};
```

### Week Numbers

A DatePicker allows you to show the number of the week on the left when `showWeekNumbers` is set to true.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const WeekNumbers = (): JSXElement => {
  const styles = useStyles();

  return (
    <Field label="Start date">
      <DatePicker
        showWeekNumbers={true}
        firstWeekOfYear={1}
        showMonthPickerAsOverlay={true}
        placeholder="Select a date..."
        className={styles.control}
      />
    </Field>
  );
};
```
