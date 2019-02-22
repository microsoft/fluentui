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
  return <div {...this.props} />;
};

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsStackExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button icon="share" content="Stack: Props, as: 'AsComponent'" stack={{ as: AsComponent }} />
        <Button icon="share" content="Stack: Props, as: 'AsComponentSFC'" stack={{ as: AsComponentSFC }} />
        <Button icon="share" content="Stack: Props, as: 'div'" stack={{ as: 'div' }} />
        <Button icon="share" content="Stack: Props, as: 'span'" stack={{ as: 'span' }} />
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
