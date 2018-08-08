import * as React from 'react';
import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles, Slider } from 'office-ui-fabric-react';

export interface IStackHorizontalExampleProps {
  theme?: ITheme;
}

export interface IStackHorizontalExampleState {
  shrinkingContainerWidth: number;
}

@customizable('StackHorizontalExample', ['theme'])
export class StackHorizontalExample extends React.Component<
  IStackHorizontalExampleProps,
  IStackHorizontalExampleState
> {
  constructor(props: IStackHorizontalExampleProps) {
    super(props);
    this.state = {
      shrinkingContainerWidth: 100
    };
    this._onSliderChange = this._onSliderChange.bind(this);
  }

  public render(): JSX.Element {
    const padding = 10;

    const { theme } = this.props;
    const { palette } = theme!;

    const style = mergeStyles({
      background: palette.neutralTertiary
    });

    const itemStyle = mergeStyles({
      background: `${palette.white}55`,
      border: `1px solid ${palette.themePrimary}`
    });

    const shrinkingContainerStyle = mergeStyles(style, {
      width: `${this.state.shrinkingContainerWidth}%`
    });
    const shrinkingItemStyle = mergeStyles({
      width: 500,
      border: `1px solid ${palette.themePrimary}`
    });
    const preventShrinkingStyle = mergeStyles(shrinkingItemStyle, {
      flexShrink: 0
    });

    const items = this._renderItems();

    return (
      <VerticalStack gap={5}>
        <Text>Default horizontal stack</Text>
        <HorizontalStack padding={padding} className={style}>
          {items}
        </HorizontalStack>

        <Text>Horizontal gap between items</Text>
        <HorizontalStack gap={10} padding={padding} className={style}>
          {items}
        </HorizontalStack>

        <Text>Growing items</Text>
        <HorizontalStack gap={5} padding={padding} className={style}>
          <HorizontalStack.Item grow={3} className={itemStyle}>
            <Text size="tiny">Grow is 3</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow className={itemStyle}>
            <Text size="tiny">Grow is 1</Text>
          </HorizontalStack.Item>
        </HorizontalStack>

        <Text>Shrinking items</Text>
        <Slider
          label="Change the container width to see how its items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onSliderChange}
        />
        <HorizontalStack shrinkItems padding={padding} className={shrinkingContainerStyle}>
          <HorizontalStack.Item className={shrinkingItemStyle}>
            <Text size="tiny">I shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item className={shrinkingItemStyle}>
            <Text size="tiny">I shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item className={preventShrinkingStyle}>
            <Text size="tiny">I don't shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item className={shrinkingItemStyle}>
            <Text size="tiny">I shrink</Text>
          </HorizontalStack.Item>
        </HorizontalStack>
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
    this.setState({ shrinkingContainerWidth: value });
  }
}
