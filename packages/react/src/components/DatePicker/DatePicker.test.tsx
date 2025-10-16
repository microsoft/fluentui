import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { resetIds } from '@fluentui/utilities';

import { DatePicker } from './DatePicker';
import { DatePickerBase } from './DatePicker.base';
import { isConformant } from '../../common/isConformant';
import { IDatePickerStrings } from './DatePicker.types';

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
    const { container } = render(<DatePicker />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders DatePicker with value correctly', () => {
    // Format the date as a fake value to avoid snapshot churn
    const { container } = render(<DatePicker value={new Date()} formatDate={() => 'fake date'} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders DatePicker allowing text input correctly', () => {
    const { container } = render(<DatePicker allowTextInput />);
    expect(container.firstChild).toMatchSnapshot();
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

it('should clear error message when required input has date text and allowTextInput is true', async () => {
  const { container } = render(<DatePickerBase isRequired={true} allowTextInput={true} />);
  const input = container.querySelector('input')!;

  // open the datepicker then dismiss
  userEvent.click(input);
  userEvent.click(input);

  await waitFor(() => {
    expect(container.querySelector('[data-automation-id="error-message"]')).toHaveTextContent('Field is required');
  });

  userEvent.type(input, 'Jan 1 2030');
  userEvent.click(input);

  expect(container.querySelector('[data-automation-id="error-message"]')).toBeNull();
});

it('should not set initial error when required input is empty and validateOnLoad is false', async () => {
  const { container } = render(
    <DatePickerBase isRequired={true} allowTextInput={true} textField={{ validateOnLoad: false }} />,
  );

  const input = container.querySelector('input')!;

  expect(container.querySelector('[data-automation-id="error-message"]')).toBeNull();

  // open the datepicker then dismiss
  userEvent.click(input);
  userEvent.click(input);

  await waitFor(() => {
    expect(container.querySelector('[data-automation-id="error-message"]')).toBeInTheDocument();
  });
});

it('clears error message when required input has date selected from calendar and allowTextInput is true', async () => {
  const { container } = render(<DatePickerBase isRequired={true} allowTextInput={true} />);
  const input = container.querySelector('input')!;

  // open the datepicker then dismiss
  userEvent.click(input);
  userEvent.click(input);

  await waitFor(() => {
    expect(container.querySelector('[data-automation-id="error-message"]')).toHaveTextContent('Field is required');
  });

  userEvent.click(input);
  const date = new Date();
  userEvent.type(input, date.toDateString());

  expect(container.querySelector('[data-automation-id="error-message"]')).toBeNull();
});

it('should not clear initial error when datepicker is opened', async () => {
  const { container } = render(
    <DatePickerBase
      isRequired={true}
      allowTextInput={true}
      maxDate={new Date('2020-04-01')}
      value={new Date('2020-04-02')}
    />,
  );
  const input = container.querySelector('input')!;

  expect(container.querySelector('[data-automation-id="error-message"]')).toBeNull();

  // open the datepicker then dismiss
  userEvent.click(input);
  userEvent.click(input);

  await waitFor(() => {
    expect(container.querySelector('[data-automation-id="error-message"]')).not.toBeNull();
  });
});

it('should show status message and reset value when allowTextInput is true and invalid string is entered', async () => {
  const { container } = render(<DatePickerBase allowTextInput={true} />);
  const input = container.querySelector('input')!;
  const status = container.querySelector('[aria-live="assertive"]');

  expect(status).toBeEmptyDOMElement();

  // input invalid string "test", then blur
  userEvent.type(input, 'test');
  userEvent.click(container);

  await waitFor(() => {
    expect(status).not.toBeEmptyDOMElement();
    expect(input.value).toBe('');
  });
});

it('should reset status message after selecting a valid date', async () => {
  const { container } = render(<DatePickerBase allowTextInput={true} initialPickerDate={new Date('2021-04-15')} />);
  const input = container.querySelector('input')!;
  const status = container.querySelector('[aria-live="assertive"]');

  // input invalid string "test", then blur
  userEvent.type(input, 'test');
  userEvent.click(container);

  await waitFor(() => {
    expect(status).not.toBeEmptyDOMElement();
  });

  // pick valid date, then blur
  userEvent.clear(input);
  userEvent.type(input, '2021-04-10');
  userEvent.click(container);

  await waitFor(() => {
    expect(status).toBeEmptyDOMElement();
  });
});

it('should call onSelectDate only once when allowTextInput is true and popup is used to select the value', () => {
  const onSelectDate = jest.fn();

  const { container } = render(<DatePickerBase allowTextInput={true} onSelectDate={onSelectDate} />);
  const input = container.querySelector('input')!;

  // open the datepicker then dismiss
  userEvent.type(input, '2021-04-10');
  userEvent.click(input);

  expect(onSelectDate).toHaveBeenCalledTimes(1);
});

it('should set "Calendar" as the Callout\'s aria-label', () => {
  const { container, getByLabelText } = render(<DatePickerBase />);
  const input = container.querySelectorAll('div')[5];

  // open the datepicker then dismiss
  userEvent.click(input);

  const callout = getByLabelText('Calendar');

  expect(callout).toBeInTheDocument();
  expect(callout).toHaveAttribute('role', 'dialog');
  expect(callout).toHaveClass('ms-Callout-main');
});

it('should reflect the correct date in the input field when selecting a value', () => {
  const today = new Date('January 15, 2020');
  const initiallySelectedDate = new Date('January 10, 2020');
  // initialPickerDate defaults to Date.now() if not provided so it must be given to ensure
  // that the datepicker opens on the correct month

  const { container } = render(
    <DatePickerBase allowTextInput={true} today={today} initialPickerDate={initiallySelectedDate} />,
  );
  const input = container.querySelector('input')!;

  // open the datepicker then dismiss
  userEvent.click(input);
  userEvent.type(input, today.toDateString());

  expect(input.value).toBe('Wed Jan 15 2020');
});

it('reflects the correct date in the input field when selecting a value and a different format is given', () => {
  const today = new Date('January 15, 2020');
  const initiallySelectedDate = new Date('January 10, 2020');
  const onFormatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };
  // initialPickerDate defaults to Date.now() if not provided so it must be given to ensure
  // that the datepicker opens on the correct month

  const { container } = render(
    <DatePickerBase
      allowTextInput={true}
      today={today}
      formatDate={onFormatDate}
      initialPickerDate={initiallySelectedDate}
    />,
  );
  const input = container.querySelector('input')!;

  // open the datepicker then dismiss
  userEvent.click(input);
  userEvent.type(input, today.toDateString());

  expect(input.value).toBe('Wed Jan 15 2020');
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
