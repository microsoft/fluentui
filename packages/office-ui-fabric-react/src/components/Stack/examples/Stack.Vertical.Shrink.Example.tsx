import * as React from 'react';
import { mergeStyleSets, DefaultPalette, IStackTokens, Slider, Stack } from 'office-ui-fabric-react';

export interface IExampleState {
  stackHeight: number;
}

export class VerticalStackShrinkExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackHeight: 100
    };
  }

  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: `${this.state.stackHeight}%`,
        overflow: 'hidden'
      },

      item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        overflow: 'hidden'
      },

      container: {
        height: 200
      }
    });

    const stackTokens: IStackTokens = { childrenGap: 5 };

    return (
      <Stack tokens={stackTokens}>
        <Slider
          label="Change the stack height to see how child items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onHeightChange}
        />
        <div className={styles.container}>
          <Stack tokens={stackTokens} padding={10} className={styles.root}>
            <Stack.Item grow className={styles.item}>
              I shrink
            </Stack.Item>
            <Stack.Item grow className={styles.item}>
              I shrink
            </Stack.Item>
            <Stack.Item grow disableShrink className={styles.item} styles={{ root: { height: 50 } }}>
              I don't shrink
            </Stack.Item>
            <Stack.Item grow className={styles.item}>
              I shrink
            </Stack.Item>
          </Stack>
        </div>
      </Stack>
    );
  }

  private _onHeightChange = (value: number): void => {
    this.setState({ stackHeight: value });
  };
}
