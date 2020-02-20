import { UseKnobOptions } from './types'
import useKnob from './useKnob'

const useStringKnob = (options: UseKnobOptions<string>) =>
  useKnob<string>({
    initialValue: '',
    type: 'string',
    ...options,
  })

export default useStringKnob
