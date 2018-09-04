import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, Slider } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IExampleState {
  shrinkingContainerHeight: number;
}

export class VerticalStackShrinkExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shrinkingContainerHeight: 100
    };

    this._onSliderChange = this._onSliderChange.bind(this);
  }

  public render(): JSX.Element {
    const padding = 10;

    const styles = mergeStyleSets({
      item: {
        background: `${DefaultPalette.white}55`,
        border: `1px solid ${DefaultPalette.neutralPrimary}`
      },

      expandedHeight: {
        height: 200
      },

      shrinkingContainer: {
        background: DefaultPalette.themeTertiary,
        height: `${this.state.shrinkingContainerHeight}%`,
        overflow: 'hidden'
      }
    });

    return (
      <VerticalStack gap={5}>
        <Slider
          label="Change the container height to see how its items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onSliderChange}
        />
        <div className={styles.expandedHeight}>
          <VerticalStack shrinkItems gap={5} padding={padding} className={styles.shrinkingContainer}>
            <VerticalStack.Item grow className={styles.item}>
              <Text>I shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item grow className={styles.item}>
              <Text>I shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item grow preventShrink className={styles.item} styles={{ root: { height: 50 } }}>
              <Text>I don't shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item grow className={styles.item}>
              <Text>I shrink</Text>
            </VerticalStack.Item>
          </VerticalStack>
        </div>
      </VerticalStack>
    );
  }

  private _onSliderChange(value: number): void {
    this.setState({ shrinkingContainerHeight: value });
  }
}
