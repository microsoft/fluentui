import { UseKnobOptions } from './types';
import useKnob from './useKnob';

const useStringKnob = (options: UseKnobOptions<number>) =>
  useKnob<number>({
    initialValue: 0,
    type: 'number',
    ...options,
  });

export default useStringKnob;
