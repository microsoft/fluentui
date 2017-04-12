/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  OverflowSet
} from '../../OverflowSet';
import { ResizeGroup } from '../../ResizeGroup';

import { items } from './items';

/*
const instructions = [
  { key: 'A', action: Actions.reduceToIcon},
  { key: 'B', action: Actions.appendToOverflow, transform: (itemProps) => : ItemProps},
  [
    {},
    {}
  ]
];


updateOverflowState(prevState, props) => {
if (!prevState) {}
  return {
    instructionsIndex: 0,
    items: [],
    overflowItems: []
  };
}


  let items = prevState.items.concat([]);
  let overflowItems = prevState.overflowItems.concat([]);
  let inst = instructions[prevState.index];
  if (inst) {
  applyInstruction(items, overflowItems, inst);
 }
  for (let i = 0; i < items.length; i++) {
    if (items[i].key === inst.key) {
      overflowItems.concat(items.splice(i, 1));
      break;
    }
  }
  return {
    index: index + 1,
    items,
    overflowItems
  };
}

<VisualResizer
  onReduceProps={ lastReducedProps, props => {
    state.items // [ overflowSetProps1, overflowSetProps2, etc  ]
  }}
  onRender={ props => (
    <div>
      { props.items.map(item => (
        <OverflowSet items={item.items} overflowItems={items.overflowItems} />
      )) }
    </div>
  ) }
/>


*/
export class ResizeGroupOverflowSetExample extends BaseComponent<any, any> {

  public render() {
    return (
      <ResizeGroup
        items={ items }
        onReduceItems={ (currentItems, props) => {
          let overflow = currentItems[0].overflow.concat(currentItems[0].primary.slice(-1));
          let primary = currentItems[0].primary.slice(0, -1);

          return [{ primary, overflow }]
        } }
        onRenderItems={ (items) => {
          return (
            <OverflowSet
              items={ items[0].primary }
              overflowItems={ items[0].overflow.length ? items[0].overflow : null }
              onRenderItem={ (item) => {
                return (
                  <DefaultButton
                    text={ item.name }
                    icon={ item.icon }
                    onClick={ item.onClick }
                  />
                );
              } }
            />
          );
        }
        }
      />

    );
  }
}