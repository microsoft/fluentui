import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { Spinner, Stack, TooltipHost, IStackProps } from 'office-ui-fabric-react';

const stackProps: IStackProps = { tokens: { childrenGap: 16 }, padding: 8, maxWidth: 400 };

// tslint:disable:jsx-no-lambda
export class SlotsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps} maxWidth={400}>
        <Button
          // Render function usage, wrapping default content
          slots={{
            root: {
              render: (rootProps, DefaultComponent) => (
                <TooltipHost content="This is the tooltip">
                  <DefaultComponent {...rootProps} />
                </TooltipHost>
              )
            },
            content: {
              // TODO: add 'element' option with JSX?
              // element: <Spinner />
              component: Spinner as any
            }
          }}
          // Shorthand prop usage
          icon="share"
        >
          Just a button with a spinner as its content.
        </Button>
      </Stack>
    );
  }
}
