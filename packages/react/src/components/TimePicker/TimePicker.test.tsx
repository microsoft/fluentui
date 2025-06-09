import '@testing-library/jest-dom';

import * as React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setWarningCallback, resetIds } from '@fluentui/utilities';
import { create } from '@fluentui/test-utilities';
import { TimePicker } from './TimePicker';
import type { ITimeRange, TimePickerValidationResultData } from './TimePicker.types';
import type { IComboBox } from '../ComboBox/ComboBox.types';

describe('TimePicker', () => {
  beforeAll(() => {
    // Prevent deprecation warnings from failing the tests
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    resetIds();
  });

  it('renders correctly', () => {
    const timeRange: ITimeRange = {
      start: 0,
      end: 5,
    };
    const component = create(
      <TimePicker label="I am a TimePicker" timeRange={timeRange} placeholder="Select a time" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('generates the formatted option', () => {
    const onFormatDate = (date: Date) => 'custom date option';
    const timePickerRef = React.createRef<IComboBox>();
    const dateAnchor = new Date('November 25, 2021 09:00:00');

    render(
      <TimePicker
        label="I am a TimePicker"
        onFormatDate={onFormatDate}
        dateAnchor={dateAnchor}
        defaultValue={dateAnchor}
        componentRef={timePickerRef}
      />,
    );

    const selected = timePickerRef.current!.selectedOptions[0];
    expect(selected.text).toBe('custom date option');
  });

  it('shows controlled time correctly', async () => {
    let _selectedTime = new Date('February 27, 2023 10:00:00');
    const onChange = (_e: React.FormEvent<IComboBox>, time: Date) => {
      if (time) {
        _selectedTime = time;
      }
    };
    const dateAnchor = new Date('February 27, 2023 08:00:00');

    render(
      <TimePicker
        showSeconds
        allowFreeform={false}
        increments={15}
        autoComplete="on"
        label="I am a controlled TimePicker"
        dateAnchor={dateAnchor}
        value={_selectedTime}
        onChange={onChange}
      />,
    );

    const combobox = screen.getByRole('combobox') as HTMLInputElement;
    expect(combobox.value).toBe('10:00:00');

    userEvent.click(combobox);
    const options = await screen.findAllByRole('option');
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });

    const formatted = _selectedTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    expect(formatted).toBe('08:30:00');
  });

  it('correctly renders options using value as date anchor', async () => {
    let _selectedTime = new Date('March 12, 2023 17:00:00');
    const onChange = (_e: React.FormEvent<IComboBox>, time: Date) => {
      if (time) {
        _selectedTime = time;
      }
    };

    render(
      <TimePicker
        showSeconds
        allowFreeform={false}
        autoComplete="on"
        label="I am a TimePicker with the value prop"
        value={_selectedTime}
        onChange={onChange}
        useHour12
      />,
    );

    const combobox = screen.getByRole('combobox') as HTMLInputElement;
    expect(combobox.value).toBe('5:00:00 PM');

    userEvent.click(combobox);
    const options = await screen.findAllByRole('option');
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });

    const formatted = _selectedTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    expect(formatted).toBe('6:00:00 PM');
  });

  it('allows time selection in locales without AM/PM', async () => {
    const original = Date.prototype.toLocaleTimeString;
    jest.spyOn(Date.prototype, 'toLocaleTimeString').mockImplementation(function (this: Date, _loc, opts) {
      return original.call(this, 'ja-JP', opts);
    });

    const dateAnchor = new Date('February 27, 2023 08:00:00');
    const onChange = jest.fn();

    render(<TimePicker allowFreeform={false} increments={15} dateAnchor={dateAnchor} useHour12 onChange={onChange} />);

    const combobox = screen.getByRole('combobox');
    userEvent.click(combobox);
    const options = await screen.findAllByRole('option');
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });

    expect(onChange).toHaveBeenLastCalledWith(expect.anything(), new Date('February 27, 2023 08:30:00'));

    (Date.prototype.toLocaleTimeString as jest.Mock).mockRestore();
  });

  it('correctly renders options using defaultValue as date anchor', async () => {
    const defaultValue = new Date('April 1, 2023 13:00:00');

    render(
      <TimePicker
        allowFreeform={false}
        autoComplete="on"
        label="I am a TimePicker with the defaultValue prop"
        defaultValue={defaultValue}
      />,
    );

    const combobox = screen.getByRole('combobox') as HTMLInputElement;
    expect(combobox.value).toBe('13:00');

    userEvent.click(combobox);
    const options = await screen.findAllByRole('option');
    userEvent.click(options[2], undefined, { skipPointerEventsCheck: true });

    expect(combobox.value).toBe('14:00');
  });

  it('shows the error message under the ComboBox on input validation error', async () => {
    const onValidationResult = jest.fn();
    const dateAnchor = new Date('March 15, 2023 10:00:00');
    const timeRange: ITimeRange = { start: 10, end: 17 };

    render(
      <TimePicker
        showSeconds
        increments={15}
        timeRange={timeRange}
        autoComplete="on"
        label="I am an uncontrolled TimePicker"
        placeholder="Test TimePicker"
        dateAnchor={dateAnchor}
        onValidationResult={onValidationResult}
      />,
    );

    const combobox = screen.getByRole('combobox');
    userEvent.click(combobox);
    userEvent.type(combobox, '10:45:00{enter}');
    expect(onValidationResult).toHaveBeenCalledTimes(0);

    userEvent.clear(combobox);
    userEvent.click(combobox);
    userEvent.type(combobox, '11111 AM{enter}');
    expect(onValidationResult).toHaveBeenCalledTimes(1);

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('calls onValidationResult only when the error message changes', async () => {
    let lastError = '';
    const onValidationResult = jest.fn((_e: React.FormEvent<IComboBox>, data: TimePickerValidationResultData) => {
      if (data.errorMessage !== undefined) {
        lastError = data.errorMessage;
      }
    });
    const dateAnchor = new Date('February 27, 2023 08:00:00');
    const timeRange: ITimeRange = { start: 8, end: 20 };

    render(
      <TimePicker
        showSeconds
        increments={15}
        timeRange={timeRange}
        autoComplete="on"
        label="I am a controlled TimePicker"
        placeholder="Test TimePicker"
        dateAnchor={dateAnchor}
        onValidationResult={onValidationResult}
      />,
    );

    const combobox = screen.getByRole('combobox');
    expect(lastError).toBe('');

    // First invalid
    userEvent.click(combobox);
    userEvent.type(combobox, '11111 AM{enter}');
    const firstError = 'Enter a valid time in the 24-hour format: hh:mm:ss';
    expect(lastError).toBe(firstError);
    expect(onValidationResult).toHaveBeenCalled();
    onValidationResult.mockClear();

    // Same invalid again => no callback
    userEvent.clear(combobox);
    userEvent.click(combobox);
    userEvent.type(combobox, '88888 AM{enter}');
    expect(lastError).toBe(firstError);
    expect(onValidationResult).not.toHaveBeenCalled();

    // New error (out of range)
    userEvent.click(combobox);
    userEvent.type(combobox, '03:00:00{enter}');
    expect(onValidationResult).toHaveBeenCalled();
    const secondError = 'Please enter a time within the range';
    expect(lastError).toContain(secondError);
  });

  describe('validates entered text when', () => {
    const renderAndValidate = async (component: React.ReactElement) => {
      render(component);
      const input = screen.getByRole('combobox');
      return input;
    };

    it('invalid hour for 24-hour no-seconds format', async () => {
      const input = await renderAndValidate(
        <TimePicker id="test" allowFreeform useHour12={false} showSeconds={false} />,
      );
      userEvent.type(input, '95:22{enter}');
      const alert = await screen.findByRole('alert');
      expect(alert.textContent).toMatch(/24-hour format: hh:mm/);
    });

    it('invalid hour for 24-hour with-seconds format', async () => {
      const input = await renderAndValidate(<TimePicker id="test" allowFreeform useHour12={false} showSeconds />);
      userEvent.type(input, '24:22:42{enter}');
      const alert = await screen.findByRole('alert');
      expect(alert.textContent).toMatch(/24-hour format: hh:mm:ss/);
    });

    it('invalid hour for 12-hour no-seconds format', async () => {
      const input = await renderAndValidate(<TimePicker id="test" allowFreeform useHour12 showSeconds={false} />);
      userEvent.type(input, '13:26 PM{enter}');
      const alert = await screen.findByRole('alert');
      expect(alert.textContent).toMatch(/12-hour format: hh:mm AP/);
    });

    it('incomplete time for 12-hour no-seconds format', async () => {
      const input = await renderAndValidate(<TimePicker id="test" allowFreeform useHour12 showSeconds={false} />);
      userEvent.type(input, '3:26{enter}');
      const alert = await screen.findByRole('alert');
      expect(alert.textContent).toMatch(/12-hour format: hh:mm AP/);
    });

    it('invalid hour for 12-hour with-seconds format', async () => {
      const input = await renderAndValidate(<TimePicker id="test" allowFreeform useHour12 showSeconds />);
      userEvent.type(input, '15:26:37 AM{enter}');
      const alert = await screen.findByRole('alert');
      expect(alert.textContent).toMatch(/12-hour format: hh:mm:ss AP/);
    });

    it('incomplete time for 12-hour with-seconds format', async () => {
      const input = await renderAndValidate(<TimePicker id="test" allowFreeform useHour12 showSeconds />);
      userEvent.type(input, '5:26:37{enter}');
      const alert = await screen.findByRole('alert');
      expect(alert.textContent).toMatch(/12-hour format: hh:mm:ss AP/);
    });
  });
});
