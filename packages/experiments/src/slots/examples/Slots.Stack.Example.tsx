import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { IStackProps, Stack } from 'office-ui-fabric-react';

const stackProps: IStackProps = { tokens: { childrenGap: 16 }, padding: 8, maxWidth: 400 };

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
        <Button icon="share" content="Stack: Props, as: 'AsComponent'" stack={{ as: AsComponent }} />
        <Button icon="share" content="Stack: Props, as: 'AsComponentSFC'" stack={{ as: AsComponentSFC }} />
        <Button icon="share" content="Stack: Props, as: 'div'" stack={{ as: 'div' }} />
        <Button icon="share" content="Stack: Props, as: 'span'" stack={{ as: 'span' }} />
        <Button icon="share" stack={{ horizontalAlign: 'start' }} content="Stack: Object, horizontalAlign: left" />
        <Button
          icon="share"
          content="Stack: Render Function"
          slots={{ stack: { render: (props, DefaultComponent) => <DefaultComponent {...props} /> } }}
        />
        <Button
          icon="share"
          content="Stack: Function, VerticalStack"
          // Have to override component's default horizontal prop value
          slots={{ stack: { render: props => <Stack {...props as any} horizontal={false} /> } }}
        />
      </Stack>
    );
  }
}
