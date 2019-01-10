// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IComponentStyles } from '../../../Foundation';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackHorizontalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary,
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
        <span>Left-aligned</span>
        <Stack horizontalAlign="start" styles={styles}>
          <span>1</span>
          <span>2</span>
        </Stack>

        <span>Horizontally centered</span>
        <Stack horizontalAlign="center" styles={styles}>
          <span>1</span>
          <span>2</span>
        </Stack>

        <span>Right-aligned</span>
        <Stack horizontalAlign="end" styles={styles}>
          <span>1</span>
          <span>2</span>
        </Stack>
      </Stack>
    );
  }
}
