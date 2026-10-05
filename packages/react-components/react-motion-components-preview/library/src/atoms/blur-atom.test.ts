import { motionTokens } from '@fluentui/react-motion';
import { blurAtom } from './blur-atom';

describe('blurAtom', () => {
  it('creates directed keyframes from one radius to another', () => {
    const atom = blurAtom({
      duration: 300,
      easing: motionTokens.curveEasyEase,
      fromRadius: '20px',
      toRadius: '5px',
    });

    expect(atom).toMatchObject({
      duration: 300,
      easing: motionTokens.curveEasyEase,
      keyframes: [{ filter: 'blur(20px)' }, { filter: 'blur(5px)' }],
    });
  });

  it('uses default radius endpoints when not provided', () => {
    const atom = blurAtom({
      duration: 300,
    });

    expect(atom.keyframes).toEqual([{ filter: 'blur(10px)' }, { filter: 'blur(0px)' }]);
  });

  it('uses default easing when not provided', () => {
    const atom = blurAtom({
      duration: 300,
      fromRadius: '5px',
    });

    expect(atom.easing).toBe(motionTokens.curveLinear);
  });

  it('handles different CSS units for graph endpoints', () => {
    const atomPx = blurAtom({
      duration: 300,
      fromRadius: '8px',
      toRadius: '2px',
    });

    const atomRem = blurAtom({
      duration: 300,
      fromRadius: '1rem',
      toRadius: '0.5rem',
    });

    expect(atomPx.keyframes[0]).toEqual({ filter: 'blur(8px)' });
    expect(atomPx.keyframes[1]).toEqual({ filter: 'blur(2px)' });
    expect(atomRem.keyframes[0]).toEqual({ filter: 'blur(1rem)' });
    expect(atomRem.keyframes[1]).toEqual({ filter: 'blur(0.5rem)' });
  });
});
