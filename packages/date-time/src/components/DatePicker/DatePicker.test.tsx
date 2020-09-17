import * as React from 'react';
import { Calendar, ICalendarStrings } from '../../Calendar';
import { DatePicker } from './DatePicker';
import { DatePickerBase } from './DatePicker.base';
import { IDatePickerStrings, IDatePickerProps } from './DatePicker.types';
import { FirstWeekOfYear } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { resetIds } from '@uifabric/utilities';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { safeCreate } from '@uifabric/test-utilities';
import { TextField } from 'office-ui-fabric-react';
import * as renderer from 'react-test-renderer';
import * as ReactDOM from 'react-dom';
import { CalendarDayGridBase } from '../CalendarDayGrid/CalendarDayGrid.base';

describe('DatePicker', () => {
  beforeEach(() => {
    resetIds();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useFakeTimers();
  });

  it('renders default DatePicker correctly', () => {
    // This will only render the input. Calendar component has its own snapshot.
    safeCreate(<DatePicker />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('can add an id to the container', () => {
    const wrapper = mount(<DatePickerBase id="foo" />);

    expect(wrapper.getElement().props.id).toEqual('foo');
  });

  it('should not open DatePicker when disabled, no label', () => {
    const wrapper = mount(<DatePickerBase disabled />);
    wrapper.find('i').simulate('click');

    expect(wrapper.find('[role="dialog"]').length).toBe(0);
  });

  // if isDatePickerShown is not set, the DatePicker should not
  // be rendered and therefore aria-owns should not exist
  it('should not render DatePicker when isDatePickerShown is not set', () => {
    const datePicker = mount(<DatePickerBase />);

    expect(datePicker.getDOMNode().getAttribute('aria-owns')).toBeNull();
  });

  // if isDatePickerShown is set, the DatePicker should be rendered
  // and aria-owns should exist
  it('should render DatePicker when isDatePickerShown is set', () => {
    const datePicker = mount(<DatePickerBase />);
    datePicker.find('i').simulate('click');

    expect(
      datePicker
        .find('[aria-owns]')
        .getDOMNode()
        .getAttribute('aria-owns'),
    ).toBeDefined();
  });

  // if isDatePickerShown is set, the DatePicker should be rendered
  // and the calloutId should exist in the DOM
  it('should render DatePicker and calloutId must exist in the DOM when isDatePickerShown is set', () => {
    const datePicker = mount(<DatePickerBase />);
    datePicker.find('i').simulate('click');

    const calloutId = datePicker
      .find('[aria-owns]')
      .getDOMNode()
      .getAttribute('aria-owns');

    expect(datePicker.find(`#${calloutId}`).exists()).toBe(true);
  });

  it('should not open DatePicker when disabled, with label', () => {
    const wrapper = mount(<DatePickerBase disabled label="label" />);
    wrapper.find('i').simulate('click');
    expect(wrapper.find('[role="dialog"]').length).toBe(0);
  });

  it('should call onSelectDate even when required input is empty when allowTextInput is true', () => {
    const onSelectDate = jest.fn();
    const datePicker = mount(<DatePickerBase isRequired={true} allowTextInput={true} onSelectDate={onSelectDate} />);
    const textField = datePicker.find('input');

    expect(textField).toBeDefined();

    textField.simulate('change', { target: { value: 'Jan 1 2030' } }).simulate('blur');
    textField.simulate('change', { target: { value: '' } }).simulate('blur');

    expect(onSelectDate).toHaveBeenCalledTimes(2);
  });

  it('should clear error message when required input has date text and allowTextInput is true', () => {
    // See https://github.com/facebook/react/issues/11565
    spyOn(ReactDOM, 'createPortal').and.callFake(node => node);

    safeCreate(<DatePickerBase isRequired={true} allowTextInput={true} />, datePicker => {
      const textfield = datePicker.root.findByType(TextField);
      const input = datePicker.root.findByType('input');

      // open the datepicker then dismiss
      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        input.props.onClick();
      });

      expect(textfield.props.errorMessage).toBe(' ');

      renderer.act(() => {
        input.props.onChange({ target: { value: 'Jan 1 2030' }, persist: jest.fn() });
      });
      renderer.act(() => {
        input.props.onBlur();
      });

      expect(textfield.props.errorMessage).toBeUndefined();
    });
  });

  it('clears error message when required input has date selected from calendar and allowTextInput is true', () => {
    // See https://github.com/facebook/react/issues/11565
    spyOn(ReactDOM, 'createPortal').and.callFake(node => node);

    safeCreate(<DatePickerBase isRequired={true} allowTextInput={true} />, datePicker => {
      const textfield = datePicker.root.findByType(TextField);
      const input = datePicker.root.findByType('input');

      // open the datepicker then dismiss
      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        input.props.onClick();
      });

      expect(textfield.props.errorMessage).toBe(' ');

      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        const date = new Date();
        datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(date, [date]);
      });

      expect(textfield.props.errorMessage).toBeUndefined();
    });
  });

  it('should not clear initial error when datepicker is opened', () => {
    // See https://github.com/facebook/react/issues/11565
    spyOn(ReactDOM, 'createPortal').and.callFake(node => node);

    safeCreate(
      <DatePickerBase
        isRequired={true}
        allowTextInput={true}
        maxDate={new Date('2020-04-01')}
        value={new Date('2020-04-02')}
      />,
      datePicker => {
        const textfield = datePicker.root.findByType(TextField);
        const input = datePicker.root.findByType('input');

        expect(textfield.props.errorMessage).not.toBeUndefined();

        // open the datepicker then dismiss
        renderer.act(() => {
          input.props.onClick();
        });
        renderer.act(() => {
          input.props.onClick();
        });

        expect(textfield.props.errorMessage).not.toBeUndefined();
      },
    );
  });

  // @todo: usage of document.querySelector is incorrectly testing DOM mounted by previous tests and needs to be fixed.
  it('should call onSelectDate only once when allowTextInput is true and popup is used to select the value', () => {
    // See https://github.com/facebook/react/issues/11565
    spyOn(ReactDOM, 'createPortal').and.callFake(node => node);
    const onSelectDate = jest.fn();

    safeCreate(<DatePickerBase allowTextInput={true} onSelectDate={onSelectDate} />, datePicker => {
      const input = datePicker.root.findByType('input');

      // open the datepicker then dismiss
      renderer.act(() => {
        input.props.onClick();
      });
      renderer.act(() => {
        const date = new Date();
        datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(date, [date]);
      });

      expect(onSelectDate).toHaveBeenCalledTimes(1);
    });
  });

  it('should set "Calendar" as the Callout\'s aria-label', () => {
    // See https://github.com/facebook/react/issues/11565
    spyOn(ReactDOM, 'createPortal').and.callFake(node => node);

    safeCreate(<DatePickerBase />, datePicker => {
      const input = datePicker.root.findByType('input');

      // open the datepicker then dismiss
      renderer.act(() => {
        input.props.onClick();
      });

      const calloutProps = datePicker.root.findByType(Callout).props;

      expect(calloutProps.ariaLabel).toBe('Calendar');
    });
  });

  it('should reflect the correct date in the input field when selecting a value', () => {
    const today = new Date('January 15, 2020');
    const initiallySelectedDate = new Date('January 10, 2020');
    // initialPickerDate defaults to Date.now() if not provided so it must be given to ensure
    // that the datepicker opens on the correct month

    // See https://github.com/facebook/react/issues/11565
    spyOn(ReactDOM, 'createPortal').and.callFake(node => node);

    safeCreate(
      <DatePickerBase allowTextInput={true} today={today} initialPickerDate={initiallySelectedDate} />,
      datePicker => {
        const input = datePicker.root.findByType('input');

        // open the datepicker then dismiss
        renderer.act(() => {
          input.props.onClick();
        });
        renderer.act(() => {
          datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(today, [today]);
        });

        expect(input.props.value).toBe('Wed Jan 15 2020');
      },
    );
  });

  xit('reflects the correct date in the input field when selecting a value and a different format is given', () => {
    const today = new Date('January 15, 2020');
    const initiallySelectedDate = new Date('January 10, 2020');
    const onFormatDate = (date: Date): string => {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
    };
    // initialPickerDate defaults to Date.now() if not provided so it must be given to ensure
    // that the datepicker opens on the correct month

    // See https://github.com/facebook/react/issues/11565
    spyOn(ReactDOM, 'createPortal').and.callFake(node => node);

    safeCreate(
      <DatePickerBase
        allowTextInput={true}
        today={today}
        formatDate={onFormatDate}
        initialPickerDate={initiallySelectedDate}
      />,
      datePicker => {
        const input = datePicker.root.findByType('input');

        // open the datepicker then dismiss
        renderer.act(() => {
          input.props.onClick();
        });
        renderer.act(() => {
          datePicker.root.findByType(CalendarDayGridBase).props.onSelectDate(today, [today]);
        });

        expect(input.props.value).toBe('15/1/20');
      },
    );
  });

  describe('when Calendar properties are not specified', () => {
    const datePicker = shallow(<DatePickerBase />);
    datePicker
      .find(TextField)
      ?.props()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .onClick?.({} as any);
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
      formatYear: (date: Date) => 'y',
    };

    const datePicker = shallow(
      <DatePickerBase
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
      />,
    );
    datePicker
      .find(TextField)
      ?.props()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .onClick?.({} as any);

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

  describe('when date boundaries are specified', () => {
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
    let datePicker: ReactWrapper<IDatePickerProps, never>;

    beforeEach(() => {
      datePicker = mount(
        <DatePickerBase
          allowTextInput={true}
          minDate={minDate}
          maxDate={maxDate}
          value={defaultDate}
          strings={strings}
        />,
      );
    });

    afterEach(() => {
      datePicker.unmount();
    });

    it('should throw validation error for date outside boundary', () => {
      // before minDate
      datePicker
        .find('input')
        .simulate('change', { target: { value: 'Jan 1 2010' } })
        .simulate('blur');
      expect(datePicker.find(TextField).props().errorMessage).toBe('out of bounds');

      // after maxDate
      datePicker
        .find('input')
        .simulate('change', { target: { value: 'Jan 1 2020' } })
        .simulate('blur');
      expect(datePicker.find(TextField).props().errorMessage).toBe('out of bounds');
    });

    it('should not throw validation error for date inside boundary', () => {
      // in boundary
      datePicker
        .find('input')
        .simulate('change', { target: { value: 'Dec 16 2017' } })
        .simulate('blur');
      expect(datePicker.find(TextField).props().errorMessage).toBeFalsy();

      // on boundary
      datePicker
        .find('input')
        .simulate('change', { target: { value: 'Jan 1 2017' } })
        .simulate('blur');
      expect(datePicker.find(TextField).props().errorMessage).toBeFalsy();
    });

    it('should throw validation error if boundaries are moved to intersect selected date', () => {
      // ReactTestUtils.act(() => {
      datePicker.setProps({ minDate: new Date('Dec 16 2017') });
      datePicker.update();
      // });
      expect(datePicker.find(TextField).props().errorMessage).toBe('out of bounds');
    });
  });
});
