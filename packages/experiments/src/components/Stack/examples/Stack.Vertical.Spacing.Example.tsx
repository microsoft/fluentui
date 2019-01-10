// @codepen
import * as React from 'react';
import { Stack } from '../Stack';
import { IStackSlots } from '../Stack.types';
import { IStackItemSlots } from '../StackItem/StackItem.types';
import { IComponentStyles } from '../../../Foundation';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackSpacingExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const rootStyles: IComponentStyles<IStackSlots> = {
      root: {
        background: DefaultPalette.themeTertiary
      }
    };

    const itemStyles: IComponentStyles<IStackItemSlots> = {
      root: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white
      }
    };

    return (
      <Stack gap={10}>
        <Stack horizontal gap={50}>
          <Stack>
            <span>Numerical spacing</span>
            <Stack styles={rootStyles} gap={10} padding={10}>
              <span className={mergeStyleSets(itemStyles).root}>1</span>
              <span className={mergeStyleSets(itemStyles).root}>2</span>
              <span className={mergeStyleSets(itemStyles).root}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Custom spacing</span>
            <Stack styles={rootStyles} gap="20%" padding="m 40px">
              <span className={mergeStyleSets(itemStyles).root}>1</span>
              <span className={mergeStyleSets(itemStyles).root}>2</span>
              <span className={mergeStyleSets(itemStyles).root}>3</span>
            </Stack>
          </Stack>
        </Stack>

        <Stack horizontal horizontalAlign="space-between">
          <Stack>
            <span>Themed spacing (extra small)</span>
            <Stack styles={rootStyles} gap="s2" padding="s2">
              <span className={mergeStyleSets(itemStyles).root}>1</span>
              <span className={mergeStyleSets(itemStyles).root}>2</span>
              <span className={mergeStyleSets(itemStyles).root}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (small)</span>
            <Stack styles={rootStyles} gap="s1" padding="s2">
              <span className={mergeStyleSets(itemStyles).root}>1</span>
              <span className={mergeStyleSets(itemStyles).root}>2</span>
              <span className={mergeStyleSets(itemStyles).root}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (medium)</span>
            <Stack styles={rootStyles} gap="m" padding="m">
              <span className={mergeStyleSets(itemStyles).root}>1</span>
              <span className={mergeStyleSets(itemStyles).root}>2</span>
              <span className={mergeStyleSets(itemStyles).root}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (large)</span>
            <Stack styles={rootStyles} gap="l1" padding="l1">
              <span className={mergeStyleSets(itemStyles).root}>1</span>
              <span className={mergeStyleSets(itemStyles).root}>2</span>
              <span className={mergeStyleSets(itemStyles).root}>3</span>
            </Stack>
          </Stack>

          <Stack>
            <span>Themed spacing (extra large)</span>
            <Stack styles={rootStyles} gap="l2" padding="l2">
              <span className={mergeStyleSets(itemStyles).root}>1</span>
              <span className={mergeStyleSets(itemStyles).root}>2</span>
              <span className={mergeStyleSets(itemStyles).root}>3</span>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
