import * as React from 'react';
import { CompoundButton as CompoundButtonV8, IButtonProps } from '@fluentui/react';
import { CompoundButton as CompoundButtonV9, webLightTheme, FluentProvider } from '@fluentui/react-components';
import { CompoundButtonShim } from '../../../../../shims/ButtonShim';

export const CompoundButtonShimExample = (props: IButtonProps) => {
  return (
    <>
      <CompoundButtonV8 secondaryText="Secondary text">Compound</CompoundButtonV8>
      <FluentProvider theme={webLightTheme}>
        <CompoundButtonShim secondaryText="Secondary text">Compound</CompoundButtonShim>
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <CompoundButtonV9 secondaryContent="Secondary text">Compound</CompoundButtonV9>
      </FluentProvider>
    </>
  );
};
