import * as React from 'react'
import { Icon, Label } from '@fluentui/react'

const IconExampleSpace = () => (
  <div>
    <p>
      <Label>Default</Label>
      <Icon name="call-video" />
      <Label>Default</Label>
    </p>
    <p>
      <Label>Before</Label>
      <Icon name="call-video" xSpacing="before" />
      <Label>Before</Label>
    </p>
    <p>
      <Label>After</Label>
      <Icon name="call-video" xSpacing="after" />
      <Label>After</Label>
    </p>
    <p>
      <Label>Both</Label>
      <Icon name="call-video" xSpacing="both" />
      <Label>Both</Label>
    </p>
    <p>
      <Label>None</Label>
      <Icon name="call-video" xSpacing="none" />
      <Label>None</Label>
    </p>
  </div>
)

export default IconExampleSpace
