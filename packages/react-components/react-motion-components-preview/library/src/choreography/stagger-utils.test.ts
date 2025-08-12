import { staggerItemsVisibilityAtTime, getStaggerTotalDuration } from './stagger-utils';

describe('stagger-utils', () => {
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

    it('clamps to itemCount when elapsed time is very large (reversed exit)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 10000, // Very large elapsed time
        itemDelay: 100,
        itemDuration: 200,
        direction: 'exit',
        reversed: true,
      });

      // Should behave correctly even with very large elapsed times
      expect(result.itemsVisibility).toEqual([false, false, false]);
      expect(result.itemsVisibility.length).toBe(3);
    });

    it('handles very large elapsed time gracefully', () => {
      // This test documents that the function behaves reasonably even with
      // elapsed times much larger than the expected stagger duration
      const result = staggerItemsVisibilityAtTime({
        itemCount: 2,
        elapsed: 10000, // Much larger than stagger duration
        itemDelay: 100,
        itemDuration: 200,
        direction: 'enter',
      });

      // All items should be visible, no weird edge cases
      expect(result.itemsVisibility).toEqual([true, true]);
      expect(result.totalDuration).toBe(300); // (2-1)*100 + 200
    });
  });
});
