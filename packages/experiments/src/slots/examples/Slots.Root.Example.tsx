import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { IStackProps, Stack } from 'office-ui-fabric-react';

const stackProps: IStackProps = { tokens: { childrenGap: 16 }, padding: 8, maxWidth: 400 };

// tslint:disable:jsx-no-lambda
export class SlotsRootExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button icon="share" href="https://developer.microsoft.com/en-us/fabric" content="Root: Implicit 'a' via href prop" />
        <Button
          icon="share"
          content="Root: Function"
          slots={{ root: { render: (rootProps, DefaultComponent) => <DefaultComponent {...rootProps} /> } }}
        />
      </Stack>
    );
  }
}
