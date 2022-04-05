import { UseKnobOptions } from './types';
import { useKnob } from './useKnob';

type UseNumberKnobSpecificOptions = {
  min?: number | string;
  max?: number | string;
  step?: number | string;
};

type UseNumberKnobOptions<T> = UseKnobOptions<T> & UseNumberKnobSpecificOptions;

export const useNumberKnob = (options: UseNumberKnobOptions<number>) => {
  const { initialValue = 0, min = 0, max = undefined, step = '1', ...rest } = options;

  return useKnob<number, Required<UseNumberKnobSpecificOptions>>({
    initialValue,
    type: 'number',
    min,
    max,
    step,
    ...rest,
  });
};
