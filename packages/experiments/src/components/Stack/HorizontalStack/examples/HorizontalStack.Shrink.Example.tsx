import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, Slider } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IExampleState {
  shrinkingContainerWidth: number;
}

export class HorizontalStackShrinkExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shrinkingContainerWidth: 100
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

      shrinkingContainer: {
        background: DefaultPalette.themeTertiary,
        width: `${this.state.shrinkingContainerWidth}%`,
        overflow: 'hidden'
      }
    });

    return (
      <VerticalStack gap={5}>
        <Slider
          label="Change the container width to see how its items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onSliderChange}
        />
        <HorizontalStack shrinkItems gap={5} padding={padding} className={styles.shrinkingContainer}>
          <HorizontalStack.Item grow className={styles.item}>
            <Text>I shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow className={styles.item}>
            <Text>I shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow preventShrink className={styles.item} styles={{ root: { width: 500 } }}>
            <Text>I don't shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow className={styles.item}>
            <Text>I shrink</Text>
          </HorizontalStack.Item>
        </HorizontalStack>
      </VerticalStack>
    );
  }

  private _onSliderChange(value: number): void {
    this.setState({ shrinkingContainerWidth: value });
  }
}
