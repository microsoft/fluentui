import { asOpaqueNodeKey } from './internalTypes';
import { normalizeItem } from './normalize';

describe('dashboard grid normalization', () => {
  it('lets autoPosition override otherwise valid coordinates', () => {
    const result = normalizeItem(
      { id: 'item', column: 8, row: 4, autoPosition: true },
      { columns: 12, key: asOpaqueNodeKey(1), sequence: 1 },
    );

    expect(result.node).toEqual(
      expect.objectContaining({ x: 0, y: 0, auto: true }),
    );
  });

  it('requests full auto-placement when either coordinate is missing', () => {
    const missingRow = normalizeItem(
      { id: 'row', column: 7 },
      { columns: 12, key: asOpaqueNodeKey(1), sequence: 1 },
    );
    const missingColumn = normalizeItem(
      { id: 'column', row: 7 },
      { columns: 12, key: asOpaqueNodeKey(2), sequence: 2 },
    );

    expect(missingRow.node).toEqual(
      expect.objectContaining({ x: 0, y: 0, auto: true }),
    );
    expect(missingColumn.node).toEqual(
      expect.objectContaining({ x: 0, y: 0, auto: true }),
    );
  });

  it('moves placement inward but shrinks resize overflow', () => {
    const placement = normalizeItem(
      { id: 'placement', column: 4, row: 0, columnSpan: 10 },
      { columns: 12, key: asOpaqueNodeKey(1), sequence: 1 },
    );
    const resize = normalizeItem(
      { id: 'resize', column: 4, row: 0, columnSpan: 10 },
      {
        columns: 12,
        key: asOpaqueNodeKey(2),
        sequence: 2,
        resizing: true,
      },
    );

    expect(placement.node).toEqual(expect.objectContaining({ x: 2, w: 10 }));
    expect(resize.node).toEqual(expect.objectContaining({ x: 4, w: 8 }));
  });

  it('warns for contradictory constraints and lets the minimum win', () => {
    const result = normalizeItem(
      {
        id: 'item',
        columnSpan: 2,
        minColumnSpan: 5,
        maxColumnSpan: 3,
      },
      { columns: 12, key: asOpaqueNodeKey(1), sequence: 1 },
    );

    expect(result.node.w).toBe(5);
    expect(result.diagnostics).toEqual([
      expect.objectContaining({ code: 'contradictory-constraints' }),
    ]);
  });
});
