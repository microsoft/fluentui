import { UseKnobOptions } from './types';
import { useKnob } from './useKnob';

type UseBooleanKnobOptions = UseKnobOptions<boolean>;

export const useBooleanKnob = (options: UseBooleanKnobOptions) =>
  useKnob<boolean>({
    initialValue: false,
    type: 'boolean',
    ...options,
  });
