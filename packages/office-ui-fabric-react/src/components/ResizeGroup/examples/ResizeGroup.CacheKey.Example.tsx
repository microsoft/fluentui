import * as React from 'react';
import { BaseComponent, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { OverflowSet } from '../../OverflowSet';

const ITEM_COUNT = 75;

export interface IOverflowData {
  primary: IContextualMenuItem[];
  overflow: IContextualMenuItem[];
  cacheKey?: string;
}

function generateData(count: number): IOverflowData {
  let dataItems = [];
  for (let index = 0; index < count; index++) {
    dataItems.push({
      key: `item${index}`,
      name: `Item ${index}`
    });
  }

  return {
    primary: dataItems,
    overflow: []
  };
}

export interface IResizeGroupCacheKeyExampleState {
  data: IOverflowData;
}

function computeCacheKey(primaryControls: IContextualMenuItem[]): string {
  return primaryControls.reduce((acc, current) => acc + current.key, '');
}

export class ResizeGroupCacheKeyExample extends BaseComponent<any, IResizeGroupCacheKeyExampleState> {

  public constructor(props) {
    super(props);

    this.state = {
      data: generateData(ITEM_COUNT)
    };
  }

  public render() {
    return (
      <div>
        <ResizeGroup
          data={ this.state.data }
          onReduceData={ (currentData) => {
            if (currentData.primary.length === 0) {
              return undefined;
            }

            let overflow = [...currentData.primary.slice(-1), ...currentData.overflow];
            let primary = currentData.primary.slice(0, -1);

            let cacheKey = undefined;
            if (currentData.cacheKey) {
              cacheKey = computeCacheKey(primary);
            }
            return { primary, overflow, cacheKey };
          } }
          onGrowData={ (currentData) => {
            if (currentData.overflow.length === 0) {
              return undefined;
            }

            let primary = [...currentData.primary, currentData.overflow[0]];
            let overflow = currentData.overflow.slice(1);

            let cacheKey = undefined;
            if (currentData.cacheKey) {
              cacheKey = computeCacheKey(primary);
            }
            return { primary, overflow, cacheKey };
          } }
          onRenderData={ (data) => {
            return (
              <OverflowSet
                items={ data.primary }
                overflowItems={ data.overflow }
                onRenderItem={ (item) => {
                  return (
                    <DefaultButton
                      text={ item.name }
                      checked={ item.checked }
                    />
                  );
                } }
                onRenderOverflowButton={ (overflowItems) => {
                  return (
                    <DefaultButton
                      menuProps={ { items: overflowItems } }
                    />
                  );
                } }
              />
            );
          } }
        />
        <div style={ { paddingTop: '20px' } }>
          <Checkbox label='Enable caching' onChange={ this.onCachingEnabledChanged } />
          <Checkbox label='Buttons checked' onChange={ this.onButtonsCheckedChanged } />
        </div>
      </div>
    );
  }

  @autobind
  private onCachingEnabledChanged(_, checked: boolean) {
    let cacheKey = checked ? computeCacheKey(this.state.data.primary) : undefined;
    let newData: IOverflowData = { ...this.state.data, cacheKey };

    this.setState({
      data: newData
    });
  }

  @autobind
  private onButtonsCheckedChanged(_, checked: boolean) {
    let newData = {
      ...this.state.data,
      primary: this.state.data.primary.map(item => {
        return { ...item, checked };
      }),
      overflow: this.state.data.overflow
    };

    window.setTimeout(() =>
      this.setState({
        data: newData
      }), 0);
  }
}