import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { Spinner, Stack, IStackProps } from 'office-ui-fabric-react';

const stackProps: IStackProps = { tokens: { childrenGap: 16 }, padding: 8, maxWidth: 400 };

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsContentExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack {...stackProps}>
        <Button content={{ children: 1 }}>
          <p>Content: Integer</p>
        </Button>
        <Button content="Content: String" />
        <Button content={{ children: 'Content: Props' }} />
        <Button slots={{ content: { render: () => <Spinner /> } }}>
          <p>Content: Function, Spinner</p>
        </Button>
        <Button
          slots={{
            content: {
              render: (contentProps, DefaultComponent) => (
                <b>
                  Wrapper Content Text: <DefaultComponent {...contentProps}>TextType</DefaultComponent>
                </b>
              )
            }
          }}
        >
          <p>Content: Function, Text + ContentType</p>
        </Button>
        <Button content={{ children: 'Content: Child String' }} />
        <Button content={{ children: ['Content: Child 1,', ' Child 2'] }} />
        {/* // TODO: add 'element' option with JSX? */}
        {/* <Button content={<Text>Content: JSX Element</Text>} /> */}
        <Button content="Content: With Children">
          <p>Button Child 1</p>
          <p>Button Child 2</p>
        </Button>
      </Stack>
    );
  }
}
