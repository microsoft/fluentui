import { fadeAtom } from './fade-atom';

describe('fadeAtom', () => {
  it('creates proper keyframes for enter and exit directions', () => {
    const enterAtom = fadeAtom({
      direction: 'enter',
      duration: 300,
    });

    const exitAtom = fadeAtom({
      direction: 'exit',
      duration: 300,
    });

    expect(enterAtom.keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);
    expect(exitAtom.keyframes).toEqual([{ opacity: 1 }, { opacity: 0 }]);
  });

  it('applies custom opacity values', () => {
    const atom = fadeAtom({
      direction: 'enter',
      duration: 300,
      fromOpacity: 0.5,
    });

    expect(atom.keyframes).toEqual([{ opacity: 0.5 }, { opacity: 1 }]);
  });

  it('allows custom fill mode when explicitly provided', () => {
    const atom = fadeAtom({
      direction: 'enter',
      duration: 300,
      fill: 'forwards',
    });

    expect(atom.fill).toBe('forwards');
  });

  it('has fill mode "both" by default to prevent opacity flickering during delays', () => {
    const enterAtom = fadeAtom({
      direction: 'enter',
      duration: 300,
      delay: 100,
    });

    const exitAtom = fadeAtom({
      direction: 'exit',
      duration: 300,
      delay: 50,
    });

    expect(enterAtom.fill).toBe('both');
    expect(exitAtom.fill).toBe('both');
  });

  it('includes all expected properties in the returned atom', () => {
    const atom = fadeAtom({
      direction: 'enter',
      duration: 250,
      delay: 100,
      easing: 'ease-out',
    });

    expect(atom).toMatchObject({
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 250,
      easing: 'ease-out',
      delay: 100,
      fill: 'both',
    });
  });
});
