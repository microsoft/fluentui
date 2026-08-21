import {
  getDashboardGridScreenGeometryStyle,
  getDashboardGridSurfaceBlockSize,
} from './screenGeometry';

describe('DashboardGrid screen geometry', () => {
  it('projects cells to absolute pixel geometry with directional gaps', () => {
    expect(
      getDashboardGridScreenGeometryStyle(
        { column: 2, row: 3, columnSpan: 4, rowSpan: 2 },
        {
          columnWidth: 100,
          rowHeight: 80,
          gapTop: 5,
          gapRight: 5,
          gapBottom: 5,
          gapLeft: 5,
        },
        12,
        80,
      ),
    ).toMatchObject({
      insetInlineStart: 205,
      top: 245,
      width: 390,
      height: 150,
    });
  });

  it('uses deterministic percentages before client measurement', () => {
    expect(
      getDashboardGridScreenGeometryStyle(
        { column: 3, row: 2, columnSpan: 6, rowSpan: 2 },
        {
          columnWidth: 0,
          rowHeight: 0,
          gapTop: 0,
          gapRight: 0,
          gapBottom: 0,
          gapLeft: 0,
        },
        12,
        64,
      ),
    ).toMatchObject({
      insetInlineStart: '25%',
      top: 128,
      width: '50%',
      height: 128,
    });
    expect(
      getDashboardGridSurfaceBlockSize(
        4,
        {
          columnWidth: 0,
          rowHeight: 0,
          gapTop: 0,
          gapRight: 0,
          gapBottom: 0,
          gapLeft: 0,
        },
        64,
      ),
    ).toBe(256);
  });
});
