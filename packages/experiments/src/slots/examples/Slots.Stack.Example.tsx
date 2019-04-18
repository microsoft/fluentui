import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { Stack } from 'office-ui-fabric-react';
import { stackProps } from './SlotExampleUtils';

class AsComponent extends React.Component<React.HTMLAttributes<HTMLElement>, {}> {
  public render(): JSX.Element {
    return <div {...this.props} />;
  }
}

const AsComponentSFC: React.StatelessComponent<React.HTMLAttributes<HTMLElement>> = props => {
  return <div {...props} />;
};

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsStackExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button icon="share" content="Stack: Props, as: 'AsComponent'" stack={{ props: { as: AsComponent } }} />
        <Button icon="share" content="Stack: Props, as: 'AsComponentSFC'" stack={{ props: { as: AsComponentSFC } }} />
        <Button icon="share" content="Stack: Props, as: 'div'" stack={{ props: { as: 'div' } }} />
        <Button icon="share" content="Stack: Props, as: 'span'" stack={{ props: { as: 'span' } }} />
        <Button icon="share" stack={{ props: { horizontalAlign: 'start' } }} content="Stack: Object, horizontalAlign: left" />
        <Button
          icon="share"
          stack={{ render: (props, DefaultComponent) => <DefaultComponent {...props} /> }}
          content="Stack: Render Function"
        />
        <Button
          icon="share"
          content="Stack: Function, VerticalStack"
          // Have to override component's default horizontal prop value
          stack={{ component: Stack, render: (props, StackType) => <Stack {...props as any} horizontal={false} /> }}
        />
      </Stack>
    );
  }
}
