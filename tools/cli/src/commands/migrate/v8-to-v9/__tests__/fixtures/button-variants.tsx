import { PrimaryButton, DefaultButton, ActionButton, IconButton } from '@fluentui/react';

export const MyComp = () => (
  <div>
    <PrimaryButton>Primary</PrimaryButton>
    <DefaultButton>Default</DefaultButton>
    <ActionButton>Action</ActionButton>
    <IconButton iconProps={{ iconName: 'Add' }} />
  </div>
);
