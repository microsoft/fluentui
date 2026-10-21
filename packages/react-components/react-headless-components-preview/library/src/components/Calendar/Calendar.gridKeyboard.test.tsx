import * as React from 'react';
import { flushSync } from 'react-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { CalendarProvider, calendarContextDefaultValue } from './contexts/calendarContext';
import { CalendarDay } from './CalendarDay/CalendarDay';
import { useCalendarDay } from './CalendarDay/useCalendarDay';
import { renderCalendarDay } from './CalendarDay/renderCalendarDay';
import { CalendarMonth } from './CalendarMonth/CalendarMonth';
import { useCalendarMonth } from './CalendarMonth/useCalendarMonth';
import { renderCalendarMonth } from './CalendarMonth/renderCalendarMonth';
import { CalendarYear } from './CalendarYear/CalendarYear';
import { useCalendarYear } from './CalendarYear/useCalendarYear';
import { renderCalendarYear } from './CalendarYear/renderCalendarYear';
import type { CalendarDayHandle, CalendarDayProps } from './CalendarDay/CalendarDay.types';
import type { CalendarMonthHandle, CalendarMonthProps } from './CalendarMonth/CalendarMonth.types';
import type { CalendarYearHandle, CalendarYearProps } from './CalendarYear/CalendarYear.types';

const BaseDay: typeof CalendarDay = React.forwardRef<CalendarDayHandle, CalendarDayProps>((props, ref) =>
  renderCalendarDay(useCalendarDay(props, ref)),
);
const BaseMonth: typeof CalendarMonth = React.forwardRef<CalendarMonthHandle, CalendarMonthProps>((props, ref) =>
  renderCalendarMonth(useCalendarMonth(props, ref)),
);
const BaseYear: typeof CalendarYear = React.forwardRef<CalendarYearHandle, CalendarYearProps>((props, ref) =>
  renderCalendarYear(useCalendarYear(props, ref)),
);

const today = new Date(2020, 8, 18);
type FixtureProps = {
  allFocusable?: boolean;
  minDate?: Date;
  restrictedDates?: Date[];
  weeksToShow?: number;
  onGridKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onGridKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
  getDayCellProps?: CalendarDayProps['getDayCellProps'];
  onPickerSelect?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  renderIcon?: boolean;
};

function renderPicker(picker: 'day' | 'month' | 'year', base: boolean, props: FixtureProps = {}) {
  const Day = base ? BaseDay : CalendarDay;
  const Month = base ? BaseMonth : CalendarMonth;
  const Year = base ? BaseYear : CalendarYear;
  const onSelect = jest.fn();
  const onNavigate = jest.fn();
  const element = (options: FixtureProps) => {
    const grid = { onKeyDown: options.onGridKeyDown, onKeyDownCapture: options.onGridKeyDownCapture };
    const icon = (
      <span>
        <svg aria-label="Custom icon">
          <path />
        </svg>
      </span>
    );
    return (
      <CalendarProvider
        value={{
          ...calendarContextDefaultValue,
          today,
          value: today,
          allFocusable: options.allFocusable ?? false,
          minDate: options.minDate,
          restrictedDates: options.restrictedDates,
          setValue: onSelect,
        }}
      >
        {picker === 'day' ? (
          <Day
            navigatedDate={today}
            onNavigateDate={onNavigate}
            weeksToShow={options.weeksToShow}
            getDayCellProps={options.getDayCellProps}
            renderDay={options.renderIcon ? () => icon : undefined}
            grid={grid}
          />
        ) : picker === 'month' ? (
          <Month
            navigatedDate={today}
            onSelectDate={(event, data) => {
              onSelect(event, data);
              if (data.type !== undefined) {
                options.onPickerSelect?.(data.event);
              }
            }}
            onNavigateDate={onNavigate}
            grid={grid}
          />
        ) : (
          <Year
            navigatedYear={2020}
            onSelectYear={(event, data) => {
              onSelect(event, data);
              if (data.type !== undefined) {
                options.onPickerSelect?.(data.event);
              }
            }}
            renderYear={options.renderIcon ? () => icon : undefined}
            onNavigateDate={onNavigate}
            grid={grid}
          />
        )}
      </CalendarProvider>
    );
  };
  const result = render(element(props));
  return {
    ...result,
    cells: result.getAllByRole('gridcell'),
    onSelect,
    onNavigate,
    rerenderPicker: (options: FixtureProps) => result.rerender(element(options)),
  };
}

