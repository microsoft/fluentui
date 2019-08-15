import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react';

export const ButtonAnchorExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <DefaultButton href="http://bing.com" target="_blank" title="let us bing!" disabled={disabled} checked={checked}>
      Bing
    </DefaultButton>
  );
};
