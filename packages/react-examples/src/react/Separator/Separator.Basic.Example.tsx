import * as React from 'react';
import { Separator } from '@fluentui/react/lib/Separator';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

const stackTokens: IStackTokens = { childrenGap: 12 };

const HorizontalSeparatorStack = (props: { children: JSX.Element[] }) => (
  <>
    {React.Children.map(props.children, child => {
      return <Stack tokens={stackTokens}>{child}</Stack>;
    })}
  </>
);

const VerticalSeparatorStack = (props: { children: JSX.Element[] }) => (
  <Stack horizontal horizontalAlign="space-evenly">
    {React.Children.map(props.children, child => {
      return (
        <Stack horizontalAlign="center" tokens={stackTokens}>
          {child}
        </Stack>
      );
    })}
  </Stack>
);

const verticalStyle = mergeStyles({
  height: '200px',
});

const content = 'Today';

export const SeparatorBasicExample: React.FC = () => (
  <Stack tokens={stackTokens}>
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
