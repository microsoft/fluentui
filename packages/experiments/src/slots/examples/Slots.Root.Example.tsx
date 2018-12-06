import * as React from 'react';
import { Button, VerticalStack } from '@uifabric/experiments';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
export class SlotsRootExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <VerticalStack {...stackProps}>
        {/* TODO: make sure invalid cases still cause TS errors, add invalid cases as typing tests */}
        <Button icon="share" href="https://developer.microsoft.com/en-us/fabric" content="Root: Implicit 'a' via href prop" />
        {/* <Button icon="share" root='test string (INVALID USE CASE)' content="Root: String (INVALID USE CASE)" />
            <Button icon="share" root={{ testKey: 'test value' }} content="Root: Object (INVALID USE CASE)" /> */}
        <Button icon="share" root={(rootProps, RootType) => <RootType {...rootProps} />} content="Root: Function" />
        <Button
          icon="share"
          root={(rootProps, RootType) => <RootType {...rootProps} />}
          content="Root: Function with Test Children"
          enableTestChildren={true}
        />
      </VerticalStack>
    );
  }
}
