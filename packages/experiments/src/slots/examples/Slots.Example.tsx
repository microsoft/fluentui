import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { Spinner, Stack, TooltipHost } from 'office-ui-fabric-react';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
export class SlotsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps} maxWidth={400}>
        <Button
          // Render function usage, wrapping default content
          root={{
            render: (rootProps, DefaultComponent) => (
              <TooltipHost content="This is the tooltip">
                <DefaultComponent {...rootProps} />
              </TooltipHost>
            )
          }}
          // Subcomponent props usage
          stack={{ props: { styles: { root: { background: 'lightblue' } } } }}
          // Shorthand prop usage
          icon="share"
          // JSX usage
          content={<Spinner />}
        >
          Just a button with a spinner as its content.
        </Button>
      </Stack>
    );
  }
}
