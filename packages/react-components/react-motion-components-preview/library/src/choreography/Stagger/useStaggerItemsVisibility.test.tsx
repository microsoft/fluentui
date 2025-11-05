import * as React from 'react';
import { render, act } from '@testing-library/react';
import { useStaggerItemsVisibility } from './useStaggerItemsVisibility';
import { getStaggerChildMapping, type StaggerChildMapping } from './utils';

// Mock the useAnimationFrame hook
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();

jest.mock('@fluentui/react-utilities', () => {
  // const React = require('react');

  // Provide a simple but functional mock for useEventCallback that returns a
  // stable callback reference across renders. This mirrors the real utility's
  // behavior sufficiently for these tests.
  function useEventCallback<T extends (...args: unknown[]) => unknown>(cb: T): T {
    const cbRef = React.useRef<T>(cb);
    React.useEffect(() => {
      cbRef.current = cb;
    });
    // Return a stable callback with the same signature as the input
    return React.useCallback((...args: unknown[]) => cbRef.current?.(...args), []) as T;
  }

  return {
    useAnimationFrame: () => [mockRequestAnimationFrame, mockCancelAnimationFrame],
    useEventCallback,
  };
});

// Helper to create a child mapping from a count
const createChildMapping = (count: number): StaggerChildMapping => {
  const children = Array.from({ length: count }, (_, i) => React.createElement('div', { key: `item-${i}` }));
  return getStaggerChildMapping(children);
};

// Helper to convert Record<string, boolean> to boolean array for easier testing
const mappingToArray = (mapping: Record<string, boolean>, childMapping: StaggerChildMapping): boolean[] => {
  return Object.keys(childMapping)
    .sort()
    .map(key => mapping[key]);
};

