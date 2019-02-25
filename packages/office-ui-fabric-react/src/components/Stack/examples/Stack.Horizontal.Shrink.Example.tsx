// @codepen
import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from '../Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IExampleState {
  stackWidth: number;
}

export class HorizontalStackShrinkExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackWidth: 100
    };
  }

  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        width: `${this.state.stackWidth}%`,
        overflow: 'hidden'
      },

      item: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: DefaultPalette.white,
        background: DefaultPalette.themePrimary,
        overflow: 'hidden'
      }
    });

    return (
      <Stack gap={5}>
        <Slider
          label="Change the stack width to see how child items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onWidthChange}
        />
        <Stack horizontal gap={5} padding={10} className={styles.root}>
          <Stack.Item grow className={styles.item}>
            I shrink
          </Stack.Item>
          <Stack.Item grow className={styles.item}>
            I shrink
          </Stack.Item>
          <Stack.Item grow disableShrink className={styles.item} styles={{ root: { width: 500 } }}>
            I don't shrink
          </Stack.Item>
          <Stack.Item grow className={styles.item}>
            I shrink
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }

  private _onWidthChange = (value: number): void => {
    this.setState({ stackWidth: value });
  };
}
