import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { Slider, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export type HorizontalAlignment = 'left' | 'center' | 'right' | 'space-around' | 'space-between' | 'space-evenly';
export type VerticalAlignment = 'top' | 'center' | 'bottom';
export type Overflow = 'visible' | 'auto' | 'hidden';

export interface IExampleState {
  stackWidth: number;
  containerHeight: number;
  horizontalAlignment: HorizontalAlignment;
  verticalAlignment: VerticalAlignment;
  overflow: Overflow;
}

export class HorizontalStackWrapAdvancedExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackWidth: 100,
      containerHeight: 150,
      horizontalAlignment: 'left',
      verticalAlignment: 'top',
      overflow: 'visible'
    };
  }

  public render(): JSX.Element {
    const { stackWidth, containerHeight, overflow, horizontalAlignment, verticalAlignment } = this.state;

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        width: `${stackWidth}%`,
        overflow,
        selectors: {
          '& span': {
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: DefaultPalette.themePrimary,
            color: DefaultPalette.white
          }
        }
      },

      container: {
        height: containerHeight
      }
    });

    return (
      <VerticalStack gap={10}>
        <HorizontalStack>
          <HorizontalStack.Item grow>
            <Slider label="Stack width:" min={1} max={100} step={1} defaultValue={100} showValue={true} onChange={this._onWidthChange} />
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <Slider
              label="Container height:"
              min={1}
              max={200}
              step={1}
              defaultValue={150}
              showValue={true}
              onChange={this._onHeightChange}
            />
          </HorizontalStack.Item>
        </HorizontalStack>

        <HorizontalStack gap={20}>
          <HorizontalStack.Item grow>
            <Dropdown
              selectedKey={horizontalAlignment}
              placeholder="Select Horizontal Alignment"
              label="Horizontal alignment:"
              options={[
                { key: 'left', text: 'Left' },
                { key: 'center', text: 'Center' },
                { key: 'right', text: 'Right' },
                { key: 'space-around', text: 'Space around' },
                { key: 'space-between', text: 'Space between' },
                { key: 'space-evenly', text: 'Space evenly' }
              ]}
              onChange={this._onHorizontalAlignChange}
            />
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <Dropdown
              selectedKey={verticalAlignment}
              placeholder="Select Vertical Alignment"
              label="Vertical alignment:"
              options={[{ key: 'top', text: 'Top' }, { key: 'center', text: 'Center' }, { key: 'bottom', text: 'Bottom' }]}
              onChange={this._onVerticalAlignChange}
            />
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <Dropdown
              selectedKey={overflow}
              placeholder="Select Overflow"
              label="Overflow:"
              options={[{ key: 'visible', text: 'Visible' }, { key: 'auto', text: 'Auto' }, { key: 'hidden', text: 'Hidden' }]}
              onChange={this._onOverflowChange}
            />
          </HorizontalStack.Item>
        </HorizontalStack>

        <div className={styles.container}>
          <HorizontalStack
            fillVertical
            wrap
            gap={30}
            horizontalAlign={horizontalAlignment}
            verticalAlign={verticalAlignment}
            className={styles.root}
          >
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
            <Text>6</Text>
            <Text>7</Text>
            <Text>8</Text>
            <Text>9</Text>
            <Text>10</Text>
          </HorizontalStack>
        </div>
      </VerticalStack>
    );
  }

  private _onWidthChange = (value: number): void => {
    this.setState({ stackWidth: value });
  };

  private _onHeightChange = (value: number): void => {
    this.setState({ containerHeight: value });
  };

  private _onHorizontalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ horizontalAlignment: option.key as HorizontalAlignment });
  };

  private _onVerticalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ verticalAlignment: option.key as VerticalAlignment });
  };

  private _onOverflowChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ overflow: option.key as Overflow });
  };
}