describe.each(['day', 'month', 'year'] as const)('%s grid focusgroup contract', picker => {
  describe.each([false, true])('base hooks=%s', base => {
    it('declares the grid, eligible targets and initial entry point without a focus runtime', () => {
      const { getByRole, cells } = renderPicker(picker, base);
      const grid = getByRole('grid');
      expect(grid).toHaveAttribute('focusgroup', picker === 'day' ? 'grid rowflow' : 'grid manual');
      expect(grid).not.toHaveAttribute('data-tabster');
      expect(grid.querySelectorAll('[focusgroupstart]')).toHaveLength(1);
      expect(cells.every(cell => cell.tabIndex === 0)).toBe(true);
      if (picker === 'day') {
        expect(grid.querySelectorAll('td button:not([tabindex="-1"])')).toHaveLength(0);
      } else {
        const rows = grid.querySelectorAll('[focusgrouprow]');
        expect(rows).toHaveLength(3);
        rows.forEach(row => expect(row.children).toHaveLength(4));
      }
    });

    it.each(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'])(
      'leaves in-grid %s movement and focus memory to focusgroup',
      key => {
        const { cells, onSelect, onNavigate } = renderPicker(picker, base);
        const cell = cells[picker === 'day' ? 14 : 5];
        act(() => cell.focus());

        expect(fireEvent.keyDown(cell, { key })).toBe(true);

        expect(cell).toHaveFocus();
        expect(onSelect).not.toHaveBeenCalled();
        expect(onNavigate).not.toHaveBeenCalled();
        expect(cells.every(item => item.tabIndex === 0)).toBe(true);
      },
    );

    it.each(['click', 'keydown'] as const)('selects with %s independently of focusgroup', type => {
      const { cells, onSelect } = renderPicker(picker, base);
      if (type === 'click') {
        fireEvent.click(cells[2]);
      } else {
        expect(fireEvent.keyDown(cells[2], { key: 'Enter' })).toBe(false);
      }
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][1].type).toBe(type);
    });

    it.each(['ArrowLeft', 'Enter'])('honors consumer cancellation of %s', key => {
      const onGridKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderPicker(picker, base, { onGridKeyDown });
      act(() => cells[0].focus());

      fireEvent.keyDown(cells[0], { key });

      expect(onGridKeyDown).toHaveBeenCalledTimes(1);
      expect(cells[0]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it('honors grid capture cancellation', () => {
      const onGridKeyDownCapture = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderPicker(picker, base, { onGridKeyDownCapture });
      fireEvent.keyDown(cells[0], { key: 'Enter' });
      expect(onGridKeyDownCapture).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it.each([false, true])('preserves unavailable-cell semantics with allFocusable=%s', allFocusable => {
      const { cells, onSelect } = renderPicker(picker, base, {
        allFocusable,
        minDate: picker === 'year' ? new Date(2021, 0, 1) : new Date(2020, 8, 1),
        restrictedDates: [today],
      });
      const unavailable = cells.find(cell => cell.getAttribute('aria-disabled') === 'true')!;
      expect(unavailable).toBeDefined();
      if (picker === 'day') {
        expect(unavailable.querySelector('button')).toBeDisabled();
        expect(unavailable.hasAttribute('tabindex')).toBe(allFocusable);
      } else {
        expect(unavailable.hasAttribute('disabled')).toBe(!allFocusable);
      }
      fireEvent.keyDown(unavailable, { key: 'Enter' });
      fireEvent.click(unavailable);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it.each(['input', 'textarea', 'select', 'contenteditable', 'grid', 'focusgroup'])(
      'preserves input ownership inside nested %s content',
      owner => {
        const { cells, onSelect, onNavigate } = renderPicker(picker, base);
        const nested = cells[0].ownerDocument.createElement(
          ['input', 'textarea', 'select'].includes(owner) ? owner : 'span',
        );
        if (owner === 'contenteditable') {
          nested.setAttribute('contenteditable', 'true');
        } else if (owner === 'grid') {
          nested.setAttribute('role', 'grid');
        } else if (owner === 'focusgroup') {
          nested.setAttribute('focusgroup', 'none');
        }
        nested.tabIndex = 0;
        cells[0].appendChild(nested);
        act(() => nested.focus());

        for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter']) {
          expect(fireEvent.keyDown(nested, { key })).toBe(true);
          expect(nested).toHaveFocus();
        }
        expect(onSelect).not.toHaveBeenCalled();
        expect(onNavigate).not.toHaveBeenCalled();
      },
    );

    if (picker !== 'month') {
      it.each(['click', 'keydown'] as const)('selects SVG-child %s content', type => {
        const { cells, onSelect } = renderPicker(picker, base, { renderIcon: true });
        const path = cells[2].querySelector('path')!;
        if (type === 'click') {
          fireEvent.click(path);
        } else {
          fireEvent.keyDown(path, { key: 'Enter' });
        }
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][1]).toMatchObject(
          picker === 'day' ? { type, date: new Date(2020, 8, 1) } : { type, year: 2022 },
        );
      });

      it('allows pointer selection but not keyboard selection inside nested focusgroup SVG content', () => {
        const { cells, onSelect } = renderPicker(picker, base, { renderIcon: true });
        const path = cells[2].querySelector('path')!;
        path.closest('span')!.setAttribute('focusgroup', 'none');
        fireEvent.keyDown(path, { key: 'Enter' });
        expect(onSelect).not.toHaveBeenCalled();
        fireEvent.click(path);
        expect(onSelect).toHaveBeenCalledTimes(1);
      });
    }

    if (picker !== 'day') {
      it.each(['click', 'keydown'] as const)('forwards %s with the cell button as currentTarget', type => {
        const targets: HTMLButtonElement[] = [];
        const onPickerSelect = jest.fn((event: React.SyntheticEvent<HTMLButtonElement>) => {
          targets.push(event.currentTarget);
          event.preventDefault();
          event.stopPropagation();
        });
        const { cells, container } = renderPicker(picker, base, { onPickerSelect });
        const onBubble = jest.fn();
        container.ownerDocument.body.addEventListener(type, onBubble);

        const defaultAllowed =
          type === 'click' ? fireEvent.click(cells[2]) : fireEvent.keyDown(cells[2], { key: 'Enter' });
        container.ownerDocument.body.removeEventListener(type, onBubble);

        expect(onPickerSelect).toHaveBeenCalledTimes(1);
        expect(targets).toEqual([cells[2]]);
        expect(defaultAllowed).toBe(false);
        expect(onBubble).not.toHaveBeenCalled();
      });
    }
  });
});

describe.each([false, true])('day-grid domain behavior, base hooks=%s', base => {
  it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])('passes modified boundary arrows through with %s', modifier => {
    const { cells, onNavigate } = renderPicker('day', base);
    expect(fireEvent.keyDown(cells[0], { key: 'ArrowLeft', [modifier]: true })).toBe(true);
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('requests controlled navigation beyond the visible day grid', () => {
    const { cells, onNavigate } = renderPicker('day', base);
    act(() => cells[0].focus());
    expect(fireEvent.keyDown(cells[0], { key: 'ArrowLeft' })).toBe(false);
    expect(cells[0]).toHaveFocus();
    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate.mock.calls[0][1].date).toEqual(new Date(2020, 7, 29));
  });

  it('does not navigate beyond a minimum date', () => {
    const { cells, onNavigate } = renderPicker('day', base, { minDate: new Date(2020, 7, 30) });
    fireEvent.keyDown(cells[0], { key: 'ArrowLeft' });
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('keeps a restricted navigated date enrolled in an allFocusable single-week grid', () => {
    const { getByRole, onSelect, onNavigate } = renderPicker('day', base, {
      allFocusable: true,
      weeksToShow: 1,
      restrictedDates: Array.from({ length: 7 }, (_, index) => new Date(2020, 8, 13 + index)),
    });
    const cell = getByRole('button', { name: 'September 18, 2020' }).closest('td')!;
    expect(cell).toHaveAttribute('tabindex', '0');
    expect(cell).toHaveAttribute('focusgroupstart');
    fireEvent.keyDown(cell, { key: 'Enter' });
    fireEvent.click(cell);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('preserves the focus destination of a cancelled cell click', () => {
    const { cells, container, onSelect, onNavigate } = renderPicker('day', base, {
      getDayCellProps: () => ({
        onClick: event => {
          event.preventDefault();
          editor.focus();
        },
      }),
    });
    const editor = container.ownerDocument.createElement('input');
    container.appendChild(editor);
    expect(fireEvent.click(cells[2].querySelector('button')!)).toBe(false);
    expect(editor).toHaveFocus();
    expect(onSelect).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it.each(['Enter', ' ', 'ArrowLeft'])('honors cell cancellation of %p before selection or paging', key => {
    const onKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
    const { cells, onSelect, onNavigate } = renderPicker('day', base, { getDayCellProps: () => ({ onKeyDown }) });
    fireEvent.keyDown(cells[0], { key });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('does not redispatch a key after a synchronous consumer rerender', () => {
    const onAfterRerender = jest.fn();
    const onKeyDown = jest.fn(() => {
      flushSync(() => rerenderPicker({ getDayCellProps: () => ({ onKeyDown: onAfterRerender }) }));
    });
    const { cells, rerenderPicker } = renderPicker('day', base, { getDayCellProps: () => ({ onKeyDown }) });
    fireEvent.keyDown(cells[14], { key: 'ArrowRight' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onAfterRerender).not.toHaveBeenCalled();
  });

  it.each(['input', 'contenteditable'])('clears range hover and press state when leaving %s content', owner => {
    const Day = base ? BaseDay : CalendarDay;
    const { getByRole } = render(
      <CalendarProvider value={{ ...calendarContextDefaultValue, today, value: today, dateRangeType: 'week' }}>
        <Day
          navigatedDate={today}
          renderDay={(_day, content) => (
            <>
              {content}
              {owner === 'input' ? <input aria-label="Editor" /> : <span contentEditable />}
            </>
          )}
        />
      </CalendarProvider>,
    );
    const button = getByRole('button', { name: 'September 18, 2020' });
    const editor = button.querySelector<HTMLElement>('input, [contenteditable]')!;
    const grid = getByRole('grid');
    fireEvent.mouseOver(button);
    fireEvent.mouseDown(button);
    expect(grid.querySelectorAll('[data-range-hovered]')).toHaveLength(7);
    expect(grid.querySelectorAll('[data-range-pressed]')).toHaveLength(7);
    fireEvent.mouseOut(button, { relatedTarget: editor });
    fireEvent.mouseOver(editor, { relatedTarget: button });
    expect(grid.querySelectorAll('[data-range-hovered]')).toHaveLength(7);
    fireEvent.mouseOut(editor, { relatedTarget: grid });
    expect(grid.querySelectorAll('[data-range-hovered], [data-range-pressed]')).toHaveLength(0);
  });
});
