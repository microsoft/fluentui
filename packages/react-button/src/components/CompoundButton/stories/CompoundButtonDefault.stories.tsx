import * as React from 'react';
import { CompoundButton, CompoundButtonProps } from '../../../CompoundButton';

export const Default = (props: CompoundButtonProps) => {
  return (
    <CompoundButton secondaryContent="This is the secondary content" {...props}>
      CompoundButton
    </CompoundButton>
  );
};
