import { createTableColumn } from '../hooks/createColumn';
import { ColumnWidthState } from '../hooks/types';
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
