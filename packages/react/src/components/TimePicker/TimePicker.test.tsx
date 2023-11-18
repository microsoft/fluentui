import * as React from 'react';
import { TimePicker } from './TimePicker';
import { ITimeRange, TimePickerValidationResultData } from './TimePicker.types';
import { create } from '@fluentui/test-utilities';
import { mount } from 'enzyme';
import type { IComboBox } from '../ComboBox/ComboBox.types';
import { KeyCodes } from '../../Utilities';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TimePicker', () => {
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
    const onFormatDate = (date: Date) => {
      return 'custom date option';
    };
    const timePicker = React.createRef<IComboBox>();
    const dateAnchor = new Date('November 25, 2021 09:00:00');

    mount(
      <TimePicker
        label="I am a TimePicker"
        onFormatDate={onFormatDate}
        dateAnchor={dateAnchor}
        defaultValue={dateAnchor}
        componentRef={timePicker}
      />,
    );

    expect(timePicker!.current!.selectedOptions[0].text).toBe('custom date option');
  });

  it('shows controlled time correctly', () => {
    let _selectedTime = new Date('February 27, 2023 10:00:00');
    const onChange = (_ev: React.FormEvent<IComboBox>, time: Date): void => {
      if (time) {
        _selectedTime = time;
      }
    };
    const dateAnchor = new Date('February 27, 2023 08:00:00');

    const { getByRole, getAllByRole } = render(
      <TimePicker
        showSeconds={true}
        allowFreeform={false}
        increments={15}
        autoComplete="on"
        label="I am a controlled TimePicker"
        dateAnchor={dateAnchor}
        value={_selectedTime}
        onChange={onChange}
      />,
    );

    const timePickerComboBox = getByRole('combobox') as HTMLInputElement;
    expect(timePickerComboBox.value).toEqual('10:00:00');

    userEvent.click(timePickerComboBox);
    const timePickerOptions = getAllByRole('option') as HTMLButtonElement[];
    userEvent.click(timePickerOptions[2], undefined, { skipPointerEventsCheck: true });

    const formattedSelectedTime = _selectedTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const expectedTime = '08:30:00';
    expect(formattedSelectedTime).toEqual(expectedTime);
  });

  it('correctly renders options using value as date anchor', () => {
    let _selectedTime = new Date('March 12, 2023 17:00:00');
    const onChange = (_ev: React.FormEvent<IComboBox>, time: Date): void => {
      if (time) {
        _selectedTime = time;
      }
    };

    const { getByRole, getAllByRole } = render(
      <TimePicker
        showSeconds={true}
        allowFreeform={false}
        autoComplete="on"
        label="I am a TimePicker with the value prop"
        value={_selectedTime}
        onChange={onChange}
        useHour12={true}
      />,
    );

    const timePickerComboBox = getByRole('combobox') as HTMLInputElement;
    expect(timePickerComboBox.value).toEqual('5:00:00 PM');

    userEvent.click(timePickerComboBox);
    const timePickerOptions = getAllByRole('option') as HTMLButtonElement[];
    userEvent.click(timePickerOptions[2], undefined, { skipPointerEventsCheck: true });

    const formattedSelectedTime = _selectedTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const expectedTime = '6:00:00 PM';
    expect(formattedSelectedTime).toEqual(expectedTime);
  });

  it('allows time selection in locales that format time without "am/pm"', () => {
    const { toLocaleTimeString } = Date.prototype;
    const toLocaleTimeStringMock = jest.spyOn(Date.prototype, 'toLocaleTimeString');

    // Mock toLocaleTimeString to simulate running in a Japanese locale
    toLocaleTimeStringMock.mockImplementation(function (this: Date, _locales, options) {
      return toLocaleTimeString.call(this, 'ja-JP', options);
    });

    const dateAnchor = new Date('February 27, 2023 08:00:00');

    const onChange = jest.fn();

    const { getByRole, getAllByRole } = render(
      <TimePicker allowFreeform={false} increments={15} dateAnchor={dateAnchor} useHour12 onChange={onChange} />,
    );

    const timePickerComboBox = getByRole('combobox') as HTMLInputElement;
    userEvent.click(timePickerComboBox);
    const timePickerOptions = getAllByRole('option') as HTMLButtonElement[];
    userEvent.click(timePickerOptions[2], undefined, { skipPointerEventsCheck: true });

    expect(onChange).toHaveBeenLastCalledWith(expect.anything(), new Date('February 27, 2023 08:30:00'));

    toLocaleTimeStringMock.mockRestore();
  });

  it('correctly renders options using default value as date anchor', () => {
    const defaultValue = new Date('April 1, 2023 13:00:00');

    const { getByRole, getAllByRole } = render(
      <TimePicker
        allowFreeform={false}
        autoComplete="on"
        label="I am a TimePicker with the defaultValue prop"
        defaultValue={defaultValue}
      />,
    );

    const timePickerComboBox = getByRole('combobox') as HTMLInputElement;
    expect(timePickerComboBox.value).toEqual('13:00');

    userEvent.click(timePickerComboBox);
    const timePickerOptions = getAllByRole('option') as HTMLButtonElement[];
    userEvent.click(timePickerOptions[2], undefined, { skipPointerEventsCheck: true });

    expect(timePickerComboBox.value).toEqual('14:00');
  });

  it('shows the error message under the ComboBox on input validation error', () => {
    const onValidationResult = jest.fn();

    const dateAnchor = new Date('March 15, 2023 10:00:00');
    const timeRange: ITimeRange = {
      start: 10,
      end: 17,
    };

    const { getByRole } = render(
      <TimePicker
        showSeconds={true}
        increments={15}
        timeRange={timeRange}
        autoComplete="on"
        label="I am an uncontrolled TimePicker"
        placeholder="Test TimePicker"
        dateAnchor={dateAnchor}
        onValidationResult={onValidationResult}
      />,
    );

    const timePickerComboBox = getByRole('combobox') as HTMLInputElement;

    userEvent.click(timePickerComboBox);
    userEvent.type(timePickerComboBox, '10:45:00{enter}');
    expect(onValidationResult).toHaveBeenCalledTimes(0);

    userEvent.clear(timePickerComboBox);
    userEvent.click(timePickerComboBox);
    userEvent.type(timePickerComboBox, '11111 AM{enter}');

    expect(onValidationResult).toHaveBeenCalledTimes(1);
    const errorMessageElement = getByRole('alert') as HTMLDivElement;
    expect(errorMessageElement).not.toBe(null);
  });

  it('calls onValidationResult only when the error message changes', () => {
    let _errorMessage: string = '';
    const onValidationResult = jest.fn(
      (_ev: React.FormEvent<IComboBox>, timePickerErrorData: TimePickerValidationResultData): void => {
        if (timePickerErrorData.errorMessage !== undefined) {
          _errorMessage = timePickerErrorData.errorMessage;
        }
      },
    );
    const dateAnchor = new Date('February 27, 2023 08:00:00');
    const timeRange: ITimeRange = {
      start: 8,
      end: 20,
    };

    const { getByRole } = render(
      <TimePicker
        showSeconds={true}
        increments={15}
        timeRange={timeRange}
        autoComplete="on"
        label="I am a controlled TimePicker"
        placeholder="Test TimePicker"
        dateAnchor={dateAnchor}
        onValidationResult={onValidationResult}
      />,
    );

    const timePickerComboBox = getByRole('combobox') as HTMLInputElement;
    expect(_errorMessage).toEqual('');

    userEvent.click(timePickerComboBox);
    userEvent.type(timePickerComboBox, '11111 AM{enter}');
    const firstExpectedErrorMessage = 'Enter a valid time in the 24-hour format: hh:mm:ss';
    expect(_errorMessage).toEqual(firstExpectedErrorMessage);
    expect(onValidationResult).toHaveBeenCalled();
    onValidationResult.mockClear();

    // verify that onValidationResult is not called twice for the same error message
    userEvent.clear(timePickerComboBox);
    userEvent.click(timePickerComboBox);
    userEvent.type(timePickerComboBox, '88888 AM{enter}');
    expect(_errorMessage).toEqual(firstExpectedErrorMessage);
    expect(onValidationResult).not.toHaveBeenCalled();

    // verify that onValidationResult is finally called again for a new error message
    userEvent.click(timePickerComboBox);
    userEvent.type(timePickerComboBox, '03:00:00{enter}');
    expect(onValidationResult).toHaveBeenCalled();

    const secondExpectedErrorMessage = 'Please enter a time within the range';
    expect(_errorMessage).toContain(secondExpectedErrorMessage);
  });

  describe('validates entered text when', () => {
    it('receives an invalid hour input for 24-hour-no-seconds format', () => {
      const wrapper = mount(<TimePicker id="test" allowFreeform useHour12={false} showSeconds={false} />);
      const input = wrapper.find('input');
      input.simulate('input', { target: { value: '95:22' } });

      // Trigger validation
      input.simulate('keydown', { which: KeyCodes.enter });

      // ComboBox sets the error element's ID to `id` from props plus "-error"
      expect(wrapper.find('#test-error').text()).toMatch('24-hour format: hh:mm');
    });

    it('receives an invalid hour input for 24-hour-with-seconds format', () => {
      const wrapper = mount(<TimePicker id="test" allowFreeform useHour12={false} showSeconds={true} />);
      const input = wrapper.find('input');
      input.simulate('input', { target: { value: '24:22:42' } });

      // Trigger validation
      input.simulate('keydown', { which: KeyCodes.enter });

      // ComboBox sets the error element's ID to `id` from props plus "-error"
      expect(wrapper.find('#test-error').text()).toMatch('24-hour format: hh:mm:ss');
    });

    it('receives an invalid hour input for 12-hour-no-seconds format', () => {
      const wrapper = mount(<TimePicker id="test" allowFreeform useHour12={true} showSeconds={false} />);
      const input = wrapper.find('input');
      input.simulate('input', { target: { value: '13:26 PM' } });

      // Trigger validation
      input.simulate('keydown', { which: KeyCodes.enter });

      // ComboBox sets the error element's ID to `id` from props plus "-error"
      expect(wrapper.find('#test-error').text()).toMatch('12-hour format: hh:mm AP');
    });

    it('does not receive a complete time input for 12-hour-no-seconds format', () => {
      const wrapper = mount(<TimePicker id="test" allowFreeform useHour12={true} showSeconds={false} />);
      const input = wrapper.find('input');
      input.simulate('input', { target: { value: '3:26' } });

      // Trigger validation
      input.simulate('keydown', { which: KeyCodes.enter });

      // ComboBox sets the error element's ID to `id` from props plus "-error"
      expect(wrapper.find('#test-error').text()).toMatch('12-hour format: hh:mm AP');
    });

    it('receives an invalid hour input for 12-hour-with-seconds format', () => {
      const wrapper = mount(<TimePicker id="test" allowFreeform useHour12={true} showSeconds={true} />);
      const input = wrapper.find('input');
      input.simulate('input', { target: { value: '15:26:37 AM' } });

      // Trigger validation
      input.simulate('keydown', { which: KeyCodes.enter });

      // ComboBox sets the error element's ID to `id` from props plus "-error"
      expect(wrapper.find('#test-error').text()).toMatch('12-hour format: hh:mm:ss AP');
    });

    it('does not receive a complete time input for 12-hour-with-seconds format', () => {
      const wrapper = mount(<TimePicker id="test" allowFreeform useHour12={true} showSeconds={true} />);
      const input = wrapper.find('input');
      input.simulate('input', { target: { value: '5:26:37' } });

      // Trigger validation
      input.simulate('keydown', { which: KeyCodes.enter });

      // ComboBox sets the error element's ID to `id` from props plus "-error"
      expect(wrapper.find('#test-error').text()).toMatch('12-hour format: hh:mm:ss AP');
    });
  });
});
