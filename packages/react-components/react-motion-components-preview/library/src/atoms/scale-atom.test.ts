import { scaleAtom } from './scale-atom';
import {
  expectValidAtomMotion,
  expectReversedKeyframes,
  expectCustomParameters,
  expectKeyframeProperty,
} from '../testing/atomTestUtils';

/**
 * Test utility for validating scale-specific atom properties.
 */
function expectScaleAtom(
  atom: import('@fluentui/react-motion').AtomMotion,
  direction: 'enter' | 'exit',
  fromScale: number = 0.9,
  toScale: number = 1,
) {
  expectValidAtomMotion(atom);

  if (direction === 'enter') {
    expectKeyframeProperty(atom, 'scale', [fromScale, toScale]);
  } else {
    expectKeyframeProperty(atom, 'scale', [toScale, fromScale]);
  }
}

describe('scaleAtom', () => {
  it('creates proper keyframes for enter and exit directions', () => {
    const enterAtom = scaleAtom({
      direction: 'enter',
      duration: 300,
    });

    const exitAtom = scaleAtom({
      direction: 'exit',
      duration: 300,
    });

    expect(enterAtom.keyframes).toEqual([{ scale: 0.9 }, { scale: 1 }]);
    expect(exitAtom.keyframes).toEqual([{ scale: 1 }, { scale: 0.9 }]);
  });

  it('applies custom fromScale and toScale values', () => {
    const atom = scaleAtom({
      direction: 'enter',
      duration: 300,
      fromScale: 0.5,
      toScale: 1.2,
    });

    expect(atom.keyframes).toEqual([{ scale: 0.5 }, { scale: 1.2 }]);
  });

  it('uses default scale values when not provided', () => {
    const atom = scaleAtom({
      direction: 'enter',
      duration: 300,
    });

    expect(atom.keyframes).toEqual([{ scale: 0.9 }, { scale: 1 }]);
  });

  it('handles zero scale values correctly', () => {
    const atom = scaleAtom({
      direction: 'enter',
      duration: 300,
      fromScale: 0,
      toScale: 1,
    });

    expect(atom.keyframes).toEqual([{ scale: 0 }, { scale: 1 }]);
  });

  it('handles scale values greater than 1', () => {
    const atom = scaleAtom({
      direction: 'enter',
      duration: 300,
      fromScale: 1.5,
      toScale: 2.0,
    });

    expect(atom.keyframes).toEqual([{ scale: 1.5 }, { scale: 2.0 }]);
  });

  it('applies custom easing and delay', () => {
    const atom = scaleAtom({
      direction: 'enter',
      duration: 250,
      easing: 'ease-out',
      delay: 100,
    });

    expect(atom).toMatchObject({
      duration: 250,
      easing: 'ease-out',
      delay: 100,
    });
  });

  it('includes all expected properties in the returned atom', () => {
    const atom = scaleAtom({
      direction: 'exit',
      duration: 400,
      delay: 75,
      easing: 'ease-in-out',
      fromScale: 0.8,
      toScale: 1.1,
    });

    expect(atom).toMatchObject({
      keyframes: [{ scale: 1.1 }, { scale: 0.8 }], // Note: reversed for exit
      duration: 400,
      easing: 'ease-in-out',
      delay: 75,
    });
  });

  it('handles fractional scale values', () => {
    const atom = scaleAtom({
      direction: 'enter',
      duration: 300,
      fromScale: 0.95,
      toScale: 1.05,
    });

    expect(atom.keyframes).toEqual([{ scale: 0.95 }, { scale: 1.05 }]);
  });

  // Enhanced tests using test utilities
  it('creates valid atom motion objects for both directions', () => {
    const enterAtom = scaleAtom({ direction: 'enter', duration: 300 });
    const exitAtom = scaleAtom({ direction: 'exit', duration: 300 });

    expectValidAtomMotion(enterAtom);
    expectValidAtomMotion(exitAtom);
  });

  it('creates properly reversed keyframes for enter and exit', () => {
    const enterAtom = scaleAtom({ direction: 'enter', duration: 300 });
    const exitAtom = scaleAtom({ direction: 'exit', duration: 300 });

    expectReversedKeyframes(enterAtom, exitAtom);
  });

  it('validates scale-specific behavior with test utility', () => {
    const enterAtom = scaleAtom({ direction: 'enter', duration: 300 });
    const exitAtom = scaleAtom({ direction: 'exit', duration: 300 });

    expectScaleAtom(enterAtom, 'enter');
    expectScaleAtom(exitAtom, 'exit');
  });

  it('validates custom scale values with test utility', () => {
    const enterAtom = scaleAtom({
      direction: 'enter',
      duration: 300,
      fromScale: 0.5,
      toScale: 1.2,
    });
    const exitAtom = scaleAtom({
      direction: 'exit',
      duration: 300,
      fromScale: 0.5,
      toScale: 1.2,
    });

    expectScaleAtom(enterAtom, 'enter', 0.5, 1.2);
    expectScaleAtom(exitAtom, 'exit', 0.5, 1.2);
  });

  it('validates custom timing parameters with test utility', () => {
    const atom = scaleAtom({
      direction: 'enter',
      duration: 350,
      delay: 75,
      easing: 'ease-out',
    });

    expectCustomParameters(atom, {
      duration: 350,
      delay: 75,
      easing: 'ease-out',
    });
  });
});
