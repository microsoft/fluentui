// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IStackItemSlots } from '../StackItem/StackItem.types';
import { IComponentStyles } from '../../../Foundation';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackGrowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const rootStyles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary
      }
    };

    const itemStyles: IComponentStyles<IStackItemSlots> = {
      root: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: DefaultPalette.white,
        background: DefaultPalette.themePrimary
      }
    };

    return (
      <Stack horizontal gap={5} padding={10} styles={rootStyles}>
        <Stack.Item grow={3} styles={itemStyles}>
          Grow is 3
        </Stack.Item>
        <Stack.Item grow={2} styles={itemStyles}>
          Grow is 2
        </Stack.Item>
        <Stack.Item grow styles={itemStyles}>
          Grow is 1
        </Stack.Item>
      </Stack>
    );
  }
}
