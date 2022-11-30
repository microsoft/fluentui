import type { IStackTokens } from '@fluentui/react';
import { Spinner, Stack } from '@fluentui/react';
import * as React from 'react';

export const SpinnerLabeledExample: React.FunctionComponent = () => {
  const stackTokens: IStackTokens = {
    childrenGap: 20,
    maxWidth: 250,
  };

  return (
    <Stack tokens={stackTokens}>
      <Spinner label="Label Position Before..." ariaLive="assertive" labelPosition="left" />
      <Spinner label="Label Position After..." labelPosition="right" />

      <Spinner label="Label Position Above..." ariaLive="assertive" labelPosition="top" />

      <Spinner label="Label Position Below..." ariaLive="assertive" />
    </Stack>
  );
};
