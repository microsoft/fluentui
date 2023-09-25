import * as React from 'react';
import { Checkbox, ICheckboxStyles } from '@fluentui/react/lib/Checkbox';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Slider } from '@fluentui/react/lib/Slider';
import { Stack, IStackStyles, IStackTokens, IStackItemStyles, IStackProps } from '@fluentui/react/lib/Stack';
import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling';
import { TextField } from '@fluentui/react/lib/TextField';
import { useBoolean } from '@fluentui/react-hooks';
import { range } from '@fluentui/example-data';
export interface IExampleOptions {
  numItems: number;
  showBoxShadow: boolean;
  preventOverflow: boolean;
  disableShrink: boolean;
  wrap: boolean;
  stackHeight: number;
  autoHeight: boolean;
  childrenGap: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  verticalAlignment: IStackProps['verticalAlign'];
  horizontalAlignment: IStackProps['horizontalAlign'];
  hideEmptyChildren: boolean;
  emptyChildren: string[];
}

const checkboxStyles: Partial<ICheckboxStyles> = { root: { marginRight: 10 } };

// Alignment options
const verticalAlignmentOptions: IDropdownOption[] = [
  { key: 'start', text: 'Top' },
  { key: 'center', text: 'Center' },
  { key: 'end', text: 'Bottom' },
  { key: 'space-around', text: 'Space around' },
  { key: 'space-between', text: 'Space between' },
  { key: 'space-evenly', text: 'Space evenly' },
];
const horizontalAlignmentOptions: IDropdownOption[] = [
  { key: 'start', text: 'Left' },
  { key: 'center', text: 'Center' },
  { key: 'end', text: 'Right' },
];

// Non-mutating tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const configureStackTokens: IStackTokens = { childrenGap: 20 };

const VerticalStackConfigureExampleContent: React.FunctionComponent<IExampleOptions> = props => {
  const {
    numItems,
    showBoxShadow,
    preventOverflow,
    disableShrink,
    wrap,
    stackHeight,
    autoHeight,
    childrenGap,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    verticalAlignment,
    horizontalAlignment,
    hideEmptyChildren,
    emptyChildren,
  } = props;

  // Styles definition
  const stackStyles: IStackStyles = {
    root: [
      {
        background: DefaultPalette.themeTertiary,
        height: autoHeight ? 'auto' : stackHeight,
        marginLeft: 10,
        marginRight: 10,
      },
      preventOverflow && {
        overflow: 'hidden' as 'hidden',
      },
    ],
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
    childrenGap: childrenGap + ' ' + 0,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
  };

  return (
    <Stack
      enableScopedSelectors
      disableShrink={disableShrink}
      wrap={wrap}
      verticalAlign={verticalAlignment}
      horizontalAlign={horizontalAlignment}
      styles={stackStyles}
      tokens={exampleStackTokens}
    >
      {range(1, numItems).map((value: number, index: number) => {
        if (emptyChildren.indexOf(value.toString()) !== -1) {
          return hideEmptyChildren ? (
            <Stack.Item key={index} styles={stackItemStyles} />
          ) : (
            <span key={index} className={mergeStyles(stackItemStyles.root)} />
          );
        }

        return (
          <span key={index} className={mergeStyles(stackItemStyles.root)}>
            {value}
          </span>
        );
      })}
    </Stack>
  );
};

export const VerticalStackConfigureExample: React.FunctionComponent = () => {
  const [numItems, setNumItems] = React.useState<number>(5);
  const [showBoxShadow, { toggle: toggleShowBoxShadow }] = useBoolean(false);
  const [preventOverflow, { toggle: togglePreventOverflow }] = useBoolean(false);
  const [wrap, { toggle: toggleWrap }] = useBoolean(false);
  const [disableShrink, { toggle: toggleDisableShrink }] = useBoolean(true);
  const [stackHeight, setStackHeight] = React.useState<number>(200);
  const [autoHeight, { toggle: toggleAutoHeight }] = useBoolean(true);
  const [childrenGap, setChildrenGap] = React.useState<number>(0);
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
      <Stack enableScopedSelectors horizontal tokens={configureStackTokens}>
        <Stack.Item grow>
          <Stack enableScopedSelectors>
            <Slider label="Number of items:" min={1} max={10} step={1} defaultValue={5} onChange={setNumItems} />
            <Stack enableScopedSelectors horizontal>
              <Checkbox label="Shadow around items" onChange={toggleShowBoxShadow} styles={checkboxStyles} />
              <Checkbox label="Prevent item overflow" onChange={togglePreventOverflow} styles={checkboxStyles} />
              <Checkbox label="Shrink items" onChange={toggleDisableShrink} styles={checkboxStyles} />
              <Checkbox label="Wrap items" onChange={toggleWrap} />
            </Stack>
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack enableScopedSelectors>
            <Slider
              label="Container height:"
              min={1}
              max={400}
              step={1}
              defaultValue={200}
              showValue
              onChange={setStackHeight}
              disabled={autoHeight}
            />
            <Checkbox label="Automatic height (based on items)" defaultChecked onChange={toggleAutoHeight} />
          </Stack>
        </Stack.Item>
      </Stack>

      <Stack enableScopedSelectors horizontal tokens={configureStackTokens}>
        <Stack.Item grow>
          <Stack enableScopedSelectors>
            <Slider
              label="Vertical gap between items:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={setChildrenGap}
            />
            <Stack enableScopedSelectors horizontal verticalAlign="end" tokens={configureStackTokens}>
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
              <Stack.Item>
                <Checkbox label="Hide empty children" onChange={toggleHideEmptyChildren} />
              </Stack.Item>
              <Stack.Item grow>
                <TextField
                  label="List of empty children (e.g. 1 2 3):"
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

      <VerticalStackConfigureExampleContent
        {...{
          numItems,
          showBoxShadow,
          preventOverflow,
          disableShrink,
          wrap,
          stackHeight,
          autoHeight,
          childrenGap,
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom,
          verticalAlignment,
          horizontalAlignment,
          hideEmptyChildren,
          emptyChildren,
        }}
      />
    </Stack>
  );
};
