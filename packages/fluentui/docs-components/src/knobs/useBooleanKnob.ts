import { UseKnobOptions } from './types'
import useKnob from './useKnob'

type UseBooleanKnobOptions = UseKnobOptions<boolean>

const useBooleanKnob = (options: UseBooleanKnobOptions) =>
  useKnob<boolean>({
    initialValue: false,
    type: 'boolean',
    ...options,
  })

export default useBooleanKnob
