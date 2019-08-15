import * as React from 'react';
import { IButtonProps, PrimaryButton } from 'office-ui-fabric-react';

export const ButtonScreenReaderExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <PrimaryButton ariaDescription="Detailed description used for screen reader." disabled={disabled} checked={checked}>
      Button with Aria Description
    </PrimaryButton>
  );
};
