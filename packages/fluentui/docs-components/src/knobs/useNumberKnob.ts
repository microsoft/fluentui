import { UseKnobOptions } from './types';
import useKnob from './useKnob';

type UseNumberKnobSpecificOptions = {
  min?: string;
  max?: string;
  step?: string;
};

type UseNumberKnobOptions<T> = UseKnobOptions<T> & UseNumberKnobSpecificOptions;

const useStringKnob = (options: UseNumberKnobOptions<number>) => {
  const { initialValue = parse, min = 0, max = undefined, step = 1, ...rest } = options;

  return useKnob<number, Required<UseNumberKnobSpecificOptions>>({
    initialValue,
    type: 'number',
    min,
    max,
    step,
    ...rest,
  });
};

export default useStringKnob;
