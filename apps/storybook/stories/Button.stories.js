import React from 'react';
import { PrimaryButton, DefaultButton, CompoundButton } from 'office-ui-fabric-react';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Button', module)
  .add('PrimaryButton', () => (
    <PrimaryButton
    >Hello There</PrimaryButton>
  ))
  .add('DefaultButton', () => (
    <DefaultButton
    >Hello There</DefaultButton>
  ))
  .add('CompoundButton', () => (
    <CompoundButton
      description="This is a description"
    >Hello There</CompoundButton>
  ))
  ;