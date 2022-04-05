import * as React from 'react';
import { Label } from '@fluentui/react-northstar';
import { CallVideoIcon } from '@fluentui/react-icons-northstar';

const SvgIconExampleSpace = () => (
  <div>
    <p>
      <Label>Default</Label>
      <CallVideoIcon />
      <Label>Default</Label>
    </p>
    <p>
      <Label>Before</Label>
      <CallVideoIcon xSpacing="before" />
      <Label>Before</Label>
    </p>
    <p>
      <Label>After</Label>
      <CallVideoIcon xSpacing="after" />
      <Label>After</Label>
    </p>
    <p>
      <Label>Both</Label>
      <CallVideoIcon xSpacing="both" />
      <Label>Both</Label>
    </p>
    <p>
      <Label>None</Label>
      <CallVideoIcon xSpacing="none" />
      <Label>None</Label>
    </p>
  </div>
);

export default SvgIconExampleSpace;
