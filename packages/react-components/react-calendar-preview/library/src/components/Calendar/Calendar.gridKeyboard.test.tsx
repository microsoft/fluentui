import * as React from 'react';
import { flushSync } from 'react-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider_unstable } from '@fluentui/react-shared-contexts';
import { CalendarProvider, calendarContextDefaultValue } from '../../contexts/calendarContext';
import { useCalendarDayContext_unstable } from '../../contexts/calendarDayContext';
import { useCalendarMonthContext_unstable } from '../../contexts/calendarMonthContext';
import { useCalendarYearContext_unstable } from '../../contexts/calendarYearContext';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { useCalendarDayBase_unstable } from '../CalendarDay/useCalendarDay';
import { renderCalendarDay_unstable } from '../CalendarDay/renderCalendarDay';
import { useCalendarDayContextValues_unstable } from '../CalendarDay/useCalendarDayContextValues';
import { CalendarDayGridCell } from '../CalendarDayGridCell/CalendarDayGridCell';
import { useCalendarDayGridCell_unstable } from '../CalendarDayGridCell/useCalendarDayGridCell';
import { renderCalendarDayGridCell_unstable } from '../CalendarDayGridCell/renderCalendarDayGridCell';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { useCalendarMonthBase_unstable } from '../CalendarMonth/useCalendarMonth';
import { renderCalendarMonth_unstable } from '../CalendarMonth/renderCalendarMonth';
import { useCalendarMonthContextValues_unstable } from '../CalendarMonth/useCalendarMonthContextValues';
import { CalendarYear } from '../CalendarYear/CalendarYear';
import { useCalendarYearBase_unstable } from '../CalendarYear/useCalendarYear';
import { renderCalendarYear_unstable } from '../CalendarYear/renderCalendarYear';
import { useCalendarYearContextValues_unstable } from '../CalendarYear/useCalendarYearContextValues';
import { CalendarMonthGridCell } from '../CalendarMonthGridCell/CalendarMonthGridCell';
import { useCalendarMonthGridCell_unstable } from '../CalendarMonthGridCell/useCalendarMonthGridCell';
import { renderCalendarMonthGridCell_unstable } from '../CalendarMonthGridCell/renderCalendarMonthGridCell';
import { CalendarYearGridCell } from '../CalendarYearGridCell/CalendarYearGridCell';
import { useCalendarYearGridCell_unstable } from '../CalendarYearGridCell/useCalendarYearGridCell';
import { renderCalendarYearGridCell_unstable } from '../CalendarYearGridCell/renderCalendarYearGridCell';
import type { CalendarMonthHandle, CalendarMonthProps } from '../CalendarMonth/CalendarMonth.types';
import type { CalendarDayHandle, CalendarDayProps } from '../CalendarDay/CalendarDay.types';
import type { CalendarDayGridCellProps } from '../CalendarDayGridCell/CalendarDayGridCell.types';
import type { CalendarYearHandle, CalendarYearProps } from '../CalendarYear/CalendarYear.types';
import type { CalendarMonthGridCellProps } from '../CalendarMonthGridCell/CalendarMonthGridCell.types';
import type { CalendarYearGridCellProps } from '../CalendarYearGridCell/CalendarYearGridCell.types';

const BaseDay: typeof CalendarDay = React.forwardRef<CalendarDayHandle, CalendarDayProps>((props, ref) => {
  const state = useCalendarDayBase_unstable(props, ref);
  return renderCalendarDay_unstable(state, useCalendarDayContextValues_unstable(state));
});

const BaseDayCell: typeof CalendarDayGridCell = React.forwardRef<HTMLTableCellElement, CalendarDayGridCellProps>(
  (props, ref) => renderCalendarDayGridCell_unstable(useCalendarDayGridCell_unstable(props, ref)),
);

const BaseMonth: typeof CalendarMonth = React.forwardRef<CalendarMonthHandle, CalendarMonthProps>((props, ref) => {
  const state = useCalendarMonthBase_unstable(props, ref);
  return renderCalendarMonth_unstable(state, useCalendarMonthContextValues_unstable(state));
});

