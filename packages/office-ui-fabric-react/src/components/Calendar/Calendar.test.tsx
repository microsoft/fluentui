/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';

import { Calendar } from './Calendar';
import { DateRangeType, DayOfWeek } from './Calendar.Props';
import { addDays, compareDates } from '../../utilities/dateMath/DateMath';

describe('Calendar', () => {
  let dayPickerStrings = {
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
      'December'
    ],

    shortMonths: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],

    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],

    shortDays: [
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S'
    ],

    goToToday: 'Go to today'
  };

  it('can handle invalid starting dates', () => {
    // Arrange
    let defaultDate = new Date('invalid');

    // Act

    let renderedComponent = mount(
      <Calendar
        strings={ dayPickerStrings }
        isMonthPickerVisible={ true }
        value={ defaultDate }
      />);

    let today = renderedComponent.find('.ms-DatePicker-day--today');
    expect(+today.text()).toEqual(new Date().getDate());
  });

  describe('Test rendering simplest calendar', () => {
    let renderedComponent: Calendar;

    beforeAll(() => {
      renderedComponent = ReactTestUtils.renderIntoDocument(
        <Calendar
          strings={ dayPickerStrings }
          isMonthPickerVisible={ false }
        />) as Calendar;
    });

    it('Verify day picker header', () => {
      let today = new Date();
      let monthName = dayPickerStrings.months[today.getMonth()];
      let year = today.getFullYear();
      let dayPickerMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-monthAndYear');
      expect(dayPickerMonth).toBeDefined();
      expect(dayPickerMonth.textContent).toEqual(monthName + ' ' + year.toString());
    });

    it('Verify first day of week', () => {
      let dayHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-weekday');
      expect(dayHeaders.length).toEqual(7);
      expect(dayHeaders[0].textContent).toEqual(dayPickerStrings.shortDays[0]);
      expect(dayHeaders[1].textContent).toEqual(dayPickerStrings.shortDays[1]);
      expect(dayHeaders[2].textContent).toEqual(dayPickerStrings.shortDays[2]);
      expect(dayHeaders[3].textContent).toEqual(dayPickerStrings.shortDays[3]);
      expect(dayHeaders[4].textContent).toEqual(dayPickerStrings.shortDays[4]);
      expect(dayHeaders[5].textContent).toEqual(dayPickerStrings.shortDays[5]);
      expect(dayHeaders[6].textContent).toEqual(dayPickerStrings.shortDays[6]);
    });

    it('Verify day picker selected date & navigated date', () => {
      // When not passed in selected & navigated dates default to current date
      // These dates will be ms different, so just compare their day, month, and year
      // This test will likely fail around midnight.
      let today = new Date();
      expect(renderedComponent.state.selectedDate).not.toBeNull();
      expect(renderedComponent.state.selectedDate!.getDate()).toEqual(today.getDate());
      expect(renderedComponent.state.selectedDate!.getMonth()).toEqual(today.getMonth());
      expect(renderedComponent.state.selectedDate!.getFullYear()).toEqual(today.getFullYear());
      expect(renderedComponent.state.navigatedDate).not.toBeNull();
      expect(renderedComponent.state.navigatedDate!.getDate()).toEqual(today.getDate());
      expect(renderedComponent.state.navigatedDate!.getMonth()).toEqual(today.getMonth());
      expect(renderedComponent.state.navigatedDate!.getFullYear()).toEqual(today.getFullYear());
    });

    it('Verify go to today', () => {
      let goToToday = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-goToday');
      expect(goToToday).toBeDefined();
      expect(goToToday.textContent).toEqual(dayPickerStrings.goToToday);
    });
  });

  describe('Test rendering most complicated calendar', () => {
    let renderedComponent: Calendar;
    let defaultDate: Date;
    let lastSelectedDateRange: Date[] | null = null;

    beforeAll(() => {
      defaultDate = new Date(2017, 2, 16);
      let onSelectDate = (): (date: Date, dateRangeArray: Date[]) => void => {
        return (date: Date, dateRangeArray: Date[]): void => {
          lastSelectedDateRange = dateRangeArray;
        };
      };

      renderedComponent = ReactTestUtils.renderIntoDocument(
        <Calendar
          strings={ dayPickerStrings }
          isMonthPickerVisible={ true }
          value={ defaultDate }
          firstDayOfWeek={ DayOfWeek.Tuesday }
          dateRangeType={ DateRangeType.Week }
          autoNavigateOnSelection={ true }
          onSelectDate={ onSelectDate() }
        />) as Calendar;
    });

    it('Verify day picker header', () => {
      let monthName = dayPickerStrings.months[defaultDate.getMonth()];
      let dayPickerMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-monthAndYear');
      expect(dayPickerMonth).toBeDefined();
      expect(dayPickerMonth.textContent).toEqual(monthName + ' ' + defaultDate.getFullYear().toString());
    });

    it('Verify first day of week', () => {
      let dayHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-weekday');
      expect(dayHeaders.length).toEqual(7);
      expect(dayHeaders[0].textContent).toEqual(dayPickerStrings.shortDays[2]);
      expect(dayHeaders[1].textContent).toEqual(dayPickerStrings.shortDays[3]);
      expect(dayHeaders[2].textContent).toEqual(dayPickerStrings.shortDays[4]);
      expect(dayHeaders[3].textContent).toEqual(dayPickerStrings.shortDays[5]);
      expect(dayHeaders[4].textContent).toEqual(dayPickerStrings.shortDays[6]);
      expect(dayHeaders[5].textContent).toEqual(dayPickerStrings.shortDays[0]);
      expect(dayHeaders[6].textContent).toEqual(dayPickerStrings.shortDays[1]);
    });

    it('Verify day picker selected date & navigated date', () => {
      expect(renderedComponent.state.selectedDate).toEqual(defaultDate);
      expect(renderedComponent.state.navigatedDate).toEqual(defaultDate);
    });

    it('Verify month picker seen', () => {
      let monthPicker = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-monthPicker') as HTMLElement;
      expect(monthPicker).toBeDefined();
      expect(monthPicker.style.display).not.toEqual('none');
    });

    it('Verify month picker header', () => {
      let currentYear = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentYear');
      expect(currentYear).toBeDefined();
      expect(currentYear.textContent).toEqual(defaultDate.getFullYear().toString());
    });

    it('Verify month picker months', () => {
      let months = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-monthOption');
      expect(months.length).toEqual(12);
      for (let i = 0; i < 12; i++) {
        expect(months[i].textContent).toEqual(dayPickerStrings.shortMonths[i]);
      }
    });

    it('Verify go to today', () => {
      let goToToday = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-goToday');
      expect(goToToday).toBeDefined();
      expect(goToToday.textContent).toEqual(dayPickerStrings.goToToday);
    });

    it('Verify navigate to different week in same month', () => {
      lastSelectedDateRange = null;
      let days = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-day');
      let day = days[8]; // 03/08/2017
      ReactTestUtils.Simulate.click(day);
      expect(lastSelectedDateRange).not.toBeNull();
      expect(lastSelectedDateRange!.length).toEqual(7);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, new Date(2017, 2, 7 + i))).toEqual(true));
    });

    it('Verify navigate to day in different month', () => {
      lastSelectedDateRange = null;
      let days = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-day');
      let day = days[34]; // 04/03/2017
      let firstDate = new Date(2017, 2, 28);
      ReactTestUtils.Simulate.click(day);
      expect(lastSelectedDateRange).not.toBeNull();
      expect(lastSelectedDateRange!.length).toEqual(7);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, addDays(firstDate, i))).toEqual(true));
    });
  });
});
