import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Slider } from 'office-ui-fabric-react';
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
      <VerticalStack gap={5}>
        <Slider
          label="Change the stack width to see how child items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onWidthChange}
        />
        <HorizontalStack gap={5} shrinkItems padding={10} className={styles.root}>
          <HorizontalStack.Item grow className={styles.item}>
            I shrink
          </HorizontalStack.Item>
          <HorizontalStack.Item grow className={styles.item}>
            I shrink
          </HorizontalStack.Item>
          <HorizontalStack.Item grow preventShrink className={styles.item} styles={{ root: { width: 500 } }}>
            I don't shrink
          </HorizontalStack.Item>
          <HorizontalStack.Item grow className={styles.item}>
            I shrink
          </HorizontalStack.Item>
        </HorizontalStack>
      </VerticalStack>
    );
  }

  private _onWidthChange = (value: number): void => {
    this.setState({ stackWidth: value });
  };
}
