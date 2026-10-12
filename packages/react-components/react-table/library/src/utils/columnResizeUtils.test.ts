import { createTableColumn } from '../hooks/createColumn';
import type { ColumnWidthState } from '../hooks/types';
import {
  adjustColumnWidthsToFitContainer,
  columnDefinitionsToState,
  getColumnById,
  getColumnByIndex,
  getColumnWidth,
  getLength,
  getTotalWidth,
  setColumnProperty,
} from './columnResizeUtils';

const mockColumnState: ColumnWidthState[] = [
  {
    columnId: 1,
    idealWidth: 150,
    minWidth: 100,
    padding: 16,
    width: 150,
  },
  {
    columnId: 2,
    idealWidth: 200,
    minWidth: 100,
    padding: 16,
    width: 100,
  },
  {
    columnId: 3,
    idealWidth: 150,
    minWidth: 100,
    padding: 16,
    width: 702,
  },
];

// Three columns as `columnDefinitionsToState` creates them when no `columnSizingOptions` are given.
const defaultColumnState: ColumnWidthState[] = [
  { columnId: 1, idealWidth: 150, minWidth: 100, padding: 16, width: 150 },
  { columnId: 2, idealWidth: 150, minWidth: 100, padding: 16, width: 150 },
  { columnId: 3, idealWidth: 150, minWidth: 100, padding: 16, width: 150 },
];

