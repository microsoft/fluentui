import { sizeEnterAtom, sizeExitAtom, whitespaceAtom } from './collapse-atoms';
import { motionTokens } from '@fluentui/react-motion';

describe('Collapse Atoms', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    // eslint-disable-next-line @nx/workspace-no-restricted-globals
    mockElement = document.createElement('div');
    // Mock scrollHeight and scrollWidth for testing
    Object.defineProperty(mockElement, 'scrollHeight', { value: 100, writable: true });
    Object.defineProperty(mockElement, 'scrollWidth', { value: 200, writable: true });
  });

  describe('sizeEnterAtom', () => {
    it('creates valid motion atom structure', () => {
      const atom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 300,
        easing: motionTokens.curveEasyEase,
        element: mockElement,
      });

      expect(atom).toHaveProperty('duration', 300);
      expect(atom).toHaveProperty('easing', motionTokens.curveEasyEase);
      expect(atom).toHaveProperty('keyframes');
      expect(Array.isArray(atom.keyframes)).toBe(true);
      expect(atom.keyframes.length).toBeGreaterThan(1);
    });

    it('handles both vertical and horizontal orientations', () => {
      const verticalAtom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 300,
        easing: motionTokens.curveEasyEase,
        element: mockElement,
      });

      const horizontalAtom = sizeEnterAtom({
        orientation: 'horizontal',
        duration: 300,
        easing: motionTokens.curveEasyEase,
        element: mockElement,
      });

      // Should have keyframes that affect the correct dimension
      expect(verticalAtom.keyframes[0]).toHaveProperty('maxHeight');
      expect(horizontalAtom.keyframes[0]).toHaveProperty('maxWidth');
    });
  });

  describe('sizeExitAtom', () => {
    it('creates valid motion atom with proper fill mode', () => {
      const atom = sizeExitAtom({
        orientation: 'vertical',
        duration: 200,
        easing: motionTokens.curveAccelerateMax,
        element: mockElement,
      });

      expect(atom).toHaveProperty('duration', 200);
      expect(atom).toHaveProperty('easing', motionTokens.curveAccelerateMax);
      expect(atom).toHaveProperty('keyframes');
      expect(Array.isArray(atom.keyframes)).toBe(true);

      // This is the key behavior - exit atoms need fill: 'both' to prevent layout shifts
      expect(atom.fill).toBe('both');
    });
  });

  describe('whitespaceAtom', () => {
    it('creates valid motion atom structure', () => {
      const atom = whitespaceAtom({
        direction: 'enter',
        orientation: 'vertical',
        duration: 300,
        easing: motionTokens.curveEasyEase,
      });

      expect(atom).toHaveProperty('duration', 300);
      expect(atom).toHaveProperty('easing', motionTokens.curveEasyEase);
      expect(atom).toHaveProperty('keyframes');
      expect(Array.isArray(atom.keyframes)).toBe(true);
    });

    it('exit whitespace atoms have proper fill mode', () => {
      const atom = whitespaceAtom({
        direction: 'exit',
        orientation: 'vertical',
        duration: 250,
        easing: motionTokens.curveLinear,
      });

      // Exit whitespace atoms should have fill: 'forwards' to maintain collapsed state
      expect(atom.fill).toBe('forwards');
    });

    it('enter whitespace atoms do not have fill mode', () => {
      const atom = whitespaceAtom({
        direction: 'enter',
        orientation: 'vertical',
        duration: 250,
        easing: motionTokens.curveLinear,
      });

      // Enter whitespace atoms don't need fill mode
      expect(atom.fill).toBeUndefined();
    });
  });
});
