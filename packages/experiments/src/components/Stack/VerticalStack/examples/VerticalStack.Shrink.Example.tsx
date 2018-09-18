import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Slider } from 'office-ui-fabric-react';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

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

    return (
      <VerticalStack gap={5}>
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
          <VerticalStack shrinkItems gap={5} padding={10} className={styles.root}>
            <VerticalStack.Item grow className={styles.item}>
              I shrink
            </VerticalStack.Item>
            <VerticalStack.Item grow className={styles.item}>
              I shrink
            </VerticalStack.Item>
            <VerticalStack.Item grow preventShrink className={styles.item} styles={{ root: { height: 50 } }}>
              I don't shrink
            </VerticalStack.Item>
            <VerticalStack.Item grow className={styles.item}>
              I shrink
            </VerticalStack.Item>
          </VerticalStack>
        </div>
      </VerticalStack>
    );
  }

  private _onHeightChange = (value: number): void => {
    this.setState({ stackHeight: value });
  };
}
