import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, Slider } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IExampleState {
  shrinkingContainerWidth: number;
}

export class HorizontalStackWrapExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shrinkingContainerWidth: 100
    };

    this._onSliderChange = this._onSliderChange.bind(this);
  }

  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        width: `${this.state.shrinkingContainerWidth}%`
      },

      item: {
        background: `${DefaultPalette.white}55`,
        border: `1px solid ${DefaultPalette.neutralPrimary}`,
        width: 100,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    });

    return (
      <VerticalStack gap={10}>
        <Slider
          label="Change the container width to see how child items wrap onto multiple rows:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onSliderChange}
        />

        <HorizontalStack wrap gap={30} className={styles.root}>
          <Text className={styles.item}>One</Text>
          <Text className={styles.item}>Two</Text>
          <Text className={styles.item}>Three</Text>
          <Text className={styles.item}>Four</Text>
          <Text className={styles.item}>Five</Text>
          <Text className={styles.item}>Six</Text>
        </HorizontalStack>
      </VerticalStack>
    );
  }

  private _onSliderChange(value: number): void {
    this.setState({ shrinkingContainerWidth: value });
  }
}
