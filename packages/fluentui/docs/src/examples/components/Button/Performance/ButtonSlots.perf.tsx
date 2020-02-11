import { Button } from '@fluentui/react'
import * as React from 'react'

const ButtonSlotsPerf = () => (
  <Button
    icon="play"
    content="Click here"
    loader={{
      delay: 200,
      inline: true,
      label: 'Loading',
      labelPosition: 'end',
      size: 'smallest',
    }}
  />
)

ButtonSlotsPerf.iterations = 1000
ButtonSlotsPerf.filename = 'ButtonSlots.perf.tsx'

export default ButtonSlotsPerf
