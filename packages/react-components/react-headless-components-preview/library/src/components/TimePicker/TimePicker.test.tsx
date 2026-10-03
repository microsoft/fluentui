import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
import { TimePicker } from './TimePicker';

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
        defaultSelectedTime={new Date('November 25, 2021 09:00:00')}
      />,
    );

    userEvent.click(getByRole('combobox'));
    const options = getAllByRole('option');
    expect(options[2]).toHaveAttribute('data-selected');
    expect(options[0]).not.toHaveAttribute('data-selected');
  });

  it('calls onSelectedTimeChange when an option is clicked', () => {
    const onSelectedTimeChange = jest.fn();
    const { getByRole, getAllByRole } = render(
      <TimePicker
        aria-label="Time"
        dateAnchor={dateAnchor}
        startHour={8}
        endHour={9}
        onSelectedTimeChange={onSelectedTimeChange}
      />,
    );

    userEvent.click(getByRole('combobox'));
    userEvent.click(getAllByRole('option')[1]);

    expect(onSelectedTimeChange).toHaveBeenCalledTimes(1);
    const [, data] = onSelectedTimeChange.mock.calls[0];
    expect(data).toEqual(expect.objectContaining({ type: 'click', selectedTimeText: '8:30 AM', errorType: undefined }));
    expect(data.selectedTime).toEqual(new Date('November 25, 2021 08:30:00'));
    expect(getByRole('combobox')).toHaveValue('8:30 AM');
  });

  it('in freeform mode, submits the typed value on Enter', () => {
    const onSelectedTimeChange = jest.fn();
    const { getByRole } = render(
      <TimePicker
        aria-label="Time"
        freeform
        dateAnchor={dateAnchor}
        startHour={10}
        onSelectedTimeChange={onSelectedTimeChange}
      />,
    );

    userEvent.type(getByRole('combobox'), '111{enter}');

    expect(onSelectedTimeChange).toHaveBeenCalledTimes(1);
    expect(onSelectedTimeChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'keydown',
        selectedTime: null,
        selectedTimeText: '111',
        errorType: 'invalid-input',
      }),
    );

    // Pressing Enter again without changing the value does not submit it again
    fireEvent.keyDown(getByRole('combobox'), { key: 'Enter' });
    expect(onSelectedTimeChange).toHaveBeenCalledTimes(1);
  });

  it('in freeform mode, submits the typed value on blur', () => {
    const onSelectedTimeChange = jest.fn();
    const { getByRole } = render(
      <>
        <TimePicker aria-label="Time" freeform dateAnchor={dateAnchor} onSelectedTimeChange={onSelectedTimeChange} />
        <button>Next</button>
      </>,
    );

    userEvent.type(getByRole('combobox'), '9:15');
    userEvent.tab();

    expect(onSelectedTimeChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ type: 'blur', selectedTimeText: '9:15', errorType: undefined }),
    );
  });

  it('clears the selected time', () => {
    const onSelectedTimeChange = jest.fn();
    const { getByRole, getByText } = render(
      <TimePicker
        aria-label="Time"
        clearable
        clearIcon={{ children: 'Clear' }}
        dateAnchor={dateAnchor}
        onSelectedTimeChange={onSelectedTimeChange}
      />,
    );

    userEvent.type(getByRole('combobox'), '1:{enter}');
    expect(getByRole('combobox')).toHaveValue('1:00 AM');
    userEvent.click(getByText('Clear'));

    expect(getByRole('combobox')).toHaveValue('');
    expect(onSelectedTimeChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedTime: null }),
    );
  });

  describe('data attributes', () => {
    const getRoot = (container: HTMLElement) => container.firstElementChild as HTMLElement;

    it('sets data-freeform only in freeform mode', () => {
      const { container, rerender } = render(<TimePicker aria-label="Time" />);
      expect(getRoot(container)).not.toHaveAttribute('data-freeform');

      rerender(<TimePicker aria-label="Time" freeform />);
      expect(getRoot(container)).toHaveAttribute('data-freeform', '');
    });

    it('sets data-open when the listbox is open', () => {
      const { container, getByRole } = render(<TimePicker aria-label="Time" />);
      expect(getRoot(container)).not.toHaveAttribute('data-open');

      userEvent.click(getByRole('combobox'));
      expect(getRoot(container)).toHaveAttribute('data-open', '');
    });

    it('sets data-disabled when disabled', () => {
      const { container } = render(<TimePicker aria-label="Time" disabled />);
      expect(getRoot(container)).toHaveAttribute('data-disabled', '');
    });

    it('sets data-placeholder while the placeholder is visible', () => {
      const { container } = render(<TimePicker aria-label="Time" placeholder="Select a time" />);
      expect(getRoot(container)).toHaveAttribute('data-placeholder', '');
    });

    it('sets data-clearable when a time is selected and clearable', () => {
      const { container } = render(<TimePicker aria-label="Time" clearable defaultSelectedTime={dateAnchor} />);
      expect(getRoot(container)).toHaveAttribute('data-clearable', '');
    });

    it('does not let consumers override state attributes', () => {
      const { container } = render(
        <TimePicker aria-label="Time" root={{ 'data-freeform': 'custom' } as React.HTMLAttributes<HTMLDivElement>} />,
      );
      expect(getRoot(container)).not.toHaveAttribute('data-freeform');
    });
  });
});
