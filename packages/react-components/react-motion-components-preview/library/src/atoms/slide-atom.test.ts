import { motionTokens } from '@fluentui/react-motion';
import { slide, slideIn, slideOut } from './slide-atom';
import { expectValidAtomMotion, expectReversedKeyframes, expectCustomParameters } from '../testing/atomTestUtils';

describe('slide', () => {
  it('requires both from and to endpoints and fills omitted axes with 0px', () => {
    expect(slide({ from: { y: '24px' }, to: { x: '100%' }, duration: 300 }).keyframes).toEqual([
      { translate: '0px 24px' },
      { translate: '100% 0px' },
    ]);
    const checkInvalidCalls = () => {
      // @ts-expect-error both from and to are required
      slide({ from: { y: '24px' }, duration: 300 });
      // @ts-expect-error both from and to are required
      slide({ to: { x: '100%' }, duration: 300 });
      // @ts-expect-error both from and to are required
      slide({ duration: 300 });
    };
    expect(checkInvalidCalls).toBeDefined();
  });

  it('preserves custom CSS poses and timing without adding opacity or fill', () => {
    const motion = slide({
      from: { x: '100%', y: '-50px' },
      to: { x: '20px', y: '25%' },
      duration: 300,
      easing: 'ease-out',
      delay: 50,
    });

    expectValidAtomMotion(motion);
    expect(motion).toEqual({
      keyframes: [{ translate: '100% -50px' }, { translate: '20px 25%' }],
      duration: 300,
      easing: 'ease-out',
      delay: 50,
    });
    expectCustomParameters(motion, { duration: 300, easing: 'ease-out', delay: 50 });
    expect(motion.fill).toBeUndefined();

    expect(slide({ from: { x: '10px' }, to: { x: '0px' }, duration: 200 })).toEqual({
      keyframes: [{ translate: '10px 0px' }, { translate: '0px 0px' }],
      duration: 200,
      easing: motionTokens.curveLinear,
      delay: 0,
    });
  });

  it('creates directional slides using the general helper', () => {
    const enterAtom = slideIn({ from: { y: '24px' }, duration: 300 });
    const exitAtom = slideOut({ to: { y: '24px' }, duration: 300 });

    expect(enterAtom).toEqual(slide({ from: { y: '24px' }, to: { x: '0px', y: '0px' }, duration: 300 }));
    expect(exitAtom).toEqual(slide({ from: { x: '0px', y: '0px' }, to: { y: '24px' }, duration: 300 }));
    expectReversedKeyframes(enterAtom, exitAtom);

    expect(slideOut({ to: { x: '100%' }, duration: 300, easing: 'ease-in', delay: 50 })).toEqual(
      slide({ from: { x: '0px', y: '0px' }, to: { x: '100%' }, duration: 300, easing: 'ease-in', delay: 50 }),
    );
    // @ts-expect-error slideIn owns the neutral destination
    slideIn({ from: { y: '24px' }, to: { y: '0px' }, duration: 300 });
    // @ts-expect-error slideOut owns the neutral source
    slideOut({ from: { x: '0px' }, to: { x: '100%' }, duration: 300 });
  });
});