const BaseYear: typeof CalendarYear = React.forwardRef<CalendarYearHandle, CalendarYearProps>((props, ref) => {
  const state = useCalendarYearBase_unstable(props, ref);
  return renderCalendarYear_unstable(state, useCalendarYearContextValues_unstable(state));
});

const BaseMonthCell: typeof CalendarMonthGridCell = React.forwardRef<HTMLButtonElement, CalendarMonthGridCellProps>(
  (props, ref) => renderCalendarMonthGridCell_unstable(useCalendarMonthGridCell_unstable(props, ref)),
);

const BaseYearCell: typeof CalendarYearGridCell = React.forwardRef<HTMLButtonElement, CalendarYearGridCellProps>(
  (props, ref) => renderCalendarYearGridCell_unstable(useCalendarYearGridCell_unstable(props, ref)),
);

type RowProps = {
  base: boolean;
  disabledIndices?: number[];
  onCellKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onCellKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
};

const DayRows = ({ base }: RowProps) => {
  const weeks = useCalendarDayContext_unstable(ctx => ctx.weeks);
  const Cell = base ? BaseDayCell : CalendarDayGridCell;
  return (
    <>
      {weeks.slice(1, -1).map((week, weekIndex) => (
        <tr key={weekIndex}>
          {week.map((day, dayIndex) => (
            <Cell key={dayIndex} day={day} dayIndex={dayIndex} weekIndex={weekIndex + 1} />
          ))}
        </tr>
      ))}
    </>
  );
};

const MonthRows = ({ base, disabledIndices = [], onCellKeyDown, onCellKeyDownCapture }: RowProps) => {
  const rows = useCalendarMonthContext_unstable(ctx => ctx.monthRows);
  const Cell = base ? BaseMonthCell : CalendarMonthGridCell;
  return (
    <>
      {rows.map((months, row) => (
        <div role="row" key={row}>
          {months.map(month => (
            <Cell
              key={month.index}
              month={{ ...month, isInBounds: month.isInBounds && !disabledIndices.includes(month.index) }}
              onKeyDown={onCellKeyDown}
              onKeyDownCapture={onCellKeyDownCapture}
            />
          ))}
        </div>
      ))}
    </>
  );
};

const YearRows = ({ base, disabledIndices = [], onCellKeyDown, onCellKeyDownCapture }: RowProps) => {
  const rows = useCalendarYearContext_unstable(ctx => ctx.yearRows);
  const Cell = base ? BaseYearCell : CalendarYearGridCell;
  return (
    <>
      {rows.map((years, row) => (
        <div role="row" key={row}>
          {years.map((cell, column) => (
            <Cell
              key={cell.year}
              cell={{ ...cell, isDisabled: cell.isDisabled || disabledIndices.includes(row * 4 + column) }}
              onKeyDown={onCellKeyDown}
              onKeyDownCapture={onCellKeyDownCapture}
            />
          ))}
        </div>
      ))}
    </>
  );
};

type FixtureProps = Omit<RowProps, 'base'> & {
  allFocusable?: boolean;
  dir?: 'ltr' | 'rtl';
  onGridKeyDownCapture?: React.KeyboardEventHandler<HTMLDivElement>;
};

