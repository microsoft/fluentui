import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Slider } from '@fluentui/react/lib/Slider';
import { Stack, IStackStyles, IStackTokens, IStackProps } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

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

const VerticalStackWrapAdvancedExampleContent: React.FunctionComponent<IExampleOptions> = props => {
  const { stackWidth, containerHeight, overflow, horizontalAlignment, verticalAlignment } = props;

  // Mutating styles definition
  const stackStyles: IStackStyles = {
    root: {
      background: DefaultPalette.themeTertiary,
      overflow,
      width: `${stackWidth}%`,
    },
  };
  const containerStyles: React.CSSProperties = { height: containerHeight };

  return (
    <div style={containerStyles}>
      <Stack
        enableScopedSelectors
        wrap
        horizontalAlign={horizontalAlignment}
        verticalAlign={verticalAlignment}
        styles={stackStyles}
        tokens={wrapStackTokens}
      >
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

// Alignment options
const horizontalAlignmentOptions: IDropdownOption[] = [
  { key: 'start', text: 'Left' },
  { key: 'center', text: 'Center' },
  { key: 'end', text: 'Right' },
];
const verticalAlignmentOptions: IDropdownOption[] = [
  { key: 'start', text: 'Top' },
  { key: 'center', text: 'Center' },
  { key: 'end', text: 'Bottom' },
  { key: 'space-around', text: 'Space around' },
  { key: 'space-between', text: 'Space between' },
  { key: 'space-evenly', text: 'Space evenly' },
];
const overflowOptions: IDropdownOption[] = [
  { key: 'visible', text: 'Visible' },
  { key: 'auto', text: 'Auto' },
  { key: 'hidden', text: 'Hidden' },
];

export const VerticalStackWrapAdvancedExample: React.FunctionComponent = () => {
  const [stackWidth, setStackWidth] = React.useState<number>(100);
  const [containerHeight, setContainerHeight] = React.useState<number>(420);
  const [horizontalAlignment, setHorizontalAlignment] = React.useState<IStackProps['horizontalAlign']>('start');
  const [verticalAlignment, setVerticalAlignment] = React.useState<IStackProps['verticalAlign']>('start');
  const [overflow, setOverflow] = React.useState<Overflow>('visible');

  return (
    <Stack enableScopedSelectors tokens={sectionStackTokens}>
      <Stack enableScopedSelectors horizontal>
        <Stack.Item grow>
          <Slider
            label="Stack height:"
            min={1}
            max={420}
            step={1}
            defaultValue={420}
            showValue
            onChange={setContainerHeight}
          />
        </Stack.Item>
        <Stack.Item grow>
          <Slider
            label="Container width:"
            min={1}
            max={100}
            step={1}
            defaultValue={100}
            showValue
            onChange={setStackWidth}
          />
        </Stack.Item>
      </Stack>

      <Stack enableScopedSelectors horizontal tokens={wrapStackTokens}>
        <Stack.Item grow>
          <Dropdown
            selectedKey={horizontalAlignment}
            placeholder="Select Horizontal Alignment"
            label="Horizontal alignment:"
            options={horizontalAlignmentOptions}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void =>
              setHorizontalAlignment(option.key as IStackProps['horizontalAlign'])
            }
          />
        </Stack.Item>
        <Stack.Item grow>
          <Dropdown
            selectedKey={verticalAlignment}
            placeholder="Select Vertical Alignment"
            label="Vertical alignment:"
            options={verticalAlignmentOptions}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void =>
              setVerticalAlignment(option.key as IStackProps['verticalAlign'])
            }
          />
        </Stack.Item>
        <Stack.Item grow>
          <Dropdown
            selectedKey={overflow}
            placeholder="Select Overflow"
            label="Overflow:"
            options={overflowOptions}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void =>
              setOverflow(option.key as Overflow)
            }
          />
        </Stack.Item>
      </Stack>

      <VerticalStackWrapAdvancedExampleContent
        {...{ stackWidth, containerHeight, horizontalAlignment, verticalAlignment, overflow }}
      />
    </Stack>
  );
};
