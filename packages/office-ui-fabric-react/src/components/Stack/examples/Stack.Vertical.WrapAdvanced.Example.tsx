import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export type HorizontalAlignment = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
export type VerticalAlignment = 'start' | 'center' | 'end';
export type Overflow = 'visible' | 'auto' | 'hidden';

export interface IExampleState {
  stackWidth: number;
  containerHeight: number;
  horizontalAlignment: HorizontalAlignment;
  verticalAlignment: VerticalAlignment;
  overflow: Overflow;
}

// Non-mutating styles definition
const itemStyles: React.CSSProperties = {
  alignItems: 'center',
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  display: 'flex',
  height: 50,
  justifyContent: 'center',
  width: 50
};

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const wrapStackTokens: IStackTokens = { childrenGap: 20 };

export class VerticalStackWrapAdvancedExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackWidth: 100,
      containerHeight: 420,
      horizontalAlignment: 'start',
      verticalAlignment: 'start',
      overflow: 'visible'
    };
  }

  public render(): JSX.Element {
    const { stackWidth, containerHeight, overflow, horizontalAlignment, verticalAlignment } = this.state;

    // Mutating styles definition
    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.themeTertiary,
        overflow,
        width: `${stackWidth}%`
      }
    };
    const containerStyles: React.CSSProperties = { height: containerHeight };

    return (
      <Stack tokens={sectionStackTokens}>
        <Stack horizontal>
          <Stack.Item grow>
            <Slider label="Stack height:" min={1} max={420} step={1} defaultValue={420} showValue={true} onChange={this._onHeightChange} />
          </Stack.Item>
          <Stack.Item grow>
            <Slider
              label="Container width:"
              min={1}
              max={100}
              step={1}
              defaultValue={100}
              showValue={true}
              onChange={this._onWidthChange}
            />
          </Stack.Item>
        </Stack>

        <Stack horizontal tokens={wrapStackTokens}>
          <Stack.Item grow>
            <Dropdown
              selectedKey={horizontalAlignment}
              placeholder="Select Horizontal Alignment"
              label="Horizontal alignment:"
              options={[{ key: 'start', text: 'Left' }, { key: 'center', text: 'Center' }, { key: 'end', text: 'Right' }]}
              onChange={this._onHorizontalAlignChange}
            />
          </Stack.Item>
          <Stack.Item grow>
            <Dropdown
              selectedKey={verticalAlignment}
              placeholder="Select Vertical Alignment"
              label="Vertical alignment:"
              options={[
                { key: 'start', text: 'Top' },
                { key: 'center', text: 'Center' },
                { key: 'end', text: 'Bottom' },
                { key: 'space-around', text: 'Space around' },
                { key: 'space-between', text: 'Space between' },
                { key: 'space-evenly', text: 'Space evenly' }
              ]}
              onChange={this._onVerticalAlignChange}
            />
          </Stack.Item>
          <Stack.Item grow>
            <Dropdown
              selectedKey={overflow}
              placeholder="Select Overflow"
              label="Overflow:"
              options={[{ key: 'visible', text: 'Visible' }, { key: 'auto', text: 'Auto' }, { key: 'hidden', text: 'Hidden' }]}
              onChange={this._onOverflowChange}
            />
          </Stack.Item>
        </Stack>

        <div style={containerStyles}>
          <Stack wrap horizontalAlign={horizontalAlignment} verticalAlign={verticalAlignment} styles={stackStyles} tokens={wrapStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
            <span style={itemStyles}>4</span>
            <span style={itemStyles}>5</span>
          </Stack>
        </div>
      </Stack>
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
