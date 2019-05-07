import * as React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

const HorizontalSeparatorStack = (props: { children: JSX.Element[] }) => (
  <>
    {React.Children.map(props.children, child => {
      return <Stack gap={12}>{child}</Stack>;
    })}
  </>
);

const VerticalSeparatorStack = (props: { children: JSX.Element[] }) => (
  <Stack horizontal horizontalAlign="space-evenly">
    {React.Children.map(props.children, child => {
      return (
        <Stack gap={12} horizontalAlign="center">
          {child}
        </Stack>
      );
    })}
  </Stack>
);

const verticalStyle = mergeStyles({
  height: '200px'
});

export class SeparatorBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const content = 'Today';

    return (
      <Stack gap={12}>
        <HorizontalSeparatorStack>
          <>
            <Text>Horizontal center aligned</Text>
            <Separator>{content}</Separator>
          </>
          <>
            <Text>Horizontal start aligned</Text>
            <Separator alignContent="start">{content}</Separator>
          </>
          <>
            <Text>Horizontal end aligned</Text>
            <Separator alignContent="end">{content}</Separator>
          </>
          <>
            <Text>Empty horizontal</Text>
            <Separator />
          </>
        </HorizontalSeparatorStack>
        <VerticalSeparatorStack>
          <>
            <Text>Vertical center aligned</Text>
            <Stack.Item className={verticalStyle}>
              <Separator vertical>{content}</Separator>
            </Stack.Item>
          </>
          <>
            <Text>Vertical start aligned</Text>
            <Stack.Item className={verticalStyle}>
              <Separator vertical alignContent="start">
                {content}
              </Separator>
            </Stack.Item>
          </>
          <>
            <Text>Vertical end aligned</Text>
            <Stack.Item className={verticalStyle}>
              <Separator vertical>{content}</Separator>
            </Stack.Item>
          </>
          <>
            <Text>Empty vertical</Text>
            <Stack.Item className={verticalStyle}>
              <Separator vertical />
            </Stack.Item>
          </>
        </VerticalSeparatorStack>
      </Stack>
    );
  }
}
