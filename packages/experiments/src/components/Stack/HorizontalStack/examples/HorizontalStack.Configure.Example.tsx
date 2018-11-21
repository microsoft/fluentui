import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { Slider, Checkbox, Dropdown, IDropdownOption, TextField } from 'office-ui-fabric-react';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export type HorizontalAlignment = 'left' | 'center' | 'right' | 'space-around' | 'space-between' | 'space-evenly';
export type VerticalAlignment = 'top' | 'center' | 'bottom';

export interface IExampleState {
  numItems: number;
  showBoxShadow: boolean;
  preventOverflow: boolean;
  wrap: boolean;
  wrapperWidth: number;
  shrink: boolean;
  gap: number;
  verticalGap: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  horizontalAlignment: HorizontalAlignment;
  verticalAlignment: VerticalAlignment;
  hideEmptyChildren: boolean;
  emptyChildren: string[];
}

export class HorizontalStackConfigureExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      numItems: 5,
      showBoxShadow: false,
      preventOverflow: false,
      wrap: false,
      wrapperWidth: 100,
      shrink: false,
      gap: 0,
      verticalGap: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      horizontalAlignment: 'left',
      verticalAlignment: 'top',
      hideEmptyChildren: false,
      emptyChildren: []
    };
  }

  public render(): JSX.Element {
    const {
      numItems,
      showBoxShadow,
      preventOverflow,
      wrap,
      wrapperWidth,
      shrink,
      gap,
      verticalGap,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      horizontalAlignment,
      verticalAlignment,
      hideEmptyChildren,
      emptyChildren
    } = this.state;

    const styles = mergeStyleSets({
      root: [
        {
          background: DefaultPalette.themeTertiary,
          minHeight: 100,
          marginLeft: 10,
          marginRight: 10,
          width: `calc(${wrapperWidth}% - 20px)`
        },
        preventOverflow && {
          overflow: 'hidden' as 'hidden'
        }
      ],

      item: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        boxShadow: showBoxShadow ? `0px 0px 10px 5px ${DefaultPalette.themeDarker}` : ''
      }
    });

    const stackStyles = {
      inner: {
        overflow: preventOverflow ? 'hidden' : ('visible' as 'hidden' | 'visible')
      }
    };

    return (
      <VerticalStack gap={10}>
        <HorizontalStack>
          <HorizontalStack.Item grow>
            <VerticalStack>
              <Slider
                label="Number of items:"
                min={1}
                max={30}
                step={1}
                defaultValue={5}
                showValue={true}
                onChange={this._onNumItemsChange}
              />
              <HorizontalStack>
                <Checkbox label="Shadow around items" onChange={this._onBoxShadowChange} styles={{ root: { marginRight: 10 } }} />
                <Checkbox label="Prevent item overflow" onChange={this._onPreventOverflowChange} />
              </HorizontalStack>
            </VerticalStack>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <HorizontalStack gap={20}>
              <VerticalStack>
                <Checkbox label="Wrap items" onChange={this._onWrapChange} styles={{ root: { marginBottom: 10 } }} />
                <Checkbox label="Shrink items" onChange={this._onShrinkChange} />
              </VerticalStack>
              <HorizontalStack.Item grow>
                <Slider
                  label="Container width:"
                  min={1}
                  max={100}
                  step={1}
                  defaultValue={100}
                  showValue={true}
                  onChange={this._onWrapperWidthChange}
                />
              </HorizontalStack.Item>
            </HorizontalStack>
          </HorizontalStack.Item>
        </HorizontalStack>

        <HorizontalStack gap={20}>
          <HorizontalStack.Item grow>
            <VerticalStack>
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
            </VerticalStack>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <VerticalStack>
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
            </VerticalStack>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <VerticalStack>
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
            </VerticalStack>
          </HorizontalStack.Item>
        </HorizontalStack>

        <HorizontalStack gap={20} verticalAlign="bottom">
          <HorizontalStack.Item grow>
            <Dropdown
              selectedKey={horizontalAlignment}
              placeholder="Select Horizontal Alignment"
              label="Horizontal alignment:"
              options={[
                { key: 'left', text: 'Left' },
                { key: 'center', text: 'Center' },
                { key: 'right', text: 'Right' },
                { key: 'space-around', text: 'Space around' },
                { key: 'space-between', text: 'Space between' },
                { key: 'space-evenly', text: 'Space evenly' }
              ]}
              onChange={this._onHorizontalAlignChange}
            />
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <Dropdown
              selectedKey={verticalAlignment}
              placeholder="Select Vertical Alignment"
              label="Vertical alignment:"
              options={[{ key: 'top', text: 'Top' }, { key: 'center', text: 'Center' }, { key: 'bottom', text: 'Bottom' }]}
              onChange={this._onVerticalAlignChange}
            />
          </HorizontalStack.Item>
          <HorizontalStack.Item>
            <Checkbox label="Hide empty children" onChange={this._onHideEmptyChildrenChange} />
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <TextField label="Enter a space-separated list of empty children (e.g. 1 2 3):" onChange={this._onEmptyChildrenChange} />
          </HorizontalStack.Item>
        </HorizontalStack>

        <HorizontalStack
          wrap={wrap}
          shrinkItems={shrink}
          gap={gap}
          verticalGap={verticalGap}
          padding={`${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`}
          horizontalAlign={horizontalAlignment}
          verticalAlign={verticalAlignment}
          className={styles.root}
          styles={stackStyles}
        >
          {this._range(1, numItems).map((value: number, index: number) => {
            if (emptyChildren.indexOf(value.toString()) !== -1) {
              return hideEmptyChildren ? (
                <HorizontalStack.Item key={index} className={styles.item} />
              ) : (
                <Text key={index} className={styles.item} />
              );
            }

            return (
              <Text key={index} className={styles.item}>
                {value}
              </Text>
            );
          })}
        </HorizontalStack>
      </VerticalStack>
    );
  }

  private _onNumItemsChange = (value: number): void => {
    this.setState({ numItems: value });
  };

  private _range = (start: number, end: number): number[] => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
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
    this.setState({ shrink: isChecked });
  };

  private _onWrapperWidthChange = (value: number): void => {
    this.setState({ wrapperWidth: value });
  };

  private _onGapChange = (value: number): void => {
    this.setState({ gap: value });
  };

  private _onVerticalGapChange = (value: number): void => {
    this.setState({ verticalGap: value });
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
    this.setState({ horizontalAlignment: option.key as HorizontalAlignment });
  };

  private _onVerticalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ verticalAlignment: option.key as VerticalAlignment });
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
