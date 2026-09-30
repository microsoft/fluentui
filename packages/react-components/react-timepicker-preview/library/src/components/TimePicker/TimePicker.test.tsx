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
      const [selectedTime, setSelectedTime] = React.useState<Date | null>(dateAnchor);
      const onSelectedTimeChange: TimePickerProps['onSelectedTimeChange'] = (_e, data) =>
        setSelectedTime(data.selectedTime);
      return (
        <TimePicker
          dateAnchor={dateAnchor}
          increment={60}
          selectedTime={selectedTime}
          onSelectedTimeChange={onSelectedTimeChange}
        />
      );
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

  it('calls onSelectedTimeChange with event data when an option is clicked', () => {
    const onSelectedTimeChange = jest.fn();
    const { getByRole, getAllByRole } = render(
      <TimePicker dateAnchor={dateAnchor} startHour={8} endHour={9} onSelectedTimeChange={onSelectedTimeChange} />,
    );

    userEvent.click(getByRole('combobox'));
    userEvent.click(getAllByRole('option')[1]);

    expect(onSelectedTimeChange).toHaveBeenCalledTimes(1);
    const [, data] = onSelectedTimeChange.mock.calls[0];
    expect(data).toEqual(expect.objectContaining({ type: 'click', selectedTimeText: '8:30 AM', errorType: undefined }));
    expect(data.selectedTime).toEqual(new Date('November 25, 2021 08:30:00'));
  });

  it('supports defaultSelectedTime', () => {
    const { getByRole } = render(
      <TimePicker dateAnchor={dateAnchor} defaultSelectedTime={new Date('November 25, 2021 09:00:00')} />,
    );

    userEvent.click(getByRole('combobox'));
    expect(getByRole('option', { selected: true }).textContent).toBe('9:00 AM');
  });

  describe('freeform', () => {
    const handleTimeSelect = jest.fn();

    const ControlledFreeFormExample = () => {
      const [selectedTime, setSelectedTime] = React.useState<Date | null>(dateAnchor);
      const onSelectedTimeChange: TimePickerProps['onSelectedTimeChange'] = (e, data) => {
        handleTimeSelect(e, data);
        setSelectedTime(data.selectedTime);
      };
      return (
        <TimePicker
          freeform
          dateAnchor={dateAnchor}
          startHour={10}
          selectedTime={selectedTime}
          onSelectedTimeChange={onSelectedTimeChange}
        />
      );
    };

    const UnControlledFreeFormExample = () => (
      <TimePicker freeform dateAnchor={dateAnchor} onSelectedTimeChange={handleTimeSelect} startHour={10} />
    );

    beforeEach(() => {
      handleTimeSelect.mockClear();
    });

    it.each`
      name              | Component
      ${'uncontrolled'} | ${UnControlledFreeFormExample}
      ${'controlled'}   | ${ControlledFreeFormExample}
    `(
      '$name - when input value is not prefix of any option, submit the value as selectedTime on Enter',
      ({ Component }) => {
        const { getByRole } = render(<Component />);
        const input = getByRole('combobox');
        userEvent.type(input, '111{enter}');
        expect(handleTimeSelect).toHaveBeenCalledTimes(1);
        expect(handleTimeSelect).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            type: 'keydown',
            event: expect.anything(),
            selectedTime: null,
            selectedTimeText: '111',
            errorType: 'invalid-input',
          }),
        );
      },
    );

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
        expect.objectContaining({ selectedTimeText: '11:00 AM', errorType: undefined }),
      );
    });

    it.each`
      name              | Component
      ${'uncontrolled'} | ${UnControlledFreeFormExample}
      ${'controlled'}   | ${ControlledFreeFormExample}
    `('$name - trigger onSelectedTimeChange only when value change', ({ Component }) => {
      const { getByRole, getAllByRole } = render(<Component />);

      const input = getByRole('combobox');

      // Call onSelectedTimeChange when select an option
      userEvent.click(input);
      userEvent.click(getAllByRole('option')[1]);
      expect(handleTimeSelect).toHaveBeenCalledTimes(1);
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ selectedTimeText: '10:30 AM' }),
      );
      handleTimeSelect.mockClear();

      // Do not call onSelectedTimeChange on Enter when the value remains the same
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(handleTimeSelect).toHaveBeenCalledTimes(0);

      // Call onSelectedTimeChange on Enter when the value changes
      userEvent.type(input, '111{enter}');
      expect(handleTimeSelect).toHaveBeenCalledTimes(1);
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ selectedTimeText: '10:30 AM111', errorType: 'invalid-input' }),
      );
    });

    it.each`
      name              | Component
      ${'uncontrolled'} | ${UnControlledFreeFormExample}
      ${'controlled'}   | ${ControlledFreeFormExample}
    `('$name - trigger onSelectedTimeChange on blur when value change', ({ Component }) => {
      const { getByRole } = render(<Component />);

      const input = getByRole('combobox');
      const expandIcon = getByRole('button');

      // Do not call onSelectedTimeChange when clicking dropdown icon
      userEvent.type(input, '111');
      userEvent.click(expandIcon);
      expect(handleTimeSelect).toHaveBeenCalledTimes(0);

      // Call onSelectedTimeChange on focus lose
      userEvent.tab();
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ type: 'blur', selectedTimeText: '111' }),
      );
    });
  });

  it('renders default icons', () => {
    const { getByRole, container } = render(<TimePicker clearable defaultSelectedTime={dateAnchor} />);

    expect(getByRole('button').querySelector('svg')).not.toBeNull();
    expect(container.querySelector('.fui-TimePicker__clearIcon svg')).not.toBeNull();
  });

  it('supports clearing its value', () => {
    const onSelectedTimeChange = jest.fn();
    const { getByRole, getByText } = render(
      <TimePicker clearable clearIcon={{ children: 'CLEAR BUTTON' }} onSelectedTimeChange={onSelectedTimeChange} />,
    );

    const combobox = getByRole('combobox');
    const clearButton = getByText('CLEAR BUTTON');

    userEvent.type(combobox, '11:{enter}');
    expect(combobox.getAttribute('value')).toBe('11:00 AM');

    userEvent.click(clearButton);
    expect(combobox.getAttribute('value')).toBe('');
    expect(onSelectedTimeChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedTime: null }),
    );
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
