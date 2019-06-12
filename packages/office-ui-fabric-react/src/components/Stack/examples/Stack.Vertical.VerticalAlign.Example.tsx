import * as React from 'react';
import { Stack } from '../Stack';
import { IStackStyles, IStackTokens } from '../Stack.types';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.themeTertiary,
        height: 250,
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

    const sectionStackTokens: IStackTokens = { childrenGap: 10 };
    const headingStackTokens: IStackTokens = { childrenGap: 30 };

    return (
      <Stack tokens={sectionStackTokens}>
        <Stack horizontal disableShrink horizontalAlign="space-between" tokens={headingStackTokens}>
          <Stack grow>
            <span>Top-aligned</span>
            <Stack verticalAlign="start" styles={stackStyles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Vertically centered</span>
            <Stack verticalAlign="center" styles={stackStyles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Bottom-aligned</span>
            <Stack verticalAlign="end" styles={stackStyles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal disableShrink horizontalAlign="space-between" tokens={headingStackTokens}>
          <Stack grow>
            <span>Vertical space around items</span>
            <Stack verticalAlign="space-around" styles={stackStyles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Vertical space between items</span>
            <Stack verticalAlign="space-between" styles={stackStyles}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </Stack>
          </Stack>

          <Stack grow>
            <span>Items vertically evenly spaced</span>
            <Stack verticalAlign="space-evenly" styles={stackStyles}>
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
