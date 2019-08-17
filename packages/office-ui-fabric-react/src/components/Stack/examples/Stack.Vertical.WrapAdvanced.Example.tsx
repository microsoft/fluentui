import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack, IStackStyles, IStackTokens, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export type Overflow = 'visible' | 'auto' | 'hidden';

export interface IExampleOptions {
  stackWidth: number;
  containerHeight: number;
  horizontalAlignment: IStackProps['horizontalAlign'];
  verticalAlignment: IStackProps['verticalAlign'];
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

const VerticalStackWrapAdvancedExampleContent: React.FunctionComponent<IExampleOptions> = props => {
  const { stackWidth, containerHeight, overflow, horizontalAlignment, verticalAlignment } = props;

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
    <div style={containerStyles}>
      <Stack wrap horizontalAlign={horizontalAlignment} verticalAlign={verticalAlignment} styles={stackStyles} tokens={wrapStackTokens}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
        <span style={itemStyles}>4</span>
        <span style={itemStyles}>5</span>
      </Stack>
    </div>
  );
};

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const wrapStackTokens: IStackTokens = { childrenGap: 20 };

export class VerticalStackWrapAdvancedExample extends React.Component<{}, IExampleOptions> {
  public state: IExampleOptions = {
    stackWidth: 100,
    containerHeight: 420,
    horizontalAlignment: 'start',
    verticalAlignment: 'start',
    overflow: 'visible'
  };
  private _horizontalAlignmentOptions: IDropdownOption[] = [
    { key: 'start', text: 'Left' },
    { key: 'center', text: 'Center' },
    { key: 'end', text: 'Right' }
  ];
  private _verticalAlignmentOptions: IDropdownOption[] = [
    { key: 'start', text: 'Top' },
    { key: 'center', text: 'Center' },
    { key: 'end', text: 'Bottom' },
    { key: 'space-around', text: 'Space around' },
    { key: 'space-between', text: 'Space between' },
    { key: 'space-evenly', text: 'Space evenly' }
  ];
  private _overflowOptions: IDropdownOption[] = [
    { key: 'visible', text: 'Visible' },
    { key: 'auto', text: 'Auto' },
    { key: 'hidden', text: 'Hidden' }
  ];

  public render(): JSX.Element {
    const { overflow, horizontalAlignment, verticalAlignment } = this.state;

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
              options={this._horizontalAlignmentOptions}
              onChange={this._onHorizontalAlignChange}
            />
          </Stack.Item>
          <Stack.Item grow>
            <Dropdown
              selectedKey={verticalAlignment}
              placeholder="Select Vertical Alignment"
              label="Vertical alignment:"
              options={this._verticalAlignmentOptions}
              onChange={this._onVerticalAlignChange}
            />
          </Stack.Item>
          <Stack.Item grow>
            <Dropdown
              selectedKey={overflow}
              placeholder="Select Overflow"
              label="Overflow:"
              options={this._overflowOptions}
              onChange={this._onOverflowChange}
            />
          </Stack.Item>
        </Stack>

        <VerticalStackWrapAdvancedExampleContent {...this.state} />
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
    this.setState({ horizontalAlignment: option.key as IStackProps['horizontalAlign'] });
  };

  private _onVerticalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ verticalAlignment: option.key as IStackProps['verticalAlign'] });
  };

  private _onOverflowChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ overflow: option.key as Overflow });
  };
}
