import * as React from 'react';
import { TimePicker } from './TimePicker';
// import { ITimeRange } from './TimePicker.types';
// import { create } from '@fluentui/utilities/lib/test';
import { mount } from 'enzyme';
import type { IComboBox } from '../ComboBox/ComboBox.types';
import { KeyCodes } from '../../Utilities';

describe('TimePicker', () => {
  // TODO: times in this snapshot test changed and failed builds
  // it('renders correctly', () => {
  //   const timeRange: ITimeRange = {
  //     start: 0,
  //     end: 5,
  //   };
  //   const component = create(<TimePicker label="I am a TimePicker" timeRange={timeRange} />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('generates the formatted option', () => {
    const onFormatDate = (date: Date) => {
      return 'custom date option';
    };
    const timePicker = React.createRef<IComboBox>();

    mount(<TimePicker label="I am a TimePicker" onFormatDate={onFormatDate} componentRef={timePicker} />);
    expect(timePicker!.current!.selectedOptions[0].text).toBe('custom date option');
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
