import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@fluentui/react-field';
import { isConformant } from '../../testing/isConformant';
import { TimePicker } from './TimePicker';
import { renderTimePicker_unstable } from './renderTimePicker';
import { useTimePickerBase_unstable } from './useTimePicker';
import { useTimePickerContextValues_unstable } from './useTimePickerContextValues';
import type { TimePickerBaseProps, TimePickerProps } from './TimePicker.types';

const dateAnchor = new Date('November 25, 2021 01:00:00');

describe('TimePicker', () => {
  // mock locale to make sure the test generates same result as browser, and not affected by the test runner's locale
  const originalToLocaleTimeString = Date.prototype.toLocaleTimeString;
  beforeAll(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.toLocaleTimeString = function (locales?: string | string[], options?: Intl.DateTimeFormatOptions) {
      return originalToLocaleTimeString.call(this, locales ?? 'en-US', options);
    };
  });
  afterAll(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.toLocaleTimeString = originalToLocaleTimeString;
  });

  isConformant({
    Component: TimePicker,
    displayName: 'TimePicker',
    primarySlot: 'input',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            open: true,
            // Portal messes with the classNames test, so rendering the listbox inline here
            inlinePopup: true,
          },
        },
      ],
      'consistent-callback-args': {
        legacyCallbacks: ['onOpenChange'],
      },
    },
  });

  it('generates the formatted option', () => {
    const { getByRole, getAllByRole } = render(<TimePicker dateAnchor={dateAnchor} startHour={8} endHour={9} />);

    const input = getByRole('combobox');
    userEvent.click(input);
    const options = getAllByRole('option');
    expect(options.length).toBe(2);
    expect(options[0].textContent).toBe('8:00 AM');
    expect(options[1].textContent).toBe('8:30 AM');
  });

  it('generates the formatted option using formatDateToTimeString', () => {
    const { getByRole, getAllByRole } = render(
      <TimePicker dateAnchor={dateAnchor} formatDateToTimeString={() => 'custom'} />,
    );

    const input = getByRole('combobox');
    userEvent.click(input);
    expect(getAllByRole('option')[0].textContent).toBe('custom');
  });

  it('shows controlled time correctly', () => {
    const TestExample = () => {
      const [value, setValue] = React.useState<Date | null>(dateAnchor);
      const onChange: TimePickerProps['onChange'] = (_e, data) => setValue(data.value);
      return <TimePicker dateAnchor={dateAnchor} increment={60} value={value} onChange={onChange} />;
    };

    const { getByRole, getAllByRole } = render(<TestExample />);

    const input = getByRole('combobox');
    userEvent.click(input);
    expect(getAllByRole('option')[1].getAttribute('aria-selected')).toBe('true'); // '1:00' is selected

    userEvent.click(getAllByRole('option')[10]);
    expect(getByRole('combobox').getAttribute('value')).toBe('10:00 AM');
  });

  it('when wrapped in Field, sets default aria-labelledby on chevron icon', () => {
    const { getByRole } = render(
      <Field label="Coffee time">
        <TimePicker />
      </Field>,
    );

    const chevronIcon = getByRole('button');
    const [chevronId, labelId] = chevronIcon.getAttribute('aria-labelledby')!.split(' ');
    expect(chevronId).toBe(chevronIcon.id);
    expect(document.getElementById(labelId)?.textContent).toBe('Coffee time');
  });

  it('calls onChange with event data when an option is clicked', () => {
    const onChange = jest.fn();
    const { getByRole, getAllByRole } = render(
      <TimePicker dateAnchor={dateAnchor} startHour={8} endHour={9} onChange={onChange} />,
    );

    userEvent.click(getByRole('combobox'));
    userEvent.click(getAllByRole('option')[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    const [, data] = onChange.mock.calls[0];
    expect(data).toEqual(expect.objectContaining({ type: 'click', displayValue: '8:30 AM', errorType: undefined }));
    expect(data.value).toEqual(new Date('November 25, 2021 08:30:00'));
  });

  it('supports defaultValue', () => {
    const { getByRole } = render(
      <TimePicker dateAnchor={dateAnchor} defaultValue={new Date('November 25, 2021 09:00:00')} />,
    );

    userEvent.click(getByRole('combobox'));
    expect(getByRole('option', { selected: true }).textContent).toBe('9:00 AM');
  });

  it('shows the formatted value in the input before the options are rendered', () => {
    const { getByRole } = render(
      <TimePicker dateAnchor={dateAnchor} defaultValue={new Date('November 25, 2021 09:00:00')} />,
    );

    expect(getByRole('combobox')).toHaveValue('9:00 AM');
  });

  it('updates the input text when the controlled value changes', () => {
    const { getByRole, rerender } = render(
      <TimePicker dateAnchor={dateAnchor} value={new Date('November 25, 2021 09:00:00')} />,
    );
    expect(getByRole('combobox')).toHaveValue('9:00 AM');

    rerender(<TimePicker dateAnchor={dateAnchor} value={new Date('November 25, 2021 10:30:00')} />);
    expect(getByRole('combobox')).toHaveValue('10:30 AM');

    rerender(<TimePicker dateAnchor={dateAnchor} value={null} />);
    expect(getByRole('combobox')).toHaveValue('');
  });

  it('keeps the options stable when a controlled overnight selection is accepted', () => {
    const TestExample = () => {
      const [value, setValue] = React.useState<Date | null>(new Date('November 25, 2021 23:00:00'));
      return (
        <TimePicker
          startHour={22}
          endHour={2}
          increment={60}
          hourCycle="h23"
          dateAnchor={new Date('November 25, 2021 00:00:00')}
          value={value}
          onChange={(_e, data) => setValue(data.value)}
        />
      );
    };

    const { getByRole, getAllByRole } = render(<TestExample />);
    const input = getByRole('combobox');

    userEvent.click(input);
    expect(getAllByRole('option').map(option => option.textContent)).toEqual(['22:00', '23:00', '00:00', '01:00']);

    // 01:00 is on November 26. Accepting it must not move the anchor to November 26.
    userEvent.click(getAllByRole('option')[3]);
    expect(input).toHaveValue('01:00');

    userEvent.click(input);
    expect(getAllByRole('option').map(option => option.textContent)).toEqual(['22:00', '23:00', '00:00', '01:00']);
    expect(getByRole('option', { selected: true }).textContent).toBe('01:00');
  });

  describe('freeform', () => {
    const handleTimeSelect = jest.fn();

    const ControlledFreeFormExample = () => {
      const [value, setValue] = React.useState<Date | null>(null);
      const onChange: TimePickerProps['onChange'] = (e, data) => {
        handleTimeSelect(e, data);
        setValue(data.value);
      };
      return <TimePicker freeform dateAnchor={dateAnchor} startHour={10} value={value} onChange={onChange} />;
    };

    const UnControlledFreeFormExample = () => (
      <TimePicker freeform dateAnchor={dateAnchor} onChange={handleTimeSelect} startHour={10} />
    );

    beforeEach(() => {
      handleTimeSelect.mockClear();
    });

    it.each`
      name              | Component
      ${'uncontrolled'} | ${UnControlledFreeFormExample}
      ${'controlled'}   | ${ControlledFreeFormExample}
    `('$name - when input value is not prefix of any option, commit the typed text on Enter', ({ Component }) => {
      const { getByRole } = render(<Component />);
      const input = getByRole('combobox');
      userEvent.type(input, '111{enter}');
      expect(handleTimeSelect).toHaveBeenCalledTimes(1);
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'keydown',
          event: expect.anything(),
          value: null,
          displayValue: '111',
          errorType: 'invalid-input',
        }),
      );
    });

    it.each`
      name              | Component
      ${'uncontrolled'} | ${UnControlledFreeFormExample}
      ${'controlled'}   | ${ControlledFreeFormExample}
    `('$name - when input value is prefix of an option, select the option from dropdown on Enter', ({ Component }) => {
      const { getByRole } = render(<Component />);
      const input = getByRole('combobox');
      userEvent.type(input, '11:{enter}');
      expect(handleTimeSelect).toHaveBeenCalledTimes(1);
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ displayValue: '11:00 AM', errorType: undefined }),
      );
    });

    it.each`
      name              | Component
      ${'uncontrolled'} | ${UnControlledFreeFormExample}
      ${'controlled'}   | ${ControlledFreeFormExample}
    `('$name - trigger onChange only when value change', ({ Component }) => {
      const { getByRole, getAllByRole } = render(<Component />);

      const input = getByRole('combobox');

      // Call onChange when select an option
      userEvent.click(input);
      userEvent.click(getAllByRole('option')[1]);
      expect(handleTimeSelect).toHaveBeenCalledTimes(1);
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ displayValue: '10:30 AM' }),
      );
      handleTimeSelect.mockClear();

      // Do not call onChange on Enter when the value remains the same
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(handleTimeSelect).toHaveBeenCalledTimes(0);

      // Call onChange on Enter when the value changes
      userEvent.type(input, '111{enter}');
      expect(handleTimeSelect).toHaveBeenCalledTimes(1);
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ displayValue: '10:30 AM111', errorType: 'invalid-input' }),
      );
    });

    it.each`
      name              | Component
      ${'uncontrolled'} | ${UnControlledFreeFormExample}
      ${'controlled'}   | ${ControlledFreeFormExample}
    `('$name - trigger onChange on blur when value change', ({ Component }) => {
      const { getByRole } = render(<Component />);

      const input = getByRole('combobox');
      const expandIcon = getByRole('button');

      // Do not call onChange when clicking dropdown icon
      userEvent.type(input, '111');
      userEvent.click(expandIcon);
      expect(handleTimeSelect).toHaveBeenCalledTimes(0);

      // Call onChange on focus lose
      userEvent.tab();
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ type: 'blur', displayValue: '111' }),
      );
    });
  });

  it('renders default icons', () => {
    const { getByRole, container } = render(<TimePicker clearable defaultValue={dateAnchor} />);

    expect(getByRole('button').querySelector('svg')).not.toBeNull();
    expect(container.querySelector('.fui-TimePicker__clearIcon svg')).not.toBeNull();
  });

  it('supports clearing its value', () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = render(
      <TimePicker clearable clearIcon={{ children: 'CLEAR BUTTON' }} onChange={onChange} />,
    );

    const combobox = getByRole('combobox');
    const clearButton = getByText('CLEAR BUTTON');

    userEvent.type(combobox, '11:{enter}');
    expect(combobox.getAttribute('value')).toBe('11:00 AM');

    userEvent.click(clearButton);
    expect(combobox.getAttribute('value')).toBe('');
    expect(onChange).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({ value: null }));
  });

  it('does not report required-input when focus leaves the input after clearing', () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = render(
      <>
        <TimePicker freeform clearable clearIcon={{ children: 'CLEAR BUTTON' }} onChange={onChange} />
        <button>Next</button>
      </>,
    );

    userEvent.type(getByRole('combobox'), '11:{enter}');
    userEvent.click(getByText('CLEAR BUTTON'));
    expect(onChange).toHaveBeenCalledTimes(2);

    userEvent.tab();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('keeps invalid freeform text when the controlled value is not updated', () => {
    const { getByRole } = render(<TimePicker freeform value={new Date('November 25, 2021 09:00:00')} />);
    const input = getByRole('combobox');

    userEvent.type(input, '{selectall}abc{enter}');
    expect(input).toHaveValue('abc');
  });

  it('reformats valid freeform text on commit', () => {
    const { getByRole } = render(<TimePicker freeform hourCycle="h23" dateAnchor={dateAnchor} />);
    const input = getByRole('combobox');

    userEvent.type(input, '9:05{enter}');
    expect(input).toHaveValue('09:05');
  });

  describe('required', () => {
    // Commits a time, clears the text and moves focus away, which commits the empty text.
    const commitEmpty = (props: Partial<TimePickerProps>, wrapInRequiredField = false) => {
      const onChange = jest.fn();
      const timePicker = <TimePicker freeform hourCycle="h23" dateAnchor={dateAnchor} onChange={onChange} {...props} />;
      const { getByRole } = render(
        <>
          {wrapInRequiredField ? (
            <Field label="Time" required>
              {timePicker}
            </Field>
          ) : (
            timePicker
          )}
          <button>Next</button>
        </>,
      );
      const input = getByRole('combobox');
      userEvent.type(input, '10:10{enter}');
      // Clearing the text reopens the listbox with an active option, which Tab would select; Escape closes it first.
      userEvent.clear(input);
      userEvent.type(input, '{esc}');
      userEvent.tab();
      return onChange;
    };

    it('reports no error for an empty commit when not required', () => {
      const onChange = commitEmpty({});
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ type: 'blur', value: null, errorType: undefined }),
      );
    });

    it('reports required-input for an empty commit when the input is required', () => {
      const onChange = commitEmpty({ required: true });
      expect(onChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: null, errorType: 'required-input' }),
      );
    });

    it('reports required-input for an empty commit when the Field is required', () => {
      const onChange = commitEmpty({}, true);
      expect(onChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: null, errorType: 'required-input' }),
      );
    });
  });

  describe('overnight range', () => {
    it('logs an error when dateAnchor is missing', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      render(<TimePicker startHour={22} endHour={2} />);
      expect(consoleError).toHaveBeenCalledTimes(1);
      consoleError.mockRestore();
    });

    it('does not log when dateAnchor is provided', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      render(<TimePicker startHour={22} endHour={2} dateAnchor={dateAnchor} />);
      expect(consoleError).not.toHaveBeenCalled();
      consoleError.mockRestore();
    });
  });
});

describe('useTimePickerBase_unstable', () => {
  const BaseTimePicker = React.forwardRef<HTMLInputElement, TimePickerBaseProps>((props, ref) => {
    const state = useTimePickerBase_unstable(props, ref);
    const contextValues = useTimePickerContextValues_unstable(state);
    return renderTimePicker_unstable(state, contextValues);
  });

  it('does not return design props', () => {
    let state: ReturnType<typeof useTimePickerBase_unstable> | undefined;
    const Capture = (props: TimePickerBaseProps) => {
      state = useTimePickerBase_unstable(props, null);
      return null;
    };
    render(<Capture />);

    expect(state).toBeDefined();
    expect(state).not.toHaveProperty('appearance');
    expect(state).not.toHaveProperty('size');
  });

  it('renders without default icons, styles or Tabster attributes', () => {
    const { getByRole } = render(<BaseTimePicker dateAnchor={dateAnchor} startHour={8} endHour={9} />);

    const input = getByRole('combobox');
    expect(input.className).toBe('');
    expect(input.hasAttribute('data-tabster')).toBe(false);
    expect(getByRole('button').querySelector('svg')).toBeNull();

    userEvent.click(input);
    expect(getByRole('listbox').children.length).toBe(2);
  });
});
