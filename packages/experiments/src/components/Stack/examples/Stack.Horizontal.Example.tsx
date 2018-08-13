import * as React from 'react';
import { HorizontalStack, VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles, Slider } from 'office-ui-fabric-react';

export interface IStackExampleProps {
  theme?: ITheme;
}

export interface IStackExampleState {
  shrinkingContainerWidth: number;
}

@customizable('StackHorizontalExample', ['theme'])
export class StackHorizontalExample extends React.Component<IStackExampleProps, IStackExampleState> {
  constructor(props: IStackExampleProps) {
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

    return (
      <VerticalStack gap={5}>
        <Text size="xSmall">Default horizontal stack</Text>
        <HorizontalStack padding={padding} className={style}>
          <Text size="mini">Item One</Text>
          <Text size="mini">Item Two</Text>
          <Text size="mini">Item Three</Text>
        </HorizontalStack>

        <Text size="xSmall">Horizontal gap between items</Text>
        <HorizontalStack gap={10} padding={padding} className={style}>
          <Text size="mini">Item One</Text>
          <Text size="mini">Item Two</Text>
          <Text size="mini">Item Three</Text>
        </HorizontalStack>

        <Text size="xSmall">Growing items</Text>
        <HorizontalStack gap={5} padding={padding} className={style}>
          <HorizontalStack.Item grow={3} className={itemStyle}>
            <Text size="mini">Grow is 3</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow className={itemStyle}>
            <Text size="mini">Grow is 1</Text>
          </HorizontalStack.Item>
        </HorizontalStack>

        <Text size="xSmall">Shrinking items</Text>
        <Slider
          label="Change the container width to see how its items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onSliderChange}
        />
        <HorizontalStack shrinkItems gap={5} padding={padding} className={shrinkingContainerStyle}>
          <HorizontalStack.Item grow className={itemStyle}>
            <Text size="mini">I shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow className={itemStyle}>
            <Text size="mini">I shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow preventShrink className={mergeStyles(itemStyle, { width: 500 })}>
            <Text size="mini">I don't shrink</Text>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow className={itemStyle}>
            <Text size="mini">I shrink</Text>
          </HorizontalStack.Item>
        </HorizontalStack>

        <Text size="xSmall">Item alignments</Text>
        <div className={mergeStyles({ height: 100 })}>
          <HorizontalStack fillVertical gap={5} padding={padding} className={style}>
            <HorizontalStack.Item align="auto" className={itemStyle}>
              <Text size="mini">Auto-aligned item</Text>
            </HorizontalStack.Item>
            <HorizontalStack.Item align="stretch" className={itemStyle}>
              <Text size="mini">Stretch-aligned item</Text>
            </HorizontalStack.Item>
            <HorizontalStack.Item align="baseline" className={itemStyle}>
              <Text size="mini">Baseline-aligned item</Text>
            </HorizontalStack.Item>
            <HorizontalStack.Item align="start" className={itemStyle}>
              <Text size="mini">Start-aligned item</Text>
            </HorizontalStack.Item>
            <HorizontalStack.Item align="center" className={itemStyle}>
              <Text size="mini">Center-aligned item</Text>
            </HorizontalStack.Item>
            <HorizontalStack.Item align="end" className={itemStyle}>
              <Text size="mini">End-aligned item</Text>
            </HorizontalStack.Item>
          </HorizontalStack>
        </div>
      </VerticalStack>
    );
  }

  private _onSliderChange(value: number): void {
    this.setState({ shrinkingContainerWidth: value });
  }
}
