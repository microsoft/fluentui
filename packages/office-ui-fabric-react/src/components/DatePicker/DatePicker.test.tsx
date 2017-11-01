import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Calendar, ICalendarStrings } from '../Calendar';
import { DatePicker } from './DatePicker';
import { FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import { shallow } from 'enzyme';

describe('DatePicker', () => {
  it('renders default DatePicker correctly', () => {
    // This will only render the input. Calendar component has its own snapshot.
    const component = renderer.create(<DatePicker />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('when Calendar properties are not specified', () => {
    const datePicker = shallow(<DatePicker />);
    datePicker.setState({ isDatePickerShown: true });
    const calendarProps = datePicker.find(Calendar).props();

    it('renders Calendar with isMonthPickerVisible as true by defaut', () => {
      expect(calendarProps.isMonthPickerVisible).toBe(true);
    });

    it('renders Calendar with showMonthPickerAsOverlay as false by defaut', () => {
      expect(calendarProps.showMonthPickerAsOverlay).toBe(false);
    });

    it('renders Calendar with highlightCurrentMonth as false by defaut', () => {
      expect(calendarProps.highlightCurrentMonth).toBe(false);
    });

    it('renders Calendar with showWeekNumbers as false by defaut', () => {
      expect(calendarProps.showWeekNumbers).toBe(false);
    });

    it('renders Calendar with firstWeekOfYear as FirstWeekOfYear.FirstDay by defaut', () => {
      expect(calendarProps.firstWeekOfYear).toBe(FirstWeekOfYear.FirstDay);
    });

    it('renders Calendar with showGoToToday as true by defaut', () => {
      expect(calendarProps.showGoToToday).toBe(true);
    });
  });

  describe('when Calendar properties are specified', () => {
    const value = new Date(2017, 10, 1);
    const today = new Date(2017, 9, 31);
    const dateTimeFormatter = {
      formatMonthDayYear: (date: Date, strings?: ICalendarStrings) => 'm/d/y',
      formatMonthYear: (date: Date, strings?: ICalendarStrings) => 'm/y',
      formatDay: (date: Date) => 'd',
      formatYear: (date: Date) => 'y'
    };

    const datePicker = shallow(
      <DatePicker
        isMonthPickerVisible={false}
        showMonthPickerAsOverlay={true}
        value={value}
        today={today}
        firstDayOfWeek={2}
        highlightCurrentMonth={true}
        showWeekNumbers={true}
        firstWeekOfYear={FirstWeekOfYear.FirstFullWeek}
        showGoToToday={false}
        dateTimeFormatter={dateTimeFormatter}
      />
    );
    datePicker.setState({ isDatePickerShown: true });

    const calendarProps = datePicker.find(Calendar).props();

    it('renders Calendar with same isMonthPickerVisible', () => {
      expect(calendarProps.isMonthPickerVisible).toBe(false);
    });

    it('renders Calendar with same showMonthPickerAsOverlay', () => {
      expect(calendarProps.showMonthPickerAsOverlay).toBe(true);
    });

    it('renders Calendar with same value', () => {
      expect(calendarProps.value).toBe(value);
    });

    it('renders Calendar with same today', () => {
      expect(calendarProps.today).toBe(today);
    });

    it('renders Calendar with same firstDayOfWeek', () => {
      expect(calendarProps.firstDayOfWeek).toBe(2);
    });

    it('renders Calendar with same highlightCurrentMonth', () => {
      expect(calendarProps.highlightCurrentMonth).toBe(true);
    });

    it('renders Calendar with same showWeekNumbers', () => {
      expect(calendarProps.showWeekNumbers).toBe(true);
    });

    it('renders Calendar with same firstWeekOfYear', () => {
      expect(calendarProps.firstWeekOfYear).toBe(FirstWeekOfYear.FirstFullWeek);
    });

    it('renders Calendar with same showGoToToday', () => {
      expect(calendarProps.showGoToToday).toBe(false);
    });

    it('renders Calendar with same dateTimeFormatter', () => {
      expect(calendarProps.dateTimeFormatter).toBe(dateTimeFormatter);
    });
  });
});
