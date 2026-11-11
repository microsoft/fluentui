import { focusCalendarGrid, getGridCells, getTargetIndex, isEditable, isNestedWidget } from './calendarGrid';

const all = () => true;

describe('calendar grid helpers', () => {
  it.each([
    ['ArrowRight', 5, 6],
    ['ArrowLeft', 5, 4],
    ['ArrowDown', 5, 9],
    ['ArrowUp', 5, 1],
    ['Home', 5, 0],
    ['End', 5, 11],
    ['ArrowRight', 3, undefined],
    ['ArrowLeft', 4, undefined],
  ] as const)('moves %s from %i to %s in a four-column picker grid', (key, from, to) => {
    expect(getTargetIndex(key, false, from, 12, 4, all, false)).toBe(to);
  });

  it('mirrors horizontal arrows in RTL and skips ineligible cells', () => {
    expect(getTargetIndex('ArrowLeft', true, 5, 12, 4, all, false)).toBe(6);
    expect(getTargetIndex('ArrowRight', false, 4, 12, 4, index => index !== 5, false)).toBe(6);
    expect(getTargetIndex('ArrowUp', false, 4, 12, 4, index => index !== 0, false)).toBeUndefined();
  });

  it('ignores keys that do not move focus', () => {
    expect(getTargetIndex('PageUp', false, 5, 12, 4, all, false)).toBeUndefined();
  });

  it('wraps across rows and scopes Home/End to the row in the day grid', () => {
    expect(getTargetIndex('ArrowRight', false, 6, 42, 7, all, true)).toBe(7);
    expect(getTargetIndex('ArrowLeft', false, 7, 42, 7, all, true)).toBe(6);
    expect(getTargetIndex('Home', false, 10, 42, 7, all, true)).toBe(7);
    expect(getTargetIndex('End', false, 10, 42, 7, index => index !== 13, true)).toBe(12);
  });

  it('finds an eligible Home or End target when the current picker cell becomes unavailable', () => {
    const isAfterJuly = (index: number) => index >= 6;
    const isBeforeAugust = (index: number) => index <= 6;

    expect(getTargetIndex('Home', false, 2, 12, 3, isAfterJuly, false)).toBe(6);
    expect(getTargetIndex('End', false, 8, 12, 3, isBeforeAugust, false)).toBe(6);
  });

  it('searches the whole week for Home and End when the focused day is unavailable', () => {
    expect(getTargetIndex('Home', false, 10, 42, 7, index => index > 10, true)).toBe(11);
    expect(getTargetIndex('End', false, 10, 42, 7, index => index < 10, true)).toBe(9);
  });

  it('detects editable content, honoring contenteditable="false"', () => {
    document.body.innerHTML = `
      <input id="input" />
      <div contenteditable="true"><span id="editable"></span></div>
      <div contenteditable="true"><div contenteditable="false"><span id="readonly"></span></div></div>
      <span id="plain"></span>`;
    expect(isEditable(document.getElementById('input'))).toBe(true);
    expect(isEditable(document.getElementById('editable'))).toBe(true);
    expect(isEditable(document.getElementById('readonly'))).toBe(false);
    expect(isEditable(document.getElementById('plain'))).toBe(false);
    expect(isEditable(null)).toBe(false);
  });

  it('collects only the cells a grid owns and recognizes nested widgets', () => {
    document.body.innerHTML = `
      <div id="root">
        <div role="grid" data-fui-calendar-grid id="grid">
          <div role="gridcell" id="own"></div>
          <div role="gridcell">
            <div role="grid" id="nested"><div role="gridcell" id="nestedCell"></div></div>
            <div role="toolbar"><button id="tool"></button></div>
          </div>
        </div>
      </div>`;
    const root = document.getElementById('root')!;
    const cells = getGridCells(document.getElementById('grid')!);
    expect(cells).toHaveLength(2);
    expect(cells[0].id).toBe('own');
    expect(isNestedWidget(document.getElementById('own'), root)).toBe(false);
    expect(isNestedWidget(document.getElementById('nestedCell'), root)).toBe(true);
    expect(isNestedWidget(document.getElementById('tool'), root)).toBe(true);
  });

  it('focuses the tab stop, otherwise the last available navigation button', () => {
    document.body.innerHTML = `
      <div id="calendar">
        <div data-view="day" id="day">
          <button aria-disabled="false" id="previous"></button>
          <button aria-disabled="false" id="next"></button>
          <div role="grid" data-fui-calendar-grid>
            <div role="gridcell" tabindex="-1"></div>
            <div role="gridcell" tabindex="0" id="stop"></div>
          </div>
        </div>
      </div>`;
    expect(focusCalendarGrid(document.getElementById('calendar'))).toBe(true);
    expect(document.activeElement?.id).toBe('stop');

    document.getElementById('stop')!.tabIndex = -1;
    expect(focusCalendarGrid(document.getElementById('day'))).toBe(true);
    expect(document.activeElement?.id).toBe('next');

    expect(focusCalendarGrid(null)).toBe(false);
  });
});
