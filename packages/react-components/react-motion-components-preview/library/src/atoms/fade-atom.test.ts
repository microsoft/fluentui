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

    // Enter: fade from transparent to opaque
    expect(enterAtom.keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);

    // Exit: fade from opaque to transparent
    expect(exitAtom.keyframes).toEqual([{ opacity: 1 }, { opacity: 0 }]);
  });

  it('allows custom fromOpacity value', () => {
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
      duration: 200,
      delay: 50,
    });

    // Both atoms should have fill: 'both' by default to prevent opacity flickering
    expect(enterAtom.fill).toBe('both');
    expect(exitAtom.fill).toBe('both');
  });
});
