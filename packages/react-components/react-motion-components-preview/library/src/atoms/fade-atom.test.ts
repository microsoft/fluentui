import { fadeAtom } from './fade-atom';
import {
  expectValidAtomMotion,
  expectReversedKeyframes,
  expectCustomParameters,
  expectKeyframeProperty,
} from '../testing/atomTestUtils';

/**
 * Test utility for validating fade-specific atom properties.
 */
function expectFadeAtom(
  atom: import('@fluentui/react-motion').AtomMotion,
  direction: 'enter' | 'exit',
  fromOpacity: number = 0,
  toOpacity: number = 1,
) {
  expectValidAtomMotion(atom);

  if (direction === 'enter') {
    expectKeyframeProperty(atom, 'opacity', [fromOpacity, toOpacity]);
  } else {
    expectKeyframeProperty(atom, 'opacity', [toOpacity, fromOpacity]);
  }
}

describe('fadeAtom', () => {
  it('creates proper keyframes for enter and exit directions', () => {
    const enterAtom = fadeAtom({
      direction: 'enter',
      duration: 300,
    });

    const exitAtom = fadeAtom({
      direction: 'exit',
      duration: 300,
    });

    expect(enterAtom.keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);
    expect(exitAtom.keyframes).toEqual([{ opacity: 1 }, { opacity: 0 }]);
  });

  it('applies custom opacity values', () => {
    const atom = fadeAtom({
      direction: 'enter',
      duration: 300,
      fromOpacity: 0.5,
    });

    expect(atom.keyframes).toEqual([{ opacity: 0.5 }, { opacity: 1 }]);
  });

  it('has fill mode "both" by default to prevent opacity flickering during delays', () => {
    const enterAtom = fadeAtom({
      direction: 'enter',
      duration: 300,
      delay: 100,
    });

    const exitAtom = fadeAtom({
      direction: 'exit',
      duration: 300,
      delay: 50,
    });

    expect(enterAtom.fill).toBe('both');
    expect(exitAtom.fill).toBe('both');
  });

  it('includes all expected properties in the returned atom', () => {
    const atom = fadeAtom({
      direction: 'enter',
      duration: 250,
      delay: 100,
      easing: 'ease-out',
    });

    expect(atom).toMatchObject({
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 250,
      easing: 'ease-out',
      delay: 100,
      fill: 'both',
    });
  });

  // Enhanced tests using test utilities
  it('creates valid atom motion objects for both directions', () => {
    const enterAtom = fadeAtom({ direction: 'enter', duration: 300 });
    const exitAtom = fadeAtom({ direction: 'exit', duration: 300 });

    expectValidAtomMotion(enterAtom);
    expectValidAtomMotion(exitAtom);
  });

  it('creates properly reversed keyframes for enter and exit', () => {
    const enterAtom = fadeAtom({ direction: 'enter', duration: 300 });
    const exitAtom = fadeAtom({ direction: 'exit', duration: 300 });

    expectReversedKeyframes(enterAtom, exitAtom);
  });

  it('validates fade-specific behavior with test utility', () => {
    const enterAtom = fadeAtom({ direction: 'enter', duration: 300 });
    const exitAtom = fadeAtom({ direction: 'exit', duration: 300 });

    expectFadeAtom(enterAtom, 'enter');
    expectFadeAtom(exitAtom, 'exit');
  });

  it('validates custom opacity values with test utility', () => {
    const enterAtom = fadeAtom({ direction: 'enter', duration: 300, fromOpacity: 0.3 });
    const exitAtom = fadeAtom({ direction: 'exit', duration: 300, fromOpacity: 0.3 });

    expectFadeAtom(enterAtom, 'enter', 0.3, 1);
    expectFadeAtom(exitAtom, 'exit', 0.3, 1);
  });

  it('validates custom timing parameters with test utility', () => {
    const atom = fadeAtom({
      direction: 'enter',
      duration: 500,
      delay: 200,
      easing: 'ease-in-out',
    });

    expectCustomParameters(atom, {
      duration: 500,
      delay: 200,
      easing: 'ease-in-out',
    });
  });
});
