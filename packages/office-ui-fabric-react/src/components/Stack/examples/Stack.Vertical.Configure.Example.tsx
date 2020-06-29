import * as React from 'react';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack, IStackStyles, IStackTokens, IStackItemStyles, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

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

  // Tokens definition
  const exampleStackTokens: IStackTokens = {
    childrenGap: childrenGap + ' ' + 0,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
  };

  return (
    <Stack
      disableShrink={disableShrink}
      wrap={wrap}
      verticalAlign={verticalAlignment}
      horizontalAlign={horizontalAlignment}
      styles={stackStyles}
      tokens={exampleStackTokens}
    >
      {_range(1, numItems).map((value: number, index: number) => {
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

function _range(start: number, end: number): number[] {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// Non-mutating tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const configureStackTokens: IStackTokens = { childrenGap: 20 };

export const VerticalStackConfigureExample: React.FunctionComponent = () => {
  const [state, setState] = React.useState<IExampleOptions>({
    numItems: 5,
    showBoxShadow: false,
    preventOverflow: false,
    disableShrink: true,
    wrap: false,
    stackHeight: 200,
    autoHeight: true,
    childrenGap: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    verticalAlignment: 'start',
    horizontalAlignment: 'start',
    hideEmptyChildren: false,
    emptyChildren: [],
  });

  const onNumItemsChange = (value: number): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ numItems: value });
  };

  const onBoxShadowChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ showBoxShadow: isChecked });
  };

  const onPreventOverflowChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ preventOverflow: isChecked });
  };

  const onShrinkItemsChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ disableShrink: !isChecked });
  };

  const onWrapChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ wrap: isChecked });
  };

  const onStackHeightChange = (value: number): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ stackHeight: value });
  };

  const onAutoHeightChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ autoHeight: isChecked });
  };

  const onGapChange = (value: number): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ childrenGap: value });
  };

  const onPaddingLeftChange = (value: number): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ paddingLeft: value });
  };

  const onPaddingRightChange = (value: number): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ paddingRight: value });
  };

  const onPaddingTopChange = (value: number): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ paddingTop: value });
  };

  const onPaddingBottomChange = (value: number): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ paddingBottom: value });
  };

  const onVerticalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ verticalAlignment: option.key as IStackProps['verticalAlign'] });
  };

  const onHorizontalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ horizontalAlignment: option.key as IStackProps['horizontalAlign'] });
  };

  const onHideEmptyChildrenChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    setState({ ...state, stackWidth: value });
    this.setState({ hideEmptyChildren: isChecked });
  };

  const onEmptyChildrenChange = (ev: React.FormEvent<HTMLInputElement>, value?: string): void => {
    if (value === undefined) {
      return;
    }
    setState({ ...state, stackWidth: value });
    this.setState({ emptyChildren: value.replace(/,/g, '').split(' ') });
  };

  return (
    <Stack tokens={sectionStackTokens}>
      <Stack horizontal tokens={configureStackTokens}>
        <Stack.Item grow>
          <Stack>
            <Slider
              label="Number of items:"
              min={1}
              max={10}
              step={1}
              defaultValue={5}
              showValue
              onChange={onNumItemsChange}
            />
            <Stack horizontal>
              <Checkbox label="Shadow around items" onChange={onBoxShadowChange} styles={checkboxStyles} />
              <Checkbox
                label="Prevent item overflow"
                onChange={onPreventOverflowChange}
                styles={checkboxStyles}
              />
              <Checkbox label="Shrink items" onChange={onShrinkItemsChange} styles={checkboxStyles} />
              <Checkbox label="Wrap items" onChange={onWrapChange} />
            </Stack>
          </Stack>
        </Stack.Item>
        <Stack.Item grow>
          <Stack>
            <Slider
              label="Container height:"
              min={1}
              max={400}
              step={1}
              defaultValue={200}
              showValue
              onChange={onStackHeightChange}
              disabled={autoHeight}
            />
            <Checkbox
              label="Automatic height (based on items)"
              defaultChecked
              onChange={onAutoHeightChange}
            />
          </Stack>
        </Stack.Item>
      </Stack>

      <Stack horizontal tokens={configureStackTokens}>
        <Stack.Item grow>
          <Stack>
            <Slider
              label="Vertical gap between items:"
              min={0}
              max={50}
              step={1}
              defaultValue={0}
              showValue=
              onChange={onGapChange}
            />
            <Stack horizontal verticalAlign="end" tokens={configureStackTokens}>
              <Stack.Item grow>
                <Dropdown
                  selectedKey={verticalAlignment}
                  placeholder="Select Vertical Alignment"
                  label="Vertical alignment:"
                  options={verticalAlignmentOptions}
                  onChange={onVerticalAlignChange}
                />
              </Stack.Item>
              <Stack.Item grow>
                <Dropdown
                  selectedKey={horizontalAlignment}
                  placeholder="Select Horizontal Alignment"
                  label="Horizontal alignment:"
                  options={horizontalAlignmentOptions}
                  onChange={onHorizontalAlignChange}
                />
              </Stack.Item>
              <Stack.Item>
                <Checkbox label="Hide empty children" onChange={onHideEmptyChildrenChange} />
              </Stack.Item>
              <Stack.Item grow>
                <TextField label="List of empty children (e.g. 1 2 3):" onChange={onEmptyChildrenChange} />
              </Stack.Item>
            </Stack>
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

      <VerticalStackConfigureExampleContent {...state} />
    </Stack>
  );
};
