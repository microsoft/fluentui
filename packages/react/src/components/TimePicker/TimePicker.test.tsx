import * as React from 'react';
import { TimePicker } from './TimePicker';
import { ITimeRange } from './TimePicker.types';
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
    const component = create(<TimePicker label="I am a TimePicker" timeRange={timeRange} />);
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
    const onChange = (ev: React.FormEvent<IComboBox>, time: Date | undefined): void => {
      if (time) {
        _selectedTime = time;
      }
    };
    const dateAnchor = new Date('February 27, 2023 08:00:00');

    const { getByRole, getAllByRole } = render(
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

    const timePickerComboBox = getByRole('combobox') as HTMLInputElement;
    expect(timePickerComboBox.value).toEqual('10:00:00');

    userEvent.click(timePickerComboBox);
    const timePickerOptions = getAllByRole('option') as HTMLInputElement[];
    userEvent.click(timePickerOptions[1], undefined, { skipPointerEventsCheck: true });

    const formattedSelectedTime = _selectedTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    });

    const expectedTime = '8:15:00 AM';
    expect(formattedSelectedTime).toEqual(expectedTime);
  });

  it('changes time options to match new base date', () => {
    let dateAnchor = new Date('April 12, 2023 00:00:00');
    let _selectedTime: Date | undefined = undefined;
    const onChange = (ev: React.FormEvent<IComboBox>, time: Date | undefined): void => {
      _selectedTime = time;
    };

    const { getByRole, getAllByRole, rerender } = render(
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

    const timePickerOptionIdx = 6;
    const initialTimePickerComboBox = getByRole('combobox') as HTMLInputElement;
    userEvent.click(initialTimePickerComboBox);
    const timePickerOptions = getAllByRole('option') as HTMLInputElement[];
    userEvent.click(timePickerOptions[timePickerOptionIdx], undefined, { skipPointerEventsCheck: true });
    expect(_selectedTime!.toString()).toEqual(new Date('April 12, 2023 01:30:00').toString());

    dateAnchor = new Date('April 05, 2023 00:00:00');

    rerender(
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

    const updatedTimePickerComboBox = getByRole('combobox') as HTMLInputElement;
    userEvent.click(updatedTimePickerComboBox);
    const updatedTimePickerOptions = getAllByRole('option') as HTMLInputElement[];
    userEvent.click(updatedTimePickerOptions[timePickerOptionIdx], undefined, { skipPointerEventsCheck: true });
    expect(_selectedTime!.toString()).toEqual(new Date('April 05, 2023 01:30:00').toString());
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
