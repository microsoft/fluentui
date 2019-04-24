import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { Spinner, Stack, Text } from 'office-ui-fabric-react';
import { stackProps } from './SlotExampleUtils';

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsContentExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button content={{ props: { children: 1 } }}>
          <p>Content: Integer</p>
        </Button>
        <Button content="Content: String" />
        <Button content={{ props: { weight: 'bold', children: 'Content: Props, weight: bold' } }} />
        <Button content={{ render: () => <Spinner /> }}>
          <p>Content: Function, Spinner</p>
        </Button>
        <Button
          content={{
            render: (contentProps, DefaultComponent) => (
              <b>
                Wrapper Content Text: <DefaultComponent {...contentProps}>TextType</DefaultComponent>
              </b>
            )
          }}
        >
          <p>Content: Function, Text + ContentType</p>
        </Button>
        <Button content={{ props: { children: 'Content: Child String' } }} />
        <Button content={{ props: { children: ['Content: Child 1,', ' Child 2'] } }} />
        <Button content={<Text>Content: JSX Element</Text>} />
        <Button content="Content: With Children">
          <p>Button Child 1</p>
          <p>Button Child 2</p>
        </Button>
      </Stack>
    );
  }
}
