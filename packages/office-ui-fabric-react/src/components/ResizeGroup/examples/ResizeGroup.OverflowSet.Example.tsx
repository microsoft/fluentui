import * as React from 'react';
import { BaseComponent, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { OverflowSet } from '../../OverflowSet';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import * as stylesImport from './ResizeGroup.Example.scss';
const styles: any = stylesImport;

export interface IOverflowData {
  primary: IContextualMenuItem[];
  overflow: IContextualMenuItem[];
  cacheKey?: string;
}

function generateData(count: number, cachingEnabled: boolean, checked: boolean): IOverflowData {
  const icons = ['Add', 'Share', 'Upload'];
  let dataItems = [];
  let cacheKey = '';
  for (let index = 0; index < count; index++) {
    let item = {
      key: `item${index}`,
      name: `Item ${index}`,
      icon: icons[index % icons.length],
      checked: checked
    };

    cacheKey = cacheKey + item.key;
    dataItems.push(item);
  }

  let result: IOverflowData = {
    primary: dataItems,
    overflow: [] as any[]
  };

  if (cachingEnabled) {
    result = { ...result, cacheKey };
  }

  return result;
}

export interface IResizeGroupOverflowSetExampleState {
  short: boolean;
  numberOfItems: number;
  buttonsChecked: boolean;
  cachingEnabled: boolean;
  onGrowDataEnabled: boolean;
}

function computeCacheKey(primaryControls: IContextualMenuItem[]): string {
  return primaryControls.reduce((acc, current) => acc + current.key, '');
}

export class ResizeGroupOverflowSetExample extends BaseComponent<{}, IResizeGroupOverflowSetExampleState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      short: false,
      buttonsChecked: false,
      cachingEnabled: false,
      onGrowDataEnabled: false,
      numberOfItems: 20
    };
  }

  public render() {
    let { numberOfItems, cachingEnabled, buttonsChecked, short, onGrowDataEnabled } = this.state;
    let dataToRender = generateData(numberOfItems, cachingEnabled, buttonsChecked);
    return (
      <div className={ short ? styles.resizeIsShort : 'notResized' }>
        <ResizeGroup
          data={ dataToRender }
          onReduceData={ this.onReduceData }
          onGrowData={ onGrowDataEnabled ? this.onGrowData : undefined }
          onRenderData={ (data) => {
            return (
              <OverflowSet
                items={ data.primary }
                overflowItems={ data.overflow.length ? data.overflow : null }
                onRenderItem={ (item) => {
                  return (
                    <DefaultButton
                      text={ item.name }
                      iconProps={ { iconName: item.icon } }
                      onClick={ item.onClick }
                      checked={ item.checked }
                    />
                  );
                } }
                onRenderOverflowButton={ (overflowItems) => {
                  return (
                    <DefaultButton
                      menuProps={ { items: overflowItems! } }
                    />
                  );
                } }
              />
            );
          } }
        />
        <div className={ styles.settingsGroup }>
          <Checkbox label='Enable caching' onChange={ this.onCachingEnabledChanged } checked={ cachingEnabled } />
          <Checkbox label='Set onGrowData' onChange={ this.onGrowDataEnabledChanged } checked={ onGrowDataEnabled } />
          <Checkbox label='Buttons checked' onChange={ this.onButtonsCheckedChanged } checked={ buttonsChecked } />
          <div className={ styles.itemCountDropdown } >
            <Dropdown
              label='Number of items to render'
              selectedKey={ numberOfItems.toString() }
              onChanged={ this.onNumberOfItemsChanged }
              options={
                [{ key: '20', text: '20' },
                { key: '30', text: '30' },
                { key: '40', text: '40' },
                { key: '50', text: '50' },
                { key: '75', text: '75' },
                { key: '100', text: '100' },
                { key: '200', text: '200' }] } />
          </div>
        </div>
      </div>
    );
  }

  @autobind
  private onReduceData(currentData: any): any {
    if (currentData.primary.length === 0) {
      return undefined;
    }

    let overflow = [...currentData.primary.slice(-1), ...currentData.overflow];
    let primary = currentData.primary.slice(0, -1);

    let cacheKey = undefined;
    if (this.state.cachingEnabled) {
      cacheKey = computeCacheKey(primary);
    }
    return { primary, overflow, cacheKey };
  }

  @autobind
  private onGrowData(currentData: any): any {
    if (currentData.overflow.length === 0) {
      return undefined;
    }

    let overflow = currentData.overflow.slice(1);
    let primary = [...currentData.primary, ...currentData.overflow.slice(0, 1)];

    let cacheKey = undefined;
    if (this.state.cachingEnabled) {
      cacheKey = computeCacheKey(primary);
    }
    return { primary, overflow, cacheKey };
  }

  @autobind
  private onCachingEnabledChanged(_: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean) {
    this.setState({ cachingEnabled: checked });
  }

  @autobind
  private onGrowDataEnabledChanged(_: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean) {
    this.setState({ onGrowDataEnabled: checked });
  }

  @autobind
  private onButtonsCheckedChanged(_: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean) {
    this.setState({ buttonsChecked: checked });
  }

  @autobind
  private onNumberOfItemsChanged(option: IDropdownOption) {
    this.setState({ numberOfItems: parseInt(option.text, 10) });
  }
}