import { UseKnobOptions } from './types';
import { useKnob } from './useKnob';

export const useStringKnob = (options: UseKnobOptions<string>) =>
  useKnob<string>({
    initialValue: '',
    type: 'string',
    ...options,
  });
