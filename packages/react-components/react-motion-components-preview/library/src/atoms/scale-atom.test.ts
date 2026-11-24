import { motionTokens } from '@fluentui/react-motion';
import { scale, scaleIn, scaleOut } from './scale-atom';
import { expectValidAtomMotion, expectReversedKeyframes, expectCustomParameters } from '../testing/atomTestUtils';

describe('scale', () => {
  it('requires both from and to endpoints on the general helper', () => {
    expect(scale({ from: 0.9, to: 1, duration: 300 }).keyframes).toEqual([{ scale: 0.9 }, { scale: 1 }]);
    expect(scale({ from: 1, to: 0.9, duration: 300 }).keyframes).toEqual([{ scale: 1 }, { scale: 0.9 }]);
    // @ts-expect-error both from and to are required
    scale({ from: 0.9, duration: 300 });
    // @ts-expect-error both from and to are required
    scale({ to: 0.9, duration: 300 });
    // @ts-expect-error both from and to are required
    scale({ duration: 300 });
  });

  it('preserves custom poses and timing without setting fill', () => {
    const motion = scale({ from: 0.5, to: 1.2, duration: 300, easing: 'ease-out', delay: 50 });

    expectValidAtomMotion(motion);
    expect(motion).toEqual({
      keyframes: [{ scale: 0.5 }, { scale: 1.2 }],
      duration: 300,
      easing: 'ease-out',
      delay: 50,
    });
    expectCustomParameters(motion, { duration: 300, easing: 'ease-out', delay: 50 });
    expect(motion.fill).toBeUndefined();

    expect(scale({ from: 0, to: 2, duration: 200 })).toEqual({
      keyframes: [{ scale: 0 }, { scale: 2 }],
      duration: 200,
      easing: motionTokens.curveLinear,
      delay: 0,
    });
  });

  it('creates directional scales using the general helper', () => {
    const enterAtom = scaleIn({ duration: 300 });
    const exitAtom = scaleOut({ duration: 300 });

    expect(enterAtom).toEqual(scale({ from: 0, to: 1, duration: 300 }));
    expect(exitAtom).toEqual(scale({ from: 1, to: 0, duration: 300 }));
    expectReversedKeyframes(enterAtom, exitAtom);

    expect(scaleIn({ from: 0.9, duration: 300 })).toEqual(scale({ from: 0.9, to: 1, duration: 300 }));
    expect(scaleOut({ to: 0.9, duration: 300, easing: 'ease-in', delay: 50 })).toEqual(
      scale({ from: 1, to: 0.9, duration: 300, easing: 'ease-in', delay: 50 }),
    );
    // @ts-expect-error scaleIn owns the neutral destination
    scaleIn({ to: 0.9, duration: 300 });
    // @ts-expect-error scaleOut owns the neutral source
    scaleOut({ from: 0.9, duration: 300 });
  });
});
