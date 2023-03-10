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
            inputField: datePickerClassNames.inputField,
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

  it('should call onSelectDate even when required input is empty when allowTextInput is true', () => {
    const onSelectDate = jest.fn();
    const result = render(<DatePicker isRequired allowTextInput onSelectDate={onSelectDate} />);
    const input = result.getByRole('combobox');

    fireEvent.change(input, {
      target: {
        value: 'Jan 1 2030',
      },
    });
    fireEvent.blur(input);

    fireEvent.change(input, {
      target: {
        value: '',
      },
    });
    fireEvent.blur(input);

    expect(onSelectDate).toHaveBeenCalledTimes(2);
  });
});
