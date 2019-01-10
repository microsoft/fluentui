// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IComponentStyles } from '../../../Foundation';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary,
        height: 250,
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
      <Stack gap={10}>
        <Stack horizontal gap={30} horizontalAlign="space-between">
          <Stack grow>
            <span>Top-aligned</span>
            <Stack verticalAlign="top" styles={styles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Vertically centered</span>
            <Stack verticalAlign="center" styles={styles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Bottom-aligned</span>
            <Stack verticalAlign="bottom" styles={styles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal gap={30} horizontalAlign="space-between">
          <Stack grow>
            <span>Vertical space around items</span>
            <Stack verticalAlign="space-around" styles={styles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Vertical space between items</span>
            <Stack verticalAlign="space-between" styles={styles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Items vertically evenly spaced</span>
            <Stack verticalAlign="space-evenly" styles={styles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
