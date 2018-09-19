import * as React from 'react';
import { VerticalStack, HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { Slider, Checkbox, Dropdown, IDropdownOption, TextField } from 'office-ui-fabric-react';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export type VerticalAlignment = 'top' | 'center' | 'bottom' | 'space-around' | 'space-between' | 'space-evenly';
export type HorizontalAlignment = 'left' | 'center' | 'right';

export interface IExampleState {
  numItems: number;
  showBoxShadow: boolean;
  preventOverflow: boolean;
  shrinkItems: boolean;
  stackHeight: number;
  autoHeight: boolean;
  gap: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  verticalAlignment: VerticalAlignment;
  horizontalAlignment: HorizontalAlignment;
  emptyChildren: string[];
}

export class VerticalStackConfigureExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      numItems: 5,
      showBoxShadow: false,
      preventOverflow: false,
      shrinkItems: false,
      stackHeight: 200,
      autoHeight: true,
      gap: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      verticalAlignment: 'top',
      horizontalAlignment: 'left',
      emptyChildren: []
    };
  }

  public render(): JSX.Element {
    const {
      numItems,
      showBoxShadow,
      preventOverflow,
      shrinkItems,
      stackHeight,
      autoHeight,
      gap,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      verticalAlignment,
      horizontalAlignment,
      emptyChildren
    } = this.state;

    const styles = mergeStyleSets({
      root: [
        {
          background: DefaultPalette.themeTertiary,
          marginLeft: 10,
          marginRight: 10,
          height: autoHeight ? 'auto' : stackHeight
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

    return (
      <VerticalStack gap={10}>
        <HorizontalStack gap={20}>
          <HorizontalStack.Item grow>
            <VerticalStack>
              <Slider
                label="Number of items:"
                min={1}
                max={10}
                step={1}
                defaultValue={5}
                showValue={true}
                onChange={this._onNumItemsChange}
              />
              <HorizontalStack>
                <Checkbox label="Shadow around items" onChange={this._onBoxShadowChange} styles={{ root: { marginRight: 10 } }} />
                <Checkbox label="Prevent item overflow" onChange={this._onPreventOverflowChange} styles={{ root: { marginRight: 10 } }} />
                <Checkbox label="Shrink items" onChange={this._onShrinkItemsChange} />
              </HorizontalStack>
            </VerticalStack>
          </HorizontalStack.Item>
          <HorizontalStack.Item grow>
            <VerticalStack>
              <Slider
                label="Container height:"
                min={1}
                max={400}
                step={1}
                defaultValue={200}
                showValue={true}
                onChange={this._onStackHeightChange}
                disabled={autoHeight}
              />
              <Checkbox label="Automatic height (based on items)" defaultChecked={true} onChange={this._onAutoHeightChange} />
            </VerticalStack>
          </HorizontalStack.Item>
        </HorizontalStack>

        <HorizontalStack gap={20}>
          <HorizontalStack.Item grow>
            <VerticalStack>
              <Slider
                label="Vertical gap between items:"
                min={0}
                max={50}
                step={1}
                defaultValue={0}
                showValue={true}
                onChange={this._onGapChange}
              />
              <HorizontalStack gap={20}>
                <HorizontalStack.Item grow>
                  <Dropdown
                    selectedKey={verticalAlignment}
                    placeHolder="Select Vertical Alignment"
                    label="Vertical alignment:"
                    options={[
                      { key: 'top', text: 'Top' },
                      { key: 'center', text: 'Center' },
                      { key: 'bottom', text: 'Bottom' },
                      { key: 'space-around', text: 'Space around' },
                      { key: 'space-between', text: 'Space between' },
                      { key: 'space-evenly', text: 'Space evenly' }
                    ]}
                    onChange={this._onVerticalAlignChange}
                  />
                </HorizontalStack.Item>
                <HorizontalStack.Item grow>
                  <Dropdown
                    selectedKey={horizontalAlignment}
                    placeHolder="Select Horizontal Alignment"
                    label="Horizontal alignment:"
                    options={[{ key: 'left', text: 'Left' }, { key: 'center', text: 'Center' }, { key: 'right', text: 'Right' }]}
                    onChange={this._onHorizontalAlignChange}
                  />
                </HorizontalStack.Item>
                <HorizontalStack.Item grow>
                  <TextField label="List of empty children (e.g. 1 2 3):" onChange={this._onEmptyChildrenChange} />
                </HorizontalStack.Item>
              </HorizontalStack>
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

        <VerticalStack
          shrinkItems={shrinkItems}
          gap={gap}
          padding={`${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`}
          verticalAlign={verticalAlignment}
          horizontalAlign={horizontalAlignment}
          className={styles.root}
        >
          {this._range(1, numItems).map((value: number, index: number) => {
            if (emptyChildren.indexOf(value.toString()) !== -1) {
              return <Text key={index} className={styles.item} />;
            }

            return (
              <Text key={index} className={styles.item}>
                {value}
              </Text>
            );
          })}
        </VerticalStack>
      </VerticalStack>
    );
  }

  private _range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array(length)
      .fill(start)
      .map((value: number, index: number) => start + index);
  };

  private _onNumItemsChange = (value: number): void => {
    this.setState({ numItems: value });
  };

  private _onBoxShadowChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ showBoxShadow: isChecked });
  };

  private _onPreventOverflowChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ preventOverflow: isChecked });
  };

  private _onShrinkItemsChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ shrinkItems: isChecked });
  };

  private _onStackHeightChange = (value: number): void => {
    this.setState({ stackHeight: value });
  };

  private _onAutoHeightChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ autoHeight: isChecked });
  };

  private _onGapChange = (value: number): void => {
    this.setState({ gap: value });
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

  private _onVerticalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ verticalAlignment: option.key as VerticalAlignment });
  };

  private _onHorizontalAlignChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ horizontalAlignment: option.key as HorizontalAlignment });
  };

  private _onEmptyChildrenChange = (ev: React.FormEvent<HTMLInputElement>, value?: string): void => {
    if (value === undefined) {
      return;
    }
    this.setState({ emptyChildren: value.replace(/,/g, '').split(' ') });
  };
}
