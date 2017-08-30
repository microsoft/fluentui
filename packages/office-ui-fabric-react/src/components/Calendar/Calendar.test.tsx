/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

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
    try {
      let renderedComponent = ReactTestUtils.renderIntoDocument(
        <Calendar
          strings={ dayPickerStrings }
          isMonthPickerVisible={ true }
          value={ defaultDate }
        />) as Calendar;

      let today = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-day--today') as HTMLElement;

      expect(+today.innerText).to.be.equal(new Date().getDate());
    } catch (err) {
      expect.fail(err, null, 'Encountered error trying to render a Calendar with an invalid date');
    }
  });

  describe('Test rendering simplest calendar', () => {
    let renderedComponent: Calendar;

    before(() => {
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
      let dayPickerMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-month');
      expect(dayPickerMonth).to.not.be.undefined;
      expect(dayPickerMonth.textContent).to.equal(monthName);
      let dayPickerYear = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-year');
      expect(dayPickerYear).to.not.be.undefined;
      expect(dayPickerYear.textContent).to.equal(year.toString());
    });

    it('Verify first day of week', () => {
      let dayHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-weekday');
      expect(dayHeaders.length).to.equal(7);
      expect(dayHeaders[0].textContent).to.equal(dayPickerStrings.shortDays[0]);
      expect(dayHeaders[1].textContent).to.equal(dayPickerStrings.shortDays[1]);
      expect(dayHeaders[2].textContent).to.equal(dayPickerStrings.shortDays[2]);
      expect(dayHeaders[3].textContent).to.equal(dayPickerStrings.shortDays[3]);
      expect(dayHeaders[4].textContent).to.equal(dayPickerStrings.shortDays[4]);
      expect(dayHeaders[5].textContent).to.equal(dayPickerStrings.shortDays[5]);
      expect(dayHeaders[6].textContent).to.equal(dayPickerStrings.shortDays[6]);
    });

    it('Verify day picker selected date & navigated date', () => {
      // When not passed in selected & navigated dates default to current date
      // These dates will be ms different, so just compare their day, month, and year
      // This test will likely fail around midnight.
      let today = new Date();
      expect(renderedComponent.state.selectedDate).to.not.be.null;
      expect(renderedComponent.state.selectedDate!.getDate()).to.equal(today.getDate());
      expect(renderedComponent.state.selectedDate!.getMonth()).to.equal(today.getMonth());
      expect(renderedComponent.state.selectedDate!.getFullYear()).to.equal(today.getFullYear());
      expect(renderedComponent.state.navigatedDate).to.not.be.null;
      expect(renderedComponent.state.navigatedDate!.getDate()).to.equal(today.getDate());
      expect(renderedComponent.state.navigatedDate!.getMonth()).to.equal(today.getMonth());
      expect(renderedComponent.state.navigatedDate!.getFullYear()).to.equal(today.getFullYear());
    });

    it('Verify go to today', () => {
      let goToToday = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-goToday');
      expect(goToToday).to.not.be.undefined;
      expect(goToToday.textContent).to.equal(dayPickerStrings.goToToday);
    });
  });

  describe('Test rendering most complicated calendar', () => {
    let renderedComponent: Calendar;
    let defaultDate: Date;
    let lastSelectedDateRange: Date[] | null = null;

    before(() => {
      defaultDate = new Date(2017, 2, 16);
      renderedComponent = ReactTestUtils.renderIntoDocument(
        <Calendar
          strings={ dayPickerStrings }
          isMonthPickerVisible={ true }
          value={ defaultDate }
          firstDayOfWeek={ DayOfWeek.Tuesday }
          dateRangeType={ DateRangeType.Week }
          autoNavigateOnSelection={ true }
          onSelectDate={ (date: Date, dateRangeArray: Date[]) => lastSelectedDateRange = dateRangeArray }
        />) as Calendar;
    });

    it('Verify day picker header', () => {
      let monthName = dayPickerStrings.months[defaultDate.getMonth()];
      let dayPickerMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-month');
      expect(dayPickerMonth).to.not.be.undefined;
      expect(dayPickerMonth.textContent).to.equal(monthName);
      let dayPickerYear = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-year');
      expect(dayPickerYear).to.not.be.undefined;
      expect(dayPickerYear.textContent).to.equal(defaultDate.getFullYear().toString());
    });

    it('Verify first day of week', () => {
      let dayHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-weekday');
      expect(dayHeaders.length).to.equal(7);
      expect(dayHeaders[0].textContent).to.equal(dayPickerStrings.shortDays[2]);
      expect(dayHeaders[1].textContent).to.equal(dayPickerStrings.shortDays[3]);
      expect(dayHeaders[2].textContent).to.equal(dayPickerStrings.shortDays[4]);
      expect(dayHeaders[3].textContent).to.equal(dayPickerStrings.shortDays[5]);
      expect(dayHeaders[4].textContent).to.equal(dayPickerStrings.shortDays[6]);
      expect(dayHeaders[5].textContent).to.equal(dayPickerStrings.shortDays[0]);
      expect(dayHeaders[6].textContent).to.equal(dayPickerStrings.shortDays[1]);
    });

    it('Verify day picker selected date & navigated date', () => {
      expect(renderedComponent.state.selectedDate).to.equal(defaultDate);
      expect(renderedComponent.state.navigatedDate).to.equal(defaultDate);
    });

    it('Verify month picker seen', () => {
      let monthPicker = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-monthPicker') as HTMLElement;
      expect(monthPicker).to.not.be.undefined;
      expect(monthPicker.style.display).to.not.equal('none');
    });

    it('Verify month picker header', () => {
      let currentYear = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentYear');
      expect(currentYear).to.not.be.undefined;
      expect(currentYear.textContent).to.equal(defaultDate.getFullYear().toString());
    });

    it('Verify month picker months', () => {
      let months = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-monthOption');
      expect(months.length).to.equal(12);
      for (let i = 0; i < 12; i++) {
        expect(months[i].textContent).to.equal(dayPickerStrings.shortMonths[i]);
      }
    });

    it('Verify go to today', () => {
      let goToToday = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-goToday');
      expect(goToToday).to.not.be.undefined;
      expect(goToToday.textContent).to.equal(dayPickerStrings.goToToday);
    });

    it('Verify navigate to different week in same month', () => {
      lastSelectedDateRange = null;
      let days = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-day');
      let day = days[8]; // 03/08/2017
      ReactTestUtils.Simulate.click(day);
      expect(lastSelectedDateRange).to.not.be.null;
      expect(lastSelectedDateRange!.length).to.equal(7);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, new Date(2017, 2, 7 + i))).is.true);
    });

    it('Verify navigate to day in different month', () => {
      lastSelectedDateRange = null;
      let days = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-day');
      let day = days[34]; // 04/03/2017
      let firstDate = new Date(2017, 2, 28);
      ReactTestUtils.Simulate.click(day);
      expect(lastSelectedDateRange).to.not.be.null;
      expect(lastSelectedDateRange!.length).to.equal(7);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, addDays(firstDate, i))).is.true);
    });
  });
});
