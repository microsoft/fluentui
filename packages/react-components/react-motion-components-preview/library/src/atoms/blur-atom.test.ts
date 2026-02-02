import { motionTokens } from '@fluentui/react-motion';
import { blurAtom } from './blur-atom';

describe('blurAtom', () => {
  it('creates enter keyframes with blur from radius to 0', () => {
    const atom = blurAtom({
      direction: 'enter',
      duration: 300,
      easing: motionTokens.curveEasyEase,
      outRadius: '20px',
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
      outRadius: '15px',
    });

    expect(atom).toMatchObject({
      duration: 250,
      easing: motionTokens.curveAccelerateMin,
      keyframes: [{ filter: 'blur(0px)' }, { filter: 'blur(15px)' }],
    });
  });

  it('applies custom inRadius values', () => {
    const atom = blurAtom({
      direction: 'enter',
      duration: 300,
      outRadius: '20px',
      inRadius: '5px',
    });

    expect(atom.keyframes).toEqual([{ filter: 'blur(20px)' }, { filter: 'blur(5px)' }]);
  });

  it('uses default outRadius when not provided', () => {
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
      outRadius: '5px',
    });

    expect(atom.easing).toBe(motionTokens.curveLinear);
  });

  it('handles different CSS units for outRadius and inRadius', () => {
    const atomPx = blurAtom({
      direction: 'enter',
      duration: 300,
      outRadius: '8px',
      inRadius: '2px',
    });

    const atomRem = blurAtom({
      direction: 'enter',
      duration: 300,
      outRadius: '1rem',
      inRadius: '0.5rem',
    });

    expect(atomPx.keyframes[0]).toEqual({ filter: 'blur(8px)' });
    expect(atomPx.keyframes[1]).toEqual({ filter: 'blur(2px)' });
    expect(atomRem.keyframes[0]).toEqual({ filter: 'blur(1rem)' });
    expect(atomRem.keyframes[1]).toEqual({ filter: 'blur(0.5rem)' });
  });
});
