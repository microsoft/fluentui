// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IStackItemSlots } from '../StackItem/StackItem.types';
import { IComponentStyles } from '../../../Foundation';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class HorizontalStackBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const rootStyles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary
      }
    };

    const itemStyles: IComponentStyles<IStackItemSlots> = {
      root: {
        color: DefaultPalette.white,
        background: DefaultPalette.themePrimary,
        padding: 5
      }
    };

    return (
      <Stack gap={5}>
        <span>Default horizontal stack</span>
        <Stack horizontal styles={rootStyles}>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </Stack>

        <span>Horizontal gap between items</span>
        <Stack horizontal gap={10} padding={10} styles={rootStyles}>
          <span>Item One</span>
          <span>Item Two</span>
          <span>Item Three</span>
        </Stack>

        <span>Item alignments</span>
        <Stack horizontal gap={5} padding={10} styles={{ root: { background: DefaultPalette.themeTertiary, height: 100 } }}>
          <Stack.Item align="auto" styles={itemStyles}>
            <span>Auto-aligned item</span>
          </Stack.Item>
          <Stack.Item align="stretch" styles={itemStyles}>
            <span>Stretch-aligned item</span>
          </Stack.Item>
          <Stack.Item align="baseline" styles={itemStyles}>
            <span>Baseline-aligned item</span>
          </Stack.Item>
          <Stack.Item align="start" styles={itemStyles}>
            <span>Start-aligned item</span>
          </Stack.Item>
          <Stack.Item align="center" styles={itemStyles}>
            <span>Center-aligned item</span>
          </Stack.Item>
          <Stack.Item align="end" styles={itemStyles}>
            <span>End-aligned item</span>
          </Stack.Item>
        </Stack>

        <span>Clickable stack</span>
        <Stack horizontal onClick={this._onClick} padding={10} styles={rootStyles}>
          <span>Click inside this box</span>
        </Stack>
      </Stack>
    );
  }

  private _onClick = (): void => {
    alert('Clicked Stack');
  };
}
