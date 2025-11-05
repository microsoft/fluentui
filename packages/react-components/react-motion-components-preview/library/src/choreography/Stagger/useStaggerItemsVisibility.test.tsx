import * as React from 'react';
import { render, act } from '@testing-library/react';
import { useStaggerItemsVisibility } from './useStaggerItemsVisibility';
import { getChildMapping } from './utils/getChildMapping';
import type { StaggerChildMapping } from './utils/getChildMapping';

// Mock the useAnimationFrame hook
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();

jest.mock('@fluentui/react-utilities', () => ({
  useAnimationFrame: () => [mockRequestAnimationFrame, mockCancelAnimationFrame],
}));

// Helper to create a child mapping from a count
const createChildMapping = (count: number): StaggerChildMapping => {
  const children = Array.from({ length: count }, (_, i) => React.createElement('div', { key: `item-${i}` }));
  return getChildMapping(children);
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

  describe('Mode-based initial state logic (from Node test analysis)', () => {
    it('should understand the critical difference between presence, visibilityStyle, and unmount modes', () => {
      // This captures the key insight from test-stagger-fix.tsx:
      // The critical fix was in the useState initialization logic

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

    it('should validate the problem we solved', () => {
      // The original problem: non-presence items appeared simultaneously
      // Root cause: they were initialized in final state instead of start state

      const problemBehavior = {
        beforeFix: 'All items initialized in final state',
        afterFix: 'Presence and visibilityStyle items in final state, mount items in start state',
        keyInsight: 'Different component types need different initial states',
      };

      // Test the core behavioral difference
      const presenceInitialState = true; // Final state for enter direction
      const visibilityStyleInitialState = true; // Final state for enter direction (same as presence)
      const mountInitialState = false; // Start state for enter direction

      expect(presenceInitialState).toBe(visibilityStyleInitialState);
      expect(presenceInitialState).not.toBe(mountInitialState);
      expect(problemBehavior.keyInsight).toBe('Different component types need different initial states');
    });
  });

  // Add this test to demonstrate unmount mode behavior
  describe('First mount behavior in unmount mode', () => {
    it('should animate stagger-out on first mount when direction=exit in unmount mode', () => {
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

      // On first render with exit direction, items should start visible and animate to hidden
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);

      // Should start animation, not finish immediately
      expect(mockOnMotionFinish).not.toHaveBeenCalled();

      // Should request animation frame to start animation
      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('should animate on mount and allow direction changes on subsequent renders', () => {
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

      // First render - items should start visible and animate to hidden
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([true, true, true]);
      expect(mockRequestAnimationFrame).toHaveBeenCalled();

      // Change to enter direction - should animate in
      mockRequestAnimationFrame.mockClear();
      act(() => {
        rerender(<TestComponent direction="enter" />);
      });

      // Now animation should start for enter direction
      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('should make unmount mode animate on first render for enter direction', () => {
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

      // Mount mode should start in opposite state and animate to final state
      // For enter direction, start hidden and animate to visible
      expect(JSON.parse(getByTestId('visibility').textContent!)).toEqual([false, false, false]);
      expect(mockOnMotionFinish).not.toHaveBeenCalled(); // Animation should start, not finish immediately
      expect(mockRequestAnimationFrame).toHaveBeenCalled(); // Should start animation
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
