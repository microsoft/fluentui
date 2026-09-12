import {
  getDashboardGridHiddenChromeAriaProps,
  getDashboardGridItemAriaProps,
  getDashboardGridResizeHandleAriaProps,
  getDashboardGridRootAriaProps,
  resolveDashboardGridSemanticProjection,
} from './aria';
import { dashboardGridDataAttributes } from '../interaction/types';

describe('dashboard grid ARIA projection', () => {
  it('uses named group/group semantics and localized spatial descriptions by default', () => {
    expect(getDashboardGridRootAriaProps({ label: 'Sales dashboard' })).toMatchObject({
      role: 'group',
      'aria-label': 'Sales dashboard',
    });
    expect(
      getDashboardGridItemAriaProps({
        rect: { column: 1, row: 2, columnSpan: 3, rowSpan: 4 },
        label: 'Revenue',
        strings: { formatPosition: rect => `Position ${rect.column},${rect.row}` },
      }),
    ).toMatchObject({
      role: 'group',
      'aria-label': 'Revenue',
      'aria-description': 'Position 1,2',
    });
  });

  it('allows coherent list projection and rejects an unprojected ARIA grid', () => {
    expect(resolveDashboardGridSemanticProjection({ rootRole: 'list', itemRole: 'listitem' })).toEqual({
      rootRole: 'list',
      itemRole: 'listitem',
    });

    const onWarning = jest.fn();
    expect(
      resolveDashboardGridSemanticProjection({
        rootRole: 'grid',
        itemRole: 'gridcell',
        hasGridRowProjection: false,
        onWarning,
      }),
    ).toEqual({ rootRole: 'group', itemRole: 'group' });
    expect(onWarning).toHaveBeenCalled();
  });

  it('hides decorative chrome and exposes native localized resize buttons', () => {
    expect(getDashboardGridHiddenChromeAriaProps()).toEqual({ 'aria-hidden': true, tabIndex: -1 });
    expect(
      getDashboardGridResizeHandleAriaProps({
        edge: 'se',
        itemLabel: 'Revenue',
        strings: {
          formatResizeHandle: (edge, label) => `${label} ${edge} handle`,
          formatResizeHandleInstructions: edge => `Activate ${edge}, then use arrows`,
        },
      }),
    ).toMatchObject({
      type: 'button',
      'aria-label': 'Revenue se handle',
      'aria-description': 'Activate se, then use arrows',
      'aria-keyshortcuts': 'Enter Space F2',
      'aria-pressed': false,
      [dashboardGridDataAttributes.resizeHandle]: 'se',
    });
    expect(
      getDashboardGridResizeHandleAriaProps({
        edge: 'se',
        itemLabel: 'Revenue',
        active: true,
      }),
    ).toMatchObject({
      'aria-keyshortcuts': 'ArrowLeft ArrowRight ArrowUp ArrowDown Enter Space Escape',
      'aria-pressed': true,
    });
  });
});
