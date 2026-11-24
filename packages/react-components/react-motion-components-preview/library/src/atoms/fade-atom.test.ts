import { motionTokens } from '@fluentui/react-motion';
import { fade, fadeIn, fadeOut } from './fade-atom';
import { expectValidAtomMotion, expectReversedKeyframes, expectCustomParameters } from '../testing/atomTestUtils';

describe('fade', () => {
  it('requires both from and to endpoints on the general helper', () => {
    expect(fade({ from: 0.3, to: 1, duration: 300 }).keyframes).toEqual([{ opacity: 0.3 }, { opacity: 1 }]);
    expect(fade({ from: 1, to: 0.3, duration: 300 }).keyframes).toEqual([{ opacity: 1 }, { opacity: 0.3 }]);
    // @ts-expect-error both from and to are required
    fade({ from: 0.3, duration: 300 });
    // @ts-expect-error both from and to are required
    fade({ to: 0.3, duration: 300 });
    // @ts-expect-error both from and to are required
    fade({ duration: 300 });
  });

  it('preserves custom poses and timing with fill "both" and default linear easing', () => {
    const atom = fade({ from: 0.2, to: 0.7, duration: 300, easing: 'ease-out', delay: 50 });
    expectValidAtomMotion(atom);
    expect(atom).toEqual({
      keyframes: [{ opacity: 0.2 }, { opacity: 0.7 }],
      duration: 300,
      easing: 'ease-out',
      delay: 50,
      fill: 'both',
    });
    expectCustomParameters(atom, { duration: 300, easing: 'ease-out', delay: 50 });

    expect(fade({ from: 0, to: 1, duration: 200 })).toEqual({
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 200,
      easing: motionTokens.curveLinear,
      delay: 0,
      fill: 'both',
    });
  });

  it('creates directional fades using the general helper', () => {
    const enterAtom = fadeIn({ duration: 300 });
    const exitAtom = fadeOut({ duration: 300 });

    expect(enterAtom).toEqual(fade({ from: 0, to: 1, duration: 300 }));
    expect(exitAtom).toEqual(fade({ from: 1, to: 0, duration: 300 }));
    expectReversedKeyframes(enterAtom, exitAtom);

    expect(fadeIn({ from: 0.2, duration: 300, easing: 'ease-out', delay: 25 })).toEqual(
      fade({ from: 0.2, to: 1, duration: 300, easing: 'ease-out', delay: 25 }),
    );
    expect(fadeOut({ duration: 300, easing: 'ease-in', delay: 50 })).toEqual(
      fade({ from: 1, to: 0, duration: 300, easing: 'ease-in', delay: 50 }),
    );
    expect(fadeOut({ to: 0.4, duration: 300 })).toEqual(fade({ from: 1, to: 0.4, duration: 300 }));
    // @ts-expect-error fadeIn owns the neutral destination
    fadeIn({ to: 0.5, duration: 300 });
    // @ts-expect-error fadeOut owns the neutral source
    fadeOut({ from: 0.5, duration: 300 });
  });
});
