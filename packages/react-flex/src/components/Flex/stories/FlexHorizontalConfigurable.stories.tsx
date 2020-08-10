import * as React from 'react';
import { Flex } from '../Flex';
import { FlexItem } from '../../FlexItem/FlexItem';
import { FlexProps, FlexTokens } from '../Flex.types';
import { Slider, Dropdown, TextField, Checkbox, IDropdownOption, ICheckboxStyles } from 'office-ui-fabric-react';

export interface ExampleOptions {
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
  horizontalAlignment: FlexProps['horizontalAlign'];
  verticalAlignment: FlexProps['verticalAlign'];
  hideEmptyChildren: boolean;
  emptyChildren: string[];
}

const FlexConfigureExampleContent: React.FunctionComponent<ExampleOptions> = props => {
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
  const flexStyles: React.CSSProperties = {
    ...{
      background: 'lightblue',
      marginLeft: 10,
      marginRight: 10,
      minHeight: 100,
      width: `calc(${wrapperWidth}% - 20px)`,
    },
    ...(preventOverflow
      ? {
          overflow: 'hidden',
        }
      : {}),
  };
  const flexItemStyles = {
    alignItems: 'center',
    background: 'blue',
    boxShadow: showBoxShadow ? `0px 0px 10px 5px black` : '',
    color: 'white',
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 50,
  };

  const configureTokens: FlexTokens = {
    gap: `${rowGap}px ${columnGap}px`,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
  };

  return (
    <Flex
      wrap={wrap}
      disableShrink={disableShrink}
      horizontalAlign={horizontalAlignment}
      verticalAlign={verticalAlignment}
      style={flexStyles}
      tokens={configureTokens}
    >
      {_range(1, numItems).map((value: number, index: number) => {
        if (emptyChildren.indexOf(value.toString()) !== -1) {
          return hideEmptyChildren ? (
            <FlexItem key={index} style={{ ...flexItemStyles, display: 'none' }} />
          ) : (
            <FlexItem key={index} style={flexItemStyles} />
          );
        }

        return (
          <FlexItem key={index} style={flexItemStyles}>
            {value}
          </FlexItem>
        );
      })}
    </Flex>
  );
};

