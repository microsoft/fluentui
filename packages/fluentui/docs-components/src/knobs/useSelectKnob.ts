import { UseKnobOptions } from './types';
import { useKnob } from './useKnob';

type UseSelectKnobOptions<T extends string> = UseKnobOptions<T> & {
  allowsNone?: boolean;
};

export const useSelectKnob = <T extends string>(options: UseSelectKnobOptions<T>) => {
  const [value, setValue] = useKnob<T>({
    initialValue: '' as T,
    type: 'select',
    ...options,
    values: options.allowsNone ? ['none' as T, ...options.values] : options.values,
  });

  return [value === 'none' ? undefined : value, setValue] as [T, (newValue: T) => void];
};
