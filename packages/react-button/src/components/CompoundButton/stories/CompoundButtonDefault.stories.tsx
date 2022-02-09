import * as React from 'react';
import { CompoundButton, CompoundButtonProps } from '../../../CompoundButton';

export const Default = (props: CompoundButtonProps) => {
  return (
    <CompoundButton secondaryContent="Secondary content" {...props}>
      Default
    </CompoundButton>
  );
};
