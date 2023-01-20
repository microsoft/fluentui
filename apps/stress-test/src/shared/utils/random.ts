import { LCG } from 'random-seedable';

const defaultSeed = 4212021;

export type Random = {
  coin: (pTrue: number) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  choice: (choices: any[]) => any;
  range: (min: number, max: number) => number;
  integer: () => number;
};

export type RandomFn = (seed?: number) => Random;

export const random: RandomFn = seed => {
  const rando: LCG = new LCG(seed ?? defaultSeed);

  return {
    coin: (pTrue = 0.5) => rando.coin(pTrue),
    choice: choices => rando.choice(choices),
    range: (min, max) => rando.randRange(min, max),
    integer: () => rando.int(),
  };
};
