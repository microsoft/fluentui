import { motionTokens } from '@fluentui/react-motion';
import type { AtomMotion } from '@fluentui/react-motion';
import { Collapse } from './Collapse';

// Helper to extract the presence function from the component
function getPresenceMotionFunction(
  component: unknown,
): ((opts: Record<string, unknown>) => { enter: AtomMotion[]; exit: AtomMotion[] }) | null {
  const obj = component as Record<PropertyKey, unknown>;
  const symbols = Object.getOwnPropertySymbols(obj as object);
  for (const symbol of symbols) {
    if (symbol.toString() === 'Symbol(PRESENCE_MOTION_DEFINITION)') {
      const val = obj[symbol];
      return val as (opts: Record<string, unknown>) => { enter: AtomMotion[]; exit: AtomMotion[] };
    }
  }
  return null;
}

// Mock element for testing
const createMockElement = (scrollWidth = 200, scrollHeight = 100): HTMLElement => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'scrollWidth', { value: scrollWidth, configurable: true });
  Object.defineProperty(element, 'scrollHeight', { value: scrollHeight, configurable: true });
  return element;
};

describe('collapsePresenceFn', () => {
  let collapsePresenceFn: (opts: Record<string, unknown>) => { enter: AtomMotion[]; exit: AtomMotion[] };
  let mockElement: HTMLElement;

  beforeEach(() => {
    collapsePresenceFn = getPresenceMotionFunction(Collapse) as (opts: Record<string, unknown>) => {
      enter: AtomMotion[];
      exit: AtomMotion[];
    };
    mockElement = createMockElement();
  });

  describe('parameter defaulting cascade', () => {
    it('applies primary duration defaults correctly', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        duration: 300,
      });

      // Size atoms should use sizeDuration (defaults to duration)
      expect(motion.enter[0]).toMatchObject({ duration: 300 }); // sizeEnterAtom
      expect(motion.enter[1]).toMatchObject({ duration: 300 }); // whitespaceAtom

      // Opacity atom should use opacityDuration (defaults to sizeDuration)
      expect(motion.enter[2]).toMatchObject({ duration: 300 }); // fadeAtom
    });

    it('cascades granular duration defaults correctly', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        duration: 200,
        sizeDuration: 250,
      });

      // Size atoms should use sizeDuration
      expect(motion.enter[0]).toMatchObject({ duration: 250 });
      expect(motion.enter[1]).toMatchObject({ duration: 250 });

      // Opacity atom should default to sizeDuration
      expect(motion.enter[2]).toMatchObject({ duration: 250 });
    });

    it('applies symmetric exit defaults', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        duration: 300,
        easing: 'ease-in',
        delay: 100,
        staggerDelay: 50,
      });

      // Exit should default to enter values
      expect(motion.exit[0]).toMatchObject({
        duration: 300, // exitOpacityDuration defaults to exitSizeDuration
        easing: 'ease-in', // exitEasing defaults to easing
        delay: 100, // exitDelay defaults to delay
      });

      expect(motion.exit[1]).toMatchObject({
        duration: 300, // exitSizeDuration defaults to exitDuration
        easing: 'ease-in',
        delay: 150, // exitDelay + exitStaggerDelay (defaults to staggerDelay)
      });
    });
  });

  describe('atom composition', () => {
    it('includes size and whitespace atoms for both directions', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        animateOpacity: false,
      });

      // Enter: size + whitespace (no opacity)
      expect(motion.enter).toHaveLength(2);
      expect(motion.enter[0].keyframes[0]).toHaveProperty('maxHeight'); // size atom
      expect(motion.enter[1].keyframes[0]).toHaveProperty('paddingBlockStart'); // whitespace atom

      // Exit: size + whitespace (no opacity)
      expect(motion.exit).toHaveLength(2);
      expect(motion.exit[0].keyframes[0]).toHaveProperty('maxHeight'); // size atom
      expect(motion.exit[1].keyframes[0]).toHaveProperty('paddingBlockStart'); // whitespace atom
    });

    it('conditionally includes opacity atoms based on animateOpacity flag', () => {
      const withOpacity = collapsePresenceFn({
        element: mockElement,
        animateOpacity: true,
      });

      const withoutOpacity = collapsePresenceFn({
        element: mockElement,
        animateOpacity: false,
      });

      // With opacity: size + whitespace + opacity
      expect(withOpacity.enter).toHaveLength(3);
      expect(withOpacity.exit).toHaveLength(3);
      expect(withOpacity.enter[2].keyframes[0]).toHaveProperty('opacity');
      expect(withOpacity.exit[0].keyframes[0]).toHaveProperty('opacity');

      // Without opacity: size + whitespace only
      expect(withoutOpacity.enter).toHaveLength(2);
      expect(withoutOpacity.exit).toHaveLength(2);
    });

    it('orders atoms correctly for enter vs exit sequences', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        animateOpacity: true,
      });

      // Enter order: size, whitespace, opacity (size expands first, then fade in)
      expect(motion.enter[0].keyframes[0]).toHaveProperty('maxHeight'); // size
      expect(motion.enter[1].keyframes[0]).toHaveProperty('paddingBlockStart'); // whitespace
      expect(motion.enter[2].keyframes[0]).toHaveProperty('opacity'); // fade

      // Exit order: opacity, size, whitespace (fade out first, then size collapses)
      expect(motion.exit[0].keyframes[0]).toHaveProperty('opacity'); // fade
      expect(motion.exit[1].keyframes[0]).toHaveProperty('maxHeight'); // size
      expect(motion.exit[2].keyframes[0]).toHaveProperty('paddingBlockStart'); // whitespace
    });
  });

  describe('timing coordination', () => {
    it('applies delay offsets correctly for opacity animations', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        delay: 100,
        staggerDelay: 50,
        exitDelay: 200,
        exitStaggerDelay: 75,
      });

      // Enter: size/whitespace start with base delay, opacity starts after staggerDelay
      expect(motion.enter[0].delay).toBe(100); // size
      expect(motion.enter[1].delay).toBe(100); // whitespace
      expect(motion.enter[2].delay).toBe(150); // opacity (100 + 50)

      // Exit: opacity starts with exitDelay, size/whitespace start after exitStaggerDelay
      expect(motion.exit[0].delay).toBe(200); // opacity
      expect(motion.exit[1].delay).toBe(275); // size (200 + 75)
      expect(motion.exit[2].delay).toBe(275); // whitespace (200 + 75)
    });

    it('handles complex delay scenarios with multiple timing parameters', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        duration: 200,
        sizeDuration: 150,
        opacityDuration: 300,
        exitDuration: 250,
        exitSizeDuration: 100,
        exitOpacityDuration: 400,
        delay: 50,
        staggerDelay: 25,
        exitDelay: 75,
        exitStaggerDelay: 125,
      });

      // Verify each atom gets correct duration and delay
      expect(motion.enter[0]).toMatchObject({ duration: 150, delay: 50 }); // size
      expect(motion.enter[1]).toMatchObject({ duration: 150, delay: 50 }); // whitespace
      expect(motion.enter[2]).toMatchObject({ duration: 300, delay: 75 }); // opacity (50 + 25)

      expect(motion.exit[0]).toMatchObject({ duration: 400, delay: 75 }); // opacity
      expect(motion.exit[1]).toMatchObject({ duration: 100, delay: 200 }); // size (75 + 125)
      expect(motion.exit[2]).toMatchObject({ duration: 100, delay: 200 }); // whitespace (75 + 125)
    });
  });

  describe('orientation handling', () => {
    it('applies vertical orientation by default', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
      });

      // Should use maxHeight for vertical collapse
      expect(motion.enter[0].keyframes[0]).toHaveProperty('maxHeight');
      expect(motion.enter[0].keyframes[0]).toHaveProperty('overflowY');
    });

    it('applies horizontal orientation when specified', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        orientation: 'horizontal',
      });

      // Should use maxWidth for horizontal collapse
      expect(motion.enter[0].keyframes[0]).toHaveProperty('maxWidth');
      expect(motion.enter[0].keyframes[0]).toHaveProperty('overflowX');
    });
  });

  describe('edge cases', () => {
    it('handles animateOpacity=false scenarios correctly', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        animateOpacity: false,
        staggerDelay: 100, // Should be ignored for enter
        exitStaggerDelay: 50, // Still affects exit timing even without opacity
      });

      // Should only have size and whitespace atoms
      expect(motion.enter).toHaveLength(2);
      expect(motion.exit).toHaveLength(2);

      const enterAtoms = motion.enter as import('@fluentui/react-motion').AtomMotion[];
      const exitAtoms = motion.exit as import('@fluentui/react-motion').AtomMotion[];

      // Enter: staggerDelay should be ignored since no opacity atom
      expect(enterAtoms[0].delay).toBe(0); // Base delay
      expect(enterAtoms[1].delay).toBe(0); // Base delay

      // Exit: exitStaggerDelay still affects size/whitespace timing (exitDelay + exitStaggerDelay)
      expect(exitAtoms[0].delay).toBe(50); // exitDelay (0) + exitStaggerDelay (50)
      expect(exitAtoms[1].delay).toBe(50); // exitDelay (0) + exitStaggerDelay (50)
    });

    it('works with zero durations and delays', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        duration: 0,
        delay: 0,
        staggerDelay: 0,
      });

      expect(motion.enter[0]).toMatchObject({ duration: 0, delay: 0 });
      expect(motion.enter[1]).toMatchObject({ duration: 0, delay: 0 });
      expect(motion.enter[2]).toMatchObject({ duration: 0, delay: 0 });
    });

    it('handles custom outSize values', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
        outSize: '10px',
      });

      // Size atoms should use the custom outSize
      expect(motion.enter[0].keyframes[0]).toMatchObject({ maxHeight: '10px' });
      expect(motion.exit[1].keyframes[1]).toMatchObject({ maxHeight: '10px' });
    });
  });

  describe('motion token defaults', () => {
    it('uses correct default values from motion tokens', () => {
      const motion = collapsePresenceFn({
        element: mockElement,
      });

      // Should use motionTokens.durationNormal for duration
      expect(motion.enter[0].duration).toBe(motionTokens.durationNormal);

      // Should use motionTokens.curveEasyEaseMax for easing
      expect(motion.enter[0].easing).toBe(motionTokens.curveEasyEaseMax);
    });
  });
});
