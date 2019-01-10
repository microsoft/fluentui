// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IComponentStyles } from '../../../Foundation';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary,
        height: 100,
        selectors: {
          '> *': {
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: DefaultPalette.themePrimary,
            color: DefaultPalette.white
          }
        }
      }
    };

    return (
      <Stack gap={5}>
        <span>Top-aligned</span>
        <Stack horizontal verticalAlign="top" styles={styles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Vertically centered</span>
        <Stack horizontal verticalAlign="center" styles={styles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Bottom-aligned</span>
        <Stack horizontal verticalAlign="bottom" styles={styles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>
      </Stack>
    );
  }
}
