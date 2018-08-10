import * as React from 'react';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { ITheme, customizable, mergeStyles, Slider } from 'office-ui-fabric-react';

export interface IStackExampleProps {
  theme?: ITheme;
}

export interface IStackExampleState {
  shrinkingContainerHeight: number;
}

@customizable('StackVerticalExample', ['theme'])
export class StackVerticalExample extends React.Component<IStackExampleProps, IStackExampleState> {
  constructor(props: IStackExampleProps) {
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

    return (
      <VerticalStack gap={5}>
        <Text size="xSmall">Default vertical stack</Text>
        <VerticalStack padding={padding} className={style}>
          <Text size="mini">Item One</Text>
          <Text size="mini">Item Two</Text>
          <Text size="mini">Item Three</Text>
        </VerticalStack>

        <Text size="xSmall">Vertical gap between items</Text>
        <VerticalStack gap={10} padding={padding} className={style}>
          <Text size="mini">Item One</Text>
          <Text size="mini">Item Two</Text>
          <Text size="mini">Item Three</Text>
        </VerticalStack>

        <Text size="xSmall">Growing items</Text>
        <div className={expandedHeightStyle}>
          <VerticalStack fillVertical gap={5} padding={padding} className={style}>
            <VerticalStack.Item grow={3} className={itemStyle}>
              <Text size="mini">Grow is 3</Text>
            </VerticalStack.Item>
            <VerticalStack.Item grow className={itemStyle}>
              <Text size="mini">Grow is 1</Text>
            </VerticalStack.Item>
          </VerticalStack>
        </div>

        <Text size="xSmall">Shrinking items</Text>
        <Slider
          label="Change the container height to see how its items shrink:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onSliderChange}
        />
        <div className={expandedHeightStyle}>
          <VerticalStack shrinkItems gap={5} padding={padding} className={shrinkingContainerStyle}>
            <VerticalStack.Item grow className={itemStyle}>
              <Text size="mini">I shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item grow className={itemStyle}>
              <Text size="mini">I shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item grow preventShrink className={mergeStyles(itemStyle, { height: 50 })}>
              <Text size="mini">I don't shrink</Text>
            </VerticalStack.Item>
            <VerticalStack.Item grow className={itemStyle}>
              <Text size="mini">I shrink</Text>
            </VerticalStack.Item>
          </VerticalStack>
        </div>

        <Text size="xSmall">Item alignments</Text>
        <VerticalStack gap={5} padding={padding} className={style}>
          <VerticalStack.Item align="auto" className={itemStyle}>
            <Text size="mini">Auto-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="stretch" className={itemStyle}>
            <Text size="mini">Stretch-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="baseline" className={itemStyle}>
            <Text size="mini">Baseline-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="start" className={itemStyle}>
            <Text size="mini">Start-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="center" className={itemStyle}>
            <Text size="mini">Center-aligned item</Text>
          </VerticalStack.Item>
          <VerticalStack.Item align="end" className={itemStyle}>
            <Text size="mini">End-aligned item</Text>
          </VerticalStack.Item>
        </VerticalStack>
      </VerticalStack>
    );
  }

  private _onSliderChange(value: number): void {
    this.setState({ shrinkingContainerHeight: value });
  }
}
