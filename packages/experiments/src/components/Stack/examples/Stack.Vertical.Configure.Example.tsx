// @codepen
import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from '../Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export type VerticalAlignment = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
export type HorizontalAlignment = 'start' | 'center' | 'end';

export interface IExampleState {
  numItems: number;
  showBoxShadow: boolean;
  preventOverflow: boolean;
  preventShrink: boolean;
  wrap: boolean;
  stackHeight: number;
  autoHeight: boolean;
  gap: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  verticalAlignment: VerticalAlignment;
  horizontalAlignment: HorizontalAlignment;
  hideEmptyChildren: boolean;
  emptyChildren: string[];
}

export class VerticalStackConfigureExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      numItems: 5,
      showBoxShadow: false,
      preventOverflow: false,
      preventShrink: true,
      wrap: false,
      stackHeight: 200,
      autoHeight: true,
      gap: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      verticalAlignment: 'start',
      horizontalAlignment: 'start',
      hideEmptyChildren: false,
      emptyChildren: []
    };
  }

  public render(): JSX.Element {
    const {
      numItems,
      showBoxShadow,
      preventOverflow,
      preventShrink,
      wrap,
      stackHeight,
      autoHeight,
      gap,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      verticalAlignment,
      horizontalAlignment,
      hideEmptyChildren,
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
      <Stack gap={10}>
        <Stack horizontal gap={20}>
          <Stack.Item grow>
            <Stack>
              <Slider
                label="Number of items:"
                min={1}
                max={10}
                step={1}
                defaultValue={5}
                showValue={true}
                onChange={this._onNumItemsChange}
              />
              <Stack horizontal>
                <Checkbox label="Shadow around items" onChange={this._onBoxShadowChange} styles={{ root: { marginRight: 10 } }} />
                <Checkbox label="Prevent item overflow" onChange={this._onPreventOverflowChange} styles={{ root: { marginRight: 10 } }} />
                <Checkbox label="Shrink items" onChange={this._onShrinkItemsChange} styles={{ root: { marginRight: 10 } }} />
                <Checkbox label="Wrap items" onChange={this._onWrapChange} />
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
                showValue={true}
                onChange={this._onStackHeightChange}
                disabled={autoHeight}
              />
              <Checkbox label="Automatic height (based on items)" defaultChecked={true} onChange={this._onAutoHeightChange} />
            </Stack>
          </Stack.Item>
        </Stack>

        <Stack horizontal gap={20}>
          <Stack.Item grow>
            <Stack>
              <Slider
                label="Vertical gap between items:"
                min={0}
                max={50}
                step={1}
                defaultValue={0}
                showValue={true}
                onChange={this._onGapChange}
              />
              <Stack horizontal gap={20} verticalAlign="end">
                <Stack.Item grow>
                  <Dropdown
                    selectedKey={verticalAlignment}
                    placeholder="Select Vertical Alignment"
                    label="Vertical alignment:"
                    options={[
                      { key: 'start', text: 'Top' },
                      { key: 'center', text: 'Center' },
                      { key: 'end', text: 'Bottom' },
                      { key: 'space-around', text: 'Space around' },
                      { key: 'space-between', text: 'Space between' },
                      { key: 'space-evenly', text: 'Space evenly' }
                    ]}
                    onChange={this._onVerticalAlignChange}
                  />
                </Stack.Item>
                <Stack.Item grow>
                  <Dropdown
                    selectedKey={horizontalAlignment}
                    placeholder="Select Horizontal Alignment"
                    label="Horizontal alignment:"
                    options={[{ key: 'start', text: 'Left' }, { key: 'center', text: 'Center' }, { key: 'end', text: 'Right' }]}
                    onChange={this._onHorizontalAlignChange}
                  />
                </Stack.Item>
                <Stack.Item>
                  <Checkbox label="Hide empty children" onChange={this._onHideEmptyChildrenChange} />
                </Stack.Item>
                <Stack.Item grow>
                  <TextField label="List of empty children (e.g. 1 2 3):" onChange={this._onEmptyChildrenChange} />
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

        <Stack
          preventShrink={preventShrink}
          wrap={wrap}
          gap={gap}
          padding={`${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`}
          verticalAlign={verticalAlignment}
          horizontalAlign={horizontalAlignment}
          className={styles.root}
        >
          {this._range(1, numItems).map((value: number, index: number) => {
            if (emptyChildren.indexOf(value.toString()) !== -1) {
              return hideEmptyChildren ? <Stack.Item key={index} className={styles.item} /> : <span key={index} className={styles.item} />;
            }

            return (
              <span key={index} className={styles.item}>
                {value}
              </span>
            );
          })}
        </Stack>
      </Stack>
    );
  }

  private _range = (start: number, end: number): number[] => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
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
    this.setState({ preventShrink: !isChecked });
  };

  private _onWrapChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ wrap: isChecked });
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
