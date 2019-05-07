import * as React from 'react';
import { Stack } from '../Stack';
import { IStackStyles, IStackTokens } from '../Stack.types';
import { IStackItemStyles } from '../StackItem/StackItem.types';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackGrowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.themeTertiary
      }
    };
    const stackItemStyles: IStackItemStyles = {
      root: {
        alignItems: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'center'
      }
    };

    const stackTokens: IStackTokens = {
      childrenGap: 5,
      padding: 10
    };

    return (
      <Stack horizontal styles={stackStyles} tokens={stackTokens}>
        <Stack.Item grow={3} styles={stackItemStyles}>
          Grow is 3
        </Stack.Item>
        <Stack.Item grow={2} styles={stackItemStyles}>
          Grow is 2
        </Stack.Item>
        <Stack.Item grow styles={stackItemStyles}>
          Grow is 1
        </Stack.Item>
      </Stack>
    );
  }
}
