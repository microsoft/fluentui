import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { mergeStyleSets, IStyleSet, Slider } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IExampleState {
  shrinkingContainerWidth: number;
}

export class HorizontalStackWrapAdvancedExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shrinkingContainerWidth: 100
    };

    this._onSliderChange = this._onSliderChange.bind(this);
  }

  public render(): JSX.Element {
    const textStyles = {
      width: 50,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: DefaultPalette.white
    } as IStyleSet<{}>;

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        width: `${this.state.shrinkingContainerWidth}%`,
        marginLeft: 10
      },

      stackOne: {
        background: DefaultPalette.tealLight
      },

      stackTwo: {
        background: DefaultPalette.teal
      },

      stackThree: {
        background: DefaultPalette.tealDark
      },

      textOne: {
        ...textStyles,
        background: DefaultPalette.magentaLight
      },

      textTwo: {
        ...textStyles,
        background: DefaultPalette.magenta
      },

      textThree: {
        ...textStyles,
        background: DefaultPalette.magentaDark
      },

      text: textStyles
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

        <HorizontalStack wrap gap={40} verticalGap={30} className={styles.root}>
          <HorizontalStack
            wrap
            gap={30}
            verticalGap={10}
            styles={{
              inner: {
                selectors: {
                  '*': {
                    background: DefaultPalette.magentaLight
                  }
                }
              }
            }}
            className={styles.stackOne}
          >
            <Text className={styles.text}>1</Text>
            <Text className={styles.textOne}>2</Text>
            <Text className={styles.textOne}>3</Text>
            <Text className={styles.textOne}>4</Text>
            <Text className={styles.textOne}>5</Text>
            <Text className={styles.textOne}>6</Text>
            <Text className={styles.textOne}>7</Text>
          </HorizontalStack>
          <HorizontalStack
            wrap
            gap={50}
            verticalGap={20}
            styles={{
              inner: {
                selectors: {
                  '*': {
                    background: DefaultPalette.magenta
                  }
                }
              }
            }}
            className={styles.stackTwo}
          >
            <Text className={styles.textTwo}>1</Text>
            <Text className={styles.textTwo}>2</Text>
            <Text className={styles.textTwo}>3</Text>
          </HorizontalStack>
          <HorizontalStack
            wrap
            styles={{
              inner: {
                selectors: {
                  '*': {
                    background: DefaultPalette.magentaDark
                  }
                }
              }
            }}
            className={styles.stackThree}
          >
            <Text className={styles.textThree}>1</Text>
            <Text className={styles.textThree}>2</Text>
            <Text className={styles.textThree}>3</Text>
            <Text className={styles.textThree}>4</Text>
            <Text className={styles.textThree}>5</Text>
            <Text className={styles.textThree}>6</Text>
            <Text className={styles.textThree}>7</Text>
            <Text className={styles.textThree}>8</Text>
            <Text className={styles.textThree}>9</Text>
            <Text className={styles.textThree}>10</Text>
          </HorizontalStack>
        </HorizontalStack>
      </VerticalStack>
    );
  }

  private _onSliderChange(value: number): void {
    this.setState({ shrinkingContainerWidth: value });
  }
}
