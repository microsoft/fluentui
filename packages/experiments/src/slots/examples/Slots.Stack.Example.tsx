import * as React from 'react';
import { Button, VerticalStack } from '@uifabric/experiments';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsStackExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <VerticalStack {...stackProps}>
        <Button icon="share" content="Stack: Props, as: 'div'" stack={{ as: 'div' }} />
        {/* <Button icon="share" stack='test string (INVALID USE CASE)' content="Stack: String (INVALID USE CASE)" /> */}
        <Button icon="share" stack={{ horizontalAlign: 'left' }} content="Stack: Object, horizontalAlign: left" />
        <Button icon="share" stack={(props, StackType) => <StackType {...props} />} content="Stack: Function" />
        <Button icon="share" content="Stack: Function, VerticalStack" stack={(props, StackType) => <VerticalStack {...props as any} />} />
        <Button
          icon="share"
          stack={(props, StackType) => <StackType {...props} />}
          content="Stack: Function with Test Children"
          enableTestChildren={true}
        />
      </VerticalStack>
    );
  }
}