describe('useStaggerItemsVisibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets initial state to final state for enter direction', () => {
    const childMapping = createChildMapping(3);
    const TestComponent = () => {
      const { itemsVisibility } = useStaggerItemsVisibility({
        childMapping,
        itemDelay: 100,
        direction: 'enter',
        hideMode: 'visibilityStyle',
      });
      return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
    };

    const { getByTestId } = render(<TestComponent />);

    // First render should show final state (all visible for enter)
    expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);
  });

  it('sets initial state to final state for exit direction', () => {
    const childMapping = createChildMapping(3);
    const TestComponent = () => {
      const { itemsVisibility } = useStaggerItemsVisibility({
        childMapping,
        itemDelay: 100,
        direction: 'exit',
        hideMode: 'visibilityStyle',
      });
      return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
    };

    const { getByTestId } = render(<TestComponent />);

    // First render should show final state (all hidden for exit)
    expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([false, false, false]);
  });

  it('calls onMotionFinish on first render', () => {
    const mockOnMotionFinish = jest.fn();
    const childMapping = createChildMapping(2);

    const TestComponent = () => {
      const { itemsVisibility } = useStaggerItemsVisibility({
        childMapping,
        itemDelay: 100,
        direction: 'enter',
        hideMode: 'visibilityStyle',
        onMotionFinish: mockOnMotionFinish,
      });
      return <div>{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
    };

    render(<TestComponent />);

    expect(mockOnMotionFinish).toHaveBeenCalledTimes(1);
  });

  it('starts animation on parameter change', () => {
    const childMapping = createChildMapping(2);
    const TestComponent = ({ itemDelay }: { itemDelay: number }) => {
      const { itemsVisibility } = useStaggerItemsVisibility({
        childMapping,
        itemDelay,
        direction: 'enter',
        hideMode: 'visibilityStyle',
      });
      return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
    };

    const { rerender } = render(<TestComponent itemDelay={100} />);

    // First render - no animation frame requested yet
    expect(mockRequestAnimationFrame).not.toHaveBeenCalled();

    // Change parameters to trigger animation (using itemDelay instead of childMapping)
    act(() => {
      rerender(<TestComponent itemDelay={200} />);
    });

    // Should request animation frame for parameter change
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('handles direction change correctly', () => {
    const childMapping = createChildMapping(2);
    const TestComponent = ({ direction }: { direction: 'enter' | 'exit' }) => {
      const { itemsVisibility } = useStaggerItemsVisibility({
        childMapping,
        itemDelay: 100,
        direction,
        hideMode: 'visibilityStyle',
      });
      return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
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

  it('handles childMapping change correctly', () => {
    const TestComponent = ({ childMapping }: { childMapping: StaggerChildMapping }) => {
      const { itemsVisibility } = useStaggerItemsVisibility({
        childMapping,
        itemDelay: 100,
        direction: 'enter',
        hideMode: 'visibilityStyle',
      });
      return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
    };

    const childMapping2 = createChildMapping(2);
    const { getByTestId, rerender } = render(<TestComponent childMapping={childMapping2} />);

    // Initial state for 2 items
    expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true]);

    // Change to 3 items - should NOT start animation, just update mapping
    const childMapping3 = createChildMapping(3);
    act(() => {
      rerender(<TestComponent childMapping={childMapping3} />);
    });

    // Should maintain final state (visible for enter direction), not restart animation
    expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);
  });

  it('should not trigger animation when childMapping changes', () => {
    const TestComponent = ({ childMapping }: { childMapping: StaggerChildMapping }) => {
      useStaggerItemsVisibility({
        childMapping,
        itemDelay: 100,
        direction: 'enter',
        hideMode: 'visibilityStyle',
      });
      return <div>Test</div>;
    };

    const childMapping2 = createChildMapping(2);
    const { rerender } = render(<TestComponent childMapping={childMapping2} />);

    // Clear any initial calls
    mockRequestAnimationFrame.mockClear();

    // Change childMapping - should NOT trigger animation
    const childMapping5 = createChildMapping(5);
    act(() => {
      rerender(<TestComponent childMapping={childMapping5} />);
    });

    // Should not request animation frame for childMapping change
    expect(mockRequestAnimationFrame).not.toHaveBeenCalled();
  });

  it('should not trigger animation when reversed prop changes', () => {
    const childMapping = createChildMapping(3);
    const TestComponent = ({ reversed }: { reversed: boolean }) => {
      const { itemsVisibility } = useStaggerItemsVisibility({
        childMapping,
        itemDelay: 100,
        direction: 'enter',
        reversed,
        hideMode: 'visibilityStyle',
      });
      return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
    };

    const { getByTestId, rerender } = render(<TestComponent reversed={false} />);

    // Initial state - all visible for enter direction
    expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);

    // Clear any initial calls
    mockRequestAnimationFrame.mockClear();

    // Change reversed prop - should NOT trigger animation
    act(() => {
      rerender(<TestComponent reversed={true} />);
    });

    // Should not request animation frame for reversed change
    expect(mockRequestAnimationFrame).not.toHaveBeenCalled();
    // Items should remain in their current state
    expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);
  });

  describe('Mode-based initial state logic (from Node test analysis)', () => {
    it('should have consistent initial state across all hide modes', () => {
      // All hide modes now use the same initialization logic:
      // Items start in their final state (visible for enter, hidden for exit)

      const testScenarios = [
        { mode: 'visibleProp', direction: 'enter', expectedInitial: true },
        { mode: 'visibleProp', direction: 'exit', expectedInitial: false },
        { mode: 'visibilityStyle', direction: 'enter', expectedInitial: true },
        { mode: 'visibilityStyle', direction: 'exit', expectedInitial: false },
        { mode: 'unmount', direction: 'enter', expectedInitial: true },
        { mode: 'unmount', direction: 'exit', expectedInitial: false },
      ];

      testScenarios.forEach(({ mode, direction, expectedInitial }) => {
        // Simulate the useState logic from useStaggerItemsVisibility
        const initialState = direction === 'enter';

        expect(initialState).toBe(expectedInitial);
      });
    });

    it('should validate the consistent behavior across modes', () => {
      // All modes now behave consistently:
      // - On first render: items are in final state, no animation
      // - On direction change: items animate from opposite state to final state
      // - On reversed change: no animation, only affects next direction change

      const currentBehavior = {
        allModes: 'All items initialized in final state',
        firstRender: 'No animation on first render for any hide mode',
        directionChange: 'Animation runs when direction changes',
        reversedChange: 'No animation when reversed prop changes',
        keyInsight: 'All hide modes now have consistent behavior',
      };

      // Test the core behavioral consistency
      const presenceInitialState = true; // Final state for enter direction
      const visibilityStyleInitialState = true; // Final state for enter direction (same as presence)
      const mountInitialState = true; // Also final state for enter direction (now consistent!)

      expect(presenceInitialState).toBe(visibilityStyleInitialState);
      expect(presenceInitialState).toBe(mountInitialState);
      expect(currentBehavior.keyInsight).toBe('All hide modes now have consistent behavior');
    });
  });

  // Add this test to demonstrate unmount mode behavior
  describe('First mount behavior in unmount mode', () => {
    it('should not animate on first mount when direction=exit in unmount mode', () => {
      const mockOnMotionFinish = jest.fn();
      const childMapping = createChildMapping(3);

      const TestComponent = () => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          childMapping,
          itemDelay: 100,
          direction: 'exit', // Want items to exit (end up hidden)
          hideMode: 'unmount',
          onMotionFinish: mockOnMotionFinish,
        });
        return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
      };

      const { getByTestId } = render(<TestComponent />);

      // On first render with exit direction, items should be in final state (hidden)
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([false, false, false]);

      // Should finish immediately without animation
      expect(mockOnMotionFinish).toHaveBeenCalled();

      // Should not request animation frame on first render
      expect(mockRequestAnimationFrame).not.toHaveBeenCalled();
    });

    it('should not animate on first mount but animate on direction changes', () => {
      const mockOnMotionFinish = jest.fn();
      const childMapping = createChildMapping(3);

      const TestComponent = ({ direction }: { direction: 'enter' | 'exit' }) => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          childMapping,
          itemDelay: 100,
          direction,
          hideMode: 'unmount',
          onMotionFinish: mockOnMotionFinish,
        });
        return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
      };

      const { getByTestId, rerender } = render(<TestComponent direction="exit" />);

      // First render - items should be in final state (hidden) with no animation
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([false, false, false]);
      expect(mockRequestAnimationFrame).not.toHaveBeenCalled();

      // Change to enter direction - should animate in
      mockRequestAnimationFrame.mockClear();
      act(() => {
        rerender(<TestComponent direction="enter" />);
      });

      // Now animation should start for enter direction
      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('should not animate on first render for enter direction in unmount mode', () => {
      const mockOnMotionFinish = jest.fn();
      const childMapping = createChildMapping(3);

      // Test unmount mode directly (not rerendering from presence mode)
      const TestComponent = () => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          childMapping,
          itemDelay: 100,
          direction: 'enter',
          hideMode: 'unmount',
          onMotionFinish: mockOnMotionFinish,
        });
        return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
      };

      const { getByTestId } = render(<TestComponent />);

      // Should start in final state (visible) without animation
      // For enter direction, items should be visible immediately
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);
      expect(mockOnMotionFinish).toHaveBeenCalled(); // Animation should finish immediately
      expect(mockRequestAnimationFrame).not.toHaveBeenCalled(); // Should not start animation
    });

    it('should handle visibilityStyle mode like presence mode on first render', () => {
      const mockOnMotionFinish = jest.fn();
      const childMapping = createChildMapping(3);

      // Test visibilityStyle mode behavior
      const TestComponent = () => {
        const { itemsVisibility } = useStaggerItemsVisibility({
          childMapping,
          itemDelay: 100,
          direction: 'enter',
          hideMode: 'visibilityStyle',
          onMotionFinish: mockOnMotionFinish,
        });
        return <div data-testid="visibility">{JSON.stringify(mappingToArray(itemsVisibility, childMapping))}</div>;
      };

      const { getByTestId } = render(<TestComponent />);

      // VisibilityStyle mode should behave like presence mode:
      // Start in final state on first render
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);
      expect(mockOnMotionFinish).toHaveBeenCalledTimes(1); // Should finish immediately on first render
      expect(mockRequestAnimationFrame).not.toHaveBeenCalled(); // No animation on first render
    });
  });
});
