# Datepicker FluentUI spec

`Datepicker` is a complex component which consists of two main blocks -- `input` which contains selected date value and `calendar` or `picker` component which allows user to choose a date and navigate between calendar elements (i.e. between months or years).

## Reference implementations

- [Ant Design](https://ant.design/components/date-picker/)
- [Atlas Kit](https://atlaskit.atlassian.com/packages/core/datetime-picker)
- [Carbon Design System](https://www.carbondesignsystem.com/components/date-picker/code)
- [Lightning Design System](https://www.lightningdesignsystem.com/components/datepickers)
- [UI Fabric](https://developer.microsoft.com/en-us/fabric#/controls/web/datepicker)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html)
- [Material UI Pickers](https://material-ui-pickers.dev/demo/datepicker)
- [React-Use-Calendar](https://github.com/gregnb/react-use-calendar)
- [React Spectrum Datepicker](https://github.com/adobe-private/react-spectrum-v3/tree/master/packages/%40react-aria/datepicker)
- [React Dates](https://github.com/airbnb/react-dates)

## API

### Props

<!-- prettier-ignore-start -->
| Prop Name        | Type                                             | Description                                                                                        |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| dayNames         | string[]                                         | An array of localized strings for the full names of days.                                          |
| disabled         | boolean                                          | Datepicker can show it is currently unable to be interacted with.                                  |
| disabledDate     | Date[]                                           | If set the `Calendar` will not allow selection of dates in this array.                             |
| firstDayOfWeek   | enum                                             | Which day of the week should be rendered in the first column                                       |
| format           | (date: Date) => string                           | Format selected date to be rendered in the `input`                                                 |
| goToToday        | string                                           | String to render for button to direct the user to today's date.                                    |
| isRequired       | boolean                                          | Datepicker can show it's `input` is required to be filled.                                         |
| maxDate          | Date                                             | If set the `Calendar` will not allow navigation to or selection of a date earlier than this value. |
| minDate          | Date                                             | If set the `Calendar` will not allow navigation to or selection of a date later than this value.   |
| months           | string[]                                         | An array of localized strings for the full names of months.                                        |
| onChange         | `(event: React.FormEvent<HTMLInputElement \| HTMLTextAreaElement>, newValue?: string) => void` | Callback for when the input value changes.           |
| open             | boolean                                          | Open `Calendar` component                                                                          |
| parse            | (date: string) => Date                           | Parse date from string representation into `Date`.                                                 |
| placeholder      | string                                           | Placeholder for the input                                                                          |
| renderCell       | ShorthandRenderFunction<CalendarCellProps>       | A render function to customize how `cells` are rendered in the `Calendar`.                         |
| renderHeaderCell | ShorthandRenderFunction<CalendarHeaderCellProps> | A render function to customize how `cells` are rendered in the `Calendar`.                         |
| selectedDate     | Date                                             | Date shown as selected in the `input`.                                                             |
| shortDays        | string[]                                         | An array of localized strings for the short names of days.                                         |
| shortMonths      | string[]                                         | An array of localized strings for the short names of months                                        |
| type             | enum `day\|month\|year`                          | Type of the `Calendar` to be shown.                                                                |
<!-- prettier-ignore-end -->

#### Notes

Consider having a single property to be a dictionary containing all needed localized strings.

`renderCell` and `renderHeaderCell` are replaced with `calendarCell` and `calendarHeaderCell` shorthand components respectively in Fluent UI v0 implementation.

## Structure

### Proposed React structure

#### Public usage

```TSX
<Datepicker />
```

`Datepicker` would not allow children API.

#### Internal representation

```tsx
const Datepicker = () => (
  <>
    <InputBlock />
    <Calendar />
  </>
);

const InputBlock = () => (
  <>
    <Input />
    <Button>
      <CalendarIcon />
    </Button>
  </>
);

const Calendar = () => (
  <>
    <CalendarControl />
    <CalendarHeader />
    <CalendarBody />
    // Grid with current date interval layout
    <CalendarFooter />
    // For optional content
  </>
);

const CalendarControls = () => (
  <>
    <CalendarControl />
    // e.g. previous month
    <CalendarControl />
    // open year picker
    <CalendarControl />
    // next month
  </>
);

const CalendarHeader = () => (
  <>
    <CalendarHeaderCell />
    // e.g. name of the day
    <CalendarHeaderCell />
    //
    <CalendarHeaderCell />
    //
  </>
);

const CalendarBody = () => (
  <>
    <CalendarCell />
    // e.g. day
    <CalendarCell />
    // or month name
    <CalendarCell />
    // or year
    <CalendarCell />
  </>
);

const CalendarFooter = () => (
  // Sample content which can be put into Calendar footer
  <>
    <Button>OK</Button>
    <Button>Cancel</Button>
  </>
);
```

### Proposed DOM structure

Proposed DOM structure follows [WAI-ARIA example of day picker](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html).

```htmlmixed
<div id="myDatepicker" class="datepicker">
  <div class="date">
    <label for="id-textbox-1">
      Date
    </label>
    <input type="text"
           placeholder="mm/dd/yyyy"
           id="id-textbox-1"
           aria-autocomplete="none">
    <button class="icon" aria-label="Choose Date">
      <span class="fa fa-calendar-alt fa-2x"></span>
    </button>
  </div>
  <div id="id-datepicker-1"
       class="datepickerDialog"
       role="dialog"
       aria-modal="true"
       aria-labelledby="id-dialog-label">
    <div class="header">
      <button class="prevYear" aria-label="previous year">
        <span class="fas fa-angle-double-left fa-lg"></span>
      </button>
      <button class="prevMonth" aria-label="previous month">
        <span class="fas fa-angle-left fa-lg"></span>
      </button>
      <h2 id="id-dialog-label"
          class="monthYear"
          aria-live="polite">
        Month Year
      </h2>
      <button class="nextMonth" aria-label="next month">
        <span class="fas fa-angle-right fa-lg"></span>
      </button>
      <button class="nextYear" aria-label="next year">
        <span class="fas fa-angle-double-right fa-lg"></span>
      </button>
    </div>
    <table id="myDatepickerGrid"
           class="dates"
           role="grid"
           aria-labelledby="id-dialog-label">
      <thead>
        <tr>
          <th scope="col" abbr="Sunday">
            Su
          </th>
          <th scope="col" abbr="Monday">
            Mo
          </th>
          <th scope="col" abbr="Tuesday">
            Tu
          </th>
          <th scope="col" abbr="Wednesday">
            We
          </th>
          <th scope="col" abbr="Thursday">
            Th
          </th>
          <th scope="col" abbr="Friday">
            Fr
          </th>
          <th scope="col" abbr="Saturday">
            Sa
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              25
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              26
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              27
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              28
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              29
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              30
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              1
            </button>
          </td>
        </tr>
        <tr>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              2
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              3
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              4
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              5
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              6
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              7
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              8
            </button>
          </td>
        </tr>
        <tr>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              9
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              10
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              11
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              12
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              13
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="0">
              14
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              15
            </button>
          </td>
        </tr>
        <tr>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              16
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              17
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              18
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              19
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              20
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              21
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              22
            </button>
          </td>
        </tr>
        <tr>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              23
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              24
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              25
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              26
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              27
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              28
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              29
            </button>
          </td>
        </tr>
        <tr>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              30
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton" tabindex="-1">
              31
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              1
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              2
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              3
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              4
            </button>
          </td>
          <td class="dateCell">
            <button class="dateButton"
                    tabindex="-1"
                    disabled="">
              5
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="dialogButtonGroup">
      <button class="dialogButton" value="cancel">
        Cancel
      </button>
      <button class="dialogButton" value="ok">
        OK
      </button>
    </div>
    <div class="message" aria-live="polite">
      Test
    </div>
  </div>
</div>
```

## Behaviors

See [WAI-ARIA example](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html)

### Input block states

#### Enabled state

An enabled `Datepicker` communicates interaction by having styling that invite the user to fill `input` or click on the `button` to trigger an action.

#### Disabled state

A disabled `Datepicker` is non-interactive, disallowing the user to to fill `input` or click on the `button` to trigger an action.

#### Hovered state

A hovered `button` changes styling to communicate that the user has placed a cursor above it.

#### Focused state

A focused `input` or `button` changes styling to communicate that the user has placed keyboard focus on it. This styling is usually the same to the one in the hovered state.

### Calendar states

#### Open state

`Calendar` component can be opened to show the selection grid to the user.

#### Selected date state

`Calendar` component changes styling of `CalendarCell` to communicate that the user has selected a particular date.

### Keyboard interactions

[Follow the recommendations of WAI-ARIA](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html#kbd_label)

#### Trigger button

| Key         | Description                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Space/Enter | Open the date picker dialog. Move focus to selected date, i.e., the date displayed in the date input text field. If no date has been selected, places focus on the current date. |

#### Calendar modal

| Key         | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| Escape      | Closes the dialog and returns focus to the trigger `button`.  |
| Tab         | Moves focus to previous element in the dialog `Tab` sequence. |
| Shift + Tab | Moves focus to previous element in the dialog `Tab` sequence. |

##### Notes

As specified in the `grid` design pattern, only one button in the calendar grid is in the `Tab` sequence.

If focus is on the last button (i.e., `OK` in Calendar footer), moves focus to the first button (i.e. control element on the top of `Calendar`) and vice versa.

#### Calendar modal: Controls

| Key         | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Space/Enter | Change the month and/or year displayed in the calendar grid. |

#### Calendar modal: Calendar body grid

| Key               | Description                                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Space/Enter       | Select the date, close the dialog, and move focus to the trigger button.                                                                                                                 |
| Arrows            | Moves focus to the according to the grid behavior.                                                                                                                                       |
| Home              | Moves focus to the first day (e.g Sunday) of the current week.                                                                                                                           |
| End               | Moves focus to the last day (e.g. Saturday) of the current week.                                                                                                                         |
| Page Up           | Changes the grid of dates to the previous month. Sets focus on the same day of the same week. If that day does not exist, then moves focus to the same day of the previous or next week. |
| Shift + Page Up   | Changes the grid of dates to the previous year. Sets focus on the same day of the same week. If that day does not exist, then moves focus to the same day of the previous or next week.  |
| Page Down         | Changes the grid of dates to the next month. Sets focus on the same day of the same week. If that day does not exist, then moves focus to the same day of the previous or next week.     |
| Shift + Page Down | Changes the grid of dates to the next year. Sets focus on the same day of the same week. If that day does not exist, then moves focus to the same day of the previous or next week.      |

##### Notes

Description above refers to day/month/year pickers as is shown in [WAI-ARIA example](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html#kbd_label), and should be extended to other picker types as well. E.g. when picking a month `Home` would focus on the first month in the grid and `Page Up` would change to the previous year and set focus to the same month.

## Themability and customization

### Slots

| Slot name          | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| root               | Root slot for `Datepicker`.                                    |
| input              | `Input` slot for datepicker.                                   |
| button             | Trigger `button` slot for datepicker, used to open `Calendar`. |
| CalendarControls   | Slot for `Calendar`'s controls.                                |
| CalendarHeader     | Slot for `Calendar`'s header.                                  |
| CalendarHeaderCell | Slot for `Calendar`'s header cell.                             |
| CalendarBody       | Slot for `Calendar`'s body.                                    |
| CalendarCell       | Slot for `Calendar`'s body cell.                               |
| CalendarFooter     | Slot for `Calendar`'s footer.                                  |

### Composition

_TBD_

## Concerns

Complexity and number of internal components might affect the performance.

Caching might help with the re-renders, but we need to think about first render.

## UI Fabric Datepicker vs. Fluent UI Datepicker

In the summer of 2020, the first version of FluentUI datepicker has been implemented.
As the rest of the document suggests, the implementation has been inspired by both the industry as well as FabricUI and the current Teams implementation.

These are some of the notable FluentUI vs. Fabric differences:

- Datepicker with disabled input does not open on focus in FluentUI.
- Placeholder has a default value in FluentUI.
- Datepicker navigates to disabled dates in FluentUI.
