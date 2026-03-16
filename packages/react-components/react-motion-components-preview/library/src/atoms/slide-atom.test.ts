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
  fromTranslate: string = '0px 0px',
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

    expect(enterAtom.keyframes).toEqual([{ translate: '0px 0px' }, { translate: '0px 0px' }]);
    expect(exitAtom.keyframes).toEqual([{ translate: '0px 0px' }, { translate: '0px 0px' }]);
  });

  it('applies custom outX and outY values', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
      outX: '100px',
      outY: '-50px',
    });

    expect(atom.keyframes).toEqual([{ translate: '100px -50px' }, { translate: '0px 0px' }]);
  });

  it('applies custom inX and inY values', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
      outX: '100px',
      outY: '-50px',
      inX: '20px',
      inY: '10px',
    });

    expect(atom.keyframes).toEqual([{ translate: '100px -50px' }, { translate: '20px 10px' }]);
  });

  it('handles percentage-based translate values', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
      outX: '100%',
      outY: '-100%',
      inX: '50%',
      inY: '25%',
    });

    expect(atom.keyframes).toEqual([{ translate: '100% -100%' }, { translate: '50% 25%' }]);
  });

  it('uses default values when outX and outY are not provided', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
    });

    expect(atom.keyframes).toEqual([{ translate: '0px 0px' }, { translate: '0px 0px' }]);
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
      outX: '200px',
      outY: '100px',
      inX: '50px',
      inY: '25px',
    });

    expect(atom).toMatchObject({
      keyframes: [{ translate: '200px 100px' }, { translate: '50px 25px' }],
      duration: 400,
      easing: 'ease-in-out',
      delay: 50,
    });
  });

  it('handles zero translate values correctly', () => {
    const atom = slideAtom({
      direction: 'enter',
      duration: 300,
      outX: '0px',
      outY: '0px',
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
      outX: '100px',
      outY: '-50px',
      inX: '20px',
      inY: '10px',
    });
    const exitAtom = slideAtom({
      direction: 'exit',
      duration: 300,
      outX: '100px',
      outY: '-50px',
      inX: '20px',
      inY: '10px',
    });

    expectSlideAtom(enterAtom, 'enter', '100px -50px', '20px 10px');
    expectSlideAtom(exitAtom, 'exit', '100px -50px', '20px 10px');
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
