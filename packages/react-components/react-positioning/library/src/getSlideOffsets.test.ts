import { getSlideOffsets } from './getSlideOffsets';

describe('getSlideOffsets', () => {
  describe('with explicit placement', () => {
    it('returns positive y for top placement (slides upward)', () => {
      expect(getSlideOffsets({ placement: 'top', distance: '10px' })).toEqual({ x: '0px', y: '10px' });
    });

    it('returns negative y for bottom placement (slides downward)', () => {
      expect(getSlideOffsets({ placement: 'bottom', distance: '10px' })).toEqual({ x: '0px', y: '-10px' });
    });

    it('returns positive x for left placement (slides leftward)', () => {
      expect(getSlideOffsets({ placement: 'left', distance: '10px' })).toEqual({ x: '10px', y: '0px' });
    });

    it('returns negative x for right placement (slides rightward)', () => {
      expect(getSlideOffsets({ placement: 'right', distance: '10px' })).toEqual({ x: '-10px', y: '0px' });
    });
  });

  describe('with placement variants (alignment)', () => {
    it('handles top-start', () => {
      expect(getSlideOffsets({ placement: 'top-start', distance: '10px' })).toEqual({ x: '0px', y: '10px' });
    });

    it('handles top-end', () => {
      expect(getSlideOffsets({ placement: 'top-end', distance: '10px' })).toEqual({ x: '0px', y: '10px' });
    });

    it('handles bottom-start', () => {
      expect(getSlideOffsets({ placement: 'bottom-start', distance: '10px' })).toEqual({ x: '0px', y: '-10px' });
    });

    it('handles bottom-end', () => {
      expect(getSlideOffsets({ placement: 'bottom-end', distance: '10px' })).toEqual({ x: '0px', y: '-10px' });
    });

    it('handles left-start', () => {
      expect(getSlideOffsets({ placement: 'left-start', distance: '10px' })).toEqual({ x: '10px', y: '0px' });
    });

    it('handles left-end', () => {
      expect(getSlideOffsets({ placement: 'left-end', distance: '10px' })).toEqual({ x: '10px', y: '0px' });
    });

    it('handles right-start', () => {
      expect(getSlideOffsets({ placement: 'right-start', distance: '10px' })).toEqual({ x: '-10px', y: '0px' });
    });

    it('handles right-end', () => {
      expect(getSlideOffsets({ placement: 'right-end', distance: '10px' })).toEqual({ x: '-10px', y: '0px' });
    });
  });

  describe('with custom distance', () => {
    it('uses custom distance value', () => {
      expect(getSlideOffsets({ placement: 'top', distance: '20px' })).toEqual({ x: '0px', y: '20px' });
    });

    it('uses custom distance with negative direction', () => {
      expect(getSlideOffsets({ placement: 'bottom', distance: '20px' })).toEqual({ x: '0px', y: '-20px' });
    });

    it('supports rem units', () => {
      expect(getSlideOffsets({ placement: 'left', distance: '1rem' })).toEqual({ x: '1rem', y: '0px' });
    });

    it('supports em units', () => {
      expect(getSlideOffsets({ placement: 'right', distance: '0.5em' })).toEqual({ x: '-0.5em', y: '0px' });
    });
  });

  describe('with null placement', () => {
    it('returns zero offsets when placement is null', () => {
      expect(getSlideOffsets({ placement: null, distance: '10px' })).toEqual({ x: '0px', y: '0px' });
    });
  });
});
