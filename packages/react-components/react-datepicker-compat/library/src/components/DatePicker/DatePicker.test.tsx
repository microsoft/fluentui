import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DatePicker } from './DatePicker';
import { isConformant } from '../../testing/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';

const ControlledDatePicker = (props: Partial<React.ComponentProps<typeof DatePicker>>) => {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <DatePicker
      value={value}
      allowTextInput
      formatDate={date => {
        props.formatDate?.();
        return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
      }}
      onSelectDate={date => {
        props.onSelectDate?.(date);
        date !== undefined && setValue(date);
      }}
    />
  );
};

describe('DatePicker', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: DatePicker,
    displayName: 'DatePicker',
    // component-has-root-ref is disabled because the root is an Input component, the conformance test thinks the
    // wrapper is the root, not the input itself. This is a bug in the conformance test.
    //
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // The `has-static-classnames` testOptions entry went with the BEM statics it named:
    // DECISIONS.md D16.1 stopped rendering `fui-DatePicker` / `fui-DatePicker__calendar` /
    // `fui-DatePicker__popupSurface`, and D16.5 narrowed `datePickerClassNames` to
    // `{ root }` pointing at the group marker. `component-has-static-classnames-object` is
    // no longer a default test, so it needs no `disabledTests` entry.
    disabledTests: ['consistent-callback-args', 'component-has-root-ref', 'make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      // a DatePicker's root slot IS an Input (`DatePickerSlots['root'] = Slot<typeof Input>`),
      // and `useInputStyles_unstable` stamps Input's marker on this same element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-input', 'group/fui-date-picker'],
      },
    },
  });

  it('can add an id to the container', () => {
    const result = render(<DatePicker id="test-id" />);
    expect(result.findByTestId('test-id')).toBeTruthy();
  });

  it('should not render popup when it is not open', () => {
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
    const result = render(<DatePicker required allowTextInput onSelectDate={onSelectDate} />);
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
    fireEvent.click(result.getByText('15'));

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
    fireEvent.click(result.getByText('15'));

    expect(input.getAttribute('value')).toBe('15/1/20');
  });

  it('calls onSelectDate when controlled', () => {
    const onSelectDate = jest.fn();
    const result = render(<ControlledDatePicker onSelectDate={onSelectDate} />);

    fireEvent.click(result.getByRole('combobox'));
    result.getAllByRole('gridcell')[10].click();

    expect(onSelectDate).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectDate and formatDate when controlled', () => {
    const onSelectDate = jest.fn();
    const formatDate = jest.fn();
    const result = render(<ControlledDatePicker formatDate={formatDate} onSelectDate={onSelectDate} />);

    fireEvent.click(result.getByRole('combobox'));
    result.getAllByRole('gridcell')[10].click();

    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(formatDate).toHaveBeenCalledTimes(1);
  });
});
