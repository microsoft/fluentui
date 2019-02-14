import * as React from 'react';
import { Button, Stack } from '@uifabric/experiments';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsStackExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button icon="share" content="Stack: Props, as: 'div'" stack={{ as: 'div' }} />
        <Button icon="share" stack={{ horizontalAlign: 'start' }} content="Stack: Object, horizontalAlign: left" />
        <Button icon="share" stack={render => render((StackType, props) => <StackType {...props} />)} content="Stack: Function" />
        <Button
          icon="share"
          content="Stack: Function, VerticalStack"
          // Have to override component's default horizontal prop value
          stack={render => render((StackType, props) => <Stack {...props as any} horizontal={false} />)}
        />
      </Stack>
    );
  }
}
