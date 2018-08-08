import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles, Slider } from 'office-ui-fabric-react';

export interface IStackVerticalExampleProps {
  theme?: ITheme;
}

export interface IStackVerticalExampleState {
  shrinkingContainerHeight: number;
}

@customizable('StackVerticalExample', ['theme'])
export class StackVerticalExample extends React.Component<IStackVerticalExampleProps, IStackVerticalExampleState> {
  constructor(props: IStackVerticalExampleProps) {
    super(props);
    this.state = {
      shrinkingContainerHeight: 100
    };

    this._onSliderChange = this._onSliderChange.bind(this);
  }

  public render(): JSX.Element {
    const padding = 10;

    const expandedHeightStyle = mergeStyles({
      height: 200
    });

    const { theme } = this.props;
    const { palette } = theme!;

    const style = mergeStyles({
      background: palette.themeTertiary
    });

    const itemStyle = mergeStyles({
      background: `${palette.white}55`,
      border: `1px solid ${palette.neutralPrimary}`
    });

    const shrinkingContainerStyle = mergeStyles(style, {
      height: `${this.state.shrinkingContainerHeight}%`,
      overflow: 'hidden'
    });
    const shrinkingItemStyle = mergeStyles({
      height: 60,
      border: `1px solid ${palette.neutralPrimary}`
    });
    const preventShrinkingStyle = mergeStyles(shrinkingItemStyle, {
      flexShrink: 0
    });

    const items = this._renderItems();

    return (
      <VerticalStack gap={5}>
        <Text>Default vertical stack</Text>
        <VerticalStack padding={padding} className={style}>
          {items}
        </VerticalStack>

        <Text>Vertical gap between items</Text>
        <VerticalStack gap={10} padding={padding} className={style}>
          {items}
        </VerticalStack>

        <Text>Growing items</Text>
        <div className={expandedHeightStyle}>
          <VerticalStack fillVertical gap={5} padding={padding} className={style}>
            <VerticalStack.Item grow={3} className={itemStyle}>
              <Text size="tiny">Grow is 3</Text>
            </VerticalStack.Item>
            <VerticalStack.Item grow className={itemStyle}>
              <Text size="tiny">Grow is 1</Text>
            </VerticalStack.Item>
          </VerticalStack>
        </div>

        <Text>Shrinking items</Text>
        <Slider
          label="Change the container height to see how its items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onSliderChange}
        />
        <div className={mergeStyles({ height: 300 })}>
          <VerticalStack shrinkItems gap={5} padding={padding} className={shrinkingContainerStyle}>
            <VerticalStack.Item className={shrinkingItemStyle}>
              <Text size="tiny">I shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item className={shrinkingItemStyle}>
              <Text size="tiny">I shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item className={preventShrinkingStyle}>
              <Text size="tiny">I don't shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item className={shrinkingItemStyle}>
              <Text size="tiny">I shrink</Text>
            </VerticalStack.Item>
          </VerticalStack>
        </div>
      </VerticalStack>
    );
  }

  private _renderItems(): JSX.Element[] {
    return [
      <Text size="tiny" key={1}>
        Item One
      </Text>,
      <Text size="tiny" key={2}>
        Item Two
      </Text>,
      <Text size="tiny" key={3}>
        Item Three
      </Text>
    ];
  }

  private _onSliderChange(value: number): void {
    this.setState({ shrinkingContainerHeight: value });
  }
}
