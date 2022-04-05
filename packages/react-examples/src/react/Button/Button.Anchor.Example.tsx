import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

export const ButtonAnchorExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  // The href causes this button to be rendered as an anchor.
  return (
    <DefaultButton href="http://bing.com" target="_blank" title="let us bing!" disabled={disabled} checked={checked}>
      Bing
    </DefaultButton>
  );
};
