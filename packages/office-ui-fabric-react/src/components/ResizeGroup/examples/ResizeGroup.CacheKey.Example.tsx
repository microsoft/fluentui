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
          onReduceData={ (currentdata) => {
            if (currentdata.primary.length === 0) {
              return undefined;
            }

            let overflow = [...currentdata.primary.slice(-1), ...currentdata.overflow];
            let primary = currentdata.primary.slice(0, -1);
            return { primary, overflow };
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
          <Checkbox label='Enable caching' />
          <Checkbox label='Buttons checked' onChange={ this.onButtonsCheckedChanged } />
        </div>
      </div>
    );
  }

  @autobind
  private onButtonsCheckedChanged(_, checked: boolean) {
    let newData = {
      primary: this.state.data.primary.map(item => {
        return { ...item, checked };
      }),
      overflow: this.state.data.overflow
    };

    this.setState({
      data: newData
    });
  }
}