function _range(start: number, end: number): number[] {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

const shadowItemCheckboxStyles: Partial<ICheckboxStyles> = { root: { marginRight: 10 } };
const wrapItemCheckboxStyles: Partial<ICheckboxStyles> = { root: { marginBottom: 10 } };

const sectionFlexTokens: FlexTokens = { gap: '5px' };
const configureFlexTokens: FlexTokens = { gap: '10px' };

const flexContainer: React.CSSProperties = {
  maxWidth: '600px',
};

export class HorizontalFlexConfigurableExample extends React.Component {
  public state: ExampleOptions = {
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
  };

  private _horizontalAlignmentOptions: IDropdownOption[] = [
    { key: 'start', text: 'Left' },
    { key: 'center', text: 'Center' },
    { key: 'end', text: 'Right' },
    { key: 'around', text: 'Space around' },
    { key: 'between', text: 'Space between' },
    { key: 'evenly', text: 'Space evenly' },
  ];
  private _verticalAlignmentOptions: IDropdownOption[] = [
    { key: 'start', text: 'Top' },
    { key: 'center', text: 'Center' },
    { key: 'end', text: 'Bottom' },
  ];

  public render(): JSX.Element {
    const { horizontalAlignment, verticalAlignment } = this.state;

    return (
      <Flex wrap column style={flexContainer} tokens={sectionFlexTokens}>
        <Flex disableShrink>
          <FlexItem>
            <Flex disableShrink column>
              <Slider
                label="Number of items:"
                min={1}
                max={30}
                step={1}
                defaultValue={5}
                showValue={true}
                onChange={this._onNumItemsChange}
              />
              <Flex disableShrink>
                <Checkbox
                  label="Shadow around items"
                  onChange={this._onBoxShadowChange}
                  styles={shadowItemCheckboxStyles}
                />
                <Checkbox label="Prevent item overflow" onChange={this._onPreventOverflowChange} />
              </Flex>
            </Flex>
          </FlexItem>
          <FlexItem>
            <Flex disableShrink tokens={configureFlexTokens}>
              <Flex column>
                <Checkbox label="Wrap items" onChange={this._onWrapChange} styles={wrapItemCheckboxStyles} />
                <Checkbox label="Shrink items" onChange={this._onShrinkChange} />
              </Flex>
              <FlexItem>
                <Slider
                  label="Container width:"
                  min={1}
                  max={100}
                  step={1}
                  defaultValue={100}
                  showValue={true}
                  onChange={this._onWrapperWidthChange}
                />
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>

        <Flex wrap disableShrink tokens={configureFlexTokens}>
          <FlexItem>
            <Flex disableShrink column>
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
            </Flex>
          </FlexItem>
          <FlexItem>
            <Flex disableShrink column>
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
            </Flex>
          </FlexItem>
          <FlexItem>
            <Flex disableShrink column>
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
            </Flex>
          </FlexItem>
        </Flex>

        <Flex wrap disableShrink verticalAlign="end" tokens={configureFlexTokens}>
          <FlexItem>
            <Dropdown
              selectedKey={horizontalAlignment}
              placeholder="Select Horizontal Alignment"
              label="Horizontal alignment:"
              options={this._horizontalAlignmentOptions}
              onChange={this._onHorizontalAlignChange}
            />
          </FlexItem>
          <FlexItem>
            <Dropdown
              selectedKey={verticalAlignment}
              placeholder="Select Vertical Alignment"
              label="Vertical alignment:"
              options={this._verticalAlignmentOptions}
              onChange={this._onVerticalAlignChange}
            />
          </FlexItem>
          <FlexItem>
            <Checkbox label="Hide empty children" onChange={this._onHideEmptyChildrenChange} />
          </FlexItem>
          <FlexItem>
            <TextField
              label="Enter a space-separated list of empty children (e.g. 1 2 3):"
              onChange={this._onEmptyChildrenChange}
            />
          </FlexItem>
        </Flex>

        <FlexConfigureExampleContent {...this.state} />
      </Flex>
    );
  }

  private _onNumItemsChange = (value: number): void => {
    this.setState({ numItems: value });
  };

  private _onBoxShadowChange = (ev: React.FormEvent<HTMLElement> | undefined, isChecked: boolean | undefined): void => {
    this.setState({ showBoxShadow: isChecked });
  };

  private _onPreventOverflowChange = (
    ev: React.FormEvent<HTMLElement> | undefined,
    isChecked: boolean | undefined,
  ): void => {
    this.setState({ preventOverflow: isChecked });
  };

  private _onWrapChange = (ev: React.FormEvent<HTMLElement> | undefined, isChecked: boolean | undefined): void => {
    this.setState({ wrap: isChecked });
  };

  private _onShrinkChange = (ev: React.FormEvent<HTMLElement> | undefined, isChecked: boolean | undefined): void => {
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

  private _onHorizontalAlignChange = (
    ev: React.FormEvent<HTMLDivElement> | undefined,
    option: IDropdownOption | undefined,
  ): void => {
    this.setState({ horizontalAlignment: option!.key as FlexProps['horizontalAlign'] });
  };

  private _onVerticalAlignChange = (
    ev: React.FormEvent<HTMLDivElement> | undefined,
    option: IDropdownOption | undefined,
  ): void => {
    this.setState({ verticalAlignment: option!.key as FlexProps['verticalAlign'] });
  };

  private _onHideEmptyChildrenChange = (
    ev: React.FormEvent<HTMLElement> | undefined,
    isChecked: boolean | undefined,
  ): void => {
    this.setState({ hideEmptyChildren: isChecked });
  };

  private _onEmptyChildrenChange = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string,
  ): void => {
    if (value === undefined) {
      return;
    }
    this.setState({ emptyChildren: value.replace(/,/g, '').split(' ') });
  };
}
