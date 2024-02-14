import { createGroupAtom } from './createGroupAtom';
import { createSequenceAtom } from './createSequenceAtom';

describe('createGroupAtom', () => {
  it('combines atoms', () => {
    const atomA = { keyframes: [], duration: 300 };
    const atomB = { keyframes: [], duration: 200 };

    const result = createSequenceAtom(atomA, atomB);

    expect(result).toMatchObject({
      motions: [
        { duration: 300, keyframes: [] },
        { duration: 200, keyframes: [] },
      ],
    });
  });

  it('combines groups', () => {
    const atom = { keyframes: [], duration: 100 };
    const group = createGroupAtom({ keyframes: [], duration: 200 }, { keyframes: [], duration: 300 });

    const result = createGroupAtom(atom, group);

    expect(result).toMatchObject({
      motions: [
        { duration: 100, keyframes: [] },
        { duration: 200, keyframes: [] },
        { duration: 300, keyframes: [] },
      ],
    });
  });

  it('combines sequences', () => {
    const group = createGroupAtom({ keyframes: [], duration: 100 }, { keyframes: [], duration: 200 });
    const sequence = createSequenceAtom({ keyframes: [], duration: 400 }, { keyframes: [], duration: 500 });

    const result = createGroupAtom(group, sequence);

    expect(result).toMatchObject({
      motions: [
        { duration: 100, keyframes: [] },
        { duration: 200, keyframes: [] },
        { duration: 400, keyframes: [] },
        { duration: 500, delay: 400, keyframes: [] },
      ],
    });
  });
});
