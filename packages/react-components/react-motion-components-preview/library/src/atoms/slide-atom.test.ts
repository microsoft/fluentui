import { slideAtom } from './slide-atom';
import { motionTokens } from '@fluentui/react-motion';

describe('Slide Atoms', () => {
  describe('slideAtom', () => {
    it('creates valid motion atom structure', () => {
      const atom = slideAtom({
        direction: 'enter',
        duration: 300,
        easing: motionTokens.curveDecelerateMid,
        delay: 100,
      });

      expect(atom).toHaveProperty('duration', 300);
      expect(atom).toHaveProperty('easing', motionTokens.curveDecelerateMid);
      expect(atom).toHaveProperty('delay', 100);
      expect(atom).toHaveProperty('keyframes');
      expect(Array.isArray(atom.keyframes)).toBe(true);
      expect(atom.keyframes.length).toBe(2);
    });

    it('creates enter animation with proper keyframe direction', () => {
      const atom = slideAtom({
        direction: 'enter',
        duration: 200,
        fromX: '10px',
        fromY: '20px',
      });

      // Enter should go from offset position to final position
      expect(atom.keyframes[0]).toEqual({ translate: '10px 20px' });
      expect(atom.keyframes[1]).toEqual({ translate: '0px 0px' });
    });

    it('creates exit animation with proper keyframe direction', () => {
      const atom = slideAtom({
        direction: 'exit',
        duration: 200,
        fromX: '10px',
        fromY: '20px',
      });

      // Exit should go from final position to offset position (reversed)
      expect(atom.keyframes[0]).toEqual({ translate: '0px 0px' });
      expect(atom.keyframes[1]).toEqual({ translate: '10px 20px' });
    });

    it('uses default values when not provided', () => {
      const atom = slideAtom({
        direction: 'enter',
        duration: 200,
      });

      expect(atom.easing).toBe(motionTokens.curveLinear);
      expect(atom.delay).toBe(0);
      expect(atom.keyframes[0]).toEqual({ translate: '0px 20px' }); // default fromX='0px', fromY='20px'
    });
  });
});
