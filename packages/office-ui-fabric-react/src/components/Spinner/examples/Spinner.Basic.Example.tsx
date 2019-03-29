import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';

export const SpinnerBasicExample: React.StatelessComponent = () => {
  // This is just for laying out the label and spinner (spinners don't have to be inside a Stack)
  const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center', gap: 20 };
  return (
    <Stack gap={10}>
      <Stack {...rowProps}>
        <Label>Extra small spinner</Label>
        <Spinner size={SpinnerSize.xSmall} />
      </Stack>

      <Stack {...rowProps}>
        <Label>Small spinner</Label>
        <Spinner size={SpinnerSize.small} />
      </Stack>

      <Stack {...rowProps}>
        <Label>Medium spinner</Label>
        <Spinner size={SpinnerSize.medium} />
      </Stack>

      <Stack {...rowProps}>
        <Label>Large spinner</Label>
        <Spinner size={SpinnerSize.large} />
      </Stack>
    </Stack>
  );
};
