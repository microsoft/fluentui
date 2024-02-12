import { createSequenceAtom } from './createSequenceAtom';

describe('createSequenceAtom', () => {
  it('combines atoms', () => {
    const atomA = { keyframes: [], duration: 100 };
    const atomB = { keyframes: [], duration: 200 };
    const atomC = { keyframes: [], duration: 300 };

    const result = createSequenceAtom(atomA, atomB, atomC);

    expect(result).toMatchObject([
      { duration: 100, keyframes: [] },
      { duration: 200, delay: 100, keyframes: [] },
      { duration: 300, delay: 300, keyframes: [] },
    ]);
  });

  it('combines groups', () => {
    const atomA = { keyframes: [], duration: 100 };
    const groupA = [
      { keyframes: [], duration: 200 },
      { keyframes: [], duration: 300 },
    ];
    const groupB = [
      { keyframes: [], duration: 400 },
      { keyframes: [], duration: 500 },
    ];
    const atomB = { keyframes: [], duration: 600 };

    const result = createSequenceAtom(atomA, groupA, groupB, atomB);

    expect(result).toMatchObject([
      { duration: 100, keyframes: [] },

      { duration: 200, delay: 100, keyframes: [] },
      { duration: 300, delay: 100, keyframes: [] },

      { duration: 400, delay: 400, keyframes: [] },
      { duration: 500, delay: 400, keyframes: [] },

      { duration: 600, delay: 900, keyframes: [] },
    ]);
  });

  describe('delay', () => {
    it('adds delay to the next atom', () => {
      const atomA = { keyframes: [], delay: 100, duration: 100 };
      const atomB = { keyframes: [], delay: 200, duration: 200 };
      const atomC = { keyframes: [], delay: 300, duration: 300 };

      const result = createSequenceAtom(atomA, atomB, atomC);

      expect(result).toMatchObject([
        { duration: 100, delay: 100, keyframes: [] },
        { duration: 200, delay: 400, keyframes: [] },
        { duration: 300, delay: 900, keyframes: [] },
      ]);
    });

    it('adds delay to the next group', () => {
      const atomA = { keyframes: [], delay: 100, duration: 100 };
      const groupA = [
        { keyframes: [], delay: 200, duration: 200 },
        { keyframes: [], delay: 300, duration: 300 },
      ];
      const groupB = [
        { keyframes: [], delay: 400, duration: 400 },
        { keyframes: [], delay: 500, duration: 500 },
      ];

      const result = createSequenceAtom(atomA, groupA, groupB);

      expect(result).toMatchObject([
        { duration: 100, delay: 100, keyframes: [] },

        { duration: 200, delay: 400, keyframes: [] },
        { duration: 300, delay: 500, keyframes: [] },

        { duration: 400, delay: 1200, keyframes: [] },
        { duration: 500, delay: 1300, keyframes: [] },
      ]);
    });
  });

  describe('endDelay', () => {
    it('adds delay to the next atom', () => {
      const atomA = { keyframes: [], endDelay: 100, duration: 100 };
      const atomB = { keyframes: [], endDelay: 200, duration: 200 };
      const atomC = { keyframes: [], endDelay: 300, duration: 300 };

      const result = createSequenceAtom(atomA, atomB, atomC);

      expect(result).toMatchObject([
        { duration: 100, endDelay: 100, keyframes: [] },
        { duration: 200, delay: 200, endDelay: 200, keyframes: [] },
        { duration: 300, delay: 600, endDelay: 300, keyframes: [] },
      ]);
    });

    it('adds delay to the next group', () => {
      const atomA = { keyframes: [], duration: 100, endDelay: 100 };
      const groupA = [
        { keyframes: [], endDelay: 200, duration: 200 },
        { keyframes: [], endDelay: 300, duration: 300 },
      ];
      const groupB = [
        { keyframes: [], endDelay: 400, duration: 400 },
        { keyframes: [], endDelay: 500, duration: 500 },
      ];

      const result = createSequenceAtom(atomA, groupA, groupB);

      expect(result).toMatchObject([
        { duration: 100, endDelay: 100, keyframes: [] },

        { duration: 200, delay: 200, endDelay: 200, keyframes: [] },
        { duration: 300, delay: 200, endDelay: 300, keyframes: [] },

        { duration: 400, delay: 800, endDelay: 400, keyframes: [] },
        { duration: 500, delay: 800, endDelay: 500, keyframes: [] },
      ]);
    });
  });
});
