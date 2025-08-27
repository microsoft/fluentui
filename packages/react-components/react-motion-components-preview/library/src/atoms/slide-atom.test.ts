import { slideAtom } from './slide-atom';
import {
  expectValidAtomMotion,
  expectReversedKeyframes,
  expectCustomParameters,
  expectKeyframeProperty,
} from '../testing/atomTestUtils';

/**
 * Test utility for validating slide-specific atom properties.
 */
function expectSlideAtom(
  atom: import('@fluentui/react-motion').AtomMotion,
  direction: 'enter' | 'exit',
  fromTranslate: string = '0px 20px',
  toTranslate: string = '0px 0px',
) {
  expectValidAtomMotion(atom);

  if (direction === 'enter') {
    expectKeyframeProperty(atom, 'translate', [fromTranslate, toTranslate]);
  } else {
    expectKeyframeProperty(atom, 'translate', [toTranslate, fromTranslate]);
  }
}

describe('slideAtom', () => {
  it('creates proper keyframes for enter and exit directions', () => {
    const enterAtom = slideAtom({
      direction: 'enter',
      duration: 300,
    });

    const exitAtom = slideAtom({
      direction: 'exit',
      duration: 300,
    });

    expect(enterAtom.keyframes).toEqual([{ translate: '0px 20px' }, { translate: '0px 0px' }]);
    expect(exitAtom.keyframes).toEqual([{ translate: '0px 0px' }, { translate: '0px 20px' }]);
  });

  it('applies custom fromX and fromY values', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
      fromX: '100px',
      fromY: '-50px',
    });

    expect(atom.keyframes).toEqual([{ translate: '100px -50px' }, { translate: '0px 0px' }]);
  });

  it('handles percentage-based translate values', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
      fromX: '100%',
      fromY: '-100%',
    });

    expect(atom.keyframes).toEqual([{ translate: '100% -100%' }, { translate: '0px 0px' }]);
  });

  it('uses default values when fromX and fromY are not provided', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
    });

    expect(atom.keyframes).toEqual([{ translate: '0px 20px' }, { translate: '0px 0px' }]);
  });

  it('applies custom easing and delay', () => {
    const atom = slideAtom({
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
    const atom = slideAtom({
      direction: 'enter',
      duration: 400,
      delay: 50,
      easing: 'ease-in-out',
      fromX: '200px',
      fromY: '100px',
    });

    expect(atom).toMatchObject({
      keyframes: [{ translate: '200px 100px' }, { translate: '0px 0px' }],
      duration: 400,
      easing: 'ease-in-out',
      delay: 50,
    });
  });

  it('handles zero translate values correctly', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
      fromX: '0px',
      fromY: '0px',
    });

    expect(atom.keyframes).toEqual([{ translate: '0px 0px' }, { translate: '0px 0px' }]);
  });

  // Enhanced tests using test utilities
  it('creates valid atom motion objects for both directions', () => {
    const enterAtom = slideAtom({ direction: 'enter', duration: 300 });
    const exitAtom = slideAtom({ direction: 'exit', duration: 300 });

    expectValidAtomMotion(enterAtom);
    expectValidAtomMotion(exitAtom);
  });

  it('creates properly reversed keyframes for enter and exit', () => {
    const enterAtom = slideAtom({ direction: 'enter', duration: 300 });
    const exitAtom = slideAtom({ direction: 'exit', duration: 300 });

    expectReversedKeyframes(enterAtom, exitAtom);
  });

  it('validates slide-specific behavior with test utility', () => {
    const enterAtom = slideAtom({ direction: 'enter', duration: 300 });
    const exitAtom = slideAtom({ direction: 'exit', duration: 300 });

    expectSlideAtom(enterAtom, 'enter');
    expectSlideAtom(exitAtom, 'exit');
  });

  it('validates custom translate values with test utility', () => {
    const enterAtom = slideAtom({
      direction: 'enter',
      duration: 300,
      fromX: '100px',
      fromY: '-50px',
    });
    const exitAtom = slideAtom({
      direction: 'exit',
      duration: 300,
      fromX: '100px',
      fromY: '-50px',
    });

    expectSlideAtom(enterAtom, 'enter', '100px -50px', '0px 0px');
    expectSlideAtom(exitAtom, 'exit', '100px -50px', '0px 0px');
  });

  it('validates custom timing parameters with test utility', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 400,
      delay: 150,
      easing: 'ease-in-out',
    });

    expectCustomParameters(atom, {
      duration: 400,
      delay: 150,
      easing: 'ease-in-out',
    });
  });
});
