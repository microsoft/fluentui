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
} from 'office-ui-fabric-react';

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

const range = (start: number, end: number): number[] => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

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
  const [state, setState] = React.useState<IExampleOptions>({
    numItems: 5,
    showBoxShadow: false,
    preventOverflow: false,
    wrap: false,
    wrapperWidth: 100,
    disableShrink: true,
    columnGap: 0,
    rowGap: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    horizontalAlignment: 'start',
    verticalAlignment: 'start',
    hideEmptyChildren: false,
    emptyChildren: [],
  });

  const onNumItemsChange = (value: number): void => {
    setState({ ...state, numItems: value });
  };

  const onBoxShadowChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, showBoxShadow: isChecked });
  };

  const onPreventOverflowChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, preventOverflow: isChecked });
  };

  const onWrapChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, wrap: isChecked });
  };

  const onShrinkChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, disableShrink: !isChecked });
  };

  const onWrapperWidthChange = (value: number): void => {
    setState({ ...state, wrapperWidth: value });
  };

  const onGapChange = (value: number): void => {
    setState({ ...state, columnGap: value });
  };

  const onVerticalGapChange = (value: number): void => {
    setState({ ...state, rowGap: value });
  };

  const onPaddingLeftChange = (value: number): void => {
    setState({ ...state, paddingLeft: value });
  };

  const onPaddingRightChange = (value: number): void => {
    setState({ ...state, paddingRight: value });
  };

  const onPaddingTopChange = (value: number): void => {
    setState({ ...state, paddingTop: value });
  };

  const onPaddingBottomChange = (value: number): void => {
    setState({ ...state, paddingBottom: value });
  };

  const onHorizontalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setState({ ...state, horizontalAlignment: option.key as IStackProps['horizontalAlign'] });
  };

  const onVerticalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setState({ ...state, verticalAlignment: option.key as IStackProps['verticalAlign'] });
  };

  const onHideEmptyChildrenChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, hideEmptyChildren: isChecked });
  };

  const onEmptyChildrenChange = (ev: React.FormEvent<HTMLInputElement>, value?: string): void => {
    if (value === undefined) {
      return;
    }
    setState({ ...state, emptyChildren: value.replace(/,/g, '').split(' ') });
  };

  return (
    <Stack tokens={sectionStackTokens}>
      <Stack horizontal disableShrink>
        <Stack.Item grow>
          <Stack>
            <Slider
              label="Number of items:"
              min={1}
              max={30}
              step={1}
              defaultValue={5}
              showValue
              onChange={onNumItemsChange}
            />
            <Stack horizontal disableShrink>
              <Checkbox label="Shadow around items" onChange={onBoxShadowChange} styles={shadowItemCheckboxStyles} />
              <Checkbox label="Prevent item overflow" onChange={onPreventOverflowChange} />
            </Stack>
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack horizontal disableShrink tokens={configureStackTokens}>
            <Stack>
              <Checkbox label="Wrap items" onChange={onWrapChange} styles={wrapItemCheckboxStyles} />
              <Checkbox label="Shrink items" onChange={onShrinkChange} />
            </Stack>
            <Stack.Item grow>
              <Slider
                label="Container width:"
                min={1}
                max={100}
                step={1}
                defaultValue={100}
                showValue
                onChange={onWrapperWidthChange}
              />
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>

      <Stack horizontal disableShrink tokens={configureStackTokens}>
        <Stack.Item grow>
          <Stack>
            <Slider
              label="Horizontal gap between items:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={onGapChange}
            />
            <Slider
              label="Vertical gap between items:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={onVerticalGapChange}
            />
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack>
            <Slider
              label="Left padding:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={onPaddingLeftChange}
            />
            <Slider
              label="Right padding:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={onPaddingRightChange}
            />
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack>
            <Slider
              label="Top padding:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={onPaddingTopChange}
            />
            <Slider
              label="Bottom padding:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue
              onChange={onPaddingBottomChange}
            />
          </Stack>
        </Stack.Item>
      </Stack>

      <Stack horizontal disableShrink verticalAlign="end" tokens={configureStackTokens}>
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
        <Stack.Item>
          <Checkbox label="Hide empty children" onChange={onHideEmptyChildrenChange} />
        </Stack.Item>
        <Stack.Item grow>
          <TextField
            label="Enter a space-separated list of empty children (e.g. 1 2 3):"
            onChange={onEmptyChildrenChange}
          />
        </Stack.Item>
      </Stack>

      <HorizontalStackConfigureExampleContent {...state} />
    </Stack>
  );
};
