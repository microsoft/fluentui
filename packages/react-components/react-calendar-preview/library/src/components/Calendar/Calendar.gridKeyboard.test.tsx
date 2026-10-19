import * as React from 'react';
import { flushSync } from 'react-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider_unstable } from '@fluentui/react-shared-contexts';
import { CalendarProvider, calendarContextDefaultValue } from '../../contexts/calendarContext';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { useCalendarDayBase_unstable } from '../CalendarDay/useCalendarDay';
import { renderCalendarDay_unstable } from '../CalendarDay/renderCalendarDay';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { useCalendarMonthBase_unstable } from '../CalendarMonth/useCalendarMonth';
import { renderCalendarMonth_unstable } from '../CalendarMonth/renderCalendarMonth';
import { CalendarYear } from '../CalendarYear/CalendarYear';
import { useCalendarYearBase_unstable } from '../CalendarYear/useCalendarYear';
import { renderCalendarYear_unstable } from '../CalendarYear/renderCalendarYear';
import { isCalendarKeyboardEditable, moveCalendarGridFocus } from '../../utils/calendarKeyboard';
import type { CalendarDayHandle, CalendarDayProps } from '../CalendarDay/CalendarDay.types';
import type { CalendarMonthHandle, CalendarMonthProps } from '../CalendarMonth/CalendarMonth.types';
import type { CalendarYearHandle, CalendarYearProps } from '../CalendarYear/CalendarYear.types';

const BaseDay: typeof CalendarDay = React.forwardRef<CalendarDayHandle, CalendarDayProps>((props, ref) =>
  renderCalendarDay_unstable(useCalendarDayBase_unstable(props, ref)),
);

const BaseMonth: typeof CalendarMonth = React.forwardRef<CalendarMonthHandle, CalendarMonthProps>((props, ref) =>
  renderCalendarMonth_unstable(useCalendarMonthBase_unstable(props, ref)),
);

const BaseYear: typeof CalendarYear = React.forwardRef<CalendarYearHandle, CalendarYearProps>((props, ref) =>
  renderCalendarYear_unstable(useCalendarYearBase_unstable(props, ref)),
);

type FixtureProps = {
  allFocusable?: boolean;
  dir?: 'ltr' | 'rtl';
  minDate?: Date;
  onGridKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onGridKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
  onCellKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onCellKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
};

const today = new Date(2020, 8, 18);

function renderPicker(picker: 'day' | 'month' | 'year', base: boolean, props: FixtureProps = {}) {
  const Month = base ? BaseMonth : CalendarMonth;
  const Year = base ? BaseYear : CalendarYear;
  const Day = base ? BaseDay : CalendarDay;
  const onSelect = jest.fn();
  const onNavigate = jest.fn();
  const element = (fixtureProps: FixtureProps) => {
    const {
      allFocusable = false,
      dir = 'ltr',
      minDate,
      onGridKeyDown,
      onGridKeyDownCapture,
      onCellKeyDown,
      onCellKeyDownCapture,
    } = fixtureProps;
    const grid = { onKeyDown: onGridKeyDown, onKeyDownCapture: onGridKeyDownCapture };
    return (
      <Provider_unstable value={{ dir }}>
        <CalendarProvider
          value={{ ...calendarContextDefaultValue, allFocusable, minDate, today, value: today, setValue: onSelect }}
        >
          {picker === 'day' ? (
            <Day
              navigatedDate={today}
              onNavigateDate={onNavigate}
              getDayCellProps={() => ({ onKeyDown: onCellKeyDown, onKeyDownCapture: onCellKeyDownCapture })}
              grid={grid}
            />
          ) : picker === 'month' ? (
            <Month navigatedDate={today} onSelectDate={onSelect} onNavigateDate={onNavigate} grid={grid} />
          ) : (
            <Year navigatedYear={2020} onSelectYear={onSelect} onNavigateDate={onNavigate} grid={grid} />
          )}
        </CalendarProvider>
      </Provider_unstable>
    );
  };
  const result = render(element(props));
  const cells = result
    .getAllByRole('gridcell')
    .filter(cell => cell.getAttribute('aria-disabled') !== 'true' || picker !== 'day');
  return {
    ...result,
    cells,
    onSelect,
    onNavigate,
    rerenderPicker: (nextProps: FixtureProps) => result.rerender(element(nextProps)),
  };
}

