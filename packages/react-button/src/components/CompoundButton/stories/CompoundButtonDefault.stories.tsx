import * as React from 'react';
import { CompoundButton, CompoundButtonProps } from '../../../CompoundButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Default = (props: CompoundButtonProps) => {
  return (
    <CompoundButton secondaryContent="This is the secondary content" {...props}>
      CompoundButton
    </CompoundButton>
  );
};
