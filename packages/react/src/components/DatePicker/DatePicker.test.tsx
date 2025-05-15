import '@testing-library/jest-dom';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FirstWeekOfYear } from '@fluentui/date-time-utilities';
import { resetIds } from '@fluentui/utilities';
import { safeCreate } from '@fluentui/test-utilities';

import { DatePicker } from './DatePicker';
import { Calendar } from '../Calendar';
import { DatePickerBase } from './DatePicker.base';
import { Callout } from '../../Callout';
import { TextField } from '../../TextField';
import { CalendarDayGridBase } from '../CalendarDayGrid/CalendarDayGrid.base';
import { isConformant } from '../../common/isConformant';
import { IDatePickerStrings } from './DatePicker.types';

// See https://github.com/facebook/react/issues/11565
function mockCreatePortal() {
  return jest.spyOn(ReactDOM, 'createPortal').mockImplementation(node => node as any);
}

describe('DatePicker', () => {
  beforeEach(() => {
    resetIds();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('renders default DatePicker correctly', () => {
    // This will only render the input. Calendar component has its own snapshot.
    safeCreate(<DatePicker />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('renders DatePicker with value correctly', () => {
    // Format the date as a fake value to avoid snapshot churn
    safeCreate(<DatePicker value={new Date()} formatDate={() => 'fake date'} />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('renders DatePicker allowing text input correctly', () => {
    safeCreate(<DatePicker allowTextInput />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  isConformant({
    Component: DatePicker,
    displayName: 'DatePicker',
  });

  it('can add an id to the container', () => {
    const { container } = render(<DatePickerBase id="foo" />);

    expect(container.firstChild).toHaveAttribute('id', 'foo');
  });

  it('should not open DatePicker when disabled, no label', () => {
    const { container } = render(<DatePickerBase disabled />);
    const icon = container.querySelector('i');
    userEvent.click(icon!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should not render DatePicker when isDatePickerShown is not set', () => {
    render(<DatePickerBase />);
    const input = screen.getByRole('combobox');
    expect(input.getAttribute('aria-owns')).toBeNull();
  });

  it('should render DatePicker when isDatePickerShown is set', () => {
    const { container } = render(<DatePickerBase />);
    const icon = container.querySelector('i');
    userEvent.click(icon!);
    const input = screen.getByRole('combobox');
    expect(input.getAttribute('aria-owns')).toBeDefined();
  });

  it('should render DatePicker and calloutId must exist in the DOM when isDatePickerShown is set', () => {
    const { container } = render(<DatePickerBase />);
    const icon = container.querySelector('i');
    userEvent.click(icon!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not open DatePicker when disabled, with label', () => {
    const { container } = render(<DatePickerBase disabled label="label" />);
    const icon = container.querySelector('i');
    userEvent.click(icon!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('with allowTextInput false, renders read-only input as a div with placeholder', () => {
    const placeholder = 'Select a date';
    render(<DatePickerBase placeholder={placeholder} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveTextContent(placeholder);
  });

  it('with allowTextInput false, renders read-only input as a div with value', () => {
    render(<DatePickerBase placeholder="Select a date" value={new Date()} formatDate={() => 'fake date'} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveTextContent('fake date');
  });

  it('with allowTextInput true, renders normal input', () => {
    render(<DatePickerBase allowTextInput />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should call onSelectDate even when required input is empty when allowTextInput is true', () => {
    const onSelectDate = jest.fn();
    render(<DatePickerBase isRequired allowTextInput onSelectDate={onSelectDate} />);
    const input = screen.getByRole('combobox');

    userEvent.type(input, 'Jan 1 2030');
    userEvent.clear(input);

    expect(onSelectDate).toHaveBeenCalledTimes(2);
  });

  it('should clear error message when required input has date text and allowTextInput is true', () => {
    mockCreatePortal();

    safeCreate(<DatePickerBase isRequired={true} allowTextInput={true} />, datePicker => {
      const textfield = datePicker.root.findByType(TextField);
      const input = datePicker.root.findByType('input');

      // open the datepicker then dismiss
      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        input.props.onClick();
      });

      expect(textfield.props.errorMessage).toBe('Field is required');

      renderer.act(() => {
        input.props.onChange({ target: { value: 'Jan 1 2030' }, persist: jest.fn() });
      });
      renderer.act(() => {
        input.props.onBlur();
      });

      expect(textfield.props.errorMessage).toBeUndefined();
    });
  });

  it('should not set initial error when required input is empty and validateOnLoad is false', () => {
    mockCreatePortal();

    safeCreate(
      <DatePickerBase isRequired={true} allowTextInput={true} textField={{ validateOnLoad: false }} />,
      datePicker => {
        const textfield = datePicker.root.findByType(TextField);
        const input = datePicker.root.findByType('input');

        expect(textfield.props.errorMessage).toBeUndefined();

        // open the datepicker then dismiss
        renderer.act(() => {
          input.props.onClick();
        });
        renderer.act(() => {
          input.props.onClick();
        });

        expect(textfield.props.errorMessage).not.toBeUndefined();
      },
    );
  });

  it('clears error message when required input has date selected from calendar and allowTextInput is true', () => {
    mockCreatePortal();

    safeCreate(<DatePickerBase isRequired={true} allowTextInput={true} />, datePicker => {
      const textfield = datePicker.root.findByType(TextField);
      const input = datePicker.root.findByType('input');

      // open the datepicker then dismiss
      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        input.props.onClick();
      });

      expect(textfield.props.errorMessage).toBe('Field is required');

      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        const date = new Date();
        datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(date, [date]);
      });

      expect(textfield.props.errorMessage).toBeUndefined();
    });
  });

  it('should not clear initial error when datepicker is opened', () => {
    mockCreatePortal();

    safeCreate(
      <DatePickerBase
        isRequired={true}
        allowTextInput={true}
        maxDate={new Date('2020-04-01')}
        value={new Date('2020-04-02')}
      />,
      datePicker => {
        const textfield = datePicker.root.findByType(TextField);
        const input = datePicker.root.findByType('input');

        expect(textfield.props.errorMessage).not.toBeUndefined();

        // open the datepicker then dismiss
        renderer.act(() => {
          input.props.onClick();
        });
        renderer.act(() => {
          input.props.onClick();
        });

        expect(textfield.props.errorMessage).not.toBeUndefined();
      },
    );
  });

  it('should show status message and reset value when allowTextInput is true and invalid string is entered', () => {
    safeCreate(<DatePickerBase allowTextInput={true} />, datePicker => {
      const input = datePicker.root.findByType('input');
      const status = datePicker.root.findByProps({ 'aria-live': 'assertive' });

      expect(status.children[0]).toBeUndefined();

      // input invalid string "test", then blur
      const fakeInputEvent = { target: { value: 'test' } };
      renderer.act(() => {
        input.props.onInput(fakeInputEvent);
      });
      renderer.act(() => {
        input.props.onBlur();
      });

      expect(typeof status.children[0]).toBe('string');
      expect((status.children[0] as string).length).toBeGreaterThan(0);
      expect(input.props.value).toBe('');
    });
  });

  it('should reset status message after selecting a valid date', () => {
    mockCreatePortal();

    safeCreate(<DatePickerBase allowTextInput={true} initialPickerDate={new Date('2021-04-15')} />, datePicker => {
      const input = datePicker.root.findByType('input');
      const status = datePicker.root.findByProps({ 'aria-live': 'assertive' });

      // input invalid string "test", then blur
      const fakeInputEvent = { target: { value: 'test' } };
      renderer.act(() => {
        input.props.onInput(fakeInputEvent);
      });
      renderer.act(() => {
        input.props.onBlur();
      });

      expect(typeof status.children[0]).toBe('string');

      // pick valid date
      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        const date = new Date('2021-04-10');
        datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(date, [date]);
      });

      expect(status.children[0]).toBeUndefined();
    });
  });

  it('should call onSelectDate only once when allowTextInput is true and popup is used to select the value', () => {
    mockCreatePortal();
    const onSelectDate = jest.fn();

    safeCreate(<DatePickerBase allowTextInput={true} onSelectDate={onSelectDate} />, datePicker => {
      const input = datePicker.root.findByType('input');

      // open the datepicker then dismiss
      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        const date = new Date();
        datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(date, [date]);
      });

      expect(onSelectDate).toHaveBeenCalledTimes(1);
    });
  });

  it('should set "Calendar" as the Callout\'s aria-label', () => {
    mockCreatePortal();

    safeCreate(<DatePickerBase />, datePicker => {
      const input = datePicker.root.findAllByType('div')[5];

      // open the datepicker then dismiss
      renderer.act(() => {
        input.props.onClick();
      });

      const calloutProps = datePicker.root.findByType(Callout).props;

      expect(calloutProps.ariaLabel).toBe('Calendar');
    });
  });

  it('should reflect the correct date in the input field when selecting a value', () => {
    const today = new Date('January 15, 2020');
    const initiallySelectedDate = new Date('January 10, 2020');
    // initialPickerDate defaults to Date.now() if not provided so it must be given to ensure
    // that the datepicker opens on the correct month
    mockCreatePortal();

    safeCreate(
      <DatePickerBase allowTextInput={true} today={today} initialPickerDate={initiallySelectedDate} />,
      datePicker => {
        const input = datePicker.root.findByType('input');

        // open the datepicker then dismiss
        renderer.act(() => {
          input.props.onClick();
        });
        renderer.act(() => {
          datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(today, [today]);
        });

        expect(input.props.value).toBe('Wed Jan 15 2020');
      },
    );
  });

  it('reflects the correct date in the input field when selecting a value and a different format is given', () => {
    const today = new Date('January 15, 2020');
    const initiallySelectedDate = new Date('January 10, 2020');
    const onFormatDate = (date: Date): string => {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
    };
    // initialPickerDate defaults to Date.now() if not provided so it must be given to ensure
    // that the datepicker opens on the correct month

    mockCreatePortal();

    safeCreate(
      <DatePickerBase
        allowTextInput={true}
        today={today}
        formatDate={onFormatDate}
        initialPickerDate={initiallySelectedDate}
      />,
      datePicker => {
        const input = datePicker.root.findByType('input');

        // open the datepicker then dismiss
        renderer.act(() => {
          input.props.onClick();
        });
        renderer.act(() => {
          datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(today, [today]);
        });

        expect(input.props.value).toBe('15/1/20');
      },
    );
  });
});

describe('DatePickerBase - custom calendar properties', () => {
  const value = new Date(2017, 10, 1);
  const today = new Date(2017, 9, 31);
  const dateTimeFormatter = {
    formatMonthDayYear: () => 'm/d/y',
    formatMonthYear: () => 'm/y',
    formatDay: () => 'd',
    formatMonth: () => 'm',
    formatYear: () => 'y',
  };

  it('renders Calendar with provided props and custom formatter', () => {
    mockCreatePortal();

    safeCreate(
      <DatePickerBase
        isMonthPickerVisible={false}
        showMonthPickerAsOverlay
        value={value}
        today={today}
        firstDayOfWeek={2}
        highlightCurrentMonth
        showWeekNumbers
        firstWeekOfYear={FirstWeekOfYear.FirstFullWeek}
        showGoToToday={false}
        dateTimeFormatter={dateTimeFormatter}
      />,
      datePicker => {
        const input = datePicker.root.findAllByType('div')[5];

        renderer.act(() => {
          input.props.onClick();
        });

        const calendar = datePicker.root.findByType(Calendar);

        expect(calendar.props.isMonthPickerVisible).toBe(false);
        expect(calendar.props.showMonthPickerAsOverlay).toBe(true);
        expect(calendar.props.value).toBe(value);
        expect(calendar.props.today).toBe(today);
        expect(calendar.props.firstDayOfWeek).toBe(2);
        expect(calendar.props.highlightCurrentMonth).toBe(true);
        expect(calendar.props.showWeekNumbers).toBe(true);
        expect(calendar.props.firstWeekOfYear).toBe(FirstWeekOfYear.FirstFullWeek);
        expect(calendar.props.showGoToToday).toBe(false);
        expect(calendar.props.dateTimeFormatter).toBe(dateTimeFormatter);
      },
    );
  });
});

describe('DatePickerBase - date boundaries', () => {
  const defaultDate = new Date('Dec 15 2017');
  const minDate = new Date('Jan 1 2017');
  const maxDate = new Date('Dec 31 2017');
  const strings: IDatePickerStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    goToToday: 'Go to today',
    isOutOfBoundsErrorMessage: 'out of bounds',
  };

  it('should display error for dates outside boundary', () => {
    render(<DatePickerBase allowTextInput minDate={minDate} maxDate={maxDate} strings={strings} />);
    const input = screen.getByRole('combobox');

    userEvent.type(input, 'Jan 1 2010');
    userEvent.tab();

    expect(input).toHaveAttribute('aria-invalid', 'true');

    userEvent.clear(input);
    userEvent.type(input, 'Jan 1 2020');
    userEvent.tab();

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not display error for dates within or on boundary', () => {
    render(<DatePickerBase allowTextInput minDate={minDate} maxDate={maxDate} strings={strings} />);
    const input = screen.getByRole('combobox');

    userEvent.type(input, 'Dec 16 2017');
    userEvent.tab();

    expect(input).toHaveAttribute('aria-invalid', 'false');

    userEvent.clear(input);
    userEvent.type(input, 'Jan 1 2017');
    userEvent.tab();

    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('should show error when boundaries change and intersect value', () => {
    const { rerender } = render(
      <DatePickerBase allowTextInput minDate={minDate} maxDate={maxDate} value={defaultDate} strings={strings} />,
    );

    const input = screen.getByRole('combobox');

    expect(input).toHaveAttribute('aria-invalid', 'false');

    rerender(
      <DatePickerBase
        allowTextInput
        minDate={new Date('Dec 16 2017')}
        maxDate={maxDate}
        value={defaultDate}
        strings={strings}
      />,
    );
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
