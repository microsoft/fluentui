import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
import { Field } from '../Field';
import { TimePicker } from './TimePicker';
import type { TimePickerProps } from './TimePicker.types';

const dateAnchor = new Date('November 25, 2021 01:00:00');

/**
 * Moves focus out of the TimePicker, including its optional Clear button.
 */
const leaveTimePicker = () => {
  userEvent.tab();
  if (document.activeElement?.parentElement?.querySelector(':scope > [role="combobox"]')) {
    userEvent.tab();
  }
};

describe('TimePicker', () => {
  describe('Flex interaction contract', () => {
    it('accepts off-step custom times by default and filters suggestions while typing', async () => {
      const onChange = jest.fn();
      const { getByRole, getAllByRole, queryByRole } = render(
        <TimePicker
          aria-label="Time"
          dateAnchor={dateAnchor}
          hourCycle="h23"
          startHour={9}
          endHour={12}
          onChange={onChange}
        />,
      );
      const input = getByRole('combobox');
      userEvent.type(input, '10:');
      expect(getAllByRole('option').map(option => option.textContent)).toEqual(['10:00', '10:30']);
      expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toHaveTextContent('10:00');
      userEvent.type(input, '17{enter}');
      expect(input).toHaveValue('10:17');
      expect(onChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: new Date(2021, 10, 25, 10, 17), errorType: undefined }),
      );
      await waitFor(() => expect(queryByRole('listbox')).not.toBeInTheDocument());
    });

    it('opens with Alt+Down without activation and closes with Alt+Up without committing pending text', () => {
      const onChange = jest.fn();
      const { getByRole } = render(
        <TimePicker aria-label="Time" dateAnchor={dateAnchor} defaultValue={dateAnchor} onChange={onChange} />,
      );
      const input = getByRole('combobox');
      fireEvent.keyDown(input, { key: 'ArrowDown', altKey: true });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(input).not.toHaveAttribute('aria-activedescendant');
      fireEvent.change(input, { target: { value: '10:17 AM' } });
      fireEvent.keyDown(input, { key: 'ArrowUp', altKey: true });
      expect(input).toHaveValue('10:17 AM');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('restores the last accepted value after an invalid edit is canceled', () => {
      const onChange = jest.fn();
      const { getByRole } = render(
        <TimePicker aria-label="Time" dateAnchor={dateAnchor} defaultValue={dateAnchor} onChange={onChange} />,
      );
      const input = getByRole('combobox');
      userEvent.type(input, '{selectall}invalid{enter}');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      userEvent.keyboard('{esc}');
      expect(input).toHaveValue('1:00 AM');
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('preserves the accepted value when required-empty text is canceled', () => {
      const { getByRole } = render(
        <TimePicker aria-label="Time" required dateAnchor={dateAnchor} defaultValue={dateAnchor} />,
      );
      const input = getByRole('combobox');
      userEvent.type(input, '{selectall}{backspace}{enter}');
      expect(input).toHaveValue('');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      userEvent.keyboard('{esc}');
      expect(input).toHaveValue('1:00 AM');
      expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('preserves native Home/End caret behavior and never commits an active suggestion on Tab', async () => {
      const onChange = jest.fn();
      const { getByRole } = render(
        <>
          <TimePicker aria-label="Time" dateAnchor={dateAnchor} hourCycle="h23" onChange={onChange} />
          <button>Next</button>
        </>,
      );
      const input = getByRole('combobox');
      userEvent.type(input, '10:');
      expect(fireEvent.keyDown(input, { key: 'Home' })).toBe(true);
      expect(fireEvent.keyDown(input, { key: 'End' })).toBe(true);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      userEvent.tab();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ errorType: 'invalid-input', displayValue: '10:' }),
      );
      await waitFor(() => expect(getByRole('button', { name: 'Next' })).toHaveFocus());
    });

    it('uses a native tabbable Clear button and does not validate when focus moves to it', () => {
      const onChange = jest.fn();
      const { getByRole, queryByRole } = render(
        <TimePicker
          aria-label="Time"
          dateAnchor={dateAnchor}
          clearable
          defaultValue={dateAnchor}
          onChange={onChange}
        />,
      );
      const input = getByRole('combobox');
      userEvent.type(input, '{selectall}10:17 AM');
      userEvent.tab();
      const clear = getByRole('button', { name: 'Clear' });
      expect(clear.tagName).toBe('BUTTON');
      expect(clear).toHaveFocus();
      expect(onChange).not.toHaveBeenCalled();
      expect(queryByRole('button', { name: 'Open Time' })).not.toBeInTheDocument();
      userEvent.keyboard('{enter}');
      expect(input).toHaveFocus();
      expect(input).toHaveValue('');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
      expect(getByRole('button', { name: 'Open Time' })).toHaveAttribute('tabindex', '-1');
    });

    it('opens on ArrowUp at the last suggestion and does not wrap at either boundary', () => {
      const { getByRole } = render(
        <TimePicker aria-label="Time" dateAnchor={dateAnchor} hourCycle="h23" startHour={9} endHour={10} />,
      );
      const input = getByRole('combobox');
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toHaveTextContent('09:30');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toHaveTextContent('09:30');
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toHaveTextContent('09:00');
    });
  });

  // mock the locale so options are formatted the same regardless of the test runner's locale
  const { DateTimeFormat } = Intl;
  beforeAll(() => {
    jest
      .spyOn(Intl, 'DateTimeFormat')
      .mockImplementation((locales, options) => new DateTimeFormat(locales ?? 'en-US', options));
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  isConformant({
    Component: TimePicker,
    displayName: 'TimePicker',
    primarySlot: 'input',
    requiredProps: {
      'aria-label': 'Time',
      open: true,
      dateAnchor,
      startHour: 8,
      endHour: 9,
    },
  });

  it('renders generated options without styles or icons', () => {
    const { getByRole, getAllByRole } = render(
      <TimePicker aria-label="Time" dateAnchor={dateAnchor} startHour={8} endHour={9} />,
    );

    const input = getByRole('combobox');
    expect(input.className).toBe('');

    userEvent.click(input);
    const options = getAllByRole('option');
    expect(options.map(option => option.textContent)).toEqual(['8:00 AM', '8:30 AM']);
    expect(document.querySelector('svg')).toBeNull();
  });

  it('renders the listbox inside the root', () => {
    const { container, getByRole } = render(<TimePicker aria-label="Time" open dateAnchor={dateAnchor} />);

    expect(container.firstElementChild).toContainElement(getByRole('listbox'));
  });

  it('marks the selected option', () => {
    const { getByRole, getAllByRole } = render(
      <TimePicker
        aria-label="Time"
        dateAnchor={dateAnchor}
        startHour={8}
        endHour={10}
        defaultValue={new Date('November 25, 2021 09:00:00')}
      />,
    );

    userEvent.click(getByRole('combobox'));
    const options = getAllByRole('option');
    expect(options[2]).toHaveAttribute('data-selected');
    expect(options[0]).not.toHaveAttribute('data-selected');
  });

  it('calls onChange when an option is clicked', () => {
    const onChange = jest.fn();
    const { getByRole, getAllByRole } = render(
      <TimePicker aria-label="Time" dateAnchor={dateAnchor} startHour={8} endHour={9} onChange={onChange} />,
    );

    userEvent.click(getByRole('combobox'));
    userEvent.click(getAllByRole('option')[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    const [, data] = onChange.mock.calls[0];
    expect(data).toEqual(expect.objectContaining({ type: 'click', displayValue: '8:30 AM', errorType: undefined }));
    expect(data.value).toEqual(new Date('November 25, 2021 08:30:00'));
    expect(getByRole('combobox')).toHaveValue('8:30 AM');
  });

  it('in freeform mode, commits the typed text on Enter', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <TimePicker aria-label="Time" freeform dateAnchor={dateAnchor} startHour={10} onChange={onChange} />,
    );

    userEvent.type(getByRole('combobox'), '111{enter}');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'keydown',
        value: null,
        displayValue: '111',
        errorType: 'invalid-input',
      }),
    );

    // Pressing Enter again without changing the value does not commit it again
    fireEvent.keyDown(getByRole('combobox'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('in freeform mode, commits the typed text on blur', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <>
        <TimePicker aria-label="Time" freeform hourCycle="h23" dateAnchor={dateAnchor} onChange={onChange} />
        <button>Next</button>
      </>,
    );

    userEvent.type(getByRole('combobox'), '9:15');
    userEvent.tab();

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ type: 'blur', displayValue: '09:15', errorType: undefined }),
    );
  });

  it('clears the selected time', () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = render(
      <TimePicker
        aria-label="Time"
        clearable
        clearIcon={{ children: 'Clear' }}
        dateAnchor={dateAnchor}
        onChange={onChange}
      />,
    );

    userEvent.type(getByRole('combobox'), '1:{enter}');
    expect(getByRole('combobox')).toHaveValue('1:00 AM');
    userEvent.click(getByText('Clear'));

    expect(getByRole('combobox')).toHaveValue('');
    expect(onChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ value: null }));
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
    expect(getAllByRole('option')[1].getAttribute('aria-selected')).toBe('true');

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

  it.each([
    ['value', { value: new Date('nope') }],
    ['defaultValue', { defaultValue: new Date('nope') }],
  ])('shows an empty input for an invalid %s', (_, props) => {
    const { getByRole } = render(<TimePicker aria-label="Time" {...props} />);
    expect(getByRole('combobox')).toHaveValue('');
  });

  it('moves the options to the day of a controlled value without dateAnchor', () => {
    const onChange = jest.fn();
    const { getByRole, rerender } = render(
      <TimePicker aria-label="Time" value={new Date('November 25, 2021 09:00:00')} onChange={onChange} />,
    );
    rerender(<TimePicker aria-label="Time" value={new Date('November 27, 2021 09:00:00')} onChange={onChange} />);

    userEvent.click(getByRole('combobox'));
    expect(getByRole('option', { selected: true }).textContent).toBe('9:00 AM');

    userEvent.click(getByRole('option', { name: '10:00 AM' }));
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ value: new Date('November 27, 2021 10:00:00') }),
    );
  });

  it.each([
    ['typed text', (input: HTMLElement) => userEvent.type(input, '{selectall}11:15{enter}'), '11:15'],
    [
      'an option',
      (input: HTMLElement) => {
        userEvent.type(input, '{selectall}12:');
        userEvent.click(screen.getByRole('option', { name: '12:00' }));
      },
      '12:00',
    ],
  ])('keeps the day after an out-of-bounds commit is corrected with %s', (_, correct, time) => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <TimePicker
        aria-label="Time"
        freeform
        hourCycle="h23"
        startHour={10}
        endHour={20}
        defaultValue={new Date('November 16, 2026 11:00:00')}
        onChange={onChange}
      />,
    );
    const input = getByRole('combobox');
    userEvent.type(input, '{selectall}09:15{enter}');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ errorType: 'out-of-bounds' }),
    );

    userEvent.click(input);
    correct(input);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ value: new Date(`November 16, 2026 ${time}:00`), errorType: undefined }),
    );
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

      userEvent.click(input);
      userEvent.click(getAllByRole('option')[1]);
      expect(handleTimeSelect).toHaveBeenCalledTimes(1);
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ displayValue: '10:30 AM' }),
      );
      handleTimeSelect.mockClear();

      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(handleTimeSelect).toHaveBeenCalledTimes(0);

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

      userEvent.type(input, '111');
      userEvent.click(expandIcon);
      expect(handleTimeSelect).toHaveBeenCalledTimes(0);

      leaveTimePicker();
      expect(handleTimeSelect).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ type: 'blur', displayValue: '111' }),
      );
    });
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

    leaveTimePicker();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('keeps invalid freeform text when the controlled value is not updated', () => {
    const { getByRole } = render(<TimePicker freeform value={new Date('November 25, 2021 09:00:00')} />);
    const input = getByRole('combobox');

    userEvent.type(input, '{selectall}abc{enter}');
    expect(input).toHaveValue('abc');
  });

  it('reformats valid freeform text on commit and reports the formatted text', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <>
        <TimePicker freeform hourCycle="h23" dateAnchor={dateAnchor} onChange={onChange} />
        <button>Next</button>
      </>,
    );
    const input = getByRole('combobox');

    userEvent.type(input, '9:05{enter}');
    expect(input).toHaveValue('09:05');
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ type: 'keydown', displayValue: '09:05', errorType: undefined }),
    );

    leaveTimePicker();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  describe('commits only changed text', () => {
    const defaultValue = new Date('November 25, 2021 10:00:00');
    const renderFreeform = (props: Partial<TimePickerProps> = {}) => {
      const onChange = jest.fn();
      const result = render(
        <>
          <TimePicker freeform dateAnchor={dateAnchor} onChange={onChange} {...props} />
          <button>Next</button>
        </>,
      );
      return { ...result, onChange, input: result.getByRole('combobox') };
    };

    it('skips the chevron and commits when focus leaves the TimePicker', () => {
      const { input, onChange, getByRole } = renderFreeform();
      userEvent.type(input, '111');
      userEvent.tab();
      expect(getByRole('button', { name: 'Open' })).toHaveAttribute('tabindex', '-1');
      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ type: 'blur', displayValue: '111', errorType: 'invalid-input' }),
      );
    });

    it('does not commit when focus leaves without typing', () => {
      const { input, onChange } = renderFreeform({ defaultValue });
      userEvent.click(input);
      userEvent.type(input, '{esc}');
      leaveTimePicker();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not commit after the controlled value changes', () => {
      const { input, onChange, rerender } = renderFreeform({ value: defaultValue });
      rerender(
        <>
          <TimePicker freeform dateAnchor={dateAnchor} onChange={onChange} value={dateAnchor} />
          <button>Next</button>
        </>,
      );
      expect(input).toHaveValue('1:00 AM');
      userEvent.click(input);
      userEvent.type(input, '{esc}');
      leaveTimePicker();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('commits the empty text when the initial value is deleted', () => {
      const { input, onChange } = renderFreeform({ defaultValue });
      userEvent.clear(input);
      leaveTimePicker();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ type: 'blur', value: null, displayValue: '', errorType: undefined }),
      );
    });

    it('reports whitespace-only text as an empty commit', () => {
      const { input, onChange } = renderFreeform({ required: true });
      input.focus();
      fireEvent.change(input, { target: { value: '  ' } });
      leaveTimePicker();
      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ value: null, displayValue: '', errorType: 'required-input' }),
      );
    });
  });

  it('does not report a change when the selected option is selected again', () => {
    const onChange = jest.fn();
    const { getByRole, getAllByRole } = render(
      <>
        <TimePicker dateAnchor={dateAnchor} startHour={10} endHour={12} onChange={onChange} />
        <button>Next</button>
      </>,
    );
    const input = getByRole('combobox');
    userEvent.click(input);
    userEvent.click(getAllByRole('option')[1]);
    expect(onChange).toHaveBeenCalledTimes(1);

    userEvent.click(input);
    leaveTimePicker();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not change the value while typing without freeform', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <TimePicker dateAnchor={dateAnchor} defaultValue={new Date('November 25, 2021 10:00:00')} onChange={onChange} />,
    );
    userEvent.type(getByRole('combobox'), 'x');
    expect(onChange).not.toHaveBeenCalled();
  });

  describe('required', () => {
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
      userEvent.clear(input);
      leaveTimePicker();
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

    it('reports required-input when the input is required inside a Field that is not', () => {
      const onChange = jest.fn();
      const { getByRole } = render(
        <>
          <Field label="Time" required={false}>
            <TimePicker freeform required hourCycle="h23" dateAnchor={dateAnchor} onChange={onChange} />
          </Field>
          <button>Next</button>
        </>,
      );
      const input = getByRole('combobox');
      userEvent.type(input, '10:10{enter}');
      userEvent.clear(input);
      leaveTimePicker();
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

  describe('data attributes', () => {
    const getRoot = (container: HTMLElement) => container.firstElementChild as HTMLElement;

    it('sets data-freeform only in freeform mode', () => {
      const { container, rerender } = render(<TimePicker aria-label="Time" freeform={false} />);
      expect(getRoot(container)).not.toHaveAttribute('data-freeform');

      rerender(<TimePicker aria-label="Time" freeform />);
      expect(getRoot(container)).toHaveAttribute('data-freeform', '');
    });

    it('does not let consumers override state attributes', () => {
      const { container } = render(
        <TimePicker
          aria-label="Time"
          freeform={false}
          root={{ 'data-freeform': 'custom' } as React.HTMLAttributes<HTMLDivElement>}
        />,
      );
      expect(getRoot(container)).not.toHaveAttribute('data-freeform');
    });
  });

  describe('typed and committed text', () => {
    const nine = new Date('November 25, 2021 09:00:00');
    const ten = new Date('November 25, 2021 10:00:00');
    const renderTimePicker = (props: Partial<TimePickerProps> = {}) => {
      const onChange = jest.fn();
      const ui = (extra: Partial<TimePickerProps> = {}) => (
        <>
          <TimePicker aria-label="Time" freeform dateAnchor={dateAnchor} onChange={onChange} {...props} {...extra} />
          <button>Next</button>
        </>
      );
      const result = render(ui());
      return {
        ...result,
        onChange,
        input: result.getByRole('combobox'),
        rerenderWith: (extra: Partial<TimePickerProps>) => result.rerender(ui(extra)),
      };
    };

    it('does not select an option for committed unmatched text after reopening the listbox', () => {
      const { input, onChange } = renderTimePicker();
      userEvent.type(input, '111{enter}');
      expect(onChange).toHaveBeenCalledTimes(1);

      userEvent.click(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(input).not.toHaveAttribute('aria-activedescendant');
      leaveTimePicker();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(input).toHaveValue('111');
    });

    it('does not activate an unrelated option after typing unmatched text', () => {
      const { input } = renderTimePicker();
      userEvent.type(input, 'abc');
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(input).not.toHaveAttribute('aria-activedescendant');

      userEvent.keyboard('{arrowdown}');
      const activeId = input.getAttribute('aria-activedescendant');
      expect(activeId).toBeNull();
    });

    it('discards typed text when the controlled value changes away and back', () => {
      const { input, rerenderWith } = renderTimePicker({ value: nine });
      userEvent.clear(input);
      userEvent.type(input, 'abc');
      rerenderWith({ value: ten });
      expect(input).toHaveValue('10:00 AM');
      rerenderWith({ value: nine });
      expect(input).toHaveValue('9:00 AM');
    });

    it('does not report a failed commit again when the controlled value is kept', () => {
      const { input, onChange } = renderTimePicker({ value: nine });
      userEvent.clear(input);
      userEvent.type(input, 'abc');
      leaveTimePicker();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: null, displayValue: 'abc', errorType: 'invalid-input' }),
      );

      userEvent.click(input);
      leaveTimePicker();
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('shows the controlled value again after an accepted failed commit is reset', () => {
      const { input, onChange, rerenderWith } = renderTimePicker({ value: nine });
      userEvent.clear(input);
      userEvent.type(input, 'abc');
      leaveTimePicker();
      expect(onChange).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({ value: null }));

      rerenderWith({ value: null });
      expect(input).toHaveValue('abc');
      rerenderWith({ value: nine });
      expect(input).toHaveValue('9:00 AM');
    });

    it('does not report a change again when the controlled parent rejects it', () => {
      const { input, onChange } = renderTimePicker({ value: nine });
      userEvent.clear(input);
      userEvent.type(input, '9:15 AM{enter}');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(input).toHaveValue('9:00 AM');

      leaveTimePicker();
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('commits an empty value instead of an option after the text is deleted', () => {
      const { input, onChange } = renderTimePicker({ defaultValue: nine });
      userEvent.click(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
      userEvent.clear(input);
      expect(input).not.toHaveAttribute('aria-activedescendant');

      userEvent.keyboard('{enter}');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ value: null, displayValue: '' }),
      );
      expect(input).toHaveValue('');
    });

    it('does not activate an option after typed text is deleted', () => {
      const { input, onChange } = renderTimePicker();
      userEvent.type(input, '1{backspace}');
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(input).not.toHaveAttribute('aria-activedescendant');

      userEvent.keyboard('{enter}');
      expect(onChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
    });

    it('restores the committed value when Escape cancels a pending clear', () => {
      const { input, onChange } = renderTimePicker({ defaultValue: nine });
      userEvent.click(input);
      userEvent.clear(input);
      userEvent.keyboard('{esc}');
      expect(input).toHaveAttribute('aria-expanded', 'false');

      userEvent.click(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(input).toHaveValue('9:00 AM');

      userEvent.keyboard('{enter}');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not commit on Enter while an IME composition is active', () => {
      const { input, onChange } = renderTimePicker();
      userEvent.type(input, 'abc');
      fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not select the active option on Enter while an IME composition is active', () => {
      const { input, onChange } = renderTimePicker();
      userEvent.type(input, '11');
      expect(input).toHaveAttribute('aria-activedescendant');

      fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
      expect(onChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('11');
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not commit on Enter from the expand icon', () => {
      const { input, getByRole, onChange } = renderTimePicker();
      userEvent.type(input, 'abc');
      fireEvent.keyDown(getByRole('button', { name: 'Open Time' }), { key: 'Enter' });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not report a change again after the format changes', () => {
      const { input, onChange, rerenderWith } = renderTimePicker({ hourCycle: 'h12' });
      userEvent.type(input, '10:15 AM{enter}');
      expect(onChange).toHaveBeenCalledTimes(1);

      rerenderWith({ hourCycle: 'h23' });
      expect(input).toHaveValue('10:15');
      leaveTimePicker();
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('keeps typing working when the input slot has its own onChange', () => {
      const onInputChange = jest.fn();
      const { input, onChange } = renderTimePicker({ input: { onChange: onInputChange } });
      userEvent.type(input, 'abc');
      expect(input).toHaveValue('abc');
      expect(onInputChange).toHaveBeenCalled();

      leaveTimePicker();
      expect(onChange).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({ displayValue: 'abc' }));
    });

    it('shows the clear icon for a value that is not an option', () => {
      const { container } = renderTimePicker({ clearable: true, defaultValue: new Date('November 25, 2021 09:15:00') });
      expect(container.firstElementChild).toHaveAttribute('data-clearable', '');
    });
  });
});
