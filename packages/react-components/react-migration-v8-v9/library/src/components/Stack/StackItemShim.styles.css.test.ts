import { useStackItemShimStyles, useFlexGrowStyles, useFlexOrderStyles } from './StackItemShim.styles.css';

jest.mock('./StackItemShim.module.css', () => ({ root: 'root', grow1: 'grow1', orderMinus1: 'order-1' }));

describe('StackItemShim styles (CSS Modules)', () => {
  it('returns class names', () => {
    expect(useStackItemShimStyles().root).toBe('root');
    expect(useFlexGrowStyles()['1']).toBe('grow1');
    expect(useFlexOrderStyles()['-1']).toBe('order-1');
  });
});
