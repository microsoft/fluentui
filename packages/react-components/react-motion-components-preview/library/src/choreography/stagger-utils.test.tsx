import * as React from 'react';
import { render, act } from '@testing-library/react';
import {
  staggerItemsVisibilityAtTime,
  getStaggerTotalDuration,
  toElementArray,
  isFragment,
  childrenOrFragmentToArray,
  useStaggerItemsVisibility,
} from './stagger-utils';

// Mock the useAnimationFrame hook
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();

jest.mock('@fluentui/react-utilities', () => ({
  useAnimationFrame: () => [mockRequestAnimationFrame, mockCancelAnimationFrame],
}));

describe('stagger-utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('toElementArray', () => {
    it('filters out non-ReactElement children', () => {
      const children = [
        React.createElement('div', { key: '1' }),
        'text string',
        42,
        null,
        undefined,
        React.createElement('span', { key: '2' }),
      ];

      const result = toElementArray(children);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
    });

    it('handles empty children', () => {
      expect(toElementArray(null)).toEqual([]);
      expect(toElementArray(undefined)).toEqual([]);
      expect(toElementArray([])).toEqual([]);
    });

    it('handles single ReactElement', () => {
      const element = React.createElement('div', { key: '1' });
      const result = toElementArray(element);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('div');
      expect(result[0].key).toContain('1'); // React adds prefix to keys
    });

    it('flattens nested arrays', () => {
      const children = [
        React.createElement('div', { key: '1' }),
        [React.createElement('span', { key: '2' }), React.createElement('p', { key: '3' })],
      ];

      const result = toElementArray(children);

      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
      expect(result[2].type).toBe('p');
    });
  });

  describe('isFragment', () => {
    it('returns true for React Fragment', () => {
      const fragment = React.createElement(React.Fragment, {}, 'content');
      expect(isFragment(fragment)).toBe(true);
    });

    it('returns false for regular React elements', () => {
      const element = React.createElement('div', {}, 'content');
      expect(isFragment(element)).toBe(false);
    });
  });

  describe('childrenOrFragmentToArray', () => {
    it('extracts children from Fragment', () => {
      const fragmentChildren = [React.createElement('div', { key: '1' }), React.createElement('span', { key: '2' })];
      const fragment = React.createElement(React.Fragment, {}, ...fragmentChildren);

      const result = childrenOrFragmentToArray(fragment);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
    });

    it('handles regular JSX children', () => {
      const children = [React.createElement('div', { key: '1' }), 'text', React.createElement('span', { key: '2' })];

      const result = childrenOrFragmentToArray(children);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
    });

    it('handles empty Fragment', () => {
      const fragment = React.createElement(React.Fragment);
      const result = childrenOrFragmentToArray(fragment);
      expect(result).toEqual([]);
    });

    it('handles mixed content in Fragment', () => {
      const fragmentChildren = [
        React.createElement('div', { key: '1' }),
        'text string',
        null,
        React.createElement('span', { key: '2' }),
      ];
      const fragment = React.createElement(React.Fragment, {}, ...fragmentChildren);

      const result = childrenOrFragmentToArray(fragment);

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('div');
      expect(result[1].type).toBe('span');
    });
  });

  describe('useStaggerItemsVisibility', () => {
    it('sets initial state to final state for enter direction', () => {
      const TestComponent = () => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          itemCount: 3,
          itemDelay: 100,
          direction: 'enter',
        });
        return <div data-testid="visibility">{JSON.stringify(itemsVisibility)}</div>;
      };

      const { getByTestId } = render(<TestComponent />);

      // First render should show final state (all visible for enter)
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);
    });

    it('sets initial state to final state for exit direction', () => {
      const TestComponent = () => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          itemCount: 3,
          itemDelay: 100,
          direction: 'exit',
        });
        return <div data-testid="visibility">{JSON.stringify(itemsVisibility)}</div>;
      };

      const { getByTestId } = render(<TestComponent />);

      // First render should show final state (all hidden for exit)
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([false, false, false]);
    });

    it('calls onMotionFinish on first render', () => {
      const mockOnMotionFinish = jest.fn();

      const TestComponent = () => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          itemCount: 2,
          itemDelay: 100,
          direction: 'enter',
          onMotionFinish: mockOnMotionFinish,
        });
        return <div>{JSON.stringify(itemsVisibility)}</div>;
      };

      render(<TestComponent />);

      expect(mockOnMotionFinish).toHaveBeenCalledTimes(1);
    });

    it('starts animation on parameter change', () => {
      const TestComponent = ({ itemCount }: { itemCount: number }) => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          itemCount,
          itemDelay: 100,
          direction: 'enter',
        });
        return <div data-testid="visibility">{JSON.stringify(itemsVisibility)}</div>;
      };

      const { rerender } = render(<TestComponent itemCount={2} />);

      // First render - no animation frame requested yet
      expect(mockRequestAnimationFrame).not.toHaveBeenCalled();

      // Change parameters to trigger animation
      act(() => {
        rerender(<TestComponent itemCount={3} />);
      });

      // Should request animation frame for parameter change
      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('handles direction change correctly', () => {
      const TestComponent = ({ direction }: { direction: 'enter' | 'exit' }) => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          itemCount: 2,
          itemDelay: 100,
          direction,
        });
        return <div data-testid="visibility">{JSON.stringify(itemsVisibility)}</div>;
      };

      const { getByTestId, rerender } = render(<TestComponent direction="enter" />);

      // Initial state for enter
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true]);

      // Change direction to exit - should start animation from opposite state
      act(() => {
        rerender(<TestComponent direction="exit" />);
      });

      // During animation, should show start state (opposite of final state for exit)
      // For exit, start state is visible (true), will animate to hidden (false)
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true]);
    });

    it('handles itemCount change correctly', () => {
      const TestComponent = ({ itemCount }: { itemCount: number }) => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          itemCount,
          itemDelay: 100,
          direction: 'enter',
        });
        return <div data-testid="visibility">{JSON.stringify(itemsVisibility)}</div>;
      };

      const { getByTestId, rerender } = render(<TestComponent itemCount={2} />);

      // Initial state for 2 items
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true]);

      // Change to 3 items - should start animation from start state
      act(() => {
        rerender(<TestComponent itemCount={3} />);
      });

      // During animation, should show start state (hidden for enter direction)
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([false, false, false]);
    });
  });
  describe('getStaggerTotalDuration', () => {
    it('returns itemDuration for single item', () => {
      expect(getStaggerTotalDuration({ itemCount: 1, itemDelay: 100, itemDuration: 200 })).toBe(200);
    });

    it('calculates correct total for multiple items', () => {
      // 3 items: delays at 0ms, 100ms, 200ms + 150ms duration = 350ms total
      expect(getStaggerTotalDuration({ itemCount: 3, itemDelay: 100, itemDuration: 150 })).toBe(350);
    });

    it('returns 0 for zero items', () => {
      expect(getStaggerTotalDuration({ itemCount: 0, itemDelay: 100, itemDuration: 200 })).toBe(0);
    });
  });

  describe('staggerItemsVisibilityAtTime - ENTER timing', () => {
    const itemDelay = 100;
    const itemDuration = 200;
    const itemCount = 3;

    it('shows first item immediately at t=0', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 0,
        itemDelay,
        itemDuration,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, false, false]);
    });

    it('shows second item at itemDelay (100ms)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 100,
        itemDelay,
        itemDuration,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, true, false]);
    });

    it('shows all items at final stagger time (200ms)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 200,
        itemDelay,
        itemDuration,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, true, true]);
    });

    it('keeps all items visible during itemDuration tail (300ms)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 300,
        itemDelay,
        itemDuration,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, true, true]);
    });

    it('returns correct totalDuration', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 0,
        itemDelay,
        itemDuration,
        direction: 'enter',
      });

      // (3-1) * 100 + 200 = 400ms
      expect(result.totalDuration).toBe(400);
    });
  });

  describe('staggerItemsVisibilityAtTime - EXIT timing', () => {
    const itemDelay = 100;
    const itemDuration = 200;
    const itemCount = 3;

    it('starts with all items visible at t=0', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 0,
        itemDelay,
        itemDuration,
        direction: 'exit',
      });

      expect(result.itemsVisibility).toEqual([true, true, true]);
    });

    it('hides first item at itemDelay (100ms)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 100,
        itemDelay,
        itemDuration,
        direction: 'exit',
      });

      expect(result.itemsVisibility).toEqual([false, true, true]);
    });

    it('hides second item at 2*itemDelay (200ms)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 200,
        itemDelay,
        itemDuration,
        direction: 'exit',
      });

      expect(result.itemsVisibility).toEqual([false, false, true]);
    });

    it('hides all items during itemDuration tail', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 300,
        itemDelay,
        itemDuration,
        direction: 'exit',
      });

      expect(result.itemsVisibility).toEqual([false, false, false]);
    });
  });

  describe('staggerItemsVisibilityAtTime - REVERSED', () => {
    const itemDelay = 100;
    const itemDuration = 0;
    const itemCount = 3;

    it('shows last item first when reversed=true for enter', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 0,
        itemDelay,
        itemDuration,
        direction: 'enter',
        reversed: true,
      });

      expect(result.itemsVisibility).toEqual([false, false, true]);
    });

    it('shows second-to-last item next when reversed=true for enter', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 100,
        itemDelay,
        itemDuration,
        direction: 'enter',
        reversed: true,
      });

      expect(result.itemsVisibility).toEqual([false, true, true]);
    });

    it('hides last item first when reversed=true for exit', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed: 100,
        itemDelay,
        itemDuration,
        direction: 'exit',
        reversed: true,
      });

      expect(result.itemsVisibility).toEqual([true, true, false]);
    });
  });

  describe('staggerItemsVisibilityAtTime - edge cases', () => {
    it('handles zero itemCount', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 0,
        elapsed: 100,
        itemDelay: 100,
        itemDuration: 200,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([]);
      expect(result.totalDuration).toBe(0);
    });

    it('handles single item', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 1,
        elapsed: 0,
        itemDelay: 100,
        itemDuration: 200,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true]);
      expect(result.totalDuration).toBe(200);
    });

    it('handles zero itemDelay (simultaneous)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 0,
        itemDelay: 0,
        itemDuration: 200,
        direction: 'enter',
      });

      // All items should appear immediately when delay is 0
      expect(result.itemsVisibility).toEqual([true, true, true]);
      expect(result.totalDuration).toBe(200);
    });

    it('clamps to itemCount when elapsed time is very large', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 10000, // Very large elapsed time
        itemDelay: 100,
        itemDuration: 200,
        direction: 'enter',
      });

      // Should still only show 3 items, not more
      expect(result.itemsVisibility).toEqual([true, true, true]);
      expect(result.itemsVisibility.length).toBe(3);
    });

    it('clamps to itemCount when elapsed time is very large (exit direction)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 10000, // Very large elapsed time
        itemDelay: 100,
        itemDuration: 200,
        direction: 'exit',
      });

      // Should hide all items when time is very large
      expect(result.itemsVisibility).toEqual([false, false, false]);
      expect(result.itemsVisibility.length).toBe(3);
    });
  });
});
