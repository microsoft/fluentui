import * as React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { isConformant } from '../../testing/isConformant';
import { datePickerClassNames } from './useDatePickerStyles';
import { resetIdsForTests } from '@fluentui/react-utilities';

// testing-library's queryByRole function doesn't look inside portals
function queryByRoleDialog(result: RenderResult) {
  const dialogs = result.baseElement.querySelectorAll('*[role="dialog"]');
  if (!dialogs?.length) {
    return null;
  } else {
    expect(dialogs.length).toBe(1);
    return dialogs.item(0) as HTMLElement;
  }
}

const getDatepickerPopoverElement = (result: RenderResult) => {
  result.getByRole('combobox').click();
  const dialog = queryByRoleDialog(result);
  expect(dialog).not.toBeNull();
  return dialog!;
};

describe('DatePicker', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: DatePicker,
    displayName: 'DatePicker',
    disabledTests: ['consistent-callback-args'],
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: datePickerClassNames.root,
            field: datePickerClassNames.field,
            wrapper: datePickerClassNames.wrapper,
            popoverSurface: datePickerClassNames.popoverSurface,
            input: datePickerClassNames.input,
            calendar: datePickerClassNames.calendar,
          },
          getPortalElement: getDatepickerPopoverElement,
        },
      ],
    },
  });

  it('can add an id to the container', () => {
    const result = render(<DatePicker id="test-id" />);
    expect(result.findByTestId('test-id')).toBeTruthy();
  });

  it('should not render DatePicker when isDatePickerShown is not set', () => {
    const result = render(<DatePicker />);
    expect(result).toMatchSnapshot();
  });

  it('renders a normal input when allowTextInput is true', () => {
    const result = render(<DatePicker allowTextInput />);
    expect(result.getByRole('combobox').getAttribute('readonly')).toBeNull();
  });

  it('renders a readonly input when allowTextInput is false', () => {
    const result = render(<DatePicker />);
    expect(result.getByRole('combobox').getAttribute('readonly')).not.toBeNull();
  });

  it('should call onSelectDate even when required input is empty when allowTextInput is true', () => {
    const onSelectDate = jest.fn();
    const result = render(<DatePicker isRequired allowTextInput onSelectDate={onSelectDate} />);
    const input = result.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Jan 1 2030' } });
    fireEvent.blur(input);

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);

    expect(onSelectDate).toHaveBeenCalledTimes(2);
  });

  it('should call onSelectDate only once when allowTextInput is true and popup is used to select the value', () => {
    const onSelectDate = jest.fn();
    const result = render(<DatePicker allowTextInput onSelectDate={onSelectDate} />);

    fireEvent.click(result.getByRole('combobox'));
    result.getAllByRole('gridcell')[10].click();

    expect(onSelectDate).toHaveBeenCalledTimes(1);
  });

  it('should set "Calendar" as the Callout\'s aria-label', () => {
    const result = render(<DatePicker />);
    const input = result.getByRole('combobox');

    fireEvent.click(input);
    fireEvent.blur(input);

    expect(result.getByRole('dialog').getAttribute('aria-label')).toBe('Calendar');
  });

  it('should reflect the correct date in the input field when selecting a value', () => {
    const today = new Date('January 15, 2020');
    const initiallySelectedDate = new Date('January 10, 2020');
    const result = render(<DatePicker allowTextInput today={today} initialPickerDate={initiallySelectedDate} />);

    const input = result.getByRole('combobox');

    fireEvent.click(input);
    result.getByText('15').click();

    expect(input.getAttribute('value')).toBe('Wed Jan 15 2020');
  });

  it('reflects the correct date in the input field when selecting a value and a different format is given', () => {
    const today = new Date('January 15, 2020');
    const initiallySelectedDate = new Date('January 10, 2020');
    const onFormatDate = (date?: Date): string => {
      return date ? date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100) : '';
    };

    const result = render(
      <DatePicker
        allowTextInput={true}
        today={today}
        formatDate={onFormatDate}
        initialPickerDate={initiallySelectedDate}
      />,
    );
    const input = result.getByRole('combobox');

    fireEvent.click(input);
    result.getByText('15').click();

    expect(input.getAttribute('value')).toBe('15/1/20');
  });
});
