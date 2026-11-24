import { motionTokens } from '@fluentui/react-motion';
import { blur, blurIn, blurOut } from './blur-atom';

describe('blur', () => {
  it('requires explicit endpoints on blur and uses neutral boundaries on directional helpers', () => {
    const enter = [{ filter: 'blur(1rem)' }, { filter: 'blur(0px)' }];
    const exit = [{ filter: 'blur(0px)' }, { filter: 'blur(2px)' }];
    expect(blurIn({ from: '1rem', duration: 123 })).toEqual({
      keyframes: enter,
      duration: 123,
      easing: motionTokens.curveLinear,
      delay: 0,
    });
    expect(blurOut({ to: '2px', duration: 123 })).toEqual({
      keyframes: exit,
      duration: 123,
      easing: motionTokens.curveLinear,
      delay: 0,
    });
    // @ts-expect-error both from and to are required
    blur({ from: '1rem', duration: 123 });
    // @ts-expect-error both from and to are required
    blur({ to: '2px', duration: 123 });
    // @ts-expect-error both from and to are required
    blur({ duration: 123 });
    // @ts-expect-error entering uses only an authored source and a neutral destination
    blurIn({ from: '1rem', to: '2px', duration: 123 });
    // @ts-expect-error exiting uses only an authored destination and a neutral source
    blurOut({ from: '1rem', to: '2px', duration: 123 });
  });

  it('creates temporal blur endpoints with CSS units and supplied timing', () => {
    expect(blur({ from: '1rem', to: '2px', duration: 123, easing: 'ease-in', delay: 25 })).toEqual({
      keyframes: [{ filter: 'blur(1rem)' }, { filter: 'blur(2px)' }],
      duration: 123,
      easing: 'ease-in',
      delay: 25,
    });
  });
});
