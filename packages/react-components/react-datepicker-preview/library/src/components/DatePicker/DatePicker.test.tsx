import * as React from 'react';
import { act, fireEvent, render, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Field } from '@fluentui/react-field';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { DatePicker } from './DatePicker';
import { datePickerClassNames } from './useDatePickerStyles.styles';
import type { DatePickerProps } from './DatePicker.types';
import * as publicApi from '../../index';

const today = new Date(2030, 0, 15);
const selectedDate = new Date(2030, 0, 20);
expect.extend(toHaveNoViolations);

describe('DatePicker', () => {
  beforeEach(() => resetIdsForTests());

  it('exports the component, reusable hooks, renderer, classes, and default error messages', () => {
    expect(publicApi.DatePicker).toBe(DatePicker);
    expect(publicApi.datePickerClassNames).toBe(datePickerClassNames);
    expect(publicApi.useDatePickerBase_unstable).toBeInstanceOf(Function);
    expect(publicApi.useDatePicker_unstable).toBeInstanceOf(Function);
    expect(publicApi.useDatePickerStyles_unstable).toBeInstanceOf(Function);
    expect(publicApi.renderDatePicker_unstable).toBeInstanceOf(Function);
    expect(publicApi.defaultDatePickerErrorStrings).toEqual({
      'invalid-input': 'Invalid date format',
      'out-of-bounds': 'Date is out of bounds',
      'required-input': 'Field is required',
    });
  });

  isConformant({
    Component: DatePicker,
    displayName: 'DatePicker',
    disabledTests: ['component-has-root-ref'],
    testOptions: {
      'has-static-classnames': [
        {
          props: { defaultOpen: true, today },
          expectedClassNames: datePickerClassNames,
          getPortalElement: result => result.baseElement.querySelector('[role="dialog"]')!,
        },
      ],
    },
  });

  it('renders an empty, enabled, selection-only combobox', () => {
    const result = render(<DatePicker today={today} id="date-input" contentAfter={{ id: 'date-icon' }} />);
    const input = result.getByRole('combobox');
    expect(input.getAttribute('readonly')).not.toBeNull();
    expect(input.getAttribute('disabled')).toBeNull();
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(input.getAttribute('aria-controls')).toBeNull();
    expect(input.getAttribute('aria-haspopup')).toBe('dialog');
    expect(result.queryByRole('dialog')).toBeNull();
    expect(result.container).toMatchSnapshot();
  });

  it.each([false, true])('has no automated accessibility violations when open=%s', open => {
    const result = render(
      <FluentProvider theme={webLightTheme}>
        <main>
          <Field label="Appointment">
            <DatePicker today={today} open={open} />
          </Field>
        </main>
      </FluentProvider>,
    );
    return expect(axe(result.baseElement)).resolves.toHaveNoViolations();
  });

  it('forwards the input ref and merges wrapper, Calendar, and picker refs', () => {
    const ref = React.createRef<HTMLInputElement>();
    const rootRef = React.createRef<HTMLSpanElement>();
    const calendarRef = jest.fn();
    const dayRef = jest.fn();
    const result = render(
      <DatePicker ref={ref} root={{ ref: rootRef }} calendar={{ ref: calendarRef, dayPicker: { ref: dayRef } }} />,
    );
    expect(ref.current).toBe(result.getByRole('combobox'));
    expect(rootRef.current).toBe(ref.current?.parentElement);
    fireEvent.click(result.getByRole('combobox'));
    expect(calendarRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    expect(dayRef).toHaveBeenCalledWith(expect.objectContaining({ focus: expect.any(Function) }));
  });

  it('routes native input props and inherits Field metadata and required state', () => {
    const result = render(
      <Field label="Start date" required validationMessage="Choose a date">
        <DatePicker name="start" required={false} placeholder="Select a date" />
      </Field>,
    );
    const input = result.getByRole('combobox', { name: 'Start date' });
    expect(input.getAttribute('name')).toBe('start');
    expect(input.getAttribute('placeholder')).toBe('Select a date');
    expect(input.getAttribute('required')).not.toBeNull();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('does not open on focus by default', () => {
    const result = render(<DatePicker />);
    fireEvent.focus(result.getByRole('combobox'));
    expect(result.queryByRole('dialog')).toBeNull();
  });

  it.each(['Enter', 'ArrowDown'])('opens from %s and focuses Calendar', key => {
    const onOpenChange = jest.fn();
    const result = render(<DatePicker today={today} onOpenChange={onOpenChange} />);
    const input = result.getByRole('combobox');
    fireEvent.keyDown(input, { key });
    const dialog = result.getByRole('dialog', { name: 'Calendar' });
    expect(input.getAttribute('aria-controls')).toBe(dialog.id);
    expect(dialog.contains(dialog.ownerDocument.activeElement)).toBe(true);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ type: 'keydown', open: true, reason: 'keyboard' }),
    );
  });

  it('opens from the icon independently of openOnClick', () => {
    const result = render(<DatePicker openOnClick={false} contentAfter="Pick" />);
    fireEvent.click(result.getByRole('combobox'));
    expect(result.queryByRole('dialog')).toBeNull();
    fireEvent.click(result.getByRole('button', { name: 'Open calendar' }));
    expect(result.getByRole('dialog')).toBeTruthy();
  });

  it('leaves an open selection-only popup open on repeated activation', () => {
    const onOpenChange = jest.fn();
    const result = render(<DatePicker onOpenChange={onOpenChange} />);
    fireEvent.click(result.getByRole('combobox'));
    fireEvent.click(result.getByRole('combobox'));
    fireEvent.click(result.getByRole('button', { name: 'Open calendar' }));
    expect(result.getByRole('dialog')).toBeTruthy();
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it('dismisses an editable popup on repeated trigger activation', () => {
    const result = render(<DatePicker allowTextInput defaultOpen />);
    fireEvent.click(result.getByRole('combobox'));
    expect(result.queryByRole('dialog')).toBeNull();
  });

  it('does not reopen on focus restoration after Escape', () => {
    const onOpenChange = jest.fn();
    const result = render(<DatePicker today={today} openOnFocus onOpenChange={onOpenChange} />);
    act(() => result.getByRole('combobox').focus());
    fireEvent.keyDown(result.getByRole('dialog').ownerDocument.activeElement!, { key: 'Escape' });
    expect(result.queryByRole('dialog')).toBeNull();
    expect(result.getByRole('combobox').ownerDocument.activeElement).toBe(result.getByRole('combobox'));
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  it('leaves closed Escape available to surrounding controls', () => {
    const onKeyDown = jest.fn();
    const result = render(
      <div onKeyDown={onKeyDown}>
        <DatePicker />
      </div>,
    );
    fireEvent.keyDown(result.getByRole('combobox'), { key: 'Escape' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].defaultPrevented).toBe(false);
  });

  it.each(['onClick', 'onKeyDown', 'onFocus'] as const)('honors canceled input %s', handler => {
    const result = render(
      <DatePicker openOnFocus {...{ [handler]: (event: React.SyntheticEvent) => event.preventDefault() }} />,
    );
    const input = result.getByRole('combobox');
    if (handler === 'onClick') {
      fireEvent.click(input);
    } else if (handler === 'onKeyDown') {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    } else {
      fireEvent.focus(input);
    }
    expect(result.queryByRole('dialog')).toBeNull();
  });

  it('honors canceled icon activation', () => {
    const result = render(<DatePicker contentAfter={{ onClick: event => event.preventDefault() }} />);
    fireEvent.click(result.getByRole('button', { name: 'Open calendar' }));
    expect(result.queryByRole('dialog')).toBeNull();
  });

  it('commits Calendar selection once and restores input focus', () => {
    const onDateChange = jest.fn();
    const onOpenChange = jest.fn();
    const onValidationResult = jest.fn();
    const result = render(
      <DatePicker
        today={today}
        defaultOpen
        onDateChange={onDateChange}
        onOpenChange={onOpenChange}
        onValidationResult={onValidationResult}
      />,
    );
    fireEvent.click(result.getByRole('button', { name: 'January 20, 2030' }));
    expect(result.queryByRole('dialog')).toBeNull();
    expect((result.getByRole('combobox') as HTMLInputElement).value).toBe(selectedDate.toDateString());
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        value: selectedDate,
        reason: 'calendar',
        selectedDateRange: [selectedDate],
      }),
    );
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onValidationResult).toHaveBeenCalledTimes(1);
    expect(result.getByRole('combobox').ownerDocument.activeElement).toBe(result.getByRole('combobox'));
  });

  it('allows Calendar selection cancellation before committing or closing', () => {
    const onDateChange = jest.fn();
    const result = render(
      <DatePicker
        today={today}
        defaultOpen
        onDateChange={onDateChange}
        calendar={{ onSelectDate: event => event.preventDefault() }}
      />,
    );
    fireEvent.click(result.getByRole('button', { name: 'January 20, 2030' }));
    expect(result.getByRole('dialog')).toBeTruthy();
    expect(onDateChange).not.toHaveBeenCalled();
  });

  it.each(['week', 'workWeek', 'month'] as const)('forwards Calendar %s selection ranges', dateRangeType => {
    const onDateChange = jest.fn();
    const onSelectDate = jest.fn();
    const result = render(
      <DatePicker defaultOpen today={today} onDateChange={onDateChange} calendar={{ dateRangeType, onSelectDate }} />,
    );
    fireEvent.click(result.getByRole('button', { name: 'January 20, 2030' }));
    expect(onDateChange.mock.calls[0][1].selectedDateRange).toEqual(onSelectDate.mock.calls[0][1].selectedDateRange);
    expect(onDateChange.mock.calls[0][1].selectedDateRange.length).toBeGreaterThan(1);
  });

  it('keeps controlled selection and visibility unchanged when requests are rejected', () => {
    const onDateChange = jest.fn();
    const onOpenChange = jest.fn();
    const result = render(
      <DatePicker today={today} value={null} open onDateChange={onDateChange} onOpenChange={onOpenChange} />,
    );
    fireEvent.click(result.getByRole('button', { name: 'January 20, 2030' }));
    expect(result.getByRole('dialog')).toBeTruthy();
    expect((result.getByRole('combobox') as HTMLInputElement).value).toBe('');
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it('updates from external value changes without emitting requests', () => {
    const onDateChange = jest.fn();
    const onOpenChange = jest.fn();
    const result = render(<DatePicker value={null} onDateChange={onDateChange} onOpenChange={onOpenChange} />);
    result.rerender(<DatePicker value={today} onDateChange={onDateChange} onOpenChange={onOpenChange} />);
    expect((result.getByRole('combobox') as HTMLInputElement).value).toBe(today.toDateString());
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('observes draft changes without parsing until blur', () => {
    const onChange = jest.fn();
    const parseDate = jest.fn(() => selectedDate);
    const onDateChange = jest.fn();
    const result = render(
      <DatePicker allowTextInput parseDate={parseDate} onChange={onChange} onDateChange={onDateChange} />,
    );
    const input = result.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'January 20' } });
    expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'January 20' });
    expect(parseDate).not.toHaveBeenCalled();
    expect(onDateChange).not.toHaveBeenCalled();
    fireEvent.blur(input);
    expect(parseDate).toHaveBeenCalledTimes(1);
    expect(onDateChange.mock.calls[0][1].reason).toBe('input');
    expect((input as HTMLInputElement).value).toBe(selectedDate.toDateString());
  });

  it('closes for editing without committing the previous draft', () => {
    const parseDate = jest.fn();
    const onDateChange = jest.fn();
    const result = render(<DatePicker allowTextInput defaultOpen parseDate={parseDate} onDateChange={onDateChange} />);
    fireEvent.change(result.getByRole('combobox'), { target: { value: 'unfinished' } });
    expect(result.queryByRole('dialog')).toBeNull();
    expect((result.getByRole('combobox') as HTMLInputElement).value).toBe('unfinished');
    expect(parseDate).not.toHaveBeenCalled();
    expect(onDateChange).not.toHaveBeenCalled();
  });

  it.each([
    ['invalid', 'invalid-input', today.toDateString()],
    ['January 25, 2030', 'out-of-bounds', 'January 25, 2030'],
    ['', 'required-input', ''],
  ])('validates editable %s and applies the documented recovery', (text, error, expectedText) => {
    const onValidationResult = jest.fn();
    const result = render(
      <DatePicker
        allowTextInput
        required
        defaultValue={today}
        maxDate={selectedDate}
        onValidationResult={onValidationResult}
      />,
    );
    const input = result.getByRole('combobox');
    fireEvent.change(input, { target: { value: text } });
    fireEvent.blur(input);
    expect(onValidationResult).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ error }));
    expect((input as HTMLInputElement).value).toBe(expectedText);
  });

  it('validates once when opening with Enter moves focus off the input', () => {
    const onValidationResult = jest.fn();
    const result = render(<DatePicker allowTextInput today={today} onValidationResult={onValidationResult} />);
    act(() => result.getByRole('combobox').focus());
    fireEvent.keyDown(result.getByRole('combobox'), { key: 'Enter' });
    expect(onValidationResult).toHaveBeenCalledTimes(1);
  });

  it('validates once for outside pointer dismissal followed by input blur', () => {
    const onValidationResult = jest.fn();
    const result = render(
      <>
        <DatePicker allowTextInput defaultOpen onValidationResult={onValidationResult} />
        <button>Outside</button>
      </>,
    );
    act(() => result.getByRole('combobox').focus());
    fireEvent.pointerDown(result.getByText('Outside'));
    act(() => result.getByText('Outside').focus());
    fireEvent.click(result.getByText('Outside'));
    expect(result.queryByRole('dialog')).toBeNull();
    expect(onValidationResult).toHaveBeenCalledTimes(1);
    expect(result.getByText('Outside').ownerDocument.activeElement).toBe(result.getByText('Outside'));
  });

  it('coalesces pointer and click dismissal when a controlled owner refuses to close', () => {
    const onOpenChange = jest.fn();
    const onValidationResult = jest.fn();
    const result = render(
      <>
        <DatePicker open onOpenChange={onOpenChange} onValidationResult={onValidationResult} />
        <button>Outside</button>
      </>,
    );
    fireEvent.pointerDown(result.getByText('Outside'));
    fireEvent.click(result.getByText('Outside'));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onValidationResult).toHaveBeenCalledTimes(1);
    expect(result.getByRole('dialog')).toBeTruthy();
  });

  it('combines the Field label and localized action name on the icon', () => {
    const result = render(
      <Field label="Appointment">
        <DatePicker contentAfter={{ 'aria-label': 'Choose date' }} />
      </Field>,
    );
    expect(result.getByRole('button', { name: 'Appointment Choose date' })).toBeTruthy();
  });

  it('honors Calendar close-action cancellation and restores focus when accepted', () => {
    const onDismiss = jest.fn((event: React.SyntheticEvent | Event) => event.preventDefault());
    const calendar = { dayPicker: { closeButton: { 'aria-label': 'Close calendar' } }, onDismiss };
    const result = render(<DatePicker defaultOpen today={today} calendar={calendar} />);
    fireEvent.click(result.getByRole('button', { name: 'Close calendar' }));
    expect(result.getByRole('dialog')).toBeTruthy();
    result.rerender(<DatePicker defaultOpen today={today} calendar={{ ...calendar, onDismiss: undefined }} />);
    fireEvent.click(result.getByRole('button', { name: 'Close calendar' }));
    expect(result.queryByRole('dialog')).toBeNull();
    expect(result.getByRole('combobox').ownerDocument.activeElement).toBe(result.getByRole('combobox'));
  });

  it('does not steal outside focus on an external controlled close', () => {
    const result = render(
      <>
        <DatePicker open />
        <button>Outside</button>
      </>,
    );
    act(() => result.getByText('Outside').focus());
    result.rerender(
      <>
        <DatePicker open={false} />
        <button>Outside</button>
      </>,
    );
    expect(result.getByText('Outside').ownerDocument.activeElement).toBe(result.getByText('Outside'));
  });

  it('keeps nested input props from bypassing disabled and Field required state', () => {
    const result = render(
      <Field label="Date" required>
        <DatePicker disabled input={{ disabled: false, required: false }} />
      </Field>,
    );
    const input = result.getByRole('combobox') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.required).toBe(true);
  });

  it('dismisses on outside scroll but not inside scroll', () => {
    const result = render(<DatePicker defaultOpen />);
    fireEvent.scroll(result.getByRole('dialog'));
    expect(result.getByRole('dialog')).toBeTruthy();
    fireEvent.scroll(result.container);
    expect(result.queryByRole('dialog')).toBeNull();
  });

  it('does not expose a popup or activate when disabled even if controlled open', () => {
    const onOpenChange = jest.fn();
    const result = render(<DatePicker disabled open onOpenChange={onOpenChange} />);
    fireEvent.click(result.getByRole('combobox'));
    fireEvent.click(result.getByRole('button', { name: 'Open calendar' }));
    fireEvent.keyDown(result.getByRole('combobox'), { key: 'ArrowDown' });
    expect(result.queryByRole('dialog')).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('disables an open popup without synthetic validation or change events', () => {
    const onDateChange = jest.fn();
    const onOpenChange = jest.fn();
    const onValidationResult = jest.fn();
    const props = { defaultOpen: true, onDateChange, onOpenChange, onValidationResult };
    const result = render(<DatePicker {...props} />);
    result.rerender(<DatePicker {...props} disabled />);
    expect(result.queryByRole('dialog')).toBeNull();
    expect(onDateChange).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(onValidationResult).not.toHaveBeenCalled();
  });

  it('supports inline and custom portal placement', () => {
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
    const result = render(<DatePicker defaultOpen mountNode={mountNode} />);
    expect(within(mountNode).getByRole('dialog')).toBeTruthy();
    result.rerender(<DatePicker defaultOpen inlinePopup mountNode={mountNode} />);
    expect(result.container.querySelector('[role="dialog"]')).not.toBeNull();
    expect(within(mountNode).queryByRole('dialog')).toBeNull();
    result.unmount();
    mountNode.remove();
  });

  it('focuses the surface when no picker or action is available', () => {
    const result = render(
      <DatePicker defaultOpen calendar={{ dayPicker: null, monthPicker: null, goToTodayButton: null }} />,
    );
    const dialog = result.getByRole('dialog');
    expect(dialog.ownerDocument.activeElement).toBe(dialog);
  });

  it('uses the provider document for portals, focus, and dismissal', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const targetDocument = iframe.contentDocument!;
    const container = targetDocument.createElement('div');
    targetDocument.body.appendChild(container);
    const result = render(
      <FluentProvider targetDocument={targetDocument} theme={webLightTheme}>
        <DatePicker defaultOpen today={today} />
      </FluentProvider>,
      { container, baseElement: targetDocument.body },
    );
    const dialog = result.getByRole('dialog');
    expect(dialog.ownerDocument).toBe(targetDocument);
    expect(dialog.contains(targetDocument.activeElement)).toBe(true);
    fireEvent.pointerDown(targetDocument.body);
    expect(result.queryByRole('dialog')).toBeNull();
    result.unmount();
    iframe.remove();
  });

  it.each([false, true])('renders on the server with defaultOpen=%s', defaultOpen => {
    expect(() => renderToString(<DatePicker today={today} defaultOpen={defaultOpen} inlinePopup />)).not.toThrow();
  });

  it('does not allow nested Input state to override DatePicker ownership', () => {
    const input: DatePickerProps['input'] = { value: 'wrong', defaultValue: 'wrong', type: 'date', readOnly: false };
    const result = render(<DatePicker defaultValue={today} input={input} />);
    const nativeInput = result.getByRole('combobox') as HTMLInputElement;
    expect(nativeInput.value).toBe(today.toDateString());
    expect(nativeInput.type).toBe('text');
    expect(nativeInput.readOnly).toBe(true);
  });

  it('composes native and Input change observers and respects cancellation', () => {
    const onChange = jest.fn();
    const onNativeChange = jest.fn((event: React.ChangeEvent<HTMLInputElement>) => event.preventDefault());
    const result = render(<DatePicker allowTextInput onChange={onChange} input={{ onChange: onNativeChange }} />);
    fireEvent.change(result.getByRole('combobox'), { target: { value: 'unfinished' } });
    expect(onNativeChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((result.getByRole('combobox') as HTMLInputElement).value).toBe('');
  });

  it('allows blur validation cancellation', () => {
    const onValidationResult = jest.fn();
    const result = render(
      <DatePicker
        allowTextInput
        onValidationResult={onValidationResult}
        input={{ onBlur: event => event.preventDefault() }}
      />,
    );
    fireEvent.change(result.getByRole('combobox'), { target: { value: 'invalid' } });
    fireEvent.blur(result.getByRole('combobox'));
    expect(onValidationResult).not.toHaveBeenCalled();
    expect((result.getByRole('combobox') as HTMLInputElement).value).toBe('invalid');
  });

  it('dismisses and restores focus for an external wheel interaction', () => {
    const result = render(<DatePicker defaultOpen />);
    fireEvent.wheel(result.getByRole('dialog'));
    expect(result.getByRole('dialog')).toBeTruthy();
    fireEvent.wheel(result.container);
    expect(result.queryByRole('dialog')).toBeNull();
    expect(result.getByRole('combobox').ownerDocument.activeElement).toBe(result.getByRole('combobox'));
  });

  it('composes surface focus and key events and handles Escape without Calendar', () => {
    const onFocusCapture = jest.fn();
    const onBlurCapture = jest.fn();
    const onKeyDown = jest.fn();
    const result = render(
      <DatePicker
        defaultOpen
        calendar={{ dayPicker: null, monthPicker: null, goToTodayButton: null }}
        popupSurface={{ onFocusCapture, onBlurCapture, onKeyDown }}
      />,
    );
    expect(onFocusCapture).toHaveBeenCalled();
    act(() => result.getByRole('combobox').focus());
    expect(onBlurCapture).toHaveBeenCalled();
    fireEvent.keyDown(result.getByRole('dialog'), { key: 'Escape' });
    expect(onKeyDown).toHaveBeenCalled();
    expect(result.queryByRole('dialog')).toBeNull();
  });
});
