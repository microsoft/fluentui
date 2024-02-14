import { createGroupAtom } from './createGroupAtom';
import { createSequenceAtom } from './createSequenceAtom';

describe('createSequenceAtom', () => {
  it('combines atoms', () => {
    const atomA = { keyframes: [], delay: 100, duration: 100 };
    const atomB = { keyframes: [], delay: 200, duration: 200 };
    const atomC = { keyframes: [], delay: 300, duration: 300 };

    const result = createSequenceAtom(atomA, atomB, atomC);

    expect(result).toMatchObject({
      motions: [
        { duration: 100, delay: 100, keyframes: [] },
        { duration: 200, delay: 400, keyframes: [] },
        { duration: 300, delay: 900, keyframes: [] },
      ],
    });
  });

  it('combines groups', () => {
    const atomA = { keyframes: [], delay: 100, duration: 100 };
    const groupA = createGroupAtom(
      { keyframes: [], delay: 200, duration: 200 },
      { keyframes: [], delay: 300, duration: 300 },
    );
    const groupB = createGroupAtom(
      { keyframes: [], delay: 400, duration: 400 },
      { keyframes: [], delay: 500, duration: 500 },
    );
    const atomB = { keyframes: [], delay: 500, duration: 500 };

    const result = createSequenceAtom(atomA, groupA, groupB, atomB);

    expect(result).toMatchObject({
      motions: [
        { duration: 100, delay: 100, keyframes: [] },

        { duration: 200, delay: 400, keyframes: [] },
        { duration: 300, delay: 500, keyframes: [] },

        { duration: 400, delay: 1200, keyframes: [] },
        { duration: 500, delay: 1300, keyframes: [] },

        { duration: 500, delay: 2300, keyframes: [] },
      ],
    });
  });

  it('combines sequences', () => {
    const sequenceA = createSequenceAtom(
      { keyframes: [], delay: 100, duration: 100 },
      { keyframes: [], delay: 200, duration: 200 },
    );
    const sequenceB = createSequenceAtom(
      { keyframes: [], delay: 300, duration: 300 },
      { keyframes: [], delay: 400, duration: 400 },
    );
    const atom = { keyframes: [], delay: 500, duration: 500 };

    const result = createSequenceAtom(sequenceA, sequenceB, atom);

    expect(result).toMatchObject({
      motions: [
        { duration: 100, delay: 100, keyframes: [] },
        { duration: 200, delay: 400, keyframes: [] },

        { duration: 300, delay: 900, keyframes: [] },
        { duration: 400, delay: 1600, keyframes: [] },

        { duration: 500, delay: 2500, keyframes: [] },
      ],
    });
  });
});
