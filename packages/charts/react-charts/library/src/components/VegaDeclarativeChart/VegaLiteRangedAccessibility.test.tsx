import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { VegaDeclarativeChart } from '../../index';
import type { VegaLiteSpec } from './VegaLiteTypes';

beforeEach(() => {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 640,
    height: 400,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: 400,
    right: 640,
    toJSON: () => ({}),
  });
});
afterEach(() => jest.restoreAllMocks());

describe.each(['legacy', 'strict'] as const)('public ranged accessible projections in %s mode', mode => {
  describe.each(['unit', 'layer', 'concat'] as const)('%s view', view => {
    it.each(['excluded', 'filtered', 'partial'] as const)(
      'retains the %s projection without geometry leakage',
      projection => {
        // Exercise JSON field-level inclusion metadata (not declared on the narrow encoding facade).
        const excluded = { tooltip: false };
        const spec: VegaLiteSpec = {
          mark: 'rect',
          width: 640,
          height: 400,
          data: { values: [{ start: 13, end: 17, bottom: 19, top: 23, secret: 'private-series', public: 'safe' }] },
          encoding: {
            x: { field: 'start', type: 'quantitative', ...excluded },
            x2: { field: 'end', ...excluded },
            y: { field: 'bottom', type: 'quantitative', ...excluded },
            y2: { field: 'top', ...excluded },
            color: { field: 'secret', type: 'nominal', legend: null, ...excluded },
            ...(projection === 'excluded'
              ? {}
              : {
                  tooltip: [
                    {
                      field: 'public',
                      title: 'Public',
                      ...(projection === 'filtered' ? { filter: { equal: 'excluded' } } : {}),
                    },
                  ],
                }),
          },
        };
        const { mark, ...parent } = spec;
        const input: VegaLiteSpec =
          view === 'unit' ? spec : view === 'layer' ? { ...parent, layer: [{ mark: mark! }] } : { hconcat: [spec] };
        const onDiagnostics = jest.fn();
        const { container } = render(
          <VegaDeclarativeChart
            chartSchema={{ vegaLiteSpec: input }}
            semanticMode={mode}
            onDiagnostics={onDiagnostics}
          />,
        );
        expect(onDiagnostics).toHaveBeenLastCalledWith([]);
        const marks = container.querySelectorAll('[data-ranged-mark]');
        expect(marks).toHaveLength(1);
        const path = marks[0];
        expect(path).toHaveAttribute('aria-label', projection === 'partial' ? 'Public: safe' : 'Data point');
        expect(path.getAttribute('aria-label')).not.toMatch(/start|end|bottom|top|secret|private-series|13|17|19|23/);
        fireEvent.focus(path);
        fireEvent.mouseEnter(path);
        if (projection === 'partial') {
          expect(screen.getByRole('tooltip')).toHaveTextContent('Public');
          expect(screen.getByRole('tooltip')).toHaveTextContent('safe');
          expect(screen.getByRole('tooltip')).not.toHaveTextContent('private-series');
        } else {
          expect(screen.queryByRole('tooltip')).toBeNull();
          expect(path).not.toHaveAttribute('aria-describedby');
        }
      },
    );
  });
});
