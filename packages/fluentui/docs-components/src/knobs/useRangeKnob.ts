import { parseValue } from './utils/parseRangeValue';
import { UseKnobOptions } from './types';
import { useKnob } from './useKnob';

type UseRangeKnobSpecificOptions = {
  min?: number | string;
  max?: number | string;
  step?: number | string;
  unit?: string;
};
type UseRangeKnobOptions<T> = UseKnobOptions<T> & UseRangeKnobSpecificOptions;

export const useRangeKnob = <T extends number | string>(options: UseRangeKnobOptions<T>) => {
  const { initialValue = 3 as T, min = 0, max = parseValue(initialValue), step = 1, ...rest } = options;
  const unit = `${initialValue}`.replace(`${parseValue(initialValue)}`, '');

  return useKnob<T, Required<UseRangeKnobSpecificOptions>>({
    initialValue,
    unit,
    min: parseValue(min),
    max: parseValue(max),
    step: parseValue(step),
    type: 'range',
    ...rest,
  });
};
