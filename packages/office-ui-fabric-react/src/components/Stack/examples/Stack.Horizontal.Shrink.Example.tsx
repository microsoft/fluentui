import * as React from 'react';
import { mergeStyleSets, DefaultPalette, IStackTokens, Slider, Stack } from 'office-ui-fabric-react';

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

    const stackTokens: IStackTokens = { childrenGap: 5 };

    return (
      <Stack tokens={stackTokens}>
        <Slider
          label="Change the stack width to see how child items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onWidthChange}
        />
        <Stack horizontal tokens={stackTokens} padding={10} className={styles.root}>
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
