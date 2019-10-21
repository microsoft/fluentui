import * as React from 'react';
import {
  Checkbox,
  DefaultPalette,
  Dropdown,
  IDropdownOption,
  Slider,
  Stack,
  IStackStyles,
  IStackItemStyles,
  IStackTokens,
  IStackProps,
  TextField
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
    emptyChildren
  } = props;
  // Styles definition
  const stackStyles: IStackStyles = {
    root: [
      {
        background: DefaultPalette.themeTertiary,
        marginLeft: 10,
        marginRight: 10,
        minHeight: 100,
        width: `calc(${wrapperWidth}% - 20px)`
      },
      preventOverflow && {
        overflow: 'hidden' as 'hidden'
      }
    ],
    inner: {
      overflow: preventOverflow ? 'hidden' : ('visible' as 'hidden' | 'visible')
    }
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
      width: 50
    }
  };

  // Tokens definition
  const exampleStackTokens: IStackTokens = {
    childrenGap: rowGap + ' ' + columnGap,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
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
      {_range(1, numItems).map((value: number, index: number) => {
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

function _range(start: number, end: number): number[] {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const configureStackTokens: IStackTokens = { childrenGap: 20 };

export class HorizontalStackConfigureExample extends React.Component<{}, IExampleOptions> {
  public state: IExampleOptions = {
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
    emptyChildren: []
  };
  private _horizontalAlignmentOptions: IDropdownOption[] = [
    { key: 'start', text: 'Left' },
    { key: 'center', text: 'Center' },
    { key: 'end', text: 'Right' },
    { key: 'space-around', text: 'Space around' },
    { key: 'space-between', text: 'Space between' },
    { key: 'space-evenly', text: 'Space evenly' }
  ];
  private _verticalAlignmentOptions: IDropdownOption[] = [
    { key: 'start', text: 'Top' },
    { key: 'center', text: 'Center' },
    { key: 'end', text: 'Bottom' }
  ];

  public render(): JSX.Element {
    const { horizontalAlignment, verticalAlignment } = this.state;

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
                showValue={true}
                onChange={this._onNumItemsChange}
              />
              <Stack horizontal disableShrink>
                <Checkbox label="Shadow around items" onChange={this._onBoxShadowChange} styles={{ root: { marginRight: 10 } }} />
                <Checkbox label="Prevent item overflow" onChange={this._onPreventOverflowChange} />
              </Stack>
            </Stack>
          </Stack.Item>
          <Stack.Item grow>
            <Stack horizontal disableShrink tokens={configureStackTokens}>
              <Stack>
                <Checkbox label="Wrap items" onChange={this._onWrapChange} styles={{ root: { marginBottom: 10 } }} />
                <Checkbox label="Shrink items" onChange={this._onShrinkChange} />
              </Stack>
              <Stack.Item grow>
                <Slider
                  label="Container width:"
                  min={1}
                  max={100}
                  step={1}
                  defaultValue={100}
                  showValue={true}
                  onChange={this._onWrapperWidthChange}
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
                showValue={true}
                onChange={this._onGapChange}
              />
              <Slider
                label="Vertical gap between items:"
                min={0}
                max={50}
                step={1}
                defaultValue={0}
                showValue={true}
                onChange={this._onVerticalGapChange}
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
                showValue={true}
                onChange={this._onPaddingLeftChange}
              />
              <Slider
                label="Right padding:"
                min={0}
                max={50}
                step={1}
                defaultValue={0}
                showValue={true}
                onChange={this._onPaddingRightChange}
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
                showValue={true}
                onChange={this._onPaddingTopChange}
              />
              <Slider
                label="Bottom padding:"
                min={0}
                max={50}
                step={1}
                defaultValue={0}
                showValue={true}
                onChange={this._onPaddingBottomChange}
              />
            </Stack>
          </Stack.Item>
        </Stack>

        <Stack horizontal disableShrink verticalAlign="end" tokens={configureStackTokens}>
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
          <Stack.Item>
            <Checkbox label="Hide empty children" onChange={this._onHideEmptyChildrenChange} />
          </Stack.Item>
          <Stack.Item grow>
            <TextField label="Enter a space-separated list of empty children (e.g. 1 2 3):" onChange={this._onEmptyChildrenChange} />
          </Stack.Item>
        </Stack>

        <HorizontalStackConfigureExampleContent {...this.state} />
      </Stack>
    );
  }

  private _onNumItemsChange = (value: number): void => {
    this.setState({ numItems: value });
  };

  private _onBoxShadowChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ showBoxShadow: isChecked });
  };

  private _onPreventOverflowChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ preventOverflow: isChecked });
  };

  private _onWrapChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ wrap: isChecked });
  };

  private _onShrinkChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ disableShrink: !isChecked });
  };

  private _onWrapperWidthChange = (value: number): void => {
    this.setState({ wrapperWidth: value });
  };

  private _onGapChange = (value: number): void => {
    this.setState({ columnGap: value });
  };

  private _onVerticalGapChange = (value: number): void => {
    this.setState({ rowGap: value });
  };

  private _onPaddingLeftChange = (value: number): void => {
    this.setState({ paddingLeft: value });
  };

  private _onPaddingRightChange = (value: number): void => {
    this.setState({ paddingRight: value });
  };

  private _onPaddingTopChange = (value: number): void => {
    this.setState({ paddingTop: value });
  };

  private _onPaddingBottomChange = (value: number): void => {
    this.setState({ paddingBottom: value });
  };

  private _onHorizontalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ horizontalAlignment: option.key as IStackProps['horizontalAlign'] });
  };

  private _onVerticalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ verticalAlignment: option.key as IStackProps['verticalAlign'] });
  };

  private _onHideEmptyChildrenChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ hideEmptyChildren: isChecked });
  };

  private _onEmptyChildrenChange = (ev: React.FormEvent<HTMLInputElement>, value?: string): void => {
    if (value === undefined) {
      return;
    }
    this.setState({ emptyChildren: value.replace(/,/g, '').split(' ') });
  };
}
