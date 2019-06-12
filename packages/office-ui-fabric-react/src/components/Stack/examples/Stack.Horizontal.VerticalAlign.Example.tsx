import * as React from 'react';
import { Stack } from '../Stack';
import { IStackStyles, IStackTokens } from '../Stack.types';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackVerticalAlignExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.themeTertiary,
        height: 100,
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
        <span>Top-aligned</span>
        <Stack horizontal verticalAlign="start" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Vertically centered</span>
        <Stack horizontal verticalAlign="center" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>

        <span>Bottom-aligned</span>
        <Stack horizontal verticalAlign="end" styles={stackStyles}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Stack>
      </Stack>
    );
  }
}
