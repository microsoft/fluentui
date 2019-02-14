import * as React from 'react';
import { Button, Stack } from '@uifabric/experiments';
import { Spinner } from 'office-ui-fabric-react';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
export class SlotsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps} maxWidth={400}>
        <Button
          // Render function usage
          root={render => render((RootType, rootProps) => <RootType {...rootProps} />)}
          // Subcomponent props usage
          stack={{ styles: { root: { background: 'lightblue' } } }}
          // Shorthand prop usage
          icon="share"
          // Render function usage
          content={render => render((ComponentType, props) => <Spinner />)}
        >
          Just a button with a spinner as its content.
        </Button>
      </Stack>
    );
  }
}
