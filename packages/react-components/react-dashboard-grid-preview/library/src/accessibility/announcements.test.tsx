import * as React from 'react';
import { act, renderHook } from '@testing-library/react';
import { AnnounceProvider } from '@fluentui/react-shared-contexts';
import { useDashboardGridAnnouncements } from './announcements';

describe('dashboard grid announcements', () => {
  it('uses caller localization and deduplicates frequent updates by batch', () => {
    const announce = jest.fn();
    const wrapper = (props: { children?: React.ReactNode }) => (
      <AnnounceProvider value={{ announce }}>{props.children}</AnnounceProvider>
    );
    const { result } = renderHook(
      () =>
        useDashboardGridAnnouncements({
          format: value => (value.type === 'move' ? `Localized ${value.rect.column}` : value.type),
        }),
      { wrapper },
    );

    act(() => {
      result.current.announceDashboardGrid({
        type: 'move',
        itemLabel: 'Revenue',
        rect: { column: 1, row: 0, columnSpan: 1, rowSpan: 1 },
      });
      result.current.announceDashboardGrid({
        type: 'move',
        itemLabel: 'Revenue',
        rect: { column: 1, row: 0, columnSpan: 1, rowSpan: 1 },
      });
      result.current.announceDashboardGrid({
        type: 'move',
        itemLabel: 'Revenue',
        rect: { column: 2, row: 0, columnSpan: 1, rowSpan: 1 },
      });
    });

    expect(announce).toHaveBeenCalledTimes(2);
    expect(announce).toHaveBeenLastCalledWith(
      'Localized 2',
      expect.objectContaining({ batchId: 'dashboard-grid:Revenue:position', polite: true }),
    );
  });
});
