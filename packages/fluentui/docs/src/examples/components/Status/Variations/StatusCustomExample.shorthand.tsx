import * as React from 'react'
import { Status } from '@fluentui/react'

const StatusCustomExampleShorthand = () => (
  <div>
    <Status color="orange" icon="call-pstn" title="In call" />
    &emsp;
    <Status color="blue" icon="onedrive" title="Working from the sky" />
    &emsp;
    <Status color="red" icon="ban" title="Offline" />
  </div>
)

export default StatusCustomExampleShorthand
