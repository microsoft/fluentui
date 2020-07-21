import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack, IStackProps, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { range } from '@uifabric/example-data';

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

export const HorizontalStackWrapAdvancedExample: React.FunctionComponent = () => {
  const [stackWidth, setStackWidth] = React.useState<number>(100);
  const [containerHeight, setContainerHeight] = React.useState<number>(150);
  const [horizontalAlignment, setHorizontalAlignment] = React.useState<IStackProps['horizontalAlign']>('start');
  const [verticalAlignment, setVerticalAlignment] = React.useState<IStackProps['verticalAlign']>('start');
  const [overflow, setOverflow] = React.useState<Overflow>('visible');

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
            onChange={setStackWidth}
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
            onChange={setContainerHeight}
          />
        </Stack.Item>
      </Stack>

      <Stack horizontal tokens={configureStackTokens}>
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

      <HorizontalStackWrapAdvancedExampleContent
        {...{ stackWidth, containerHeight, horizontalAlignment, verticalAlignment, overflow }}
      />
    </Stack>
  );
};
