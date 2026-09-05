import { slideAtom2 } from './slide-atom2';
import { expectCustomParameters, expectKeyframeProperty, expectValidAtomMotion } from '../testing/atomTestUtils';

describe('slideAtom2', () => {
  it('creates a directed translation from explicit endpoints', () => {
    const atom = slideAtom2({
      duration: 300,
      fromX: '100px',
      fromY: '-50px',
      toX: '20px',
      toY: '10px',
    });

    expectValidAtomMotion(atom);
    expectKeyframeProperty(atom, 'translate', ['100px -50px', '20px 10px']);
  });

  it('uses zero translations as endpoint defaults', () => {
    const atom = slideAtom2({ duration: 300 });

    expect(atom.keyframes).toEqual([{ translate: '0px 0px' }, { translate: '0px 0px' }]);
  });

  it('supports percentage-based endpoint values', () => {
    const atom = slideAtom2({
      duration: 300,
      fromX: '100%',
      fromY: '-100%',
      toX: '50%',
      toY: '25%',
    });

    expect(atom.keyframes).toEqual([{ translate: '100% -100%' }, { translate: '50% 25%' }]);
  });

  it('applies timing and fill parameters', () => {
    const atom = slideAtom2({
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
});
