import type { VegaLiteSpec, VegaLiteAggregate } from '../../VegaLiteTypes';

export function aggregateSpec(aggregate: VegaLiteAggregate = 'median'): VegaLiteSpec {
  return {
    mark: 'bar',
    data: {
      values: [
        { category: 'A', amount: 1 },
        { category: 'A', amount: 3 },
        { category: 'A', amount: 8 },
        { category: 'A', amount: null },
        { category: 'B', amount: 10 },
        { category: 'B', amount: 20 },
      ],
    },
    encoding: {
      x: { field: 'category', type: 'nominal' },
      y: { field: 'amount', type: 'quantitative', aggregate },
    },
  };
}

export function stackSpec(stack: 'zero' | 'normalize' | 'center' | null = 'zero'): VegaLiteSpec {
  return {
    mark: 'bar',
    data: {
      values: [
        { category: 'A', group: 'second', amount: 3 },
        { category: 'A', group: 'first', amount: 1 },
        { category: 'B', group: 'second', amount: 2 },
        { category: 'B', group: 'first', amount: 2 },
      ],
    },
    encoding: {
      x: { field: 'category', type: 'nominal' },
      y: { field: 'amount', type: 'quantitative', stack, axis: { format: '.0%' } },
      color: { field: 'group', type: 'nominal', scale: { domain: ['first', 'second'] } },
    },
  };
}

export function tooltipSpec(): VegaLiteSpec {
  return {
    mark: 'line',
    data: {
      values: [
        { x: 1, y: 2, group: 'one', label: 'first row', private: 'SECRET' },
        { x: 2, y: 4, group: 'one', label: 'second row', private: 'SECRET' },
        { x: 1, y: 6, group: 'two', label: 'other series', private: 'SECRET' },
      ],
    },
    encoding: {
      x: { field: 'x', type: 'quantitative' },
      y: { field: 'y', type: 'quantitative' },
      color: { field: 'group', type: 'nominal' },
      tooltip: [
        { field: 'label', title: 'Label' },
        { field: 'y', type: 'quantitative', title: 'Amount', format: '.2f' },
        { field: 'private', tooltip: false },
        { field: 'x', filter: { gt: 1 }, title: 'Later' },
      ],
    },
  };
}

export function freezeSpec<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(Object.getOwnPropertyDescriptors(value)).forEach(descriptor => {
      if ('value' in descriptor) {
        freezeSpec(descriptor.value);
      }
    });
    Object.freeze(value);
  }
  return value;
}

export function layeredEmaSpec(): VegaLiteSpec {
  return {
    width: 650,
    height: 350,
    data: {
      values: [
        { x: 1, amount: 2 },
        { x: 1, amount: 6 },
        { x: 2, amount: 4 },
        { x: 2, amount: 8 },
      ],
    },
    encoding: { x: { field: 'x', type: 'quantitative' } },
    layer: [
      {
        mark: 'line',
        encoding: {
          y: { field: 'amount', aggregate: { exponential: 0.5 }, type: 'quantitative' },
          tooltip: [
            { field: 'amount', aggregate: { exponential: 0.5 }, title: 'EMA', type: 'quantitative', format: '.2f' },
          ],
        },
      },
      {
        mark: 'line',
        transform: [{ calculate: 'datum.amount * 2', as: 'doubled' }],
        encoding: {
          y: { field: 'doubled', aggregate: { exponentialb: 0.5 }, type: 'quantitative' },
          tooltip: [
            {
              field: 'doubled',
              aggregate: { exponentialb: 0.5 },
              title: 'Overlay',
              type: 'quantitative',
              format: '.2f',
            },
          ],
        },
      },
    ],
  };
}

export function categoricalDomainSpec(): VegaLiteSpec {
  return {
    mark: 'line',
    data: {
      values: [
        { x: 'A', y: 'low' },
        { x: 'B', y: 'high' },
      ],
    },
    encoding: {
      x: { field: 'x', type: 'nominal', scale: { domain: ['B', 'empty', 'A'] } },
      y: { field: 'y', type: 'ordinal', scale: { domain: ['high', 'empty', 'low'] } },
      tooltip: [
        { field: 'x', title: 'Category' },
        { field: 'y', title: 'Level' },
      ],
    },
  };
}
