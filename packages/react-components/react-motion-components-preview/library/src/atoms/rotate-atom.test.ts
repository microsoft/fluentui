import { motionTokens } from '@fluentui/react-motion';
import { rotateAtom } from './rotate-atom';

describe('rotateAtom', () => {
  it('creates enter keyframes with rotation from angle to 0', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
      easing: motionTokens.curveEasyEase,
      outAngle: -90,
    });

    expect(atom).toMatchObject({
      duration: 300,
      easing: motionTokens.curveEasyEase,
      keyframes: [{ rotate: 'z -90deg' }, { rotate: 'z 0deg' }],
    });
  });

  it('creates exit keyframes with rotation from 0 to inAngle', () => {
    const atom = rotateAtom({
      direction: 'exit',
      duration: 250,
      easing: motionTokens.curveAccelerateMin,
      outAngle: -90,
      inAngle: 90,
    });

    expect(atom).toMatchObject({
      duration: 250,
      easing: motionTokens.curveAccelerateMin,
      keyframes: [{ rotate: 'z 90deg' }, { rotate: 'z -90deg' }],
    });
  });

  it('uses default angle when not provided', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
    });

    expect(atom.keyframes).toEqual([{ rotate: 'z -90deg' }, { rotate: 'z 0deg' }]);
  });

  it('uses default easing when not provided', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
      outAngle: 45,
    });

    expect(atom.easing).toBe(motionTokens.curveLinear);
  });

  it('uses default axis when not provided', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
      outAngle: 180,
    });

    expect(atom.keyframes[0]).toEqual({ rotate: 'z 180deg' });
    expect(atom.keyframes[1]).toEqual({ rotate: 'z 0deg' });
  });

  it('applies custom outAngle and inAngle values', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 300,
      outAngle: 180,
      inAngle: 45,
    });

    expect(atom.keyframes).toEqual([{ rotate: 'z 180deg' }, { rotate: 'z 45deg' }]);
  });

  it('handles different rotation axes', () => {
    const atomX = rotateAtom({
      direction: 'enter',
      duration: 300,
      axis: 'x',
      outAngle: 45,
    });

    const atomY = rotateAtom({
      direction: 'enter',
      duration: 300,
      axis: 'y',
      outAngle: 45,
    });

    const atomZ = rotateAtom({
      direction: 'enter',
      duration: 300,
      axis: 'z',
      outAngle: 45,
    });

    expect(atomX.keyframes[0]).toEqual({ rotate: 'x 45deg' });
    expect(atomY.keyframes[0]).toEqual({ rotate: 'y 45deg' });
    expect(atomZ.keyframes[0]).toEqual({ rotate: 'z 45deg' });
  });

  it('uses inAngle when direction is exit', () => {
    const atom = rotateAtom({
      direction: 'exit',
      duration: 300,
      outAngle: -90,
      inAngle: 45,
    });

    expect(atom.keyframes).toEqual([{ rotate: 'z 45deg' }, { rotate: 'z -90deg' }]);
  });

  it('uses default inAngle when not provided', () => {
    const atom = rotateAtom({
      direction: 'exit',
      duration: 300,
      outAngle: -90,
    });

    expect(atom.keyframes).toEqual([{ rotate: 'z 0deg' }, { rotate: 'z -90deg' }]);
  });

  it('handles positive and negative angle values', () => {
    const atomPositive = rotateAtom({
      direction: 'enter',
      duration: 300,
      outAngle: 90,
    });

    const atomNegative = rotateAtom({
      direction: 'enter',
      duration: 300,
      outAngle: -45,
    });

    expect(atomPositive.keyframes[0]).toEqual({ rotate: 'z 90deg' });
    expect(atomNegative.keyframes[0]).toEqual({ rotate: 'z -45deg' });
  });

  it('includes all expected properties in the returned atom', () => {
    const atom = rotateAtom({
      direction: 'enter',
      duration: 400,
      delay: 50,
      easing: 'ease-in-out',
      axis: 'x',
      outAngle: 180,
      inAngle: 45,
    });

    expect(atom).toMatchObject({
      keyframes: [{ rotate: 'x 180deg' }, { rotate: 'x 45deg' }],
      duration: 400,
      easing: 'ease-in-out',
      delay: 50,
    });
  });

  it('creates proper keyframes for enter and exit directions', () => {
    const enterAtom = rotateAtom({
      direction: 'enter',
      duration: 300,
      outAngle: -90,
      inAngle: 0,
    });

    const exitAtom = rotateAtom({
      direction: 'exit',
      duration: 300,
      outAngle: -90,
      inAngle: 0,
    });

    expect(enterAtom.keyframes).toEqual([{ rotate: 'z -90deg' }, { rotate: 'z 0deg' }]);
    expect(exitAtom.keyframes).toEqual([{ rotate: 'z 0deg' }, { rotate: 'z -90deg' }]);
  });
});