function renderPicker(picker: 'day' | 'month' | 'year', base: boolean, props: FixtureProps = {}) {
  const Month = base ? BaseMonth : CalendarMonth;
  const Year = base ? BaseYear : CalendarYear;
  const Day = base ? BaseDay : CalendarDay;
  const onSelect = jest.fn();
  const onNavigate = jest.fn();
  const today = new Date(2020, 8, 18);
  const element = (fixtureProps: FixtureProps) => {
    const { allFocusable = false, dir = 'ltr', onGridKeyDownCapture, ...rowProps } = fixtureProps;
    return (
      <Provider_unstable value={{ dir }}>
        <CalendarProvider
          value={{ ...calendarContextDefaultValue, allFocusable, today, value: today, setValue: onSelect }}
        >
          {picker === 'day' ? (
            <Day
              navigatedDate={today}
              onNavigateDate={onNavigate}
              getDayCellProps={() => ({
                onKeyDown: rowProps.onCellKeyDown,
                onKeyDownCapture: rowProps.onCellKeyDownCapture,
              })}
              grid={{ onKeyDownCapture: onGridKeyDownCapture }}
              body={{ children: <DayRows base={base} /> }}
            />
          ) : picker === 'month' ? (
            <Month
              navigatedDate={today}
              onSelectDate={onSelect}
              onNavigateDate={onNavigate}
              grid={{
                onKeyDownCapture: onGridKeyDownCapture,
                children: <MonthRows base={base} {...rowProps} />,
              }}
            />
          ) : (
            <Year
              navigatedYear={2020}
              onSelectYear={onSelect}
              onNavigateDate={onNavigate}
              grid={{
                onKeyDownCapture: onGridKeyDownCapture,
                children: <YearRows base={base} {...rowProps} />,
              }}
            />
          )}
        </CalendarProvider>
      </Provider_unstable>
    );
  };
  const result = render(element(props));
  return {
    ...result,
    cells: result.getAllByRole('gridcell'),
    onSelect,
    onNavigate,
    rerenderPicker: (nextProps: FixtureProps) => result.rerender(element(nextProps)),
  };
}

