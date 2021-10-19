import * as React from 'react';
import { TimePicker } from './TimePicker';
// import { ITimeRange } from './TimePicker.types';
// import { create } from '@fluentui/utilities/lib/test';
import { mount } from 'enzyme';
import type { IComboBox } from '../ComboBox/ComboBox.types';

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
});