function appendFocusgroup(cell: HTMLElement, focusgroup: string) {
  const targetDocument = cell.ownerDocument;
  const group = targetDocument.createElement('span');
  group.setAttribute('role', 'toolbar');
  group.setAttribute('focusgroup', focusgroup);
  const first = targetDocument.createElement('span');
  first.tabIndex = 0;
  first.textContent = 'First';
  const second = targetDocument.createElement('span');
  second.tabIndex = 0;
  second.textContent = 'Second';
  group.append(first, second);
  (cell.querySelector('button') ?? cell).appendChild(group);
  return { group, first, second };
}

describe.each([
  { name: 'base month', picker: 'month', base: true },
  { name: 'base year', picker: 'year', base: true },
  { name: 'styled month', picker: 'month', base: false },
  { name: 'styled year', picker: 'year', base: false },
] as const)('$name grid keyboard navigation', ({ picker, base }) => {
  it('preserves grid semantics and keeps a single roving tab stop', () => {
    const { container, getByRole, getAllByRole, cells } = renderPicker(picker, base);
    expect(getAllByRole('row')).toHaveLength(3);
    expect(cells).toHaveLength(12);
    expect(cells.filter(cell => cell.tabIndex === 0)).toHaveLength(1);
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

  it('moves the tab stop to the last focused cell', () => {
    const { cells } = renderPicker(picker, base);
    act(() => cells[5].focus());
    fireEvent.keyDown(cells[5], { key: 'ArrowRight' });

    expect(cells[6]).toHaveFocus();
    expect(cells.filter(cell => cell.tabIndex === 0)).toEqual([cells[6]]);
  });

  it.each(['inherit', 'FALSE'])('treats contenteditable=%s as non-editable', value => {
    const { cells } = renderPicker(picker, base);
    const target = cells[0].ownerDocument.createElement('span');
    target.setAttribute('contenteditable', value);
    cells[0].appendChild(target);
    act(() => target.focus());
    fireEvent.keyDown(target, { key: 'ArrowRight' });

    expect(cells[1]).toHaveFocus();
    expect(isCalendarKeyboardEditable(target)).toBe(false);
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

  it('continues past a candidate that cannot receive focus, including to tabIndex=-1 cells', () => {
    const { cells } = renderPicker(picker, base);
    cells[1].hidden = true;
    const failedFocus = jest.spyOn(cells[1], 'focus').mockImplementation(() => undefined);
    cells[2].tabIndex = -1;
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowRight' });

    expect(failedFocus).toHaveBeenCalledTimes(1);
    expect(cells[2]).toHaveFocus();
    failedFocus.mockRestore();
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
    const { cells } = renderPicker(picker, base);
    cells[1].setAttribute('aria-disabled', 'true');
    cells[4].setAttribute('aria-disabled', 'true');
    act(() => cells[0].focus());

    expect(fireEvent.keyDown(cells[0], { key })).toBe(false);
    expect(cells[target]).toHaveFocus();
  });

  it('keeps an unavailable cell navigable but not selectable with allFocusable', () => {
    const minDate = picker === 'month' ? new Date(2020, 1, 1) : new Date(2021, 0, 1);
    const { cells, onSelect } = renderPicker(picker, base, { allFocusable: true, minDate });
    act(() => cells[1].focus());
    fireEvent.keyDown(cells[1], { key: 'ArrowLeft' });

    expect(cells[0]).toHaveFocus();
    expect(cells[0]).toHaveAttribute('aria-disabled', 'true');
    expect(cells[0]).not.toBeDisabled();
    fireEvent.keyDown(cells[0], { key: 'Enter' });
    fireEvent.click(cells[0]);
    expect(onSelect).not.toHaveBeenCalled();

    fireEvent.keyDown(cells[0], { key: 'ArrowDown' });
    expect(cells[4]).toHaveFocus();
  });

  it.each(['ArrowRight', 'Enter'])('honors grid consumer cancellation of %s', key => {
    const onGridKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
    const { cells, onSelect, onNavigate } = renderPicker(picker, base, { onGridKeyDown });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key });

    expect(onGridKeyDown).toHaveBeenCalledTimes(1);
    expect(cells[0]).toHaveFocus();
    expect(onSelect).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('selects with Enter', () => {
    const { cells, onSelect } = renderPicker(picker, base);
    act(() => cells[2].focus());

    expect(fireEvent.keyDown(cells[2], { key: 'Enter' })).toBe(false);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][1].type).toBe('keydown');
  });

  it('honors cancellation from the grid capture handler', () => {
    const onGridKeyDownCapture = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
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

  it('can focus cells removed from the tab order by a roving-focus layer', () => {
    const { cells } = renderPicker(picker, base);
    cells.forEach((cell, index) => {
      cell.tabIndex = index === 0 ? 0 : -1;
    });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowDown' });

    expect(cells[4]).toHaveFocus();
  });
});

describe('moveCalendarGridFocus', () => {
  it.each([
    { key: 'ArrowRight', targetIndex: 1 },
    { key: 'ArrowDown', targetIndex: 4 },
  ])('uses the shadow root activeElement after $key', ({ key, targetIndex }) => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const grid = document.createElement('div');
    grid.setAttribute('role', 'grid');
    const shadowCells = Array.from({ length: 12 }, () => {
      const cell = document.createElement('button');
      cell.setAttribute('role', 'gridcell');
      return cell;
    });
    grid.append(...shadowCells);
    shadowRoot.appendChild(grid);
    document.body.appendChild(host);
    act(() => shadowCells[0].focus());
    const event = {
      currentTarget: grid,
      key,
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLElement>;

    moveCalendarGridFocus(event, shadowCells[0], 'ltr', false);

    expect(shadowRoot.activeElement).toBe(shadowCells[targetIndex]);
    host.remove();
  });

  it.each(['inherit', 'FALSE'])('does not consider contenteditable=%s editable without an editable ancestor', value => {
    const target = document.createElement('span');
    target.setAttribute('contenteditable', value);
    expect(isCalendarKeyboardEditable(target)).toBe(false);
  });
});

describe.each(['day', 'month', 'year'] as const)('%s grid keyboard boundaries', picker => {
  describe.each([
    { name: 'base', base: true },
    { name: 'styled', base: false },
  ])('$name', ({ base }) => {
    it('allows navigation within a contenteditable=false island inside an editable ancestor', () => {
      const { cells, container, getByRole } = renderPicker(picker, base);
      const grid = getByRole('grid');
      const targetDocument = grid.ownerDocument;
      const editor = targetDocument.createElement('div');
      const island = targetDocument.createElement('div');
      editor.setAttribute('contenteditable', 'true');
      island.setAttribute('contenteditable', 'false');
      container.appendChild(editor);
      editor.appendChild(island);
      island.appendChild(grid);

      act(() => cells[0].focus());
      fireEvent.keyDown(cells[0], { key: 'ArrowRight' });

      expect(cells[1]).toHaveFocus();
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

    it.each(['toolbar inline', 'none'])(
      'leaves descendant focusgroup="%s" arrows to the focusgroup without Calendar navigation',
      focusgroup => {
        const { cells, onSelect, onNavigate } = renderPicker(picker, base);
        const { first } = appendFocusgroup(cells[0], focusgroup);

        act(() => first.focus());
        for (const key of ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp']) {
          expect(fireEvent.keyDown(first, { key })).toBe(true);
          expect(first).toHaveFocus();
        }

        expect(onSelect).not.toHaveBeenCalled();
        expect(onNavigate).not.toHaveBeenCalled();
      },
    );

    it.each([
      { location: 'grid', focusgroup: 'toolbar inline' },
      { location: 'ancestor', focusgroup: 'none' },
    ])('keeps Calendar arrows with focusgroup="$focusgroup" on the $location', ({ location, focusgroup }) => {
      const { cells, container, getByRole, onSelect, onNavigate } = renderPicker(picker, base);
      (location === 'grid' ? getByRole('grid') : container).setAttribute('focusgroup', focusgroup);
      act(() => cells[0].focus());

      expect(fireEvent.keyDown(cells[0], { key: 'ArrowRight' })).toBe(false);

      expect(cells[1]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
  });
});

describe.each([
  { name: 'base', base: true },
  { name: 'styled', base: false },
])('$name day grid consumer cell handlers', ({ base }) => {
  it('runs cell handlers before navigation and honors their cancellation', () => {
    const onCellKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
    const { cells, onNavigate } = renderPicker('day', base, { onCellKeyDown });
    act(() => cells[0].focus());

    expect(fireEvent.keyDown(cells[0], { key: 'ArrowRight' })).toBe(false);

    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
    expect(cells[0]).toHaveFocus();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('honors cell capture cancellation and still calls the cell keydown once', () => {
    const onCellKeyDownCapture = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
    const onCellKeyDown = jest.fn();
    const { cells } = renderPicker('day', base, { onCellKeyDown, onCellKeyDownCapture });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowRight' });

    expect(cells[0]).toHaveFocus();
    expect(onCellKeyDownCapture).toHaveBeenCalledTimes(1);
    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
  });

  it.each(['Enter', ' '])('honors cell cancellation of %p selection', key => {
    const onCellKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
    const { cells, onSelect } = renderPicker('day', base, { onCellKeyDown });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key });

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not dispatch an arrow again after a synchronous consumer rerender', () => {
    const onAfterRerender = jest.fn();
    const onCellKeyDown = jest.fn(() => {
      flushSync(() => rerenderPicker({ onCellKeyDown: onAfterRerender }));
    });
    const { cells, getAllByRole, rerenderPicker } = renderPicker('day', base, { onCellKeyDown });
    act(() => cells[0].focus());

    fireEvent.keyDown(cells[0], { key: 'ArrowRight' });

    expect(getAllByRole('gridcell').filter(cell => cell.getAttribute('aria-disabled') !== 'true')[0]).toBe(cells[0]);
    expect(cells[1]).toHaveFocus();
    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
    expect(onAfterRerender).not.toHaveBeenCalled();
  });

  it('lets a nested native focusgroup move focus before the cell consumer', () => {
    const order: string[] = [];
    const onCellKeyDownCapture = jest.fn(() => order.push('capture'));
    const onCellKeyDown = jest.fn(() => order.push('consumer'));
    const { cells, onSelect, onNavigate } = renderPicker('day', base, { onCellKeyDown, onCellKeyDownCapture });
    const { group, first, second } = appendFocusgroup(cells[0], 'toolbar inline');
    const nativeOwner = jest.fn((event: KeyboardEvent) => {
      order.push('native');
      if (!event.defaultPrevented) {
        second.focus();
        event.preventDefault();
      }
    });
    group.addEventListener('keydown', nativeOwner);

    try {
      act(() => first.focus());
      expect(fireEvent.keyDown(first, { key: 'ArrowRight' })).toBe(false);

      expect(second).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
      expect(order).toEqual(['capture', 'native', 'consumer']);
    } finally {
      group.removeEventListener('keydown', nativeOwner);
    }
  });

  it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])('leaves modified arrows to the consumer with %s', modifier => {
    const onCellKeyDown = jest.fn();
    const { cells, onNavigate } = renderPicker('day', base, { onCellKeyDown });
    act(() => cells[0].focus());

    expect(fireEvent.keyDown(cells[0], { key: 'ArrowRight', [modifier]: true })).toBe(true);

    expect(cells[0]).toHaveFocus();
    expect(onNavigate).not.toHaveBeenCalled();
    expect(onCellKeyDown).toHaveBeenCalledTimes(1);
    expect(onCellKeyDown.mock.calls[0][0].defaultPrevented).toBe(false);
  });

  it('requests controlled navigation beyond the visible day grid', () => {
    const { cells, onNavigate } = renderPicker('day', base);
    act(() => cells[0].focus());

    expect(fireEvent.keyDown(cells[0], { key: 'ArrowLeft' })).toBe(false);

    expect(cells[0]).toHaveFocus();
    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate.mock.calls[0][1].date).toEqual(new Date(2020, 7, 29));
  });
});
