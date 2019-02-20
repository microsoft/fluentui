import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { Stack } from 'office-ui-fabric-react';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
export class SlotsRootExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button icon="share" href="https://developer.microsoft.com/en-us/fabric" content="Root: Implicit 'a' via href prop" />
        <Button icon="share" root={render => render((RootType, rootProps) => <RootType {...rootProps} />)} content="Root: Function" />
      </Stack>
    );
  }
}
