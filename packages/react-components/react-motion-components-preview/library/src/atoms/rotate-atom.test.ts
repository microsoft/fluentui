import { motionTokens } from '@fluentui/react-motion';
import { rotate, rotateIn, rotateOut } from './rotate-atom';

describe('rotate', () => {
  it('requires explicit endpoints on rotate and uses neutral boundaries on directional helpers', () => {
    const enter = [{ rotate: 'z -45deg' }, { rotate: 'z 0deg' }];
    const exit = [{ rotate: 'y 0deg' }, { rotate: 'y 30deg' }];
    expect(rotateIn({ from: -45, duration: 123 })).toEqual({
      keyframes: enter,
      duration: 123,
      easing: motionTokens.curveLinear,
      delay: 0,
    });
    expect(rotateOut({ to: 30, axis: 'y', duration: 123 })).toEqual({
      keyframes: exit,
      duration: 123,
      easing: motionTokens.curveLinear,
      delay: 0,
    });
    // @ts-expect-error both from and to are required
    rotate({ from: -45, duration: 123 });
    // @ts-expect-error both from and to are required
    rotate({ to: 30, axis: 'y', duration: 123 });
    // @ts-expect-error both from and to are required
    rotate({ duration: 123 });
    // @ts-expect-error entering uses only an authored source and a neutral destination
    rotateIn({ from: -45, to: 30, duration: 123 });
    // @ts-expect-error exiting uses only an authored destination and a neutral source
    rotateOut({ from: -45, to: 30, duration: 123 });
  });

  it.each(['x', 'y', 'z'] as const)('creates temporal rotation endpoints on the %s axis', axis => {
    const motion = rotate({ from: -45, to: 30, axis, duration: 123, easing: 'ease-in', delay: 25 });
    expect(motion).toEqual({
      keyframes: [{ rotate: `${axis} -45deg` }, { rotate: `${axis} 30deg` }],
      duration: 123,
      easing: 'ease-in',
      delay: 25,
    });
  });
});
