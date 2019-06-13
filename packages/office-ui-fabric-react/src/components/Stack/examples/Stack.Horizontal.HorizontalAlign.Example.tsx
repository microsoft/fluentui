import * as React from 'react';
import { Stack } from '../Stack';
import { IStackStyles, IStackTokens } from '../Stack.types';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackHorizontalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.themeTertiary,
        selectors: {
          '> *': {
            alignItems: 'center',
            background: DefaultPalette.themePrimary,
            color: DefaultPalette.white,
            display: 'flex',
            height: 50,
            justifyContent: 'center',
            width: 50
          }
        }
      }
    };

    const stackTokens: IStackTokens = { childrenGap: 5 };

    return (
      <Stack tokens={stackTokens}>
        <span>Left-aligned</span>
        <Stack horizontal horizontalAlign="start" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Horizontally centered</span>
        <Stack horizontal horizontalAlign="center" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Right-aligned</span>
        <Stack horizontal horizontalAlign="end" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Horizontal space around items</span>
        <Stack horizontal horizontalAlign="space-around" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Horizontal space between items</span>
        <Stack horizontal horizontalAlign="space-between" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Items horizontally evenly spaced</span>
        <Stack horizontal horizontalAlign="space-evenly" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>
      </Stack>
    );
  }
}
