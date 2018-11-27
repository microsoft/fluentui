// @codepen
import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { VerticalStack, HorizontalStack } from 'office-ui-fabric-react/lib/Stack';
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
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
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
