import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack, IStackProps, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
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
  width: 50,
};

// Alignment options
const horizontalAlignmentOptions: IDropdownOption[] = [
  { key: 'start', text: 'Left' },
  { key: 'center', text: 'Center' },
  { key: 'end', text: 'Right' },
  { key: 'space-around', text: 'Space around' },
  { key: 'space-between', text: 'Space between' },
  { key: 'space-evenly', text: 'Space evenly' },
];
const verticalAlignmentOptions: IDropdownOption[] = [
  { key: 'start', text: 'Top' },
  { key: 'center', text: 'Center' },
  { key: 'end', text: 'Bottom' },
];
const overflowOptions: IDropdownOption[] = [
  { key: 'visible', text: 'Visible' },
  { key: 'auto', text: 'Auto' },
  { key: 'hidden', text: 'Hidden' },
];

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const configureStackTokens: IStackTokens = { childrenGap: 20 };
const wrapStackTokens: IStackTokens = { childrenGap: 30 };

const HorizontalStackWrapAdvancedExampleContent: React.FunctionComponent<IExampleOptions> = props => {
  const { stackWidth, containerHeight, overflow, horizontalAlignment, verticalAlignment } = props;

  // Mutating styles definition
  const stackStyles: IStackStyles = {
    root: {
      background: DefaultPalette.themeTertiary,
      width: `${stackWidth}%`,
      overflow,
    },
  };
  const containerStyles: React.CSSProperties = { height: containerHeight };

  return (
    <div style={containerStyles}>
      <Stack
        horizontal
        verticalFill
        wrap
        horizontalAlign={horizontalAlignment}
        verticalAlign={verticalAlignment}
        styles={stackStyles}
        tokens={wrapStackTokens}
      >
        {range(1, 10).map(n => (
          <span style={itemStyles} key={n}>
            {n}
          </span>
        ))}
      </Stack>
    </div>
  );
};

const range = (start: number, end: number): number[] => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

export const HorizontalStackWrapAdvancedExample: React.FunctionComponent = () => {
  const [state, setState] = React.useState<IExampleOptions>({
    stackWidth: 100,
    containerHeight: 150,
    horizontalAlignment: 'start',
    verticalAlignment: 'start',
    overflow: 'visible',
  });

  const onWidthChange = (value: number): void => {
    setState({ ...state, stackWidth: value });
  };

  const onHeightChange = (value: number): void => {
    setState({ ...state, containerHeight: value });
  };

  const onHorizontalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setState({ ...state, horizontalAlignment: option.key as IStackProps['horizontalAlign'] });
  };

  const onVerticalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setState({ ...state, verticalAlignment: option.key as IStackProps['verticalAlign'] });
  };

  const onOverflowChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setState({ ...state, overflow: option.key as Overflow });
  };

  return (
    <Stack tokens={sectionStackTokens}>
      <Stack horizontal>
        <Stack.Item grow>
          <Slider
            label="Stack width:"
            min={1}
            max={100}
            step={1}
            defaultValue={100}
            showValue
            onChange={onWidthChange}
          />
        </Stack.Item>
        <Stack.Item grow>
          <Slider
            label="Container height:"
            min={1}
            max={200}
            step={1}
            defaultValue={150}
            showValue
            onChange={onHeightChange}
          />
        </Stack.Item>
      </Stack>

      <Stack horizontal tokens={configureStackTokens}>
        <Stack.Item grow>
          <Dropdown
            selectedKey={state.horizontalAlignment}
            placeholder="Select Horizontal Alignment"
            label="Horizontal alignment:"
            options={horizontalAlignmentOptions}
            onChange={onHorizontalAlignChange}
          />
        </Stack.Item>
        <Stack.Item grow>
          <Dropdown
            selectedKey={state.verticalAlignment}
            placeholder="Select Vertical Alignment"
            label="Vertical alignment:"
            options={verticalAlignmentOptions}
            onChange={onVerticalAlignChange}
          />
        </Stack.Item>
        <Stack.Item grow>
          <Dropdown
            selectedKey={state.overflow}
            placeholder="Select Overflow"
            label="Overflow:"
            options={overflowOptions}
            onChange={onOverflowChange}
          />
        </Stack.Item>
      </Stack>

      <HorizontalStackWrapAdvancedExampleContent {...state} />
    </Stack>
  );
};
