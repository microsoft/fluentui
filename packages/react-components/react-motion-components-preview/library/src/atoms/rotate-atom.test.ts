import { motionTokens } from '@fluentui/react-motion';
import { rotateAtom } from './rotate-atom';

describe('rotateAtom', () => {
  it('creates enter keyframes with rotation from angle to 0', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
      easing: motionTokens.curveEasyEase,
      angle: -90,
    });

    expect(atom).toMatchObject({
      duration: 300,
      easing: motionTokens.curveEasyEase,
      keyframes: [{ rotate: 'y -90deg' }, { rotate: 'y 0deg' }],
    });
  });

  it('creates exit keyframes with rotation from 0 to exitAngle', () => {
    const atom = rotateAtom({
      direction: 'exit',
      duration: 250,
      easing: motionTokens.curveAccelerateMin,
      exitAngle: 90,
    });

    expect(atom).toMatchObject({
      duration: 250,
      easing: motionTokens.curveAccelerateMin,
      keyframes: [{ rotate: 'y 0deg' }, { rotate: 'y 90deg' }],
    });
  });

  it('uses default angle when not provided', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
    });

    expect(atom.keyframes).toEqual([{ rotate: 'y -90deg' }, { rotate: 'y 0deg' }]);
  });

  it('uses default easing when not provided', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
      angle: 45,
    });

    expect(atom.easing).toBe(motionTokens.curveLinear);
  });

  it('uses default axis when not provided', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
      angle: 180,
    });

    expect(atom.keyframes[0]).toEqual({ rotate: 'y 180deg' });
    expect(atom.keyframes[1]).toEqual({ rotate: 'y 0deg' });
  });

  it('handles different rotation axes', () => {
    const atomX = rotateAtom({
      direction: 'enter',
      duration: 300,
      axis: 'x',
      angle: 45,
    });

    const atomY = rotateAtom({
      direction: 'enter',
      duration: 300,
      axis: 'y',
      angle: 45,
    });

    const atomZ = rotateAtom({
      direction: 'enter',
      duration: 300,
      axis: 'z',
      angle: 45,
    });

    expect(atomX.keyframes[0]).toEqual({ rotate: 'x 45deg' });
    expect(atomY.keyframes[0]).toEqual({ rotate: 'y 45deg' });
    expect(atomZ.keyframes[0]).toEqual({ rotate: 'z 45deg' });
  });

  it('uses exitAngle when direction is exit', () => {
    const atom = rotateAtom({
      direction: 'exit',
      duration: 300,
      angle: -90,
      exitAngle: 45,
    });

    expect(atom.keyframes).toEqual([{ rotate: 'y 0deg' }, { rotate: 'y 45deg' }]);
  });

  it('uses negated angle as default exitAngle', () => {
    const atom = rotateAtom({
      direction: 'exit',
      duration: 300,
      angle: -90,
    });

    expect(atom.keyframes).toEqual([{ rotate: 'y 0deg' }, { rotate: 'y 90deg' }]);
  });

  it('handles positive and negative angle values', () => {
    const atomPositive = rotateAtom({
      direction: 'enter',
      duration: 300,
      angle: 90,
    });

    const atomNegative = rotateAtom({
      direction: 'enter',
      duration: 300,
      angle: -45,
    });

    expect(atomPositive.keyframes[0]).toEqual({ rotate: 'y 90deg' });
    expect(atomNegative.keyframes[0]).toEqual({ rotate: 'y -45deg' });
  });
});
