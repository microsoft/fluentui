import { fadeAtom2 } from './fade-atom2';
import { expectCustomParameters, expectKeyframeProperty, expectValidAtomMotion } from '../testing/atomTestUtils';

describe('fadeAtom2', () => {
  it('creates a directed opacity change from explicit endpoints', () => {
    const atom = fadeAtom2({
      duration: 300,
      fromOpacity: 0.2,
      toOpacity: 0.8,
    });

    expectValidAtomMotion(atom);
    expectKeyframeProperty(atom, 'opacity', [0.2, 0.8]);
  });

  it('defaults to fading from transparent to opaque', () => {
    const atom = fadeAtom2({ duration: 300 });

    expect(atom.keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);
  });

  it('applies timing and fill parameters', () => {
    const atom = fadeAtom2({
      duration: 400,
      delay: 150,
      easing: 'ease-in-out',
      fill: 'both',
    });

    expectCustomParameters(atom, {
      duration: 400,
      delay: 150,
      easing: 'ease-in-out',
    });
    expect(atom.fill).toBe('both');
  });

  it('omits fill when it is not specified', () => {
    const atom = fadeAtom2({ duration: 300 });

    expect(atom).not.toHaveProperty('fill');
  });
});
