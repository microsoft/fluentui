import { motionTokens } from '@fluentui/react-motion';
import { rotateAtom } from './rotate-atom';

describe('rotateAtom', () => {
  it('creates directed keyframes from one angle to another', () => {
    const atom = rotateAtom({
      duration: 300,
      easing: motionTokens.curveEasyEase,
      fromAngle: -90,
      toAngle: 45,
    });

    expect(atom).toMatchObject({
      duration: 300,
      easing: motionTokens.curveEasyEase,
      keyframes: [{ rotate: 'z -90deg' }, { rotate: 'z 45deg' }],
    });
  });

  it('uses default angle endpoints when not provided', () => {
    const atom = rotateAtom({ duration: 300 });

    expect(atom.keyframes).toEqual([{ rotate: 'z -90deg' }, { rotate: 'z 0deg' }]);
  });

  it('uses default easing when not provided', () => {
    const atom = rotateAtom({ duration: 300, fromAngle: 45 });

    expect(atom.easing).toBe(motionTokens.curveLinear);
  });

  it('handles different rotation axes', () => {
    const atomX = rotateAtom({ duration: 300, axis: 'x', fromAngle: 45, toAngle: 0 });
    const atomY = rotateAtom({ duration: 300, axis: 'y', fromAngle: 45, toAngle: 0 });
    const atomZ = rotateAtom({ duration: 300, axis: 'z', fromAngle: 45, toAngle: 0 });

    expect(atomX.keyframes).toEqual([{ rotate: 'x 45deg' }, { rotate: 'x 0deg' }]);
    expect(atomY.keyframes).toEqual([{ rotate: 'y 45deg' }, { rotate: 'y 0deg' }]);
    expect(atomZ.keyframes).toEqual([{ rotate: 'z 45deg' }, { rotate: 'z 0deg' }]);
  });

  it('handles positive and negative angle values', () => {
    const atom = rotateAtom({ duration: 300, fromAngle: 90, toAngle: -45 });

    expect(atom.keyframes).toEqual([{ rotate: 'z 90deg' }, { rotate: 'z -45deg' }]);
  });

  it('includes timing properties in the returned atom', () => {
    const atom = rotateAtom({
      duration: 400,
      delay: 50,
      easing: 'ease-in-out',
      axis: 'x',
      fromAngle: 180,
      toAngle: 45,
    });

    expect(atom).toMatchObject({
      keyframes: [{ rotate: 'x 180deg' }, { rotate: 'x 45deg' }],
      duration: 400,
      easing: 'ease-in-out',
      delay: 50,
    });
  });
});
