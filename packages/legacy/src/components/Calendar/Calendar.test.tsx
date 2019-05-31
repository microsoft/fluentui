import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { mount } from 'enzyme';

import { Calendar } from './Calendar';
import { DateRangeType, DayOfWeek } from './Calendar.types';
import { addDays, compareDates } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { resetIds } from 'office-ui-fabric-react/lib/Utilities';

describe('Calendar', () => {
  const dayPickerStrings = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    goToToday: 'Go to today'
  };

  beforeEach(() => {
    resetIds();
  });

  it('can append div attributes to container', () => {
    const renderedComponent = mount(<Calendar strings={dayPickerStrings} id="foo" />);

    expect(renderedComponent.getElement().props.id).toEqual('foo');
  });

  it('can handle invalid starting dates', () => {
    // Arrange
    const defaultDate = new Date('invalid');

    // Act

    const renderedComponent = mount(<Calendar strings={dayPickerStrings} isMonthPickerVisible={true} value={defaultDate} />);

    const today = renderedComponent.find('.ms-DatePicker-day--today');
    expect(+today.text()).toEqual(new Date().getDate());
  });

  describe('Test rendering simplest calendar', () => {
    let renderedComponent: Calendar;

    beforeAll(() => {
      renderedComponent = (ReactTestUtils.renderIntoDocument(
        <Calendar strings={dayPickerStrings} isMonthPickerVisible={false} />
      ) as unknown) as Calendar;
    });

    it('Renders simple calendar correctly', () => {
      const date = new Date(2000, 1, 1);
      const component = renderer.create(<Calendar strings={dayPickerStrings} isMonthPickerVisible value={date} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Verify day picker header', () => {
      const today = new Date();
      const monthName = dayPickerStrings.months[today.getMonth()];
      const year = today.getFullYear();
      const dayPickerMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-monthAndYear');
      expect(dayPickerMonth).toBeDefined();
      expect(dayPickerMonth.textContent).toEqual(monthName + ' ' + year.toString());
    });

    it('Verify first day of week', () => {
      const dayHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-weekday');
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
      const today = new Date();
      expect(renderedComponent.state.selectedDate).not.toBeNull();
      expect(renderedComponent.state.selectedDate!.getDate()).toEqual(today.getDate());
      expect(renderedComponent.state.selectedDate!.getMonth()).toEqual(today.getMonth());
      expect(renderedComponent.state.selectedDate!.getFullYear()).toEqual(today.getFullYear());
      expect(renderedComponent.state.navigatedDayDate).not.toBeNull();
      expect(renderedComponent.state.navigatedDayDate!.getDate()).toEqual(today.getDate());
      expect(renderedComponent.state.navigatedDayDate!.getMonth()).toEqual(today.getMonth());
      expect(renderedComponent.state.navigatedDayDate!.getFullYear()).toEqual(today.getFullYear());
    });

    it('Verify go to today', () => {
      const goToToday = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-goToday');
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
      const onSelectDate = (): ((date: Date, dateRangeArray: Date[]) => void) => {
        return (date: Date, dateRangeArray: Date[]): void => {
          lastSelectedDateRange = dateRangeArray;
        };
      };

      renderedComponent = (ReactTestUtils.renderIntoDocument(
        <Calendar
          strings={dayPickerStrings}
          isMonthPickerVisible={true}
          value={defaultDate}
          firstDayOfWeek={DayOfWeek.Tuesday}
          dateRangeType={DateRangeType.Week}
          autoNavigateOnSelection={true}
          onSelectDate={onSelectDate()}
          className="CalendarTestClass"
        />
      ) as unknown) as Calendar;
    });

    it('Verify day picker header', () => {
      const monthName = dayPickerStrings.months[defaultDate.getMonth()];
      const dayPickerMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-monthAndYear');
      expect(dayPickerMonth).toBeDefined();
      expect(dayPickerMonth.textContent).toEqual(monthName + ' ' + defaultDate.getFullYear().toString());
    });

    it('Verify first day of week', () => {
      const dayHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-weekday');
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
      expect(renderedComponent.state.navigatedDayDate).toEqual(defaultDate);
    });

    it('Verify month picker seen', () => {
      const monthPicker = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-monthPicker') as HTMLElement;
      expect(monthPicker).toBeDefined();
      expect(monthPicker.style.display).not.toEqual('none');
    });

    it('Verify month picker header', () => {
      const currentYear = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentYear');
      expect(currentYear).toBeDefined();
      expect(currentYear.textContent).toEqual(defaultDate.getFullYear().toString());
    });

    it('Verify month picker months', () => {
      const months = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-monthOption');
      expect(months.length).toEqual(12);
      for (let i = 0; i < 12; i++) {
        expect(months[i].textContent).toEqual(dayPickerStrings.shortMonths[i]);
      }
    });

    it('Verify go to today', () => {
      const goToToday = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-goToday');
      expect(goToToday).toBeDefined();
      expect(goToToday.textContent).toEqual(dayPickerStrings.goToToday);
    });

    it('Verify navigate to different week in same month', () => {
      lastSelectedDateRange = null;
      const days = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-day-button');
      const day = days[8]; // 03/08/2017
      ReactTestUtils.Simulate.click(day);
      expect(lastSelectedDateRange).not.toBeNull();
      expect(lastSelectedDateRange!.length).toEqual(7);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, new Date(2017, 2, 7 + i))).toEqual(true));
    });

    it('Verify navigate to day in different month', () => {
      lastSelectedDateRange = null;
      const days = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-day-button');
      const day = days[34]; // 04/03/2017
      const firstDate = new Date(2017, 2, 28);
      ReactTestUtils.Simulate.click(day);
      expect(lastSelectedDateRange).not.toBeNull();
      expect(lastSelectedDateRange!.length).toEqual(7);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, addDays(firstDate, i))).toEqual(true));
    });

    it('Verify class name', () => {
      const calendarRoot = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'CalendarTestClass');
      expect(calendarRoot).toBeDefined();
      expect(calendarRoot.length).toEqual(1);
      const root = calendarRoot[0];
      expect(root.classList).toBeDefined();
      expect(root.classList.length).toEqual(2);
      expect(root.classList[0]).toEqual('ms-DatePicker');
      expect(root.classList[1]).toEqual('CalendarTestClass');
    });
  });

  describe('render with date boundaries', () => {
    it('out-of-bounds days should be disabled', () => {
      const defaultDate = new Date('Mar 16 2017');
      const minDate = new Date('Mar 6 2017');
      const maxDate = new Date('Mar 24 2017');
      const renderedComponent = (ReactTestUtils.renderIntoDocument(
        <Calendar
          strings={dayPickerStrings}
          value={defaultDate}
          firstDayOfWeek={DayOfWeek.Sunday}
          dateRangeType={DateRangeType.Day}
          minDate={minDate}
          maxDate={maxDate}
        />
      ) as unknown) as Calendar;

      const days = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-day-button');

      expect(days.slice(0, 7).every(e => e.classList.contains('ms-DatePicker-day--disabled'))).toBe(true);
      expect(days.slice(8, 26).every(e => e.classList.contains('ms-DatePicker-day--disabled'))).toBe(false);
      expect(days.slice(27).every(e => e.classList.contains('ms-DatePicker-day--disabled'))).toBe(true);
    });

    it('out-of-bounds days should not be part of selected range', () => {
      let lastSelectedDateRange: Date[] = new Array();
      const defaultDate = new Date('Mar 16 2017');
      const minDate = new Date('Mar 6 2017');
      const maxDate = new Date('Mar 24 2017');
      const onSelectDate = (): ((date: Date, dateRangeArray: Date[]) => void) => {
        return (date: Date, dateRangeArray: Date[]): void => {
          lastSelectedDateRange = dateRangeArray;
        };
      };
      const renderedComponent = (ReactTestUtils.renderIntoDocument(
        <Calendar
          strings={dayPickerStrings}
          value={defaultDate}
          firstDayOfWeek={DayOfWeek.Sunday}
          dateRangeType={DateRangeType.Month}
          minDate={minDate}
          maxDate={maxDate}
          onSelectDate={onSelectDate()}
        />
      ) as unknown) as Calendar;

      const days = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-day-button');
      ReactTestUtils.Simulate.click(days[18]);
      expect(lastSelectedDateRange!.length).toEqual(19);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, addDays(minDate, i))).toEqual(true));
    });
  });

  it('navigators to out-of-bounds months should be disabled', () => {
    const defaultDate = new Date('Mar 15 2017');
    const minDate = new Date('Mar 1 2017');
    const maxDate = new Date('Mar 31 2017');
    const renderedComponent = (ReactTestUtils.renderIntoDocument(
      <Calendar
        strings={dayPickerStrings}
        value={defaultDate}
        firstDayOfWeek={DayOfWeek.Sunday}
        dateRangeType={DateRangeType.Day}
        minDate={minDate}
        maxDate={maxDate}
      />
    ) as unknown) as Calendar;

    const prevMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-prevMonth');
    const nextMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-nextMonth');

    expect(prevMonth.classList.contains('ms-DatePicker-prevMonth--disabled')).toBe(true);
    expect(nextMonth.classList.contains('ms-DatePicker-nextMonth--disabled')).toBe(true);
  });

  it('out-of-bounds months should be disabled', () => {
    const defaultDate = new Date('Mar 15 2017');
    const minDate = new Date('Mar 1 2017');
    const maxDate = new Date('Oct 1 2017');
    const renderedComponent = (ReactTestUtils.renderIntoDocument(
      <Calendar
        strings={dayPickerStrings}
        value={defaultDate}
        firstDayOfWeek={DayOfWeek.Sunday}
        dateRangeType={DateRangeType.Day}
        minDate={minDate}
        maxDate={maxDate}
      />
    ) as unknown) as Calendar;

    const months = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-monthOption');

    expect(months.slice(0, 1).every(e => e.classList.contains('ms-DatePicker-monthOption--disabled'))).toBe(true);
    expect(months.slice(2, 9).some(e => e.classList.contains('ms-DatePicker-monthOption--disabled'))).toBe(false);
    expect(months.slice(10).every(e => e.classList.contains('ms-DatePicker-monthOption--disabled'))).toBe(true);
  });

  it('navigators to out-of-bounds years should be disabled', () => {
    const defaultDate = new Date('Mar 15 2017');
    const minDate = new Date('Jan 1 2017');
    const maxDate = new Date('Dec 31 2017');
    const renderedComponent = (ReactTestUtils.renderIntoDocument(
      <Calendar
        strings={dayPickerStrings}
        value={defaultDate}
        firstDayOfWeek={DayOfWeek.Sunday}
        dateRangeType={DateRangeType.Day}
        minDate={minDate}
        maxDate={maxDate}
      />
    ) as unknown) as Calendar;

    const prevMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-prevYear');
    const nextMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-nextYear');

    expect(prevMonth.classList.contains('ms-DatePicker-prevYear--disabled')).toBe(true);
    expect(nextMonth.classList.contains('ms-DatePicker-nextYear--disabled')).toBe(true);
  });

  describe('Test Rendering Calendar with Year Picker', () => {
    let renderedComponent: Calendar;
    let defaultDate: Date;
    beforeAll(() => {
      defaultDate = new Date(2017, 2, 16);
      renderedComponent = (ReactTestUtils.renderIntoDocument(
        <Calendar strings={dayPickerStrings} isMonthPickerVisible={true} value={defaultDate} />
      ) as unknown) as Calendar;
    });

    it('month header should have button role', () => {
      const monthHeader = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentYear');
      expect(monthHeader.getAttribute('role')).toBe('button');
    });

    it('year picker should show when clicking month header', () => {
      const monthHeader = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentYear');
      ReactTestUtils.Simulate.click(monthHeader);
      const yearHeader = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentDecade');
      expect(yearHeader).toBeTruthy();
      // month header shouldn't actually be rendered
      const monthHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-currentYear');
      expect(monthHeaders.length).toBe(0);
    });

    it('year picker cells render as expected', () => {
      // working with the year grid
      const grid = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-optionGrid');
      const cells = grid.getElementsByClassName('ms-DatePicker-yearOption');
      expect(cells.length).toBe(12);
      // expect each of the cells to have a grid cell role type
      const visitedYears: number[] = [];
      for (let i = 0; i < cells.length; i++) {
        const cell = cells.item(i);
        expect(cell).toBeTruthy();
        if (cell) {
          expect(cell.getAttribute('role')).toBe('gridcell');
          const cellContent = cell.textContent;
          expect(cellContent).toBeTruthy();
          const year = parseInt(cellContent as string, 10);
          expect(visitedYears.indexOf(year)).toBeLessThan(0);
          expect(year).toBeGreaterThanOrEqual(2010);
          expect(year).toBeLessThanOrEqual(2021);
          visitedYears.push(year);
        }
      }
    });

    it('month picker on non-overlay calendar should show when clicking year header', () => {
      const yearHeader = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentDecade');
      expect(yearHeader).toBeTruthy();
      const monthHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-currentYear');
      expect(monthHeaders.length).toBe(0);
      // click year header - month picker should become visible again
      ReactTestUtils.Simulate.click(yearHeader);
      const monthHeader = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentYear');
      expect(monthHeader).toBeTruthy();
    });
  });
});
