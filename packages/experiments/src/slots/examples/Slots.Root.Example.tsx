import * as React from 'react';
import { Button, VerticalStack } from '@uifabric/experiments';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
export class SlotsRootExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <VerticalStack {...stackProps}>
        <Button icon="share" href="https://developer.microsoft.com/en-us/fabric" content="Root: Implicit 'a' via href prop" />
        <Button icon="share" root={(rootProps, RootType) => <RootType {...rootProps} />} content="Root: Function" />
      </VerticalStack>
    );
  }
}
