import { motionTokens } from '@fluentui/react-motion';
import { sizeEnterAtom, sizeExitAtom, whitespaceAtom } from './collapse-atoms';
import { expectValidAtomMotion, expectCustomParameters, expectKeyframeProperty } from '../../testing/atomTestUtils';

describe('collapse atoms', () => {
  describe('sizeEnterAtom', () => {
    it('uses explicit size poses without measuring an element', () => {
      const atom = sizeEnterAtom({
        orientation: 'vertical',
        from: '8px',
        to: '120px',
        duration: 300,
        easing: 'ease-out',
      });

      expect(atom.keyframes).toEqual([
        { maxHeight: '8px', overflowY: 'hidden' },
        { maxHeight: '120px', offset: 0.9999, overflowY: 'hidden' },
        { maxHeight: 'unset', overflowY: 'unset' },
      ]);
    });

    it('creates proper keyframes for vertical orientation', () => {
      const atom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 300,
        easing: 'ease-out',
        from: '0px',
        to: '100px',
      });

      // Should expand from 0px to measured height (100px), then to unset
      expect(atom.keyframes).toEqual([
        { maxHeight: '0px', overflowY: 'hidden' },
        { maxHeight: '100px', offset: 0.9999, overflowY: 'hidden' },
        { maxHeight: 'unset', overflowY: 'unset' },
      ]);

      expect(atom).toMatchObject({
        duration: 300,
        easing: 'ease-out',
        delay: 0,
      });
    });

    it('creates proper keyframes for horizontal orientation', () => {
      const atom = sizeEnterAtom({
        orientation: 'horizontal',
        duration: 250,
        easing: 'ease-in',
        from: '5px',
        to: '200px',
      });

      // Should expand from 5px to measured width (200px), then to unset
      expect(atom.keyframes).toEqual([
        { maxWidth: '5px', overflowX: 'hidden' },
        { maxWidth: '200px', offset: 0.9999, overflowX: 'hidden' },
        { maxWidth: 'unset', overflowX: 'unset' },
      ]);

      expect(atom).toMatchObject({
        duration: 250,
        easing: 'ease-in',
        delay: 0,
      });
    });

    it('handles custom outSize values', () => {
      const atom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 200,
        easing: motionTokens.curveLinear,
        from: '10px',
        to: '100px',
      });

      expect(atom.keyframes[0]).toMatchObject({ maxHeight: '10px' });
    });

    it('applies custom delay', () => {
      const atom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 200,
        easing: motionTokens.curveLinear,
        from: '0',
        to: '100px',
        delay: 150,
      });

      expect(atom.delay).toBe(150);
    });

    it('creates valid atom motion objects', () => {
      const atom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 300,
        easing: 'ease-out',
        from: '0',
        to: '100px',
      });

      expectValidAtomMotion(atom);
    });

    it('validates custom timing parameters', () => {
      const atom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 400,
        easing: 'ease-in-out',
        from: '0',
        to: '100px',
        delay: 100,
      });

      expectCustomParameters(atom, {
        duration: 400,
        easing: 'ease-in-out',
        delay: 100,
      });
    });
  });

  describe('sizeExitAtom', () => {
    it('creates proper keyframes for vertical orientation', () => {
      const atom = sizeExitAtom({
        orientation: 'vertical',
        duration: 300,
        easing: 'ease-in',
        from: '100px',
        to: '0px',
      });

      // Should collapse from measured height (100px) to 0px
      expect(atom.keyframes).toEqual([
        { maxHeight: '100px', overflowY: 'hidden' },
        { maxHeight: '0px', overflowY: 'hidden' },
      ]);

      expect(atom).toMatchObject({
        duration: 300,
        easing: 'ease-in',
        fill: 'both',
        delay: 0,
      });
    });

    it('creates proper keyframes for horizontal orientation', () => {
      const atom = sizeExitAtom({
        orientation: 'horizontal',
        duration: 250,
        easing: 'ease-out',
        from: '200px',
        to: '5px',
      });

      // Should collapse from measured width (200px) to 5px
      expect(atom.keyframes).toEqual([
        { maxWidth: '200px', overflowX: 'hidden' },
        { maxWidth: '5px', overflowX: 'hidden' },
      ]);

      expect(atom).toMatchObject({
        duration: 250,
        easing: 'ease-out',
        fill: 'both',
        delay: 0,
      });
    });

    it('handles custom outSize values', () => {
      const atom = sizeExitAtom({
        orientation: 'vertical',
        duration: 200,
        easing: motionTokens.curveLinear,
        from: '100px',
        to: '10px',
      });

      expect(atom.keyframes[1]).toMatchObject({ maxHeight: '10px' });
    });

    it('applies custom delay', () => {
      const atom = sizeExitAtom({
        orientation: 'vertical',
        duration: 200,
        easing: motionTokens.curveLinear,
        from: '100px',
        to: '0',
        delay: 75,
      });

      expect(atom.delay).toBe(75);
    });

    it('creates valid atom motion objects', () => {
      const atom = sizeExitAtom({
        orientation: 'horizontal',
        duration: 300,
        easing: 'ease-in',
        from: '200px',
        to: '0',
      });

      expectValidAtomMotion(atom);
    });

    it('validates custom timing parameters', () => {
      const atom = sizeExitAtom({
        orientation: 'vertical',
        duration: 350,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        from: '100px',
        to: '0',
        delay: 50,
      });

      expectCustomParameters(atom, {
        duration: 350,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        delay: 50,
      });
    });
  });

  describe('whitespaceAtom', () => {
    it('creates proper keyframes for vertical enter direction', () => {
      const atom = whitespaceAtom({
        direction: 'enter',
        orientation: 'vertical',
        duration: 300,
        easing: 'ease-out',
      });

      // Should have zero whitespace at start (offset: 0) for enter
      expect(atom.keyframes).toEqual([
        {
          paddingBlockStart: '0',
          paddingBlockEnd: '0',
          marginBlockStart: '0',
          marginBlockEnd: '0',
          offset: 0,
        },
      ]);

      expect(atom).toMatchObject({
        duration: 300,
        easing: 'ease-out',
        delay: 0,
        fill: 'both',
      });
    });

    it('creates proper keyframes for vertical exit direction', () => {
      const atom = whitespaceAtom({
        direction: 'exit',
        orientation: 'vertical',
        duration: 250,
        easing: 'ease-in',
      });

      // Should have zero whitespace at end (offset: 1) for exit
      expect(atom.keyframes).toEqual([
        {
          paddingBlockStart: '0',
          paddingBlockEnd: '0',
          marginBlockStart: '0',
          marginBlockEnd: '0',
          offset: 1,
        },
      ]);

      expect(atom).toMatchObject({
        duration: 250,
        easing: 'ease-in',
        delay: 0,
        fill: 'both',
      });
    });

    it('creates proper keyframes for horizontal enter direction', () => {
      const atom = whitespaceAtom({
        direction: 'enter',
        orientation: 'horizontal',
        duration: 200,
        easing: motionTokens.curveLinear,
      });

      // Should use inline properties for horizontal
      expect(atom.keyframes).toEqual([
        {
          paddingInlineStart: '0',
          paddingInlineEnd: '0',
          marginInlineStart: '0',
          marginInlineEnd: '0',
          offset: 0,
        },
      ]);
    });

    it('creates proper keyframes for horizontal exit direction', () => {
      const atom = whitespaceAtom({
        direction: 'exit',
        orientation: 'horizontal',
        duration: 200,
        easing: motionTokens.curveLinear,
      });

      // Should use inline properties for horizontal with offset: 1
      expect(atom.keyframes).toEqual([
        {
          paddingInlineStart: '0',
          paddingInlineEnd: '0',
          marginInlineStart: '0',
          marginInlineEnd: '0',
          offset: 1,
        },
      ]);

      expect(atom.fill).toBe('both');
    });

    it('applies custom delay', () => {
      const atom = whitespaceAtom({
        direction: 'enter',
        orientation: 'vertical',
        duration: 200,
        easing: motionTokens.curveLinear,
        delay: 125,
      });

      expect(atom.delay).toBe(125);
    });

    it('creates valid atom motion objects for both directions', () => {
      const enterAtom = whitespaceAtom({
        direction: 'enter',
        orientation: 'vertical',
        duration: 300,
        easing: 'ease-out',
      });

      const exitAtom = whitespaceAtom({
        direction: 'exit',
        orientation: 'horizontal',
        duration: 250,
        easing: 'ease-in',
      });

      expectValidAtomMotion(enterAtom);
      expectValidAtomMotion(exitAtom);
    });

    it('validates whitespace-specific behavior with test utility', () => {
      const verticalAtom = whitespaceAtom({
        direction: 'enter',
        orientation: 'vertical',
        duration: 300,
        easing: 'ease-out',
      });

      const horizontalAtom = whitespaceAtom({
        direction: 'enter',
        orientation: 'horizontal',
        duration: 300,
        easing: 'ease-out',
      });

      // Validate that vertical uses block properties
      expectKeyframeProperty(verticalAtom, 'paddingBlockStart', ['0']);
      expectKeyframeProperty(verticalAtom, 'paddingBlockEnd', ['0']);
      expectKeyframeProperty(verticalAtom, 'marginBlockStart', ['0']);
      expectKeyframeProperty(verticalAtom, 'marginBlockEnd', ['0']);

      // Validate that horizontal uses inline properties
      expectKeyframeProperty(horizontalAtom, 'paddingInlineStart', ['0']);
      expectKeyframeProperty(horizontalAtom, 'paddingInlineEnd', ['0']);
      expectKeyframeProperty(horizontalAtom, 'marginInlineStart', ['0']);
      expectKeyframeProperty(horizontalAtom, 'marginInlineEnd', ['0']);
    });

    it('validates custom timing parameters', () => {
      const atom = whitespaceAtom({
        direction: 'exit',
        orientation: 'vertical',
        duration: 400,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        delay: 75,
      });

      expectCustomParameters(atom, {
        duration: 400,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        delay: 75,
      });
    });
  });

  describe('integration scenarios', () => {
    it('size atoms work with different resolved size poses', () => {
      const verticalAtom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 200,
        easing: motionTokens.curveLinear,
        from: '0',
        to: '300px',
      });

      const horizontalAtom = sizeEnterAtom({
        orientation: 'horizontal',
        duration: 200,
        easing: motionTokens.curveLinear,
        from: '0',
        to: '500px',
      });

      expect(verticalAtom.keyframes[1]).toMatchObject({ maxHeight: '300px' });
      expect(horizontalAtom.keyframes[1]).toMatchObject({ maxWidth: '500px' });
    });

    it('atoms maintain consistency across enter/exit pairs', () => {
      const enterAtom = sizeEnterAtom({
        orientation: 'vertical',
        duration: 300,
        easing: 'ease-out',
        from: '5px',
        to: '100px',
      });

      const exitAtom = sizeExitAtom({
        orientation: 'vertical',
        duration: 300,
        easing: 'ease-out',
        from: '100px',
        to: '5px',
      });

      // Enter expands from 5px to 100px
      expect(enterAtom.keyframes[0]).toMatchObject({ maxHeight: '5px' });
      expect(enterAtom.keyframes[1]).toMatchObject({ maxHeight: '100px' });

      // Exit collapses from 100px to 5px
      expect(exitAtom.keyframes[0]).toMatchObject({ maxHeight: '100px' });
      expect(exitAtom.keyframes[1]).toMatchObject({ maxHeight: '5px' });
    });
  });
});
