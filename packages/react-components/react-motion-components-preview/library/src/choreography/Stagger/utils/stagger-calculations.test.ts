import { getStaggerTotalDuration, staggerItemsVisibilityAtTime } from './stagger-calculations';

describe('Stagger Calculations', () => {
  describe('getStaggerTotalDuration', () => {
    it('returns 0 for itemCount <= 0', () => {
      expect(getStaggerTotalDuration({ itemCount: 0 })).toBe(0);
      expect(getStaggerTotalDuration({ itemCount: -1 })).toBe(0);
    });

    it('returns itemDuration for itemCount = 1', () => {
      expect(getStaggerTotalDuration({ itemCount: 1, itemDuration: 300 })).toBe(300);
    });

    it('calculates correct duration for multiple items', () => {
      // 3 items, 100ms delay, 200ms duration
      // Formula: max(0, delay * (count - 1) + itemDuration) = max(0, 100 * 2 + 200) = 400
      expect(getStaggerTotalDuration({ itemCount: 3, itemDelay: 100, itemDuration: 200 })).toBe(400);
    });

    it('uses default values correctly', () => {
      // Uses DEFAULT_ITEM_DELAY=100, DEFAULT_ITEM_DURATION=200
      expect(getStaggerTotalDuration({ itemCount: 3 })).toBe(400);
    });
  });

  describe('staggerItemsVisibilityAtTime - ENTER timing', () => {
    it('shows first item immediately at t=0', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 0,
        itemDelay: 100,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, false, false]);
    });

    it('shows items progressively based on delay', () => {
      // At t=100ms, second item should appear
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 100,
        itemDelay: 100,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, true, false]);
    });

    it('shows all items when elapsed exceeds total stagger time', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 300,
        itemDelay: 100,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, true, true]);
    });
  });

  describe('staggerItemsVisibilityAtTime - EXIT timing', () => {
    it('shows all items initially at t=0 for exit', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 0,
        itemDelay: 100,
        direction: 'exit',
      });

      expect(result.itemsVisibility).toEqual([true, true, true]);
    });

    it('hides items progressively for exit', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 100,
        itemDelay: 100,
        direction: 'exit',
      });

      expect(result.itemsVisibility).toEqual([false, false, true]);
    });

    it('hides all items when exit completes', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 300,
        itemDelay: 100,
        direction: 'exit',
      });

      expect(result.itemsVisibility).toEqual([false, false, false]);
    });

    it('starts first item animation immediately', () => {
      const itemDelay = 500;

      // At t=0: all items visible for exit
      const t0Result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 0,
        itemDelay,
        direction: 'exit',
      });
      expect(t0Result.itemsVisibility).toEqual([true, true, true]);

      // At t=1ms: first item should start hiding immediately
      const t1Result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 1,
        itemDelay,
        direction: 'exit',
      });
      expect(t1Result.itemsVisibility).toEqual([false, true, true]);

      // At t=500ms: first and second items hidden, third still visible
      const t500Result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 500,
        itemDelay,
        direction: 'exit',
      });
      expect(t500Result.itemsVisibility).toEqual([false, false, true]);
    });

    it('has symmetric timing with enter direction', () => {
      const itemDelay = 100;
      const testTimes = [1, 50, 100, 150, 200];

      testTimes.forEach(elapsed => {
        const enterResult = staggerItemsVisibilityAtTime({
          itemCount: 3,
          elapsed,
          itemDelay,
          direction: 'enter',
        });

        const exitResult = staggerItemsVisibilityAtTime({
          itemCount: 3,
          elapsed,
          itemDelay,
          direction: 'exit',
        });

        // Exit should be the logical inverse of enter (after t=0)
        const expectedExitResult = enterResult.itemsVisibility.map(visible => !visible);
        expect(exitResult.itemsVisibility).toEqual(expectedExitResult);
      });
    });
  });

  describe('staggerItemsVisibilityAtTime - REVERSED', () => {
    it('reverses the order for enter direction', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 0,
        itemDelay: 100,
        direction: 'enter',
        reversed: true,
      });

      // With reversed=true, last item appears first
      expect(result.itemsVisibility).toEqual([false, false, true]);
    });

    it('reverses the order for exit direction', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 100,
        itemDelay: 100,
        direction: 'exit',
        reversed: true,
      });

      // With reversed=true, last item disappears first
      expect(result.itemsVisibility).toEqual([true, false, false]);
    });
  });

  describe('staggerItemsVisibilityAtTime - edge cases', () => {
    it('handles itemCount = 0', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 0,
        elapsed: 100,
        itemDelay: 100,
      });

      expect(result.itemsVisibility).toEqual([]);
      expect(result.totalDuration).toBe(0);
    });

    it('handles itemDelay = 0 (all items appear immediately)', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 0,
        itemDelay: 0,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, true, true]);
    });

    it('handles negative itemDelay', () => {
      const result = staggerItemsVisibilityAtTime({
        itemCount: 3,
        elapsed: 0,
        itemDelay: -50,
        direction: 'enter',
      });

      expect(result.itemsVisibility).toEqual([true, true, true]);
    });
  });
});
