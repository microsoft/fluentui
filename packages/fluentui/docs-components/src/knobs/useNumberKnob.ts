import parseValue from './utils/parseRangeValue';
import { UseKnobOptions } from './types';
import useKnob from './useKnob';

type UseNumberKnobSpecificOptions = {
  min?: number;
  max?: number;
  step?: number;
};

type UseNumberKnobOptions<T> = UseKnobOptions<T> & UseNumberKnobSpecificOptions;

const useStringKnob = (options: UseNumberKnobOptions<number>) => {
  const { initialValue = 0, min = 0, max = parseValue(initialValue), step = 1, ...rest } = options;

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
