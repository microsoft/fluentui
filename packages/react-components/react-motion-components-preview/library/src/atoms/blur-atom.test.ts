import { motionTokens } from '@fluentui/react-motion';
import { blurAtom } from './blur-atom';

describe('blurAtom', () => {
  it('creates enter keyframes with blur from radius to 0', () => {
    const atom = blurAtom({
      direction: 'enter',
      duration: 300,
      easing: motionTokens.curveEasyEase,
      fromRadius: '20px',
    });

    expect(atom).toMatchObject({
      duration: 300,
      easing: motionTokens.curveEasyEase,
      keyframes: [{ filter: 'blur(20px)' }, { filter: 'blur(0px)' }],
    });
  });

  it('creates exit keyframes with blur from 0 to radius', () => {
    const atom = blurAtom({
      direction: 'exit',
      duration: 250,
      easing: motionTokens.curveAccelerateMin,
      fromRadius: '15px',
    });

    expect(atom).toMatchObject({
      duration: 250,
      easing: motionTokens.curveAccelerateMin,
      keyframes: [{ filter: 'blur(0px)' }, { filter: 'blur(15px)' }],
    });
  });

  it('uses default fromRadius when not provided', () => {
    const atom = blurAtom({
      direction: 'enter',
      duration: 300,
    });

    expect(atom.keyframes).toEqual([{ filter: 'blur(10px)' }, { filter: 'blur(0px)' }]);
  });

  it('uses default easing when not provided', () => {
    const atom = blurAtom({
      direction: 'enter',
      duration: 300,
      fromRadius: '5px',
    });

    expect(atom.easing).toBe(motionTokens.curveLinear);
  });

  it('handles different CSS units for fromRadius', () => {
    const atomPx = blurAtom({
      direction: 'enter',
      duration: 300,
      fromRadius: '8px',
    });

    const atomRem = blurAtom({
      direction: 'enter',
      duration: 300,
      fromRadius: '1rem',
    });

    expect(atomPx.keyframes[0]).toEqual({ filter: 'blur(8px)' });
    expect(atomRem.keyframes[0]).toEqual({ filter: 'blur(1rem)' });
  });
});