describe('columnResizeUtils', () => {
  describe('getColumnById', () => {
    it('returns proper column', () => {
      expect(getColumnById(mockColumnState, 2)).toMatchInlineSnapshot(`
        Object {
          "columnId": 2,
          "idealWidth": 200,
          "minWidth": 100,
          "padding": 16,
          "width": 100,
        }
      `);
    });
    it('returns undefined when not found', () => {
      expect(getColumnById(mockColumnState, 'no')).toBeUndefined();
    });
  });

  describe('getColumnByIndex', () => {
    it('returns proper column', () => {
      expect(getColumnByIndex(mockColumnState, 2)).toMatchInlineSnapshot(`
        Object {
          "columnId": 3,
          "idealWidth": 150,
          "minWidth": 100,
          "padding": 16,
          "width": 702,
        }
      `);
    });

    it('returns undefined when not found', () => {
      expect(getColumnByIndex(mockColumnState, 5)).toBeUndefined();
    });
  });

  describe('getTotalWidth', () => {
    it('returns correct width', () => {
      expect(getTotalWidth(mockColumnState)).toEqual(1000);
    });
  });

  describe('getLength', () => {
    it('returns correct length', () => {
      expect(getLength(mockColumnState)).toEqual(3);
    });
  });

  describe('getColumnWidth', () => {
    it('returns correct width', () => {
      expect(getColumnWidth(mockColumnState, 3)).toEqual(702);
    });
  });

  describe('setColumnProperty', () => {
    it('returns updated state', () => {
      let newState = setColumnProperty(mockColumnState, 1, 'width', 123);
      newState = setColumnProperty(newState, 1, 'idealWidth', 1250);
      newState = setColumnProperty(newState, 1, 'minWidth', 50);
      newState = setColumnProperty(newState, 1, 'padding', 8);

      expect(newState[0]).toEqual({ ...mockColumnState[0], idealWidth: 1250, minWidth: 50, padding: 8, width: 123 });
      expect(newState[1]).toEqual(mockColumnState[1]);
      expect(newState[2]).toEqual(mockColumnState[2]);
    });

    it("doesn't mutate passed state", () => {
      const newState = setColumnProperty(mockColumnState, 1, 'width', 123);
      expect(newState).not.toEqual(mockColumnState);
    });

    it('gracefully handles invalid columnId', () => {
      const newState = setColumnProperty(mockColumnState, 'invalid', 'width', 123);
      expect(newState).toBe(mockColumnState);
      expect(newState).toEqual(mockColumnState);
    });
  });

  describe('adjustColumnWidthsToFitContainer', () => {
    it("doesn't adjust if they fit", () => {
      const updatedState = adjustColumnWidthsToFitContainer(mockColumnState, 1000);
      expect(updatedState).toEqual(mockColumnState);
    });

    it('increases width of second column (its width is less than ideal), if container got bigger', () => {
      const updatedState = adjustColumnWidthsToFitContainer(mockColumnState, 1050);
      expect(updatedState[0]).toEqual(mockColumnState[0]);
      expect(updatedState[1]).toEqual({ ...mockColumnState[1], width: 150 });
      expect(updatedState[2]).toEqual(mockColumnState[2]);
    });

    it('adjusts the last column if container got smaller', () => {
      const updatedState = adjustColumnWidthsToFitContainer(mockColumnState, 950);
      expect(updatedState[0]).toEqual(mockColumnState[0]);
      expect(updatedState[1]).toEqual(mockColumnState[1]);
      expect(updatedState[2]).toEqual({ ...mockColumnState[2], width: 652 });
    });

    it('adjusts the previous columns accordingly, if the container got even smaller', () => {
      const updatedState = adjustColumnWidthsToFitContainer(mockColumnState, 380);

      expect(updatedState[0]).toEqual({ ...mockColumnState[0], width: 132 });
      expect(updatedState[1]).toEqual(mockColumnState[1]);
      expect(updatedState[2]).toEqual({ ...mockColumnState[2], width: 100 });
    });

    it('adjusts the columns to their min widths, if the container got down to 0', () => {
      const updatedState = adjustColumnWidthsToFitContainer(mockColumnState, 0);
      expect(updatedState[0].width).toEqual(updatedState[0].minWidth);
      expect(updatedState[1].width).toEqual(updatedState[1].minWidth);
      expect(updatedState[2].width).toEqual(updatedState[2].minWidth);
    });

    it(`adjusts columns to their ideal widths from minimum,
    if container got big enough, plus last col takes the rest`, () => {
      let updatedState = adjustColumnWidthsToFitContainer(mockColumnState, 0);
      updatedState = adjustColumnWidthsToFitContainer(updatedState, 1500);
      expect(updatedState[0].width).toEqual(updatedState[0].idealWidth);
      expect(updatedState[1].width).toEqual(updatedState[1].idealWidth);
      expect(updatedState[2].width).toEqual(1102);
    });
  });

  describe('adjustColumnWidthsToFitContainer with the even distribution', () => {
    it('gives every column the same width when their ideal widths are the same', () => {
      const updatedState = adjustColumnWidthsToFitContainer(defaultColumnState, 1000, 'even');

      expect(updatedState[0].width).toEqual(updatedState[1].width);
      expect(updatedState[1].width).toEqual(updatedState[2].width);
    });

    it('never shrinks a column below its minimal width', () => {
      const updatedState = adjustColumnWidthsToFitContainer(defaultColumnState, 300, 'even');

      expect(updatedState[0].width).toEqual(100);
      expect(updatedState[1].width).toEqual(100);
      expect(updatedState[2].width).toEqual(100);
    });

    it('keeps the columns untouched until the container has been measured', () => {
      const updatedState = adjustColumnWidthsToFitContainer(defaultColumnState, 0, 'even');

      expect(updatedState).toBe(defaultColumnState);
    });

    it('keeps a column the user resized at the width they chose and shares the rest between the others', () => {
      // `setColumnWidth` stores a deliberate width as the ideal width of the column.
      const resizedState = setColumnProperty(
        setColumnProperty(defaultColumnState, 2, 'width', 500),
        2,
        'idealWidth',
        500,
      );

      const updatedState = adjustColumnWidthsToFitContainer(resizedState, 1000, 'even', new Set([2]));

      expect(updatedState[1].width).toEqual(500);
      expect(updatedState[0].width).toEqual(226);
      expect(updatedState[2].width).toEqual(226);
    });

    it('shrinks a column the user resized when the container cannot fit every column', () => {
      const resizedState = setColumnProperty(
        setColumnProperty(defaultColumnState, 2, 'width', 500),
        2,
        'idealWidth',
        500,
      );

      const updatedState = adjustColumnWidthsToFitContainer(resizedState, 400, 'even', new Set([2]));

      expect(updatedState[0].width).toEqual(100);
      expect(updatedState[1].width).toEqual(152);
      expect(updatedState[2].width).toEqual(100);
    });

    it('fills the whole container', () => {
      const updatedState = adjustColumnWidthsToFitContainer(defaultColumnState, 1000, 'even');

      expect(getTotalWidth(updatedState)).toBeCloseTo(1000);
    });

    it('fills the whole container even when every column has been resized', () => {
      // Once every column is deliberately sized, no column is pinned against the others anymore -
      // they simply share the container again, so no dead space appears after the last column.
      const everyColumnResized: ColumnWidthState[] = [
        { columnId: 1, idealWidth: 300, minWidth: 100, padding: 16, width: 300 },
        { columnId: 2, idealWidth: 250, minWidth: 100, padding: 16, width: 250 },
        { columnId: 3, idealWidth: 200, minWidth: 100, padding: 16, width: 200 },
      ];

      const updatedState = adjustColumnWidthsToFitContainer(everyColumnResized, 1000, 'even', new Set([1, 2, 3]));

      expect(getTotalWidth(updatedState)).toBeCloseTo(1000);
      const growth = updatedState.map((column, index) => column.width - everyColumnResized[index].idealWidth);
      expect(growth[0]).toBeCloseTo(growth[1]);
      expect(growth[1]).toBeCloseTo(growth[2]);
    });

    it('stops growing a resized column once the other columns are at their minimal widths', () => {
      const resizedState: ColumnWidthState[] = [
        { columnId: 1, idealWidth: 300, minWidth: 100, padding: 16, width: 300 },
        { columnId: 2, idealWidth: 150, minWidth: 100, padding: 16, width: 150 },
        { columnId: 3, idealWidth: 150, minWidth: 100, padding: 16, width: 150 },
      ];

      const updatedState = adjustColumnWidthsToFitContainer(resizedState, 498, 'even', new Set([1]));

      expect(updatedState[0].width).toEqual(250);
      expect(updatedState[1].width).toEqual(100);
      expect(updatedState[2].width).toEqual(100);
    });

    it('keeps a resized column at the width the user chose while the other columns can still shrink', () => {
      const resizedState: ColumnWidthState[] = [
        { columnId: 1, idealWidth: 250, minWidth: 100, padding: 16, width: 250 },
        { columnId: 2, idealWidth: 150, minWidth: 100, padding: 16, width: 150 },
        { columnId: 3, idealWidth: 150, minWidth: 100, padding: 16, width: 150 },
      ];

      const updatedState = adjustColumnWidthsToFitContainer(resizedState, 498, 'even', new Set([1]));

      expect(updatedState[0].width).toEqual(250);
      expect(updatedState[1].width).toEqual(100);
      expect(updatedState[2].width).toEqual(100);
    });

    it('shares the space equally between columns with different ideal widths', () => {
      const unequalColumnState: ColumnWidthState[] = [
        { columnId: 1, idealWidth: 100, minWidth: 50, padding: 16, width: 100 },
        { columnId: 2, idealWidth: 200, minWidth: 50, padding: 16, width: 200 },
        { columnId: 3, idealWidth: 300, minWidth: 50, padding: 16, width: 300 },
      ];

      const updatedState = adjustColumnWidthsToFitContainer(unequalColumnState, 1000, 'even');

      const growth = updatedState.map((column, index) => column.width - unequalColumnState[index].idealWidth);
      expect(growth[0]).toBeCloseTo(growth[1]);
      expect(growth[1]).toBeCloseTo(growth[2]);
      expect(getTotalWidth(updatedState)).toBeCloseTo(1000);
    });

    it('respects a minimal width that is larger than the ideal width', () => {
      const narrowIdealColumnState: ColumnWidthState[] = [
        { columnId: 1, idealWidth: 100, minWidth: 200, padding: 16, width: 100 },
        ...defaultColumnState.slice(1),
      ];

      const updatedState = adjustColumnWidthsToFitContainer(narrowIdealColumnState, 400, 'even');

      expect(updatedState[0].width).toEqual(200);
      expect(updatedState[1].width).toEqual(100);
      expect(updatedState[2].width).toEqual(100);
    });

    it('gives the whole container to a single column', () => {
      const updatedState = adjustColumnWidthsToFitContainer(defaultColumnState.slice(0, 1), 1000, 'even');

      expect(updatedState[0].width).toEqual(984);
    });

    it('handles a table without any columns', () => {
      expect(adjustColumnWidthsToFitContainer([], 1000, 'even')).toEqual([]);
    });

    it('leaves the state untouched when the columns already fit exactly', () => {
      const updatedState = adjustColumnWidthsToFitContainer(defaultColumnState, 498, 'even');

      expect(updatedState).toBe(defaultColumnState);
    });

    it('returns the same widths when it runs again on its own result', () => {
      const updatedState = adjustColumnWidthsToFitContainer(defaultColumnState, 1000, 'even');

      expect(adjustColumnWidthsToFitContainer(updatedState, 1000, 'even')).toBe(updatedState);
    });

    it('returns the same widths when it runs again on its own result with a resized column', () => {
      const resizedState = setColumnProperty(
        setColumnProperty(defaultColumnState, 2, 'width', 500),
        2,
        'idealWidth',
        500,
      );

      const updatedState = adjustColumnWidthsToFitContainer(resizedState, 1000, 'even', new Set([2]));

      expect(adjustColumnWidthsToFitContainer(updatedState, 1000, 'even', new Set([2]))).toBe(updatedState);
    });
  });

  describe('columnDefinitionsToState', () => {
    it('default state for new columns', () => {
      const columns = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const newState = columnDefinitionsToState(columns);
      expect(newState).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 2,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 3,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
        ]
      `);
    });

    it(`add a column width default state to existing state adds it to the state
    and resets widths which are not ideal`, () => {
      const columns = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
        createTableColumn({ columnId: 'new' }),
      ];
      const newState = columnDefinitionsToState(columns, mockColumnState);
      expect(newState).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 2,
            "idealWidth": 200,
            "minWidth": 100,
            "padding": 16,
            "width": 100,
          },
          Object {
            "columnId": 3,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": "new",
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
        ]
      `);
    });

    it('removing columns from the column definition results in their removal from the state', () => {
      const columns = [createTableColumn({ columnId: 'new' })];
      const newState = columnDefinitionsToState(columns, mockColumnState);
      expect(newState).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": "new",
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
        ]
      `);
    });
  });
});