describe.each([
  { name: 'base month', picker: 'month', base: true },
  { name: 'base year', picker: 'year', base: true },
  { name: 'styled month', picker: 'month', base: false },
  { name: 'styled year', picker: 'year', base: false },
] as const)('$name grid keyboard navigation', ({ picker, base }) => {
  it('preserves grid semantics and delegates only roving tab stops to the styled layer', () => {
    const { container, getByRole, getAllByRole, cells } = renderPicker(picker, base);
    expect(getAllByRole('row')).toHaveLength(3);
    expect(cells).toHaveLength(12);
    if (base) {
      expect(
        container.querySelector(
          '.fui-CalendarMonth, .fui-CalendarYear, .fui-CalendarMonthGridCell, .fui-CalendarYearGridCell',
        ),
      ).toBeNull();
      expect(getByRole('grid')).not.toHaveAttribute('data-tabster');
    } else {
      const attributes = JSON.parse(getByRole('grid').getAttribute('data-tabster')!);
      expect(attributes.focusable.ignoreKeydown).toEqual({
        ArrowDown: true,
        ArrowLeft: true,
        ArrowRight: true,
        ArrowUp: true,
      });
    }
  });

  it.each([
    { key: 'ArrowRight', target: 6 },
    { key: 'ArrowLeft', target: 4 },
    { key: 'ArrowDown', target: 9 },
    { key: 'ArrowUp', target: 1 },
  ])('moves focus with $key without selecting or navigating the picker', ({ key, target }) => {
    const { cells, onSelect, onNavigate } = renderPicker(picker, base);
    act(() => cells[5].focus());

    const defaultAllowed = fireEvent.keyDown(cells[5], { key });
    expect(cells[target]).toHaveFocus();
    expect(defaultAllowed).toBe(false);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it.each([
    { key: 'ArrowRight', target: 4 },
    { key: 'ArrowLeft', target: 6 },
  ])('respects RTL for $key', ({ key, target }) => {
    const { cells } = renderPicker(picker, base, { dir: 'rtl' });
    act(() => cells[5].focus());

    expect(fireEvent.keyDown(cells[5], { key })).toBe(false);
    expect(cells[target]).toHaveFocus();
  });

  it.each([
    { key: 'ArrowRight', index: 3 },
    { key: 'ArrowLeft', index: 4 },
    { key: 'ArrowUp', index: 1 },
    { key: 'ArrowDown', index: 9 },
  ])('prevents fallback movement at the $key boundary', ({ key, index }) => {
    const { cells } = renderPicker(picker, base);
    act(() => cells[index].focus());

    expect(fireEvent.keyDown(cells[index], { key })).toBe(false);
    expect(cells[index]).toHaveFocus();
  });

  it.each([
    { key: 'ArrowRight', target: 2 },
    { key: 'ArrowDown', target: 8 },
  ])('skips unavailable cells with $key without changing row or column', ({ key, target }) => {
    const { cells } = renderPicker(picker, base, { disabledIndices: [1, 4] });
    act(() => cells[0].focus());

    expect(fireEvent.keyDown(cells[0], { key })).toBe(false);
    expect(cells[target]).toHaveFocus();
  });

  it('keeps an unavailable cell navigable but not selectable with allFocusable', () => {
    const { cells, onSelect } = renderPicker(picker, base, { allFocusable: true, disabledIndices: [1] });
    act(() => cells[0].focus());
    fireEvent.keyDown(cells[0], { key: 'ArrowRight' });

    expect(cells[1]).toHaveFocus();
    expect(cells[1]).toHaveAttribute('aria-disabled', 'true');
    expect(cells[1]).not.toBeDisabled();
    fireEvent.keyDown(cells[1], { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();

    fireEvent.keyDown(cells[1], { key: 'ArrowDown' });
    expect(cells[5]).toHaveFocus();
  });

  it.each(['ArrowRight', 'Enter'])('honors consumer cancellation of %s', key => {
    const onCellKeyDown = jest.fn((event: React.KeyboardEvent<HTMLButtonElement>) => event.preventDefault());
    const { cells, onSelect, onNavigate } = renderPicker(picker, base, { onCellKeyDown });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key });

    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
    expect(cells[0]).toHaveFocus();
    expect(onSelect).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('honors cancellation from the grid capture handler', () => {
    const onGridKeyDownCapture = jest.fn((event: React.KeyboardEvent<HTMLDivElement>) => event.preventDefault());
    const { cells } = renderPicker(picker, base, { onGridKeyDownCapture });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowDown' });

    expect(onGridKeyDownCapture).toHaveBeenCalledTimes(1);
    expect(cells[0]).toHaveFocus();
  });

  it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])('preserves modified arrows with %s', modifier => {
    const { cells } = renderPicker(picker, base);
    act(() => cells[0].focus());

    expect(fireEvent.keyDown(cells[0], { key: 'ArrowRight', [modifier]: true })).toBe(true);
    expect(cells[0]).toHaveFocus();
  });

  it.each(['input', 'textarea', 'select', 'contenteditable'])('preserves arrows in nested %s content', tag => {
    const { cells, onSelect } = renderPicker(picker, base);
    const targetDocument = cells[0].ownerDocument;
    const editable = targetDocument.createElement(tag === 'contenteditable' ? 'div' : tag);
    const target = tag === 'contenteditable' ? targetDocument.createElement('span') : editable;
    if (tag === 'contenteditable') {
      editable.setAttribute('contenteditable', 'true');
      editable.tabIndex = 0;
      editable.appendChild(target);
    }
    cells[0].appendChild(editable);
    act(() => editable.focus());

    for (const key of ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Enter']) {
      expect(fireEvent.keyDown(target, { key })).toBe(true);
      expect(editable).toHaveFocus();
    }
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('can focus cells removed from the tab order by a roving-focus layer', () => {
    const { cells } = renderPicker(picker, base);
    cells.forEach((cell, index) => {
      cell.tabIndex = index === 0 ? 0 : -1;
    });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowDown' });

    expect(cells[4]).toHaveFocus();
  });

  it('does not take over an independently nested grid', () => {
    const { cells } = renderPicker(picker, base);
    const targetDocument = cells[0].ownerDocument;
    const nestedGrid = targetDocument.createElement('div');
    const nestedCell = targetDocument.createElement('button');
    nestedGrid.setAttribute('role', 'grid');
    nestedCell.setAttribute('role', 'gridcell');
    nestedGrid.appendChild(nestedCell);
    cells[0].appendChild(nestedGrid);
    act(() => nestedCell.focus());

    expect(fireEvent.keyDown(nestedCell, { key: 'ArrowRight' })).toBe(true);
    expect(nestedCell).toHaveFocus();
  });
});

describe.each([
  { name: 'base day', picker: 'day', base: true },
  { name: 'base month', picker: 'month', base: true },
  { name: 'base year', picker: 'year', base: true },
  { name: 'styled day', picker: 'day', base: false },
  { name: 'styled month', picker: 'month', base: false },
  { name: 'styled year', picker: 'year', base: false },
] as const)('$name native keyboard ordering', ({ picker, base }) => {
  it('preserves capture cancellation and calls the consumer keydown once', () => {
    const onCellKeyDownCapture = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
    const onCellKeyDown = jest.fn();
    const { cells } = renderPicker(picker, base, { onCellKeyDown, onCellKeyDownCapture });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowRight' });

    expect(cells[0]).toHaveFocus();
    expect(onCellKeyDownCapture).toHaveBeenCalledTimes(1);
    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
  });

  it('preserves propagation stopped by the consumer capture handler', () => {
    const onCellKeyDownCapture = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.stopPropagation());
    const onCellKeyDown = jest.fn();
    const { cells } = renderPicker(picker, base, { onCellKeyDown, onCellKeyDownCapture });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowRight' });

    expect(cells[0]).toHaveFocus();
    expect(onCellKeyDownCapture).toHaveBeenCalledTimes(1);
    expect(onCellKeyDown).not.toHaveBeenCalled();
  });

  it('does not dispatch an arrow again after a synchronous consumer rerender', () => {
    const onAfterRerender = jest.fn();
    const onCellKeyDown = jest.fn(() => {
      flushSync(() => rerenderPicker({ onCellKeyDown: onAfterRerender }));
    });
    const { cells, getAllByRole, rerenderPicker } = renderPicker(picker, base, { onCellKeyDown });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowRight' });

    expect(getAllByRole('gridcell')[0]).toBe(cells[0]);
    expect(cells[1]).toHaveFocus();
    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
    expect(onAfterRerender).not.toHaveBeenCalled();
  });

  it('leaves editable arrows in bubbling without moving or selecting the enclosing cell', () => {
    const phases: number[] = [];
    const onCellKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => phases.push(event.eventPhase));
    const { cells, onSelect } = renderPicker(picker, base, { onCellKeyDown });
    const input = cells[0].ownerDocument.createElement('input');
    cells[0].appendChild(input);
    act(() => input.focus());

    expect(fireEvent.keyDown(input, { key: 'ArrowRight' })).toBe(true);

    expect(input).toHaveFocus();
    expect(onSelect).not.toHaveBeenCalled();
    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
    expect(phases).toEqual([3]);
  });

  it('leaves a nested grid arrow in bubbling without taking over its focus', () => {
    const phases: number[] = [];
    const onCellKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => phases.push(event.eventPhase));
    const { cells } = renderPicker(picker, base, { onCellKeyDown });
    const targetDocument = cells[0].ownerDocument;
    const nestedGrid = targetDocument.createElement('div');
    const nestedCell = targetDocument.createElement('button');
    nestedGrid.setAttribute('role', 'grid');
    nestedCell.setAttribute('role', 'gridcell');
    nestedGrid.appendChild(nestedCell);
    cells[0].appendChild(nestedGrid);
    act(() => nestedCell.focus());

    expect(fireEvent.keyDown(nestedCell, { key: 'ArrowRight' })).toBe(true);

    expect(nestedCell).toHaveFocus();
    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
    expect(phases).toEqual([3]);
  });

  it.each(['ArrowRight', 'ArrowDown'])('consumer cancellation precedes the native grid owner for %s', key => {
    const order: string[] = [];
    const consumerTargets: HTMLElement[] = [];
    const captureTargets: HTMLElement[] = [];
    const onCellKeyDownCapture = jest.fn((event: React.KeyboardEvent<HTMLElement>) => {
      order.push('capture');
      captureTargets.push(event.currentTarget);
    });
    const onCellKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => {
      order.push('consumer');
      consumerTargets.push(event.currentTarget);
      event.preventDefault();
    });
    const { cells, getByRole } = renderPicker(picker, base, { onCellKeyDown, onCellKeyDownCapture });
    const owner = getByRole('grid');
    const focusHops = jest.fn();
    const nativeOwner = jest.fn((event: KeyboardEvent) => {
      order.push('native');
      if (!event.defaultPrevented) {
        cells[1].focus();
        event.preventDefault();
      }
    });
    act(() => cells[0].focus());
    owner.addEventListener('keydown', nativeOwner);
    owner.addEventListener('focusin', focusHops);

    try {
      fireEvent.keyDown(cells[0], { key });

      expect(cells[0]).toHaveFocus();
      expect(focusHops).not.toHaveBeenCalled();
      expect(onCellKeyDown).toHaveBeenCalledTimes(1);
      expect(onCellKeyDownCapture).toHaveBeenCalledTimes(1);
      expect(nativeOwner).toHaveBeenCalledTimes(1);
      expect(consumerTargets).toEqual([cells[0]]);
      expect(captureTargets).toEqual([cells[0]]);
      expect(order).toEqual(['capture', 'consumer', 'native']);
    } finally {
      owner.removeEventListener('keydown', nativeOwner);
      owner.removeEventListener('focusin', focusHops);
    }
  });

  it.each(['ArrowRight', 'ArrowDown'])('moves focus once before the native grid owner for %s', key => {
    const phases: number[] = [];
    const consumerTargets: HTMLElement[] = [];
    const onCellKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => {
      phases.push(event.eventPhase);
      consumerTargets.push(event.currentTarget);
    });
    const { cells, getByRole } = renderPicker(picker, base, { onCellKeyDown });
    const owner = getByRole('grid');
    const focusHops = jest.fn();
    const nativeOwner = jest.fn((event: KeyboardEvent) => {
      if (!event.defaultPrevented) {
        cells[2].focus();
        event.preventDefault();
      }
    });
    act(() => cells[0].focus());
    owner.addEventListener('keydown', nativeOwner);
    owner.addEventListener('focusin', focusHops);

    try {
      fireEvent.keyDown(cells[0], { key });

      expect(cells[key === 'ArrowRight' ? 1 : picker === 'day' ? 7 : 4]).toHaveFocus();
      expect(focusHops).toHaveBeenCalledTimes(1);
      expect(onCellKeyDown).toHaveBeenCalledTimes(1);
      expect(nativeOwner).toHaveBeenCalledTimes(1);
      expect(consumerTargets).toEqual([cells[0]]);
      expect(phases).toEqual([1]);
    } finally {
      owner.removeEventListener('keydown', nativeOwner);
      owner.removeEventListener('focusin', focusHops);
    }
  });

  it.each(['Enter', 'PageDown', 'Tab'])('keeps %s consumer handling in bubbling', key => {
    const order: string[] = [];
    const phases: number[] = [];
    const onCellKeyDownCapture = jest.fn(() => order.push('capture'));
    const onCellKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => {
      order.push('consumer');
      phases.push(event.eventPhase);
    });
    const { cells, getByRole } = renderPicker(picker, base, { onCellKeyDown, onCellKeyDownCapture });
    const owner = getByRole('grid');
    const nativeOwner = () => order.push('native');
    owner.addEventListener('keydown', nativeOwner);

    try {
      fireEvent.keyDown(cells[0], { key });

      expect(onCellKeyDown).toHaveBeenCalledTimes(1);
      expect(onCellKeyDownCapture).toHaveBeenCalledTimes(1);
      expect(order).toEqual(['capture', 'native', 'consumer']);
      expect(phases).toEqual([3]);
    } finally {
      owner.removeEventListener('keydown', nativeOwner);
    }
  });

  if (picker === 'day') {
    it('blocks native fallback while requesting controlled navigation beyond the visible day grid', () => {
      const { cells, getByRole, onNavigate } = renderPicker(picker, base);
      const owner = getByRole('grid');
      const focusHops = jest.fn();
      const nativeOwner = jest.fn((event: KeyboardEvent) => {
        if (!event.defaultPrevented) {
          cells[2].focus();
          event.preventDefault();
        }
      });
      act(() => cells[0].focus());
      owner.addEventListener('keydown', nativeOwner);
      owner.addEventListener('focusin', focusHops);

      try {
        fireEvent.keyDown(cells[0], { key: 'ArrowLeft' });

        expect(cells[0]).toHaveFocus();
        expect(focusHops).not.toHaveBeenCalled();
        expect(nativeOwner).toHaveBeenCalledTimes(1);
        expect(onNavigate).toHaveBeenCalledTimes(1);
        expect(onNavigate.mock.calls[0][1].date).toEqual(new Date(2020, 7, 29));
      } finally {
        owner.removeEventListener('keydown', nativeOwner);
        owner.removeEventListener('focusin', focusHops);
      }
    });
  }
});
