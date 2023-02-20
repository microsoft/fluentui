import * as React from 'react';
import {
  Checkbox,
  ICheckboxStyles,
  DefaultPalette,
  Dropdown,
  IDropdownOption,
  Slider,
  Stack,
  IStackStyles,
  IStackItemStyles,
  IStackTokens,
  IStackProps,
  TextField,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { range } from '@fluentui/example-data';
export interface IExampleOptions {
  numItems: number;
  showBoxShadow: boolean;
  preventOverflow: boolean;
  wrap: boolean;
  wrapperWidth: number;
  disableShrink: boolean;
  columnGap: number;
  rowGap: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  horizontalAlignment: IStackProps['horizontalAlign'];
  verticalAlignment: IStackProps['verticalAlign'];
  hideEmptyChildren: boolean;
  emptyChildren: string[];
}

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

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const configureStackTokens: IStackTokens = { childrenGap: 20 };
const shadowItemCheckboxStyles: Partial<ICheckboxStyles> = { root: { marginRight: 10 } };
const wrapItemCheckboxStyles: Partial<ICheckboxStyles> = { root: { marginBottom: 10 } };

const HorizontalStackConfigureExampleContent: React.FunctionComponent<IExampleOptions> = props => {
  const {
    numItems,
    showBoxShadow,
    preventOverflow,
    wrap,
    wrapperWidth,
    disableShrink,
    columnGap,
    rowGap,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    horizontalAlignment,
    verticalAlignment,
    hideEmptyChildren,
    emptyChildren,
  } = props;

  // Styles definition
  const stackStyles: IStackStyles = {
    root: [
      {
        background: DefaultPalette.themeTertiary,
        marginLeft: 10,
        marginRight: 10,
        minHeight: 100,
        width: `calc(${wrapperWidth}% - 20px)`,
      },
      preventOverflow && {
        overflow: 'hidden' as 'hidden',
      },
    ],
    inner: {
      overflow: preventOverflow ? 'hidden' : ('visible' as 'hidden' | 'visible'),
    },
  };

  const stackItemStyles: IStackItemStyles = {
    root: {
      alignItems: 'center',
      background: DefaultPalette.themePrimary,
      boxShadow: showBoxShadow ? `0px 0px 10px 5px ${DefaultPalette.themeDarker}` : '',
      color: DefaultPalette.white,
      display: 'flex',
      height: 50,
      justifyContent: 'center',
      width: 50,
    },
  };

  // Tokens definition
  const exampleStackTokens: IStackTokens = {
    childrenGap: rowGap + ' ' + columnGap,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
  };

  return (
    <Stack
      enableScopedSelectors
      horizontal
      wrap={wrap}
      disableShrink={disableShrink}
      horizontalAlign={horizontalAlignment}
      verticalAlign={verticalAlignment}
      styles={stackStyles}
      tokens={exampleStackTokens}
    >
      {range(1, numItems).map((value: number, index: number) => {
        if (emptyChildren.indexOf(value.toString()) !== -1) {
          return hideEmptyChildren ? (
            <Stack.Item key={index} styles={stackItemStyles} />
          ) : (
            <span key={index} style={stackItemStyles.root as React.CSSProperties} />
          );
        }

        return (
          <span key={index} style={stackItemStyles.root as React.CSSProperties}>
            {value}
          </span>
        );
      })}
    </Stack>
  );
};

export const HorizontalStackConfigureExample: React.FunctionComponent = () => {
  const [numItems, setNumItems] = React.useState<number>(5);
  const [showBoxShadow, { toggle: toggleShowBoxShadow }] = useBoolean(false);
  const [wrap, { toggle: toggleWrap }] = useBoolean(false);
  const [preventOverflow, { toggle: togglePreventOverflow }] = useBoolean(false);
  const [disableShrink, { toggle: toggleDisableShrink }] = useBoolean(true);
  const [wrapperWidth, setWrapperWidth] = React.useState<number>(100);
  const [columnGap, setColumnGap] = React.useState<number>(0);
  const [rowGap, setRowGap] = React.useState<number>(0);
  const [paddingLeft, setPaddingLeft] = React.useState<number>(0);
  const [paddingRight, setPaddingRight] = React.useState<number>(0);
  const [paddingTop, setPaddingTop] = React.useState<number>(0);
  const [paddingBottom, setPaddingBottom] = React.useState<number>(0);
  const [horizontalAlignment, setHorizontalAlignment] = React.useState<IStackProps['horizontalAlign']>('start');
  const [verticalAlignment, setVerticalAlignment] = React.useState<IStackProps['verticalAlign']>('start');
  const [hideEmptyChildren, { toggle: toggleHideEmptyChildren }] = useBoolean(false);
  const [emptyChildren, setEmptyChildren] = React.useState<string[]>([]);

  return (
    <Stack enableScopedSelectors tokens={sectionStackTokens}>
      <Stack enableScopedSelectors horizontal disableShrink>
        <Stack.Item grow>
          <Stack enableScopedSelectors>
            <Slider
              label="Number of items:"
              min={1}
              max={30}
              step={1}
              defaultValue={5}
              showValue
              onChange={setNumItems}
            />
            <Stack enableScopedSelectors horizontal disableShrink>
              <Checkbox label="Shadow around items" onChange={toggleShowBoxShadow} styles={shadowItemCheckboxStyles} />
              <Checkbox label="Prevent item overflow" onChange={togglePreventOverflow} />
            </Stack>
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack enableScopedSelectors horizontal disableShrink tokens={configureStackTokens}>
            <Stack enableScopedSelectors>
              <Checkbox label="Wrap items" onChange={toggleWrap} styles={wrapItemCheckboxStyles} />
              <Checkbox label="Shrink items" onChange={toggleDisableShrink} />
            </Stack>
            <Stack.Item grow>
              <Slider
                label="Container width:"
                min={1}
                max={100}
                step={1}
                defaultValue={100}
                showValue
                onChange={setWrapperWidth}
              />
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>

      <Stack enableScopedSelectors horizontal disableShrink tokens={configureStackTokens}>
        <Stack.Item grow>
          <Stack enableScopedSelectors>
            <Slider
              label="Horizontal gap between items:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={setColumnGap}
            />
            <Slider
              label="Vertical gap between items:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={setRowGap}
            />
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack enableScopedSelectors>
            <Slider
              label="Left padding:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={setPaddingLeft}
            />
            <Slider
              label="Right padding:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={setPaddingRight}
            />
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack enableScopedSelectors>
            <Slider
              label="Top padding:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={setPaddingTop}
            />
            <Slider
              label="Bottom padding:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={setPaddingBottom}
            />
          </Stack>
        </Stack.Item>
      </Stack>

      <Stack enableScopedSelectors horizontal disableShrink verticalAlign="end" tokens={configureStackTokens}>
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
        <Stack.Item>
          <Checkbox label="Hide empty children" onChange={toggleHideEmptyChildren} />
        </Stack.Item>
        <Stack.Item grow>
          <TextField
            label="Enter a space-separated list of empty children (e.g. 1 2 3):"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(ev: React.FormEvent<HTMLInputElement>, value?: string): void => {
              if (value === undefined) {
                return;
              }
              setEmptyChildren(value.replace(/,/g, '').split(' '));
            }}
          />
        </Stack.Item>
      </Stack>

      <HorizontalStackConfigureExampleContent
        {...{
          numItems,
          showBoxShadow,
          preventOverflow,
          wrap,
          wrapperWidth,
          disableShrink,
          columnGap,
          rowGap,
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom,
          horizontalAlignment,
          verticalAlignment,
          hideEmptyChildren,
          emptyChildren,
        }}
      />
    </Stack>
  );
};